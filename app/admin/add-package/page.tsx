"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/db";
import { PlusCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function AddPlanAdmin() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    dataAmount: "",
    validity: "",
    category: "North America",
    badge: "",
    isPopular: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.from("plans").insert([
      {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        dataAmount: formData.dataAmount,
        validity: formData.validity,
        category: formData.category,
        badge: formData.badge || null,
        isPopular: formData.isPopular,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Insert Error:", error.message);
      setStatus({
        type: "error",
        message: `Failed to add plan: ${error.message}`,
      });
    } else {
      setStatus({
        type: "success",
        message: "Plan successfully added to Supabase!",
      });
      setFormData({
        title: "",
        description: "",
        price: "",
        dataAmount: "",
        validity: "",
        category: "North America",
        badge: "",
        isPopular: false,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <PlusCircle className="text-green-800" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Package
            </h1>
            <p className="text-xs text-gray-500">
              Insert new eSIM packages directly into Supabase database.
            </p>
          </div>
        </div>

        {status && (
          <div
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium ${
              status.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Package Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. USA Starter Plan"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Middle East">Middle East</option>
                <option value="Worldwide">Worldwide</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 19.99"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Data Amount *
              </label>
              <input
                type="text"
                name="dataAmount"
                required
                value={formData.dataAmount}
                onChange={handleChange}
                placeholder="e.g. 10 GB or Unlimited"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Validity *
              </label>
              <input
                type="text"
                name="validity"
                required
                value={formData.validity}
                onChange={handleChange}
                placeholder="e.g. 15 Days"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Badge (Optional)
              </label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="e.g. Best Seller / Special Offer"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Package coverage details..."
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-800/20 focus:border-green-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPopular"
              name="isPopular"
              checked={formData.isPopular}
              onChange={handleChange}
              className="w-4 h-4 text-green-800 accent-green-800 rounded focus:ring-green-800"
            />
            <label
              htmlFor="isPopular"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              Mark as Popular / Featured Package
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Adding Package...</span>
              </>
            ) : (
              <span>Publish Package</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
