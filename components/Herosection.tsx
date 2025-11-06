import Image from "next/image";
import Link from "next/link";
import { Leaf, Recycle, Sun, Cloud } from "lucide-react";

export default function Herosection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative grid md:grid-cols-2 gap-8 px-6 sm:px-10 lg:px-16 py-12 md:py-20 items-center bg-green-50 overflow-hidden"
    >
      {/* Left: copy */}
      <div className="z-10">
        <p className="inline-flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
          WasteWise Movement
        </p>

        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-800 leading-tight"
        >
          WasteWise Awareness Hub
        </h1>

        <p className="mt-4 text-gray-700 max-w-xl text-base sm:text-lg">
          A student-focused platform created under the WasteWise Project to
          promote waste reduction, recycling, and responsible waste management
          habits, developed in partnership with the Strathmore Environment &
          Sustainability Community (SESC).
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href="/get-involved"
            className="inline-flex items-center justify-center px-5 py-3 bg-green-700 text-white rounded-md font-semibold shadow-md hover:bg-green-800 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
            aria-label="Join the WasteWise Movement - Get involved"
          >
            Join the Movement
            <span className="sr-only"> — opens Get Involved page</span>
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center justify-center px-5 py-3 border border-green-700 text-green-700 rounded-md font-semibold bg-white hover:bg-green-50 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-green-100"
            aria-label="Learn more about the WasteWise Project"
          >
            About WasteWise
          </Link>
        </div>
      </div>

      {/* Right: image + decorative elements */}
      <div className="relative w-full flex justify-center items-center">
        {/* Decorative background blob (non-interactive) */}
        <div
          aria-hidden="true"
          className="absolute -inset-y-6 -left-6 w-[120%] h-[120%] bg-green-200 rounded-[60%] rotate-6 pointer-events-none"
        />

        {/* Hero image (optimized) */}
        <div className="relative w-full max-w-md sm:max-w-lg md:max-w-full">
          <Image
            src="/heroimage.png"
            alt="Students participating in WasteWise activities on campus"
            width={900}
            height={640}
            className="relative rounded-[28%] shadow-lg object-cover"
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 600px, 900px"
            priority
          />
        </div>

        {/* Decorative icons (aria-hidden, respect reduced motion) */}
        <Leaf
          aria-hidden="true"
          className="absolute -top-4 left-6 text-green-600 w-8 h-8 motion-safe:animate-bounce opacity-90"
        />
        <Recycle
          aria-hidden="true"
          className="absolute bottom-6 -left-8 text-green-700 w-10 h-10 motion-safe:animate-spin motion-safe:[animation-duration:3s] opacity-95"
        />
        <Sun
          aria-hidden="true"
          className="absolute -top-10 right-8 text-yellow-400 w-12 h-12 motion-safe:animate-pulse opacity-90"
        />
        <Cloud
          aria-hidden="true"
          className="absolute bottom-12 right-0 text-gray-400 w-14 h-14 opacity-60"
        />
      </div>
    </section>
  );
}
