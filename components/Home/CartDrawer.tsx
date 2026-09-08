"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders fully on the client to prevent hydration mismatch with localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger
        className="relative p-2 rounded-full text-gray-700 hover:text-green-800 hover:bg-green-50 transition-all duration-200 cursor-pointer flex items-center justify-center"
        title="Shopping Cart"
        aria-label="Open Cart"
      >
        <ShoppingCart size={22} />
        {isMounted && totalItemsCount > 0 && (
          <span className="absolute top-0.5 right-0.5 bg-green-800 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
            {totalItemsCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="p-6 flex flex-col justify-between w-full max-w-md"
      >
        <div>
          <SheetHeader className="text-left border-b pb-4">
            <SheetTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
              <ShoppingCart size={20} /> Your Cart (
              {isMounted ? totalItemsCount : 0})
            </SheetTitle>
            <SheetDescription>
              Review your items before checkout
            </SheetDescription>
          </SheetHeader>

          <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {!isMounted ? (
              <div className="py-16 text-center text-gray-500 text-sm">
                Loading cart...
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center text-gray-500 text-sm">
                Your cart is currently empty.
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {item.dataAmount} • {item.validity}
                    </p>
                    <p className="text-xs font-extrabold text-green-800 mt-1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
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
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800">
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
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4 text-base font-semibold text-gray-800">
            <span>Subtotal:</span>
            <span className="text-xl font-extrabold text-green-800">
              ${isMounted ? subtotal.toFixed(2) : "0.00"}
            </span>
          </div>

          <SheetClose className="w-full">
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className={`w-full bg-green-800 hover:bg-green-900 text-white py-3 rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer ${
                !isMounted || cartItems.length === 0
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
