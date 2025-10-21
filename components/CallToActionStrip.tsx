import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function CallToActionStrip() {
  return (
    <section
      id="volunteer"
      role="region"
      aria-labelledby="cta-heading"
      className="relative px-6 py-16 bg-white rounded-xl shadow-lg border text-center overflow-hidden"
    >
      {/* Decorative accent */}
      <svg
        aria-hidden="true"
        className="absolute -top-10 -right-10 opacity-10 w-72 h-72 text-green-700"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="50" cy="50" r="50" fill="currentColor" />
      </svg>

      <div className="max-w-xl mx-auto relative z-10">
        <Users className="mx-auto h-12 w-12 mb-4 text-green-700" aria-hidden />

        <h2
          id="cta-heading"
          className="text-3xl md:text-4xl font-bold text-green-800 mb-2"
        >
          Be Part of the Change
        </h2>

        <p className="mt-2 mb-8 text-base md:text-lg text-gray-700">
          Join  the movement for a greener future. 
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            href="/get-involved"
            aria-label="Volunteer now - Get involved"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-green-200"
          >
            Join the Team
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Link>

          <Link
            href="/about"
            aria-label="Learn more about the club"
            className="inline-flex items-center justify-center px-6 py-3 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-50 transition shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-green-100"
          >
            Learn More
          </Link>
        </div>

        {/* <p className="mt-6 text-sm text-gray-500">
          New volunteers welcome — training and support provided.
        </p> */}
      </div>
    </section>
  );
}
