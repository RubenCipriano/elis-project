import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();

// Define an interface for the request body
interface LoginRequestBody {
  email: string;
  password: string;
}

// Login route
router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'Não existe email' });

  if (!password) return res.status(400).json({ message: 'Não existe password' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env['JWT_SECRET'] || 'default_secret', { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
