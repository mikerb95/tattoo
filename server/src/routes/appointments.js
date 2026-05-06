const router = require('express').Router();
const { body } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

const VALID_STATUSES = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rescheduled'];

// GET /api/appointments?artistId=&week=YYYY-WW&date=&status=
router.get('/', async (req, res) => {
  const { artistId, date, status, week, clientId } = req.query;
  const where = {};

  if (artistId) where.artistId = artistId;
  if (clientId) where.clientId = clientId;
  if (status) where.status = status;

  if (week) {
    // week format: YYYY-WW → compute start/end
    const [year, wk] = week.split('-').map(Number);
    const jan1 = new Date(year, 0, 1);
    const startOfWeek = new Date(jan1);
    startOfWeek.setDate(jan1.getDate() + (wk - 1) * 7 - jan1.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    where.date = { gte: startOfWeek, lte: endOfWeek };
  } else if (date) {
    const d = new Date(date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));
    where.date = { gte: start, lte: end };
  }

  const appointments = await prisma.appointment.findMany({
    where,
    orderBy: { date: 'asc' },
    include: {
      client: { select: { id: true, name: true, phone: true, email: true } },
      artist: { select: { id: true, name: true, initials: true, color: true } },
      deposit: { select: { id: true, amount: true, status: true, paidAt: true } },
      consentForm: { select: { id: true, status: true, folio: true } },
    },
  });

  res.json(appointments);
});

// GET /api/appointments/today
router.get('/today', async (req, res) => {
  const artistId = req.query.artistId || req.artist.id;
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const end = new Date(); end.setHours(23, 59, 59, 999);

  const appointments = await prisma.appointment.findMany({
    where: { artistId, date: { gte: start, lte: end } },
    orderBy: { date: 'asc' },
    include: {
      client: { select: { id: true, name: true, phone: true } },
      deposit: { select: { status: true, amount: true } },
      consentForm: { select: { status: true } },
    },
  });

  res.json(appointments);
});

// GET /api/appointments/:id
router.get('/:id', async (req, res) => {
  const appt = await prisma.appointment.findUnique({
    where: { id: req.params.id },
    include: {
      client: true,
      artist: { select: { id: true, name: true, initials: true, color: true, specialty: true } },
      deposit: true,
      consentForm: true,
    },
  });
  if (!appt) return res.status(404).json({ error: 'Cita no encontrada' });
  res.json(appt);
});

// POST /api/appointments
router.post(
  '/',
  [
    body('clientId').notEmpty(),
    body('artistId').notEmpty(),
    body('date').isISO8601(),
    body('duration').isFloat({ min: 0.5 }),
    body('piece').trim().notEmpty(),
    body('zone').trim().notEmpty(),
    validate,
  ],
  async (req, res) => {
    const { clientId, artistId, date, duration, piece, zone, totalAmount, notes } = req.body;

    // Check artist availability
    const dateObj = new Date(date);
    const endDate = new Date(dateObj.getTime() + duration * 60 * 60 * 1000);

    const conflict = await prisma.appointment.findFirst({
      where: {
        artistId,
        status: { notIn: ['cancelled', 'rescheduled'] },
        date: { lt: endDate },
        AND: [
          {
            date: {
              gte: new Date(dateObj.getTime() - 8 * 60 * 60 * 1000), // rough overlap check
            },
          },
        ],
      },
    });

    if (conflict) {
      return res.status(409).json({ error: 'El artista ya tiene una cita en ese horario', conflict });
    }

    const appt = await prisma.appointment.create({
      data: {
        clientId,
        artistId,
        date: dateObj,
        duration: Number(duration),
        piece,
        zone,
        totalAmount: totalAmount ? Number(totalAmount) : null,
        notes,
        status: 'pending',
      },
      include: {
        client: { select: { name: true, email: true, phone: true } },
        artist: { select: { name: true, initials: true, color: true } },
      },
    });

    res.status(201).json(appt);
  }
);

// PUT /api/appointments/:id
router.put(
  '/:id',
  [
    body('status').optional().isIn(VALID_STATUSES),
    body('date').optional().isISO8601(),
    body('duration').optional().isFloat({ min: 0.5 }),
    validate,
  ],
  async (req, res) => {
    const { date, duration, piece, zone, status, totalAmount, notes } = req.body;
    const appt = await prisma.appointment.update({
      where: { id: req.params.id },
      data: {
        ...(date && { date: new Date(date) }),
        ...(duration !== undefined && { duration: Number(duration) }),
        ...(piece && { piece }),
        ...(zone && { zone }),
        ...(status && { status }),
        ...(totalAmount !== undefined && { totalAmount: totalAmount ? Number(totalAmount) : null }),
        ...(notes !== undefined && { notes }),
      },
      include: {
        client: { select: { name: true, email: true } },
        artist: { select: { name: true, initials: true } },
        deposit: true,
        consentForm: { select: { status: true, folio: true } },
      },
    });
    res.json(appt);
  }
);

// DELETE /api/appointments/:id
router.delete('/:id', async (req, res) => {
  await prisma.appointment.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
