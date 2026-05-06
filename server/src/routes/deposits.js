const router = require('express').Router();
const { body } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

// GET /api/deposits?status=&artistId=&overdue=true
router.get('/', async (req, res) => {
  const { status, artistId, overdue } = req.query;
  const where = {};

  if (status) where.status = status;
  if (artistId) where.appointment = { artistId };
  if (overdue === 'true') {
    where.status = 'pending';
    where.dueDate = { lt: new Date() };
  }

  const deposits = await prisma.deposit.findMany({
    where,
    orderBy: { dueDate: 'asc' },
    include: {
      appointment: {
        include: {
          client: { select: { id: true, name: true, email: true, phone: true } },
          artist: { select: { id: true, name: true, initials: true } },
        },
      },
    },
  });

  res.json(deposits);
});

// GET /api/deposits/pending — summary for dashboard
router.get('/pending', async (req, res) => {
  const artistId = req.query.artistId || req.artist.id;
  const deposits = await prisma.deposit.findMany({
    where: {
      status: 'pending',
      appointment: { artistId },
    },
    orderBy: { dueDate: 'asc' },
    include: {
      appointment: {
        include: { client: { select: { name: true } } },
      },
    },
  });
  const totalPending = deposits.reduce((s, d) => s + d.amount, 0);
  res.json({ deposits, totalPending });
});

// POST /api/deposits — create deposit for an appointment
router.post(
  '/',
  [
    body('appointmentId').notEmpty(),
    body('clientId').notEmpty(),
    body('amount').isFloat({ min: 0 }),
    body('dueDate').isISO8601(),
    validate,
  ],
  async (req, res) => {
    const { appointmentId, clientId, amount, dueDate } = req.body;

    const exists = await prisma.deposit.findUnique({ where: { appointmentId } });
    if (exists) return res.status(409).json({ error: 'Ya existe un depósito para esta cita' });

    const deposit = await prisma.deposit.create({
      data: {
        appointmentId,
        clientId,
        amount: Number(amount),
        dueDate: new Date(dueDate),
        status: 'pending',
      },
      include: {
        appointment: {
          include: { client: { select: { name: true } }, artist: { select: { name: true } } },
        },
      },
    });

    res.status(201).json(deposit);
  }
);

// PUT /api/deposits/:id/pay — mark as paid
router.put('/:id/pay', async (req, res) => {
  const deposit = await prisma.deposit.update({
    where: { id: req.params.id },
    data: { status: 'paid', paidAt: new Date() },
  });
  res.json(deposit);
});

// PUT /api/deposits/:id/refund
router.put('/:id/refund', async (req, res) => {
  const deposit = await prisma.deposit.update({
    where: { id: req.params.id },
    data: { status: 'refunded' },
  });
  res.json(deposit);
});

// DELETE /api/deposits/:id
router.delete('/:id', async (req, res) => {
  await prisma.deposit.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
