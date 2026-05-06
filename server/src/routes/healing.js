const router = require('express').Router();
const { body } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

const VALID_STATUSES = ['active', 'completed', 'concern', 'discharged'];

// GET /api/healing?status=&artistId=
router.get('/', async (req, res) => {
  const { status, artistId } = req.query;
  const where = {};
  if (status) where.status = status;
  if (artistId) where.artistId = artistId;

  const cases = await prisma.healingCase.findMany({
    where,
    orderBy: { startDate: 'desc' },
    include: {
      client: { select: { id: true, name: true, phone: true } },
      artist: { select: { id: true, name: true, initials: true } },
      entries: {
        orderBy: { day: 'desc' },
        take: 1, // latest entry only in list view
      },
    },
  });

  // Attach computed day + progress
  const enriched = cases.map((c) => {
    const daysSinceStart = Math.floor(
      (Date.now() - new Date(c.startDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const latestEntry = c.entries[0];
    const symptoms = latestEntry ? JSON.parse(latestEntry.symptoms || '[]') : [];
    return {
      ...c,
      currentDay: daysSinceStart,
      progress: Math.min(daysSinceStart / 28, 1),
      latestStatus: latestEntry?.status || 'normal',
      latestSymptoms: symptoms,
    };
  });

  res.json(enriched);
});

// GET /api/healing/:id
router.get('/:id', async (req, res) => {
  const healingCase = await prisma.healingCase.findUnique({
    where: { id: req.params.id },
    include: {
      client: true,
      artist: { select: { name: true, initials: true } },
      entries: { orderBy: { day: 'asc' } },
    },
  });

  if (!healingCase) return res.status(404).json({ error: 'Caso no encontrado' });

  const entries = healingCase.entries.map((e) => ({
    ...e,
    symptoms: JSON.parse(e.symptoms || '[]'),
  }));

  const currentDay = Math.floor(
    (Date.now() - new Date(healingCase.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  res.json({ ...healingCase, entries, currentDay, progress: Math.min(currentDay / 28, 1) });
});

// POST /api/healing — open new healing case
router.post(
  '/',
  [
    body('clientId').notEmpty(),
    body('artistId').notEmpty(),
    body('piece').trim().notEmpty(),
    body('zone').trim().notEmpty(),
    validate,
  ],
  async (req, res) => {
    const { clientId, artistId, piece, zone } = req.body;
    const healingCase = await prisma.healingCase.create({
      data: { clientId, artistId, piece, zone, status: 'active' },
      include: {
        client: { select: { name: true } },
        artist: { select: { name: true, initials: true } },
      },
    });
    res.status(201).json(healingCase);
  }
);

// PUT /api/healing/:id/status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }
  const updated = await prisma.healingCase.update({
    where: { id: req.params.id },
    data: { status },
  });
  res.json(updated);
});

// POST /api/healing/:id/entries — add a daily entry
router.post(
  '/:id/entries',
  [
    body('day').isInt({ min: 0, max: 365 }),
    body('status').isIn(['normal', 'watch', 'urgent']),
    body('symptoms').isArray(),
    validate,
  ],
  async (req, res) => {
    const { day, symptoms, note, photoUrl, status } = req.body;

    // Auto-escalate case status if entry is urgent
    if (status === 'urgent') {
      await prisma.healingCase.update({
        where: { id: req.params.id },
        data: { status: 'concern' },
      });
    }

    const entry = await prisma.healingEntry.create({
      data: {
        healingCaseId: req.params.id,
        day: Number(day),
        symptoms: JSON.stringify(symptoms),
        note,
        photoUrl,
        status,
      },
    });

    res.status(201).json({ ...entry, symptoms });
  }
);

// GET /api/healing/:id/entries
router.get('/:id/entries', async (req, res) => {
  const entries = await prisma.healingEntry.findMany({
    where: { healingCaseId: req.params.id },
    orderBy: { day: 'asc' },
  });

  res.json(entries.map((e) => ({ ...e, symptoms: JSON.parse(e.symptoms || '[]') })));
});

// DELETE /api/healing/:id
router.delete('/:id', async (req, res) => {
  await prisma.healingCase.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
