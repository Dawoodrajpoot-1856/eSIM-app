"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice"; // Agar aapke slice mein clearCart hai

export default function SuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof clearCart === "function") {
      dispatch(clearCart());
    }
  }, [dispatch]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={40} />
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Aapka eSIM package successfully activate ho chuka hai. Humne details
          aapki email par bhej di hain.
        </p>

        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm"
        >
          <span>Back to Home</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
