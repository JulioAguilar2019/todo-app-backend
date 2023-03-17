import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  const categories = [
    {
      name: 'Trabajo',
      color: 'green',
    },
    {
      name: 'Estudio',
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
      last_name: 'Pérez',
      photo: faker.image.avatar(),
      email: 'juan.perez@example.com',
      password: 'password123',
      confirm_password: 'password123',
      tel: faker.phone.number(),
    },
    {
      first_name: 'María',
      last_name: 'González',
      photo: faker.image.avatar(),
      email: 'maria.gonzalez@example.com',
      password: 'password123',
      confirm_password: 'password123',
      tel: faker.phone.number(),
    },
  ];

  const tasks = [
    {
      name: 'Enviar reporte mensual',
      description: 'Enviar el reporte de ventas mensual al jefe',
      start_date: new Date(2023, 2, 1),
      end_date: new Date(2023, 2, 1),
      status: 'Incomplete',
      task_category_id: 1,
      user_profile_id: 1,
    },
    {
      name: 'Estudiar para el examen de matemáticas',
      description: 'Repasar temas de álgebra y geometría para el examen',
      start_date: new Date(2023, 2, 10),
      end_date: new Date(2023, 2, 15),
      status: 'Incomplete',
      task_category_id: 2,
      user_profile_id: 2,
    },
    {
      name: 'Cocinar cena para la familia',
      description: 'Preparar una cena especial para la familia',
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
