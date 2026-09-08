import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function Proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role;
    const email = token?.email;

    const ADMIN_EMAIL = "dawoodraj1856@gmail.com";
    const AGENT_EMAIL = "agent@gmail.com";

    // Admin routes
    if (pathname.startsWith("/admin")) {
      const hasAccess =
        role === "admin" ||
        role === "agent" ||
        email === ADMIN_EMAIL ||
        email === AGENT_EMAIL;

      if (!hasAccess) {
        const url = new URL("/", req.url);
        url.searchParams.set("error", "admin_only");

        return NextResponse.redirect(url);
      }
    }

    // Agent routes
    if (pathname.startsWith("/agent")) {
      const hasAccess =
        role === "agent" ||
        role === "admin" ||
        email === AGENT_EMAIL ||
        email === ADMIN_EMAIL;

      if (!hasAccess) {
        const url = new URL("/", req.url);
        url.searchParams.set("error", "agent_only");

        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },

    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/checkout"],
};
