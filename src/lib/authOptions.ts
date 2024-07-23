import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { SessionStrategy } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';

export const authOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }
        const user = await db.users.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error('El usuario no existe');
        }
        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }
        return {
          id: `${user.id}`,
          email: user.email,
          fullName: user.fullName,
          password: user.password,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  debug: process.env.NODE_ENV === 'development',
};
