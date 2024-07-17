import bcrypt from 'bcrypt';

const hashedPassword = async () => await bcrypt.hash('SimplePassword123', 10)
const usersData = [
    {
    full_name: 'Alice',
    email: 'alice@prisma.io',
    password: hashedPassword
    },
    {
      full_name: 'Bob',
      email: 'bob@prisma.io',
      password: hashedPassword
    }
]

export { usersData }