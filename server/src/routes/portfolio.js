const router = require('express').Router();
const { body } = require('express-validator');
const prisma = require('../db');
const { requireAuth } = require('../middleware/auth');
const { validate } = require('../middleware/validate');

// GET /api/portfolio — public (no auth)
router.get('/', async (req, res) => {
  const { style, artist, year, featured, page = 1, limit = 20 } = req.query;
  const where = {};

  if (style) where.style = style;
  if (artist) where.artist = { contains: artist };
  if (year) where.year = Number(year);
  if (featured === 'true') where.featured = true;

  const skip = (Number(page) - 1) * Number(limit);
  const [pieces, total] = await Promise.all([
    prisma.portfolio.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: [{ featured: 'desc' }, { year: 'desc' }, { createdAt: 'desc' }],
    }),
    prisma.portfolio.count({ where }),
  ]);

  res.json({
    pieces: pieces.map((p) => ({ ...p, tags: JSON.parse(p.tags || '[]') })),
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
});

// GET /api/portfolio/filters — available filter values
router.get('/filters', async (req, res) => {
  const [styles, artists, years] = await Promise.all([
    prisma.portfolio.findMany({ distinct: ['style'], select: { style: true } }),
    prisma.portfolio.findMany({ distinct: ['artist'], select: { artist: true } }),
    prisma.portfolio.findMany({ distinct: ['year'], select: { year: true }, orderBy: { year: 'desc' } }),
  ]);

  res.json({
    styles: styles.map((s) => s.style),
    artists: artists.map((a) => a.artist),
    years: years.map((y) => y.year),
  });
});

// GET /api/portfolio/:id — public
router.get('/:id', async (req, res) => {
  const piece = await prisma.portfolio.findUnique({ where: { id: req.params.id } });
  if (!piece) return res.status(404).json({ error: 'Pieza no encontrada' });
  res.json({ ...piece, tags: JSON.parse(piece.tags || '[]') });
});

// POST /api/portfolio — requires auth
router.post(
  '/',
  requireAuth,
  [
    body('title').trim().notEmpty(),
    body('artist').trim().notEmpty(),
    body('style').trim().notEmpty(),
    body('year').isInt({ min: 2000, max: new Date().getFullYear() + 1 }),
    validate,
  ],
  async (req, res) => {
    const { title, artist, style, zone, year, imageUrl, tags, featured } = req.body;
    const piece = await prisma.portfolio.create({
      data: {
        title,
        artist,
        style,
        zone,
        year: Number(year),
        imageUrl,
        tags: JSON.stringify(tags || []),
        featured: Boolean(featured),
      },
    });
    res.status(201).json({ ...piece, tags: JSON.parse(piece.tags) });
  }
);

// PUT /api/portfolio/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { title, artist, style, zone, year, imageUrl, tags, featured } = req.body;
  const piece = await prisma.portfolio.update({
    where: { id: req.params.id },
    data: {
      ...(title && { title }),
      ...(artist && { artist }),
      ...(style && { style }),
      ...(zone !== undefined && { zone }),
      ...(year && { year: Number(year) }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(tags && { tags: JSON.stringify(tags) }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
    },
  });
  res.json({ ...piece, tags: JSON.parse(piece.tags) });
});

// DELETE /api/portfolio/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.portfolio.delete({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = router;
