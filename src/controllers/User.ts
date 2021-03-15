import { Request, Response } from 'express';

import UserModel from '../models/User';
import { hash } from 'bcryptjs';

class User {
  async list(req: Request, res: Response) {
    const users = await UserModel.find();

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userAlreadyExists = await UserModel.findOne({ email });

    if (userAlreadyExists) {
      return res.json({ error: 'Email already registered.' });
    }

    const hashedPassword = await hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      return res.json({ error: 'User not found.' });
    }

    const hashedPassword = await hash(password, 10);

    await user.update({
      name,
      email,
      password: hashedPassword,
    });

    const updatedUser = await UserModel.findOne({ _id: id });

    return res.json(updatedUser);
  }
}

export default new User();
