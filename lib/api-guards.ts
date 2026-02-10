import { NextResponse } from 'next/server';
import { auth } from './auth';
import type { Session } from 'next-auth';

export async function withAuth(
  handler: (session: Session) => Promise<Response>
) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }
  
  return handler(session);
}

export async function withAdmin(
  handler: (session: Session) => Promise<Response>
) {
  const session = await auth();
  
  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication required' },
      { status: 401 }
    );
  }
  
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }
  
  return handler(session);
}

export function apiError(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}
