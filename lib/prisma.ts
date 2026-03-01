import { PrismaClient } from '@prisma/client';

// Prisma client with community models support
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// During build time, DATABASE_URL might not be available
// We create a dummy client that won't actually connect
const createPrismaClient = () => {
  // If no DATABASE_URL during build, return a mock client
  if (!process.env.DATABASE_URL && process.env.NODE_ENV !== 'production') {
    console.warn('DATABASE_URL not found - using mock Prisma client for build');
    return new PrismaClient({
      log: ['error'],
    });
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
