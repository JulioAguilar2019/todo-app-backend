import { Request, Response } from 'express';
import { encryptPassword } from '../../helpers/encrypt-password';
import prisma from '../../prisma/client';
import bcryptjs from 'bcryptjs';

export const getAllUsers = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;

  if (isNaN(Number(limit)) || isNaN(Number(from))) {
    return res.status(400).json({
      msg: 'limit and from must be numbers',
    });
  }

  try {
    const [total, users] = await Promise.all([
      prisma.user_profile.count(),
      prisma.user_profile.findMany({
        take: Number(limit),
        skip: Number(from),
      }),
    ]);
    res.json({
      message: 'Users retrieved successfully',
      total,
      users,
    });
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
    const {
      first_name,
      last_name,
      photo,
      email,
      tel,
      password,
      confirm_password,
    } = req.body;
    let {} = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({
        msg: 'Password does not match',
      });
    }
    const newPassword = await encryptPassword(password);

    const user = await prisma.user_profile.create({
      data: {
        first_name,
        last_name,
        photo,
        email,
        password: newPassword,
        confirm_password: newPassword,
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
    res.json({
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error deleting user',
      error,
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { actual_password, password, confirm_password } = req.body;

    const user = await prisma.user_profile.findUnique({
      where: { user_profile_id: Number(id) },
    });

    const isMatch = bcryptjs.compareSync(actual_password, user!.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (actual_password === password) {
      return res.status(400).json({ msg: 'Password is the same' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        msg: 'Password does not match',
      });
    }

    const newPassword = await encryptPassword(password);

    await prisma.user_profile.update({
      where: {
        user_profile_id: Number(id),
      },
      data: {
        password: newPassword,
        confirm_password: newPassword,
      },
    });

    res.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating password',
      error,
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, photo, tel } = req.body;

    const user = await prisma.user_profile.update({
      where: {
        user_profile_id: Number(id),
      },
      data: {
        first_name,
        last_name,
        photo,
        tel,
      },
    });

    res.json({
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating profile',
      error,
    });
  }
};
