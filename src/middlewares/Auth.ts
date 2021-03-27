import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/env';
import { verify } from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({ error: 'No token provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, JWT_SECRET);
    const { id } = decodedToken as DecodedToken;
    req.userId = id;
    return next();
  } catch {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};
