const router = require('express').Router();
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

// GET /api/dashboard/stats?artistId=
router.get('/stats', async (req, res) => {
  const artistId = req.query.artistId || req.artist.id;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const next14 = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const [
    monthlyRevenue,
    confirmedUpcoming,
    pendingDeposits,
    activeHealing,
    todayAppts,
  ] = await Promise.all([
    // Sum of completed appointments this month
    prisma.appointment.aggregate({
      where: {
        artistId,
        status: 'completed',
        date: { gte: startOfMonth, lte: endOfMonth },
        totalAmount: { not: null },
      },
      _sum: { totalAmount: true },
    }),

    // Confirmed appointments in next 14 days
    prisma.appointment.count({
      where: {
        artistId,
        status: { in: ['confirmed', 'pending'] },
        date: { gte: now, lte: next14 },
      },
    }),

    // Pending deposits total
    prisma.deposit.aggregate({
      where: {
        status: 'pending',
        appointment: { artistId },
      },
      _sum: { amount: true },
      _count: true,
    }),

    // Active healing cases
    prisma.healingCase.count({
      where: { artistId, status: { in: ['active', 'concern'] } },
    }),

    // Today's schedule
    prisma.appointment.findMany({
      where: {
        artistId,
        date: {
          gte: new Date(now.setHours(0, 0, 0, 0)),
          lte: new Date(now.setHours(23, 59, 59, 999)),
        },
      },
      orderBy: { date: 'asc' },
      include: {
        client: { select: { name: true } },
        deposit: { select: { status: true } },
        consentForm: { select: { status: true } },
      },
    }),
  ]);

  res.json({
    revenue: {
      month: monthlyRevenue._sum.totalAmount || 0,
    },
    appointments: {
      confirmedNext14: confirmedUpcoming,
      today: todayAppts,
    },
    deposits: {
      pendingTotal: pendingDeposits._sum.amount || 0,
      pendingCount: pendingDeposits._count,
    },
    healing: {
      activeCases: activeHealing,
    },
  });
});

// GET /api/dashboard/week-revenue?artistId=
router.get('/week-revenue', async (req, res) => {
  const artistId = req.query.artistId || req.artist.id;
  const days = [];
  const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const start = new Date(d); start.setHours(0, 0, 0, 0);
    const end = new Date(d); end.setHours(23, 59, 59, 999);

    const result = await prisma.appointment.aggregate({
      where: {
        artistId,
        status: 'completed',
        date: { gte: start, lte: end },
        totalAmount: { not: null },
      },
      _sum: { totalAmount: true },
    });

    days.push({
      label: labels[d.getDay() === 0 ? 6 : d.getDay() - 1],
      date: d.toISOString().split('T')[0],
      revenue: result._sum.totalAmount || 0,
    });
  }

  const total = days.reduce((s, d) => s + d.revenue, 0);
  const max = Math.max(...days.map((d) => d.revenue), 1);

  res.json({ days: days.map((d) => ({ ...d, ratio: d.revenue / max })), total });
});

// GET /api/dashboard/activity?artistId=&limit=
router.get('/activity', async (req, res) => {
  const artistId = req.query.artistId || req.artist.id;
  const limit = Number(req.query.limit || 10);

  // Gather recent events from multiple tables
  const [recentConsents, recentDeposits, recentHealingEntries, recentAppts] = await Promise.all([
    prisma.consentForm.findMany({
      where: { appointment: { artistId }, status: 'signed' },
      orderBy: { clientSignedAt: 'desc' },
      take: 3,
      include: { client: { select: { name: true } } },
    }),
    prisma.deposit.findMany({
      where: { appointment: { artistId }, status: 'paid' },
      orderBy: { paidAt: 'desc' },
      take: 3,
      include: { appointment: { include: { client: { select: { name: true } } } } },
    }),
    prisma.healingEntry.findMany({
      where: { healingCase: { artistId } },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { healingCase: { include: { client: { select: { name: true } } } } },
    }),
    prisma.appointment.findMany({
      where: { artistId, status: 'rescheduled' },
      orderBy: { updatedAt: 'desc' },
      take: 3,
      include: { client: { select: { name: true } } },
    }),
  ]);

  const events = [
    ...recentConsents.map((c) => ({
      type: 'consent_signed',
      text: `${c.client.name} firmó consentimiento digital`,
      at: c.clientSignedAt,
      color: 'var(--gold)',
    })),
    ...recentDeposits.map((d) => ({
      type: 'deposit_paid',
      text: `Depósito recibido · ${d.appointment.client.name} · $${d.amount.toLocaleString()}`,
      at: d.paidAt,
      color: '#3D8C5F',
    })),
    ...recentHealingEntries.map((e) => ({
      type: 'healing_entry',
      text: `Foto curación día ${e.day} · ${e.healingCase.client.name}`,
      at: e.createdAt,
      color: 'var(--bone)',
    })),
    ...recentAppts.map((a) => ({
      type: 'appt_rescheduled',
      text: `Cita reagendada · ${a.client.name}`,
      at: a.updatedAt,
      color: 'var(--oxblood)',
    })),
  ]
    .sort((a, b) => new Date(b.at) - new Date(a.at))
    .slice(0, limit);

  res.json(events);
});

module.exports = router;
