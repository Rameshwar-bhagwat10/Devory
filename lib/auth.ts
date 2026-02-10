import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  events: {
    async createUser({ user }) {
      // Create user profile on first login
      if (user.id && user.email) {
        await prisma.userProfile.create({
          data: {
            userId: user.id,
          },
        });

        // Create default subscription
        await prisma.subscription.create({
          data: {
            userId: user.id,
            tier: 'FREE',
            status: 'active',
          },
        });

        // Log user creation
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: 'user_created',
            resource: 'user',
            resourceId: user.id,
          },
        });
      }
    },
  },
});
