import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section
      id="about"
      className="px-6 sm:px-10 lg:px-16 py-24 bg-gradient-to-b from-green-50 via-white to-white"
      role="region"
      aria-labelledby="about-heading"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          id="about-heading"
          className="text-4xl sm:text-5xl font-extrabold text-green-800 tracking-tight"
        >
          About Us
        </h2>

        <p className="mt-4 text-lg text-green-700 font-medium">
          Empowering sustainable action through community, education, and innovation.
        </p>

        <p className="mt-8 text-gray-700 leading-relaxed text-lg sm:text-xl max-w-3xl mx-auto">
          Strathmore Environment Sustainability Club’s (SESC) mission is to
          create a sustainable environment and act as change agents for a better
          future through eco-friendly initiatives and conservation measures.
          <br />
          <br />
          We focus on policies, events, education, and outreach related to
          sustainability, energy conservation, pollution reduction, global
          warming, green building, and ecological living inspiring action for
          the planet and our community.
        </p>

        <div className="mt-10">
          <Link
            href="/about"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-lg shadow hover:bg-green-800 transition"
          >
            Learn More About SESC
          </Link>
        </div>
      </div>
    </section>
  );
}
