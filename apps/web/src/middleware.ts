import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Retrieve the session/token (Example uses a cookie named 'session')
  const session = request.cookies.get('session-token');

  // 2. Define protected route patterns
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAdminRoute = pathname.startsWith('/admin');

  // 3. Redirection Logic (The "Rescue" from the Black Hole)
  if (!session && (isDashboardRoute || isAdminRoute)) {
    // Instead of a blind redirect, send them to login with a return-to URL
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Role-Based Check (Conceptual - requires decoding the JWT/Session)
  // if (isAdminRoute && userRole !== 'admin') {
  //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  // }

  return NextResponse.next();
}

// Ensure the middleware only runs on these specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/settings/:path*'],
};
