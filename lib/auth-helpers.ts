import { auth, signOut } from './auth';
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';

export async function requireAuth(): Promise<Session> {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect('/auth');
  }
  
  return session;
}

export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth();
  
  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }
  
  return session;
}

export async function requireOnboarding(): Promise<Session> {
  const session = await requireAuth();
  
  if (!session.user.onboardingComplete) {
    redirect('/onboarding');
  }
  
  return session;
}

export async function getSession() {
  return await auth();
}

export function isAdmin(session: Session | null) {
  return session?.user?.role === 'ADMIN';
}

export function hasCompletedOnboarding(session: Session | null) {
  return session?.user?.onboardingComplete === true;
}

export async function logout() {
  'use server';
  await signOut({ redirectTo: '/' });
}
