import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express Request to include user property
interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // Assuming the decoded token will have a payload
}

// Auth middleware
const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
  const token = req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({ message: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'default_secret') as JwtPayload;
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido' });
  }
};

export default authMiddleware;
