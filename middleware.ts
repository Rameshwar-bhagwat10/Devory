import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

// Public routes that don't require authentication
const publicRoutes = ['/', '/auth', '/projects', '/community'];

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/saved', '/community/new'];

// Routes that require admin role
const adminRoutes = ['/admin'];

// Routes that require onboarding completion
const onboardingRequiredRoutes = ['/dashboard', '/profile', '/saved', '/community/new'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // Get session
  const session = await auth();
  const isAuthenticated = !!session?.user;
  
  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route)) ||
                       adminRoutes.some(route => pathname.startsWith(route));
  
  if (requiresAuth && !isAuthenticated) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  // Check admin routes
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (session?.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Check onboarding completion
  if (isAuthenticated && pathname !== '/onboarding') {
    if (onboardingRequiredRoutes.some(route => pathname.startsWith(route))) {
      if (!session?.user?.onboardingComplete) {
        return NextResponse.redirect(new URL('/onboarding', request.url));
      }
    }
  }
  
  // Redirect authenticated users away from auth page
  if (pathname === '/auth' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
