import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/userModel'; // Ensure IUser is defined in your model

const router = express.Router();

// Define an interface for the request body
interface RegisterRequestBody {
  email: string;
  password: string;
  role: string;
}

// Define an interface for the JWT payload
interface JwtPayload {
  id: string;
  role: string;
}

// Register route
router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<Response> => {
  const { email, password, role } = req.body;

  if (!email) return res.status(400).json({ message: 'Não existe email' });
  if (!password) return res.status(400).json({ message: 'Não existe password' });

  try {
    const user: IUser | null = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'Utilizador já inserido com esse e-mail / username' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword, role });

    // Await the save to ensure the user is created before proceeding
    await newUser.save();

    return res.json({ user: newUser });

  } catch (error) {
    console.error('Erro no registo:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
