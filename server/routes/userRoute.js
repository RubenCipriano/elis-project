const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Rota para criar usuário (apenas admin pode cadastrar)
router.post('/register', authMiddleware, adminMiddleware, async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();
  res.json({ message: 'Usuário criado com sucesso' });
});

module.exports = router;
