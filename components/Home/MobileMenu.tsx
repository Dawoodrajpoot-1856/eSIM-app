"use client";

import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { PackagePlus, FilePlus2, Menu, LogOut } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileMenuProps {
  hasAdminAccess: boolean;
  session: any;
  status: string;
  userRole: string;
}

export default function MobileMenu({
  hasAdminAccess,
  session,
  status,
  userRole,
}: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          className="p-2 rounded-lg text-gray-700 hover:bg-green-50"
          aria-label="Open Menu"
        >
          <Menu size={26} />
        </SheetTrigger>

        <SheetContent side="right" className="p-6">
          <SheetHeader className="text-left border-b pb-4">
            <SheetTitle className="text-xl font-bold text-green-800">
              Menu
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-6 text-base font-medium">
            <SheetClose className="text-left">
              <Link href="/">Home</Link>
            </SheetClose>
            <SheetClose className="text-left">
              <Link href="/packages">Packages</Link>
            </SheetClose>
            <SheetClose className="text-left">
              <Link href="/blogs">Blogs</Link>
            </SheetClose>

            {hasAdminAccess && (
              <>
                <hr className="my-2 border-gray-200" />
                <SheetClose className="text-left">
                  <Link
                    href="/admin/add-package"
                    className="flex items-center gap-2 text-sm text-green-800 bg-green-50 p-2.5 rounded-lg font-semibold"
                  >
                    <PackagePlus size={16} />
                    <span>Add Packages</span>
                  </Link>
                </SheetClose>
                <SheetClose className="text-left">
                  <Link
                    href="/admin/add-blogs"
                    className="flex items-center gap-2 text-sm text-green-800 bg-green-50 p-2.5 rounded-lg font-semibold"
                  >
                    <FilePlus2 size={16} />
                    <span>Add Blogs</span>
                  </Link>
                </SheetClose>
              </>
            )}

            <hr className="my-2 border-gray-200" />

            {status === "authenticated" && session?.user ? (
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center font-bold">
                    {session.user.name
                      ? session.user.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-900">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <SheetClose
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center justify-center gap-2  font-semibold text-white text-xs  bg-green-700 hover:bg-green-900  py-2.5 rounded-full cursor-pointer transition-all"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </SheetClose>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <SheetClose className="w-full">
                  <Link
                    href="/login"
                    className="block w-full text-center border-2 border-green-800 text-green-800 py-2 rounded-full font-semibold text-sm"
                  >
                    Login
                  </Link>
                </SheetClose>
                <SheetClose className="w-full">
                  <Link
                    href="/signup"
                    className="block w-full text-center bg-green-800 text-white py-2 rounded-full font-semibold text-sm"
                  >
                    Sign Up
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
