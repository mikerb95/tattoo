require('dotenv').config();
const express = require('express');
const cors = require('cors');
const prisma = require('./db');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' })); // allow base64 signatures
app.use(express.urlencoded({ extended: false }));

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/deposits', require('./routes/deposits'));
app.use('/api/consents', require('./routes/consents'));
app.use('/api/healing', require('./routes/healing'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/quote', require('./routes/quote'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Artists list (read-only, for CRM sidebar/filters)
app.get('/api/artists', async (req, res) => {
  const artists = await prisma.artist.findMany({
    select: { id: true, name: true, initials: true, color: true, specialty: true, status: true, role: true },
    orderBy: { name: 'asc' },
  });
  res.json(artists);
});

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// ── 404 catch-all ─────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` }));

// ── Global error handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  // Prisma "not found" errors
  if (err.code === 'P2025') return res.status(404).json({ error: 'Registro no encontrado' });
  // Prisma unique constraint
  if (err.code === 'P2002') return res.status(409).json({ error: 'Ya existe un registro con esos datos' });

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// ── Start ─────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🖤 Atelier API running on http://localhost:${PORT}`);
  console.log(`   Env: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   DB:  ${process.env.DATABASE_URL}\n`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
