import { db } from '@/lib/db';

export const getUserProfile = async (email: string) => {
  const user = await db.users.findUnique({
    select: {
      id: true,
      email: true,
      fullName: true,
      points: true,
      password: false,
    },
    where: {
      email,
    },
  });
  return user;
};
