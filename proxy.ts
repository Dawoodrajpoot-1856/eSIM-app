import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function Proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    const role = token?.role;

    const ADMIN_EMAIL = "dawoodraj1856@gmail.com";
    const AGENT_EMAIL = "agent@gmail.com";

    // req.nextUrl.origin use karne se yeh hamesha live domain (Vercel URL) uthayega, localhost nahi
    const baseUrl = req.nextUrl.origin;

    if (pathname.startsWith("/admin")) {
      const hasAccess =
        role === "admin" ||
        role === "agent" ||
        token?.email === ADMIN_EMAIL ||
        token?.email === AGENT_EMAIL;

      if (!hasAccess) {
        return NextResponse.redirect(`${baseUrl}/?error=admin_only`);
      }
    }

    if (pathname.startsWith("/agent")) {
      const hasAccess =
        role === "agent" ||
        role === "admin" ||
        token?.email === AGENT_EMAIL ||
        token?.email === ADMIN_EMAIL;

      if (!hasAccess) {
        return NextResponse.redirect(`${baseUrl}/?error=agent_only`);
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    // Yahan se pages.signIn hata diya gaya hai taaki hardcoded/local routing na ho
  },
);

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/checkout"],
};
