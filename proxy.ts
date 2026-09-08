import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function Proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role;

    const ADMIN_EMAIL = "dawoodraj1856@gmail.com";
    const AGENT_EMAIL = "agent@gmail.com";

    if (pathname.startsWith("/admin")) {
      const hasAccess =
        role === "admin" ||
        role === "agent" ||
        token?.email === ADMIN_EMAIL ||
        token?.email === AGENT_EMAIL;

      if (!hasAccess) {
        const url = new URL("/", req.url);
        url.searchParams.set("error", "admin_only");
        return NextResponse.redirect(url);
      }
    }
    if (pathname.startsWith("/agent")) {
      const hasAccess =
        role === "agent" ||
        role === "admin" ||
        token?.email === AGENT_EMAIL ||
        token?.email === ADMIN_EMAIL;

      if (!hasAccess) {
        const url = new URL("/", req.url);
        url.searchParams.set("error", "agent_only");
        return NextResponse.redirect(url);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  },
);

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/checkout"],
};
