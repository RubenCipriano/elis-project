import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include user property
interface AuthenticatedRequest extends Request {
  user?: { role: string }; // Assuming `user` is added via authentication middleware
}

// Admin middleware
const adminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito' });
  }
  next();
};

export default adminMiddleware;
