import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Home/Header";
import Footer from "@/components/Home/Footer";
import StoreProvider from "@/store/storeProvider";
import { Providers } from "@/components/providers/NextProvider";
import { TopProgressBar } from "@/components/Progressbar";

import { Suspense } from "react";
import AdminErrorNotifier from "@/components/form/AdminErrorNotifier";
import TanstackProviders from "@/components/providers/TanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eSIM Travel | Instant Worldwide 5G/4G Data",
  description:
    "Stay connected across 150+ countries with instant prepaid travel eSIMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Providers>
          <TanstackProviders>
            <StoreProvider>
              <Suspense fallback={null}>
                <AdminErrorNotifier />
              </Suspense>

              <TopProgressBar />
              <Header />

              <main className="flex-1">{children}</main>
              <Footer />
            </StoreProvider>
          </TanstackProviders>
        </Providers>
      </body>
    </html>
  );
}
