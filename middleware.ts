import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth-middleware';

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
  
  // Allow API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // Get session using edge-compatible method
  const session = await getSession(request);
  const isAuthenticated = !!session?.user;
  const onboardingComplete = session?.user?.onboardingComplete ?? false;
  
  // ============================================
  // AUTHENTICATED USER ROUTING
  // ============================================
  if (isAuthenticated) {
    // 1. If user is on /auth page, redirect based on onboarding status
    if (pathname === '/auth') {
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
      
      if (!onboardingComplete) {
        const url = new URL('/onboarding', request.url);
        if (callbackUrl) {
          url.searchParams.set('callbackUrl', callbackUrl);
        }
        return NextResponse.redirect(url);
      }
      
      // If onboarding complete, redirect to callbackUrl or dashboard
      return NextResponse.redirect(new URL(callbackUrl || '/dashboard', request.url));
    }
    
    // 2. If user is on /onboarding and already completed, redirect to dashboard or callbackUrl
    if (pathname === '/onboarding' && onboardingComplete) {
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
      return NextResponse.redirect(new URL(callbackUrl || '/dashboard', request.url));
    }
    
    // 3. If onboarding not complete and trying to access protected routes, redirect to onboarding
    if (!onboardingComplete && pathname !== '/onboarding') {
      if (onboardingRequiredRoutes.some(route => pathname.startsWith(route))) {
        const url = new URL('/onboarding', request.url);
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
      }
    }
    
    // 4. Check admin routes - redirect non-admins to dashboard
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (session?.user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
    
    // Allow authenticated user to proceed
    return NextResponse.next();
  }
  
  // ============================================
  // NON-AUTHENTICATED USER ROUTING
  // ============================================
  
  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route)) ||
                       adminRoutes.some(route => pathname.startsWith(route)) ||
                       pathname === '/onboarding';
  
  if (requiresAuth) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
