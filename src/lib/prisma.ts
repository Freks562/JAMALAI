if (!process.env.DATABASE_URL) { console.error('DATABASE_URL missing at runtime'); } import { PrismaClient } from '@prisma/client';
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
const branch = body.branch ? (String(body.branch) as Prisma.$Enums.Branch) : undefined;