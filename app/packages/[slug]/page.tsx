"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { supabase } from "@/lib/db";
import {
  Wifi,
  Calendar,
  Globe,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Zap,
  ShieldCheck,
  SignalHigh,
  CreditCard,
  AlertCircle,
} from "lucide-react";

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const slugParam = params?.slug as string;

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanDetail = async () => {
      if (!slugParam) return;

      setLoading(true);

      const { data, error } = await supabase.from("plans").select("*");

      if (error) {
        console.error("Error fetching plan:", error.message);
      } else if (data) {
        const foundPlan = data.find((p: any) => slugify(p.title) === slugParam);
        setPlan(foundPlan || null);
      }
      setLoading(false);
    };

    fetchPlanDetail();
  }, [slugParam]);

  const handleBuyNow = () => {
    if (!plan) return;
    dispatch(
      addToCart({
        id: plan.id || plan.title,
        title: plan.title,
        price: plan.price,
        dataAmount: plan.dataAmount,
        validity: plan.validity,
        category: plan.category,
      }),
    );
    router.push("/checkout");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 min-h-screen bg-gray-50/50">
        <Loader2 size={36} className="animate-spin text-green-800 mb-3" />
        <p className="text-sm text-gray-500 font-medium">
          Loading package details...
        </p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Package Not Found
        </h2>
        <p className="text-sm text-gray-500 mb-6 max-w-md">
          The eSIM package you are looking for does not exist or has been
          removed.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-green-800 hover:bg-green-900 px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-800 font-medium mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Packages</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200/85 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-800 border border-green-200/60 rounded-full text-xs font-bold">
                  <Globe size={13} />
                  {plan.category}
                </span>

                {plan.badge && (
                  <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-xs font-bold">
                    {plan.badge}
                  </span>
                )}

                {plan.isPopular && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-800 text-white rounded-full text-xs font-bold">
                    <Zap size={12} />
                    Popular Choice
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                {plan.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {plan.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3.5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-green-800/10 text-green-800 rounded-xl flex items-center justify-center shrink-0">
                    <Wifi size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">
                      Data Volume
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {plan.dataAmount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 bg-green-800/10 text-green-800 rounded-xl flex items-center justify-center shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">
                      Validity
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {plan.validity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                What's included with this eSIM
              </h2>
              <ul className="space-y-3.5">
                {[
                  "Instant digital delivery via QR code immediately after purchase",
                  "High-speed 4G / 5G LTE network coverage across destination",
                  "No physical SIM swap required - keep your home number active for calls/SMS",
                  "Prepaid plan with zero roaming charges or hidden fees",
                  "Compatible with all unlocked eSIM-enabled smartphones",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-green-800 shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm sticky top-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Order Summary
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  / total price
                </span>
              </div>

              <div className="space-y-3 py-4 border-t border-b border-gray-100 mb-6 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Package</span>
                  <span className="font-semibold text-gray-900">
                    {plan.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage</span>
                  <span className="font-semibold text-gray-900">
                    {plan.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-green-800">
                    FREE (Instant)
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-98 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <CreditCard size={18} />
                  <span>Buy Package Now</span>
                </button>
              </div>

              <div className="space-y-2 pt-5 border-t border-gray-100 mt-5">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={15} className="text-green-800" />
                  <span>Secure 256-bit encrypted payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <SignalHigh size={15} className="text-green-800" />
                  <span>Instant QR Code Email Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
