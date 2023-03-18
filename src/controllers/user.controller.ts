import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const usersGet = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const users = await prisma.user_profile.findMany();
  res.json(users);
};

export const usersPost = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const {
    first_name,
    last_name,
    photo,
    email,
    password,
    confirm_password,
    tel,
  } = req.body;
  const user = await prisma.user_profile.create({
    data: {
      first_name,
      last_name,
      photo,
      email,
      password,
      confirm_password,
      tel,
    },
  });
  res.json(user);
};
