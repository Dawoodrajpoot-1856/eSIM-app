"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ShieldAlert, X, ArrowRight } from "lucide-react";

export default function AdminErrorNotifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (error === "admin_only" || error === "agent_only") {
      setIsOpen(true);
    }
  }, [error]);

  const handleClose = () => {
    setIsOpen(false);
    router.replace("/");
  };

  const handleGoLogin = () => {
    setIsOpen(false);
    router.push("/login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-green-100 text-center relative animate-in zoom-in-95 duration-300">
        {/* Cross Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Green Badge Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-950 via-green-900 to-green-800 text-white flex items-center justify-center shadow-lg shadow-green-900/25 mb-4 ring-4 ring-green-50">
          <ShieldAlert size={32} className="text-green-200" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
          {error === "agent_only"
            ? "Agent Access Required"
            : "Admin Access Required"}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Yeh page sirf authorized{" "}
          <span className="font-semibold text-green-900">
            {error === "agent_only" ? "Agents" : "Administrators"}
          </span>{" "}
          ke liye hai. Is panel ko kholne ke liye please authorized email se
          login karein.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-3 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            Return to Home
          </button>

          <button
            type="button"
            onClick={handleGoLogin}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-900 to-green-800 hover:from-green-950 hover:to-green-900 text-sm font-semibold text-white shadow-md hover:shadow-lg transition cursor-pointer inline-flex items-center justify-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
