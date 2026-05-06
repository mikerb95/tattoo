const jwt = require('jsonwebtoken');
const prisma = require('../db');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const artist = await prisma.artist.findUnique({ where: { id: payload.sub } });
    if (!artist) return res.status(401).json({ error: 'Artista no encontrado' });
    req.artist = artist;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function requireAdmin(req, res, next) {
  if (req.artist?.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
