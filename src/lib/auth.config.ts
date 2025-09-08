// import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
// import { PrismaAdapter } from '@auth/prisma-adapter';
// import prisma from '@/lib/db';

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GitHub,
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.AUTH_SECRET,
//   callbacks: {
//     async session({ session }) {
//       return session;
//     },
//     async authorized({ auth }) {
//       return !!auth;
//     },
//   },
//   // pages: {
//   //   signIn: '/login',
//   // },
// });

import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
