import { Request, Response } from 'express';
import { encryptPassword } from '../helpers/encrypt-password';
import prisma from '../prisma/client';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user_profile.findMany();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving users',
      error,
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user_profile.findUnique({
      where: {
        user_profile_id: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving user',
      error,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, photo, email, tel } = req.body;

    let { password, confirm_password } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({
        msg: 'Password does not match',
      });
    }

    password = await encryptPassword(password);
    confirm_password = await encryptPassword(confirm_password);

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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating user',
      error,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      photo,
      email,
      password,
      confirm_password,
      tel,
    } = req.body;
    const user = await prisma.user_profile.update({
      where: {
        user_profile_id: Number(id),
      },
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating user',
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user_profile.delete({
      where: {
        user_profile_id: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error deleting user',
      error,
    });
  }
};
