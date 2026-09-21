const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { requireAdmin } = require('../middleware/auth');
const { rateLimit } = require('../middleware/rateLimit');

const router = express.Router();

// Max 10 login attempts per IP every 15 minutes (slows down password guessing)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please wait 15 minutes and try again.'
});

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const admin = await Admin.findOne({ username: String(username).trim() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const ok = await bcrypt.compare(String(password), admin.passwordHash);
    if (!ok) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ message: 'Server error while logging in.' });
  }
});

// GET /api/auth/me — confirms an existing token is still valid
router.get('/me', requireAdmin, (req, res) => {
  res.json({ id: req.admin.id, username: req.admin.username });
});

module.exports = router;
