import { PrismaClient } from '@prisma/client';

export const userExistById = async (id: string) => {
  const prisma = new PrismaClient();

  if (Number(id)) {
    const user = await prisma.user_profile.findUnique({
      where: {
        user_profile_id: Number(id),
      },
    });

    if (!user) {
      throw new Error(`The user with id ${id} does not exist`);
    }
  }
};

export const taskCategoryExistById = async (id: string) => {
  const prisma = new PrismaClient();

  if (Number(id)) {
    const taskCategory = await prisma.task_category.findUnique({
      where: {
        task_category_id: Number(id),
      },
    });

    if (!taskCategory) {
      throw new Error(`The task category with id ${id} does not exist`);
    }
  }
};

export const taskExistById = async (id: string) => {
  const prisma = new PrismaClient();

  if (Number(id)) {
    const task = await prisma.task.findUnique({
      where: {
        task_id: Number(id),
      },
    });

    if (!task) {
      throw new Error(`The task with id ${id} does not exist`);
    }
  }
};
