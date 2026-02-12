import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Edge-compatible auth helper for middleware
 * Uses JWT tokens instead of database queries
 */
export async function getSession(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      return null;
    }

    return {
      user: {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
        role: token.role as string,
        onboardingComplete: token.onboardingComplete as boolean,
      },
    };
  } catch (error) {
    console.error('Error getting session in middleware:', error);
    return null;
  }
}
