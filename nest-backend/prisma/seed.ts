// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'user@example.com',
      password: 'password123',
      roles: ['user'],
    },
    {
      email: 'validator@example.com',
      password: 'password456',
      roles: ['validator'],
    },
    {
      email: 'reporter@example.com',
      password: 'password789',
      roles: ['reporter'],
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        roles: { set: user.roles }, // Use 'set' to set the roles as an array of strings
      },
    });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
