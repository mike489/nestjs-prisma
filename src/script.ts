import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'securepassword',
      phoneNumber: '1234567890',
    },
  });
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
}

main()
  .catch((e: Error) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
