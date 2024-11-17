import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdmin = req.cookies.get('isAdmin')?.value; 

  if (isAdmin !== 'true' && req.nextUrl.pathname.startsWith('/admin')) {
    const loginUrl = new URL('/login', req.url); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], 
};
