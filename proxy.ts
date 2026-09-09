import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;
  const role = token?.role;

  const ADMIN_EMAIL = "dawoodraj1856@gmail.com";
  const AGENT_EMAIL = "agent@gmail.com";

  // 1. Agar user logged in hi nahi hai aur protected page pe aaya hai
  if (!token) {
    const loginUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Admin routes check
  if (pathname.startsWith("/admin")) {
    const hasAccess =
      role === "admin" ||
      role === "agent" ||
      token?.email === ADMIN_EMAIL ||
      token?.email === AGENT_EMAIL;

    if (!hasAccess) {
      const url = new URL("/", req.nextUrl.origin);
      url.searchParams.set("error", "admin_only");
      return NextResponse.redirect(url);
    }
  }

  // 3. Agent routes check
  if (pathname.startsWith("/agent")) {
    const hasAccess =
      role === "agent" ||
      role === "admin" ||
      token?.email === AGENT_EMAIL ||
      token?.email === ADMIN_EMAIL;

    if (!hasAccess) {
      const url = new URL("/", req.nextUrl.origin);
      url.searchParams.set("error", "agent_only");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/checkout"],
};
