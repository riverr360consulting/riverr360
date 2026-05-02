import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin_auth');
    const isLoginPage = pathname === '/admin/login';

    if (!authCookie || authCookie.value !== 'authenticated') {
      if (!isLoginPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
