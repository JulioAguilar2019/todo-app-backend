import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user_profile.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ msg: 'This email does not have an account yet.' });
    }

    const isMatch = bcryptjs.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Email or password are incorrect.' });
    }

    const payload = {
      user: {
        id: user.user_profile_id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY as string,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
