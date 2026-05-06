const router = require('express').Router();
const { body, query } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// All client routes require auth
router.use(requireAuth);

// GET /api/clients?search=&status=&artistId=&page=&limit=
router.get('/', async (req, res) => {
  const { search, artistId, page = 1, limit = 20 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }
  if (artistId) {
    where.appointments = { some: { artistId } };
  }

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        appointments: {
          orderBy: { date: 'desc' },
          take: 1,
          include: { artist: { select: { initials: true, name: true, color: true } } },
        },
        healingCases: { where: { status: { in: ['active', 'concern'] } }, select: { id: true, status: true } },
        _count: { select: { appointments: true, designs: true } },
      },
    }),
    prisma.client.count({ where }),
  ]);

  res.json({ clients, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
});

// GET /api/clients/:id
router.get('/:id', async (req, res) => {
  const client = await prisma.client.findUnique({
    where: { id: req.params.id },
    include: {
      appointments: {
        orderBy: { date: 'desc' },
        include: {
          artist: { select: { name: true, initials: true, color: true } },
          deposit: true,
          consentForm: { select: { status: true, folio: true, clientSignedAt: true } },
        },
      },
      designs: { orderBy: { date: 'desc' } },
      consentForms: { orderBy: { createdAt: 'desc' } },
      healingCases: {
        orderBy: { startDate: 'desc' },
        include: {
          entries: { orderBy: { day: 'desc' }, take: 1 },
          artist: { select: { name: true, initials: true } },
        },
      },
    },
  });

  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
  res.json(client);
});

// POST /api/clients
router.post(
  '/',
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('age').optional().isInt({ min: 18, max: 100 }),
    body('allergies').optional().trim(),
    validate,
  ],
  async (req, res) => {
    const { name, email, phone, age, allergies, notes } = req.body;
    const exists = await prisma.client.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: 'Ya existe un cliente con ese email' });

    const client = await prisma.client.create({
      data: { name, email, phone, age: age ? Number(age) : null, allergies, notes },
    });
    res.status(201).json(client);
  }
);

// PUT /api/clients/:id
router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail().normalizeEmail(),
    body('age').optional().isInt({ min: 18, max: 100 }),
    validate,
  ],
  async (req, res) => {
    const { name, email, phone, age, allergies, notes } = req.body;
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(age !== undefined && { age: age ? Number(age) : null }),
        ...(allergies !== undefined && { allergies }),
        ...(notes !== undefined && { notes }),
      },
    });
    res.json(client);
  }
);

// DELETE /api/clients/:id
router.delete('/:id', async (req, res) => {
  await prisma.client.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

// GET /api/clients/:id/designs
router.get('/:id/designs', async (req, res) => {
  const designs = await prisma.design.findMany({
    where: { clientId: req.params.id },
    orderBy: { date: 'desc' },
    include: { artist: { select: { name: true, initials: true } } },
  });
  res.json(designs);
});

// POST /api/clients/:id/designs
router.post(
  '/:id/designs',
  [
    body('title').trim().notEmpty(),
    body('zone').trim().notEmpty(),
    body('date').isISO8601(),
    validate,
  ],
  async (req, res) => {
    const { title, zone, style, date, artistId, imageUrl, tags } = req.body;
    const design = await prisma.design.create({
      data: {
        clientId: req.params.id,
        title,
        zone,
        style,
        date: new Date(date),
        artistId: artistId || null,
        imageUrl,
        tags: JSON.stringify(tags || []),
      },
    });
    res.status(201).json(design);
  }
);

module.exports = router;
