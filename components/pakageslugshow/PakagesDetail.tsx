"use client";

import React from "react";
import { Wifi, Calendar, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PackageCardsProps {
  initialPlans: any[];
}

export default function PackageCards({ initialPlans = [] }: PackageCardsProps) {
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const plans = initialPlans.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    dataAmount: item.data_amount || item.dataAmount,
    validity: item.validity,
    category: item.category,
    isPopular: item.is_popular !== undefined ? item.is_popular : item.isPopular,
    badge: item.badge,
  }));

  if (plans.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Filhal koi packages mojood nahi hain.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              plan.isPopular
                ? "border-green-600 ring-2 ring-green-600/20"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            {plan.badge && (
              <span
                className={`absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${
                  plan.isPopular
                    ? "bg-green-800 text-white"
                    : "bg-green-50 text-green-800 border border-green-200"
                }`}
              >
                {plan.badge}
              </span>
            )}

            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-800 mb-2">
                <Globe size={14} />
                <span>{plan.category}</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <p className="text-xs text-gray-500 mb-6 line-clamp-2">
                {plan.description}
              </p>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-extrabold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-xs text-gray-500 ml-1">/ package</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                  <div className="p-1.5 rounded-lg bg-green-50 text-green-800">
                    <Wifi size={16} />
                  </div>
                  <span>
                    Data: <strong>{plan.dataAmount}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                  <div className="p-1.5 rounded-lg bg-green-50 text-green-800">
                    <Calendar size={16} />
                  </div>
                  <span>
                    Validity: <strong>{plan.validity}</strong>
                  </span>
                </div>
              </div>
            </div>

            <Link href={`/packages/${createSlug(plan.title)}`}>
              <button className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm cursor-pointer active:scale-95">
                <span>Select Package</span>
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
