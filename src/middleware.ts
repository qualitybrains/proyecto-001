import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });
  console.log(session);
  const { pathname } = req.nextUrl;

  if (session && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!session && pathname !== '/login' && pathname !== '/signup') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
