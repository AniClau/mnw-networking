const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const router = express.Router();

// We store the hashed password on first run
let hashedPassword = null;

async function getHashedPassword() {
  if (!hashedPassword) {
    hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  }
  return hashedPassword;
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }

    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const stored = await getHashedPassword();
    const valid = await bcrypt.compare(password, stored);

    if (!valid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, username });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// GET /api/auth/verify — Check if token is still valid
router.get('/verify', require('../middleware/auth'), (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

module.exports = router;
