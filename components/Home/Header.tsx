"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";
import { PackagePlus, FilePlus2, LogOut } from "lucide-react";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const userRole = (session?.user as any)?.role || "customer";

  const hasAdminAccess =
    userRole === "admin" ||
    userRole === "agent" ||
    session?.user?.email === "dawoodraj1856@gmail.com" ||
    session?.user?.email === "agent@gmail.com";

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-100/90 backdrop-blur-md border-b border-gray-200/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            height={45}
            width={120}
            className="h-14 w-auto object-contain rounded-lg"
            src="/favicon.ico"
            alt="Website Logo"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="py-1 font-medium hover:text-green-800 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/packages"
            className="py-1 font-medium hover:text-green-800 transition-colors"
          >
            Packages
          </Link>

          <Link
            href="/blogs"
            className="py-1 font-medium hover:text-green-800 transition-colors"
          >
            Blogs
          </Link>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {hasAdminAccess && (
            <div className="hidden xl:flex items-center gap-2">
              <Link
                href="/admin/add-package"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-900 bg-green-50 hover:bg-green-100 border border-green-200 rounded-full transition-all"
              >
                <PackagePlus size={14} className="text-green-800" />
                <span>Add Packages</span>
              </Link>

              <Link
                href="/admin/add-blogs"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-900 bg-green-50 hover:bg-green-100 border border-green-200 rounded-full transition-all"
              >
                <FilePlus2 size={14} className="text-green-800" />
                <span>Add Blogs</span>
              </Link>
            </div>
          )}

          <CartDrawer />

          {status === "authenticated" && session?.user ? (
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <div className="w-6 h-6 rounded-full bg-green-800 text-white flex items-center justify-center text-xs font-bold">
                  {session.user.name
                    ? session.user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <span className="text-xs font-semibold text-green-900 max-w-[100px] truncate">
                  {session.user.name || "User"}
                </span>

                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-green-200/70 text-green-900">
                  {userRole}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  signOut({
                    callbackUrl: "https://esim-app-codiea.vercel.app/",
                  })
                }
                className="font-semibold text-white text-xs bg-green-700 hover:bg-green-900 px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-semibold text-green-800 border-2 border-green-800 px-4 py-1.5 rounded-full"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="text-sm font-semibold text-white bg-green-800 px-4 py-1.5 rounded-full"
              >
                Sign Up
              </Link>
            </div>
          )}

          <MobileMenu
            hasAdminAccess={hasAdminAccess}
            session={session}
            status={status}
            userRole={userRole}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
