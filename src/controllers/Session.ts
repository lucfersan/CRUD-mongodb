import { Request, Response } from 'express';
import UserModel from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN } from '../config/env';

class Session {
  async store(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    if (!(await compare(password, user.password))) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    const token = sign({ id: user._id }, JWT_SECRET, {
      expiresIn: EXPIRES_IN,
    });

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  }
}

export default new Session();
