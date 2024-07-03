import { db } from "../src/lib/db"

async function main() {
  const user1 = await db.uSERS.findMany({where: {email: 'alice@prisma.io'}})
  const user2 = await db.uSERS.findMany({where: {email: 'bob@prisma.io'}})
  if (user1.length <= 0 && user2.length <= 0) {
    await db.uSERS.createMany({
      data: [{
        full_name: 'Alice',
        email: 'alice@prisma.io',
        password: 'SimplePassword123'
        },
        {
          full_name: 'Bob',
          email: 'bob@prisma.io',
          password: 'SimplePassword123'
        }]
      })
    return
  }
  
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await db.$disconnect())