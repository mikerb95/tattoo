const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const prisma = require('../db');
const { validate } = require('../middleware/validate');
const { requireAuth } = require('../middleware/auth');

function signToken(artistId) {
  return jwt.sign({ sub: artistId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validate,
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const artist = await prisma.artist.findUnique({ where: { email } });
    if (!artist || !(await bcrypt.compare(password, artist.password))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = signToken(artist.id);
    const { password: _pw, ...safe } = artist;
    res.json({ token, artist: safe });
  }
);

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const { password: _pw, ...safe } = req.artist;
  res.json(safe);
});

// PUT /api/auth/password
router.put(
  '/password',
  requireAuth,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }),
    validate,
  ],
  async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const ok = await bcrypt.compare(currentPassword, req.artist.password);
    if (!ok) return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.artist.update({ where: { id: req.artist.id }, data: { password: hashed } });
    res.json({ message: 'Contraseña actualizada' });
  }
);

// PUT /api/auth/status
router.put('/status', requireAuth, async (req, res) => {
  const { status } = req.body;
  if (!['online', 'session', 'offline'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }
  const artist = await prisma.artist.update({
    where: { id: req.artist.id },
    data: { status },
  });
  const { password: _pw, ...safe } = artist;
  res.json(safe);
});

module.exports = router;
