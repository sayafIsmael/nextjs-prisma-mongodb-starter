import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { userRoles } from "./prisma/enum";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token);
    // return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === userRoles.ADMIN,
    },
    pages: {
      signIn: '/auth',
      error: '/error',
    }
  }
);

export const config = { matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"] };
