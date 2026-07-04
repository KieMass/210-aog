import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function proxy() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow /admin/login for everyone
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }

        // All other /admin/* routes require authentication
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return !!token;
        }

        // Public routes don't require authentication
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
