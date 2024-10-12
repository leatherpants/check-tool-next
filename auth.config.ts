import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogInPage = nextUrl.pathname.startsWith('/login');
      if (isOnLogInPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/checks', nextUrl.origin));
        }
        return false;
      } else {
        if (isLoggedIn) return true;
        return false;
      }
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;