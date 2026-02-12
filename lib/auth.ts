import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      // Fetch user data from database to populate the user object
      if (user.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              id: true,
              role: true,
              onboardingComplete: true,
            },
          });
          
          if (dbUser) {
            user.role = dbUser.role;
            user.onboardingComplete = dbUser.onboardingComplete;
          }
        } catch (error) {
          console.error('Error fetching user in signIn:', error);
        }
      }
      return true;
    },
  },
  events: {
    async createUser({ user }) {
      // Create user profile on first login
      if (user.id && user.email) {
        try {
          await prisma.userProfile.create({
            data: {
              userId: user.id,
            },
          });

          await prisma.subscription.create({
            data: {
              userId: user.id,
              tier: 'FREE',
              status: 'active',
            },
          });

          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: 'user_created',
              resource: 'user',
              resourceId: user.id,
            },
          });
        } catch (error) {
          console.error('Error in createUser event:', error);
        }
      }
    },
  },
});
