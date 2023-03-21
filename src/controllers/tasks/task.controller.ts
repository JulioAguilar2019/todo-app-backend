import { Request, Response } from 'express';
import prisma from '../../prisma/client';

export const getAllTasks = async (req: Request, res: Response) => {
  const { limit = 5, from = 0 } = req.query;

  if (isNaN(Number(limit)) || isNaN(Number(from))) {
    return res.status(400).json({
      msg: 'limit and from must be numbers',
    });
  }

  try {
    const [total, tasks] = await Promise.all([
      prisma.task.count(),
      prisma.task.findMany({
        take: Number(limit),
        skip: Number(from),
      }),
    ]);
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      total,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving tasks',
      error,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: {
        task_id: Number(id),
      },
    });
    res.status(200).json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving task',
      error,
    });
  }
};

export const postTask = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      start_date,
      start_time,
      end_date,
      end_time,
      task_category_id,
      user_profile_id,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        name,
        description,
        start_date: new Date(start_date),
        start_time,
        end_date: new Date(end_date),
        end_time,
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

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      start_date,
      start_time,
      end_date,
      end_time,
      status,
      task_category_id,
      user_profile_id,
    } = req.body;

    const task = await prisma.task.update({
      where: {
        task_id: Number(id),
      },
      data: {
        name,
        description,
        start_date: new Date(start_date),
        start_time,
        end_date: new Date(end_date),
        end_time,
        status,
        task_category_id,
        user_profile_id,
      },
    });
    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error updating task',
      error,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.delete({
      where: {
        task_id: Number(id),
      },
    });
    res.status(200).json({
      message: 'Task deleted successfully',
      task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error deleting task',
      error,
    });
  }
};
