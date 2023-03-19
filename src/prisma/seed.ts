import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  const categories = [
    {
      name: 'Work',
      color: 'green',
    },
    {
      name: 'Study',
      color: 'blue',
    },
    {
      name: 'Personal',
      color: 'orange',
    },
  ];

  const users = [
    {
      first_name: 'Juan',
      last_name: 'Perez',
      photo: faker.image.avatar(),
      email: 'juan.perez@example.com',
      password: 'password123',
      confirm_password: 'password123',
      tel: faker.phone.number(),
    },
    {
      first_name: 'Maria',
      last_name: 'Leon',
      photo: faker.image.avatar(),
      email: 'maria.gonzalez@example.com',
      password: 'password123',
      confirm_password: 'password123',
      tel: faker.phone.number(),
    },
  ];

  const tasks = [
    {
      name: 'Send monthly report',
      description: 'Send the monthly sales report to the boss',
      start_date: new Date(2023, 2, 1),
      end_date: new Date(2023, 2, 1),
      status: 'Incomplete',
      task_category_id: 1,
      user_profile_id: 1,
    },
    {
      name: 'Study for math exam',
      description: 'Review algebra and geometry topics for the exam',
      start_date: new Date(2023, 2, 10),
      end_date: new Date(2023, 2, 15),
      status: 'Incomplete',
      task_category_id: 2,
      user_profile_id: 2,
    },
    {
      name: 'Cook dinner for the family',
      description: 'Prepare a special dinner for the family',
      start_date: new Date(2023, 2, 20),
      end_date: new Date(2023, 2, 20),
      status: 'Incomplete',
      task_category_id: 3,
      user_profile_id: 1,
    },
  ];

  for (const category of categories) {
    await prisma.task_category.create({
      data: category,
    });
  }

  for (const user of users) {
    await prisma.user_profile.create({
      data: user,
    });
  }

  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
