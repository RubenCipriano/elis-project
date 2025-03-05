const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { jwtSecret } = require('../config/config');

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
