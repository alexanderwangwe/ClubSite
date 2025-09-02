import { Leaf, Recycle, Sun, Cloud } from "lucide-react";

export default function Herosection() {
  return (
    <section className="relative grid md:grid-cols-2 gap-8 px-12 py-16 items-center bg-green-50 overflow-hidden">
      {/* Left */}
      <div>
        <h1 className="text-5xl font-bold text-green-800 leading-tight">
          Strathmore Environment and <br /> Sustainability Club
        </h1>

        <div className="flex justify-start mb-4 mt-4">
          <span className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium">
            Sustainability in Action
          </span>
        </div>

        <a
          href="/about"
          className="mt-6 inline-block px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-900 transition shadow-md"
        >
          Learn More
        </a>
      </div>

      {/* Right */}
      <div className="relative">
        {/* Background blob */}
        <div className="absolute -top-6 -left-6 w-full h-full bg-green-200 rounded-[60%] rotate-6"></div>

        {/* Hero Image */}
        <img
          src="/heroimage.png"
          alt="Volunteers"
          width={500}
          height={400}
          className="relative rounded-[40%] shadow-lg"
        />

        {/* Decorative SVGs */}
        <Leaf className="absolute -top-6 left-6 text-green-600 w-8 h-8 animate-bounce" />
        <Recycle className="absolute bottom-6 -left-10 text-green-700 w-10 h-10 animate-spin" />
        <Sun className="absolute -top-12 right-8 text-yellow-400 w-12 h-12 animate-pulse" />
        <Cloud className="absolute bottom-12 right-0 text-gray-400 w-14 h-14 opacity-60" />
      </div>
    </section>
  );
}
