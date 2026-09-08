"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "eSIM kya hai aur yeh kaise kaam karti hai?",
    answer:
      "eSIM ek digital SIM hai jo aapke mobile ke andar pehle se maujood chip par install hoti hai. Iske liye physical plastic SIM ki zaroorat nahi parti, sirf QR code scan karke internet package activate ho jata hai.",
  },
  {
    id: 2,
    question: "Mujhe travel eSIM kab install karni chahiye?",
    answer:
      "Aap flight se pehle apne ghar ke Wi-Fi par QR code scan karke eSIM install kar lein. Destination par land hone ke baad sirf Data Roaming ON karein.",
  },
  {
    id: 3,
    question: "Kya eSIM use karte waqt mera WhatsApp chalega?",
    answer:
      "Haan, bilkul! eSIM sirf mobile data ke liye use hoti hai. Aapka original WhatsApp number, contacts aur chats bilkul pehle ki tarah chalte rahenge.",
  },
  {
    id: 4,
    question: "Mera phone eSIM support karta hai ya nahi kaise pata chalega?",
    answer:
      "iPhone XS ya uske baad ke models, Samsung S20 se S24 series, aur Pixel 3 ke baad ke devices support karte hain. Phone dialer mein *#06# milayein, agar EID number show ho toh aapka phone supported hai.",
  },
  {
    id: 5,
    question: "eSIM ko activate karne ka kya tareeqa hai?",
    answer:
      "Purchase ke baad aapko email par QR Code milega. Phone Settings > Mobile Data > Add eSIM par ja kar QR scan karein aur data roaming on karein.",
  },
  {
    id: 6,
    question: "Kya data khatam hone par top-up kar sakte hain?",
    answer:
      "Ji haan, aap website par ja kar usi eSIM par naya data package top-up kar sakte hain. Naya QR code install karne ki zaroorat nahi hoti.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-800 bg-green-50 border border-green-200 rounded-full">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked <span className="text-green-800">Questions</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Travel eSIM ke baare mein aksar pooche jane wale sawalaat.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-green-800/40 bg-green-50/20 shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <span
                    className={`p-1.5 rounded-full bg-gray-100 text-gray-600 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 bg-green-800 text-white" : ""
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5 px-5"
                      : "grid-rows-[0fr] opacity-0 p-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
