"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { Trash2, Plus, Minus, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your Cart is Empty
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Add an eSIM package before proceeding to checkout.
        </p>
        <Link
          href="/"
          className="bg-green-800 hover:bg-green-900 text-white font-bold px-6 py-2.5 rounded-xl transition-all"
        >
          Browse Packages
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Selected eSIM Packages
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-wrap items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        {item.category} • {item.dataAmount} • {item.validity}
                      </p>
                      <p className="text-sm font-extrabold text-green-800 mt-1">
                        ${item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                          className="p-1.5 hover:bg-gray-50 text-gray-600 cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="p-1.5 hover:bg-gray-50 text-gray-600 cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm sticky top-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Payment Summary
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Activation Fee</span>
                  <span className="font-semibold text-green-800">FREE</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">
                  Total Price
                </span>
                <span className="text-2xl font-extrabold text-green-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer mt-4">
                <CreditCard size={18} />
                <span>Pay Now</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-500 justify-center pt-2">
                <ShieldCheck size={16} className="text-green-800" />
                <span>Encrypted & Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
