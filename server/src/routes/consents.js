const router = require('express').Router();
const { body } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

router.use(requireAuth);

function nextFolio(last) {
  if (!last) return 'CI-2025-0001';
  const num = parseInt(last.folio.split('-')[2], 10) + 1;
  return `CI-${new Date().getFullYear()}-${String(num).padStart(4, '0')}`;
}

// GET /api/consents?status=&clientId=&artistId=
router.get('/', async (req, res) => {
  const { status, clientId, artistId } = req.query;
  const where = {};
  if (status) where.status = status;
  if (clientId) where.clientId = clientId;
  if (artistId) where.appointment = { artistId };

  const consents = await prisma.consentForm.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      client: { select: { name: true, email: true } },
      appointment: {
        include: {
          artist: { select: { name: true, initials: true } },
        },
      },
    },
  });

  res.json(consents);
});

// GET /api/consents/:id
router.get('/:id', async (req, res) => {
  const consent = await prisma.consentForm.findUnique({
    where: { id: req.params.id },
    include: {
      client: true,
      appointment: {
        include: {
          artist: { select: { name: true, initials: true, email: true } },
        },
      },
    },
  });
  if (!consent) return res.status(404).json({ error: 'Consentimiento no encontrado' });

  // Parse JSON fields
  consent.checklist = JSON.parse(consent.checklist || '{}');
  res.json(consent);
});

// POST /api/consents — create draft
router.post(
  '/',
  [
    body('appointmentId').notEmpty(),
    body('clientId').notEmpty(),
    validate,
  ],
  async (req, res) => {
    const { appointmentId, clientId } = req.body;

    const exists = await prisma.consentForm.findUnique({ where: { appointmentId } });
    if (exists) return res.status(409).json({ error: 'Ya existe un consentimiento para esta cita' });

    const last = await prisma.consentForm.findFirst({ orderBy: { createdAt: 'desc' } });
    const folio = nextFolio(last);

    const consent = await prisma.consentForm.create({
      data: {
        appointmentId,
        clientId,
        folio,
        status: 'draft',
        checklist: JSON.stringify({
          idVerified: false,
          medicalQuestionnaire: false,
          depositReceived: false,
          sketchApproved: false,
          postSessionPhoto: false,
        }),
      },
    });

    res.status(201).json(consent);
  }
);

// PUT /api/consents/:id/send — mark as sent to client
router.put('/:id/send', async (req, res) => {
  const consent = await prisma.consentForm.update({
    where: { id: req.params.id },
    data: { status: 'sent', sentAt: new Date() },
  });
  res.json(consent);
});

// PUT /api/consents/:id/open — client opened it (called from public-facing link)
router.put('/:id/open', async (req, res) => {
  const consent = await prisma.consentForm.findUnique({ where: { id: req.params.id } });
  if (!consent) return res.status(404).json({ error: 'Consentimiento no encontrado' });

  const updated = await prisma.consentForm.update({
    where: { id: req.params.id },
    data: {
      status: consent.status === 'sent' ? 'opened' : consent.status,
      openedAt: consent.openedAt || new Date(),
    },
  });
  res.json(updated);
});

// PUT /api/consents/:id/sign — capture electronic signature
router.put(
  '/:id/sign',
  [
    body('role').isIn(['client', 'artist']),
    body('signature').notEmpty(), // base64 SVG or data URI
    validate,
  ],
  async (req, res) => {
    const { role, signature } = req.body;
    const now = new Date();

    const consent = await prisma.consentForm.findUnique({ where: { id: req.params.id } });
    if (!consent) return res.status(404).json({ error: 'Consentimiento no encontrado' });

    const data =
      role === 'client'
        ? { clientSignature: signature, clientSignedAt: now }
        : { artistSignature: signature, artistSignedAt: now };

    // Both signed → status = signed
    const current = consent;
    const bothSigned =
      (role === 'client' ? signature : current.clientSignature) &&
      (role === 'artist' ? signature : current.artistSignature);

    const updated = await prisma.consentForm.update({
      where: { id: req.params.id },
      data: { ...data, ...(bothSigned && { status: 'signed' }) },
    });

    res.json(updated);
  }
);

// PUT /api/consents/:id/checklist — update checklist items
router.put('/:id/checklist', async (req, res) => {
  const { checklist } = req.body; // partial object
  const consent = await prisma.consentForm.findUnique({ where: { id: req.params.id } });
  if (!consent) return res.status(404).json({ error: 'Consentimiento no encontrado' });

  const current = JSON.parse(consent.checklist || '{}');
  const merged = { ...current, ...checklist };

  const updated = await prisma.consentForm.update({
    where: { id: req.params.id },
    data: { checklist: JSON.stringify(merged) },
  });

  res.json({ ...updated, checklist: merged });
});

// DELETE /api/consents/:id
router.delete('/:id', async (req, res) => {
  await prisma.consentForm.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
