import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.uSERS.createMany({
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
  .finally(async () => await prisma.$disconnect())