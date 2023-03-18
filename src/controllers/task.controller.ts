import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const getTasks = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving tasks',
      error,
    });
  }
};

export const postTask = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();

  try {
    let {
      name,
      description,
      start_date,
      end_date,
      task_category_id,
      user_profile_id,
    } = req.body;

    start_date = new Date(start_date).toISOString();

    const task = await prisma.task.create({
      data: {
        name,
        description,
        start_date,
        end_date,
        status: 'Pending',
        task_category_id,
        user_profile_id,
      },
    });
    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error creating task',
      error,
    });
  }
};
