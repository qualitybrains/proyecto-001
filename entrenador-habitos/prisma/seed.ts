import { db } from "@/lib/db"

async function main() {
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
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await db.$disconnect())