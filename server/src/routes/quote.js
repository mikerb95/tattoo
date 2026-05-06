const router = require('express').Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');

// Price matrix
const SIZE_BASE = { XS: 1800, S: 3200, M: 5400, L: 9200, XL: 14500 };
const ZONE_MUL = { antebrazo: 1.0, brazo: 1.05, espalda: 1.15, pierna: 1.0, torso: 1.25, manos: 1.4 };
const COMPLEXITY_MUL = { simple: 0.85, media: 1.0, alta: 1.35 };
const COLOR_MUL = { 'tinta-unica': 1.0, '2-3-colores': 1.15, 'full-color': 1.35 };
const DEPOSIT_RATE = 0.25;

// POST /api/quote/calculate — public, no auth needed
router.post(
  '/calculate',
  [
    body('size').isIn(Object.keys(SIZE_BASE)),
    body('zone').isIn(Object.keys(ZONE_MUL)),
    body('complexity').isIn(Object.keys(COMPLEXITY_MUL)),
    body('color').isIn(Object.keys(COLOR_MUL)),
    body('sessions').optional().isInt({ min: 1, max: 10 }),
    validate,
  ],
  (req, res) => {
    const { size, zone, complexity, color, sessions = 1 } = req.body;

    const base = SIZE_BASE[size];
    const zoneMul = ZONE_MUL[zone];
    const compMul = COMPLEXITY_MUL[complexity];
    const colorMul = COLOR_MUL[color];

    const total = Math.round(base * zoneMul * compMul * colorMul);
    const deposit = Math.round(total * DEPOSIT_RATE);

    res.json({
      size,
      zone,
      complexity,
      color,
      sessions: Number(sessions),
      breakdown: {
        base,
        zoneMul,
        compMul,
        colorMul,
      },
      total,
      deposit,
      depositRate: DEPOSIT_RATE,
      currency: 'MXN',
    });
  }
);

// GET /api/quote/matrix — expose pricing matrix for frontend
router.get('/matrix', (req, res) => {
  res.json({ sizes: SIZE_BASE, zones: ZONE_MUL, complexity: COMPLEXITY_MUL, colors: COLOR_MUL, depositRate: DEPOSIT_RATE });
});

module.exports = router;
