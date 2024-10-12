import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, ip } }) {
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
      // const isOnDashboard = nextUrl.pathname.startsWith('/login');
      // if (isOnDashboard) {
      //   if (isLoggedIn) {
      //     return true;
      //   }
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/login', nextUrl));
      // }
      // return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;