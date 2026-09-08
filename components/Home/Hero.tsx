import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm font-semibold shadow-xs">
              <Zap size={15} className="fill-green-800" />
              <span>Instant 5G/4G Global Data</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Stay Connected with <br />
              <span className="text-green-800">Worldwide Instant</span> <br />
              Travel eSIMs
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Say goodbye to expensive roaming charges and swapping physical SIM
              cards. Get instant, high-speed data across 150+ countries in
              minutes. Simply scan, install, and travel connected.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white bg-green-800 hover:bg-green-900 px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer group"
              >
                <span>Get your eSIM now</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-4 border-t border-gray-200 w-full text-xs sm:text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-800" />
                <span>150+ Countries</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-800" />
                <span>Instant QR Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-green-800" />
                <span>Keep WhatsApp Number</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <Image
                src="/Hero.jpg"
                alt="Travel eSIM Connectivity"
                width={600}
                height={500}
                priority
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
