import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { authConfig } from './auth.config';

// Create a dedicated Prisma client for auth
const prismaForAuth = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prismaForAuth),
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user }) {
      // Fetch user data from database to populate the user object
      if (user.id) {
        try {
          const dbUser = await prismaForAuth.user.findUnique({
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
          await prismaForAuth.user_profiles.create({
            data: {
              userId: user.id,
            },
          });

          await prismaForAuth.subscriptions.create({
            data: {
              userId: user.id,
              tier: 'FREE',
              status: 'active',
            },
          });

          await prismaForAuth.audit_logs.create({
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
