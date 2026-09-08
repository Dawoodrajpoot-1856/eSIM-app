"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  X,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="bg-gradient-to-r from-green-950 via-green-900 to-green-800 p-6 text-white shadow-md relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                  <ShoppingBag className="text-white" size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg tracking-tight">
                      Your Cart
                    </h3>
                    <span className="bg-white/20 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full border border-white/10">
                      {totalItemsCount}
                    </span>
                  </div>
                  <p className="text-xs text-green-200 mt-0.5">
                    Review your eSIM packages
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-3.5 bg-gray-50/50">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-800 mb-3">
                  <ShoppingBag size={28} />
                </div>
                <h4 className="font-bold text-gray-900 text-base">
                  Your cart is empty
                </h4>
                <p className="text-xs text-gray-500 max-w-[220px] mt-1">
                  Explore our travel packages and stay connected worldwide.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] font-medium text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">
                        {item.dataAmount}
                      </span>
                      <span>•</span>
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md text-gray-700">
                        {item.validity}
                      </span>
                    </div>
                    <p className="text-sm font-black text-green-800 mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="flex items-center border border-gray-200 bg-gray-50 rounded-xl p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            }),
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-gray-100 shadow-2xs cursor-pointer transition active:scale-95"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            }),
                          )
                        }
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:bg-gray-100 shadow-2xs cursor-pointer transition active:scale-95"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-6 space-y-4 shadow-lg">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs text-gray-500 font-medium">
                <span>Estimated Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-gray-900">
                <span>Subtotal</span>
                <span className="text-2xl font-black text-green-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-900 via-green-800 to-green-700 hover:from-green-950 hover:to-green-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer group active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-medium pt-1">
              <ShieldCheck size={14} className="text-green-700" />
              <span>Instant Digital Delivery • 100% Secure Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
