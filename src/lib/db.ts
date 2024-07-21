import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = db;

export { db };
