import authConfig from '@/lib/auth.config';
import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/', '/login'];

// export default auth((req) => {
//   const { pathname, origin } = req.nextUrl;
//   if (!req.auth && !publicRoutes.includes(pathname)) {
//     return Response.redirect(new URL('/', origin));
//   }

//   if (req.auth && publicRoutes.includes(pathname)) {
//     return Response.redirect(new URL('/dashboard', origin));
//   }
// });

// export default auth((req) => {
//   const { pathname, origin } = req.nextUrl;

//   // If not authenticated and trying to access a protected route → redirect to login
//   if (!req.auth && !publicRoutes.includes(pathname)) {
//     return Response.redirect(new URL('/login', origin));
//   }

//   // If authenticated and trying to access a public route → redirect to dashboard
//   if (req.auth && publicRoutes.includes(pathname)) {
//     return Response.redirect(new URL('/dashboard', origin));
//   }
// });

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: NextRequest & { auth: any }
) {
  // Your custom middleware logic goes here
  const { pathname, origin } = req.nextUrl;

  // If not authenticated and trying to access a protected route → redirect to login

  if (!req?.auth && !publicRoutes.includes(pathname)) {
    return Response.redirect(new URL('/login', origin));
  }

  // If authenticated and trying to access a public route → redirect to dashboard

  if (req?.auth && publicRoutes.includes(pathname)) {
    return Response.redirect(new URL('/dashboard', origin));
  }

  return NextResponse.next();
});

// Optionally, don't invoke Middleware on some paths

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
};
