import { Users, ArrowRight } from "lucide-react";

export default function CallToActionStrip() {
  return (
    <section
      id="volunteer"
      className="px-6 py-16 bg-white rounded-xl shadow-lg border text-center"
    >
      <div className="max-w-xl mx-auto">
        <Users className="mx-auto h-12 w-12 mb-4 text-green-700" />
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
          Be Part of the Change
        </h2>
        <p className="mt-2 mb-8 text-base md:text-lg text-gray-700">
          Volunteer with us<br></br>Together we can
          make a lasting difference.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a
            href="/get-involved"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white rounded-md font-semibold hover:bg-green-800 transition shadow"
          >
            Volunteer Now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center px-6 py-3 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-50 transition shadow"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
