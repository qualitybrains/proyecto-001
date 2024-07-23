import { db } from '../src/lib/db';

async function main() {
  const user1 = await db.users.findMany({ where: { email: 'alice@prisma.io' } });
  const user2 = await db.users.findMany({ where: { email: 'bob@prisma.io' } });

  if (user1.length <= 0 && user2.length <= 0) {
    await db.users.createMany({
      data: [
        {
          fullName: 'Alice',
          email: 'alice@prisma.io',
          password: 'SimplePassword123',
        },
        {
          fullName: 'Bob',
          email: 'bob@prisma.io',
          password: 'SimplePassword123',
        },
      ],
    });
  }
  return;
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await db.$disconnect());
