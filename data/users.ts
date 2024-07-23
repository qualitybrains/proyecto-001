import bcrypt from 'bcrypt';

const hashedPassword = async () => await bcrypt.hash('SimplePassword123', 10);
const usersData = [
  {
    fullName: 'Alice',
    email: 'alice@prisma.io',
    password: hashedPassword,
  },
  {
    fullName: 'Bob',
    email: 'bob@prisma.io',
    password: hashedPassword,
  },
];

export { usersData };
