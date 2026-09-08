import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-200">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                height={40}
                width={120}
                className="h-10 w-auto object-contain rounded-lg"
                src="/logo.jpg"
                alt="Logo"
              />
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Instant prepaid travel eSIMs for 150+ countries. Stay connected
              with ultra-fast 4G/5G data anywhere in the world without roaming
              fees.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-green-800 hover:text-white hover:border-green-800 flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-green-800 hover:text-white hover:border-green-800 flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
                title="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-green-800 hover:text-white hover:border-green-800 flex items-center justify-center transition-all duration-200 shadow-xs cursor-pointer"
                title="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Popular eSIMs
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/packages/usa"
                  className="hover:text-green-800 transition"
                >
                  United States eSIM
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/europe"
                  className="hover:text-green-800 transition"
                >
                  Europe Regional eSIM
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/turkey"
                  className="hover:text-green-800 transition"
                >
                  Turkey eSIM
                </Link>
              </li>
              <li>
                <Link
                  href="/packages/uae"
                  className="hover:text-green-800 transition"
                >
                  Dubai (UAE) eSIM
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/packages"
                  className="hover:text-green-800 transition"
                >
                  All Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-green-800 transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/compatibility"
                  className="hover:text-green-800 transition"
                >
                  Device Compatibility
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-green-800 transition">
                  Travel Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Need Help?
            </p>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-800 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@esimtravel.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-800 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>24/7 WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-800 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Money Back Guarantee</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} eSIM Travel. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-green-800 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-800 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
