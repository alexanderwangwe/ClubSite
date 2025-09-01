import Link from "next/link";
import Image from "next/image";

export default function AboutPreview() {
  return (
    <section id="about" className="px-12 py-20 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-800">About Us</h2>
        <p className="mt-6 text-gray-600 leading-relaxed">
          Strathmore Environment Sustainability Club’s (SESC) main goal is to
          create a sustainable environment as change agents for a better future
          through use of eco-friendly means and conservation measures. This is
          through functioning as a common interest group, involved in policies,
          events, education and outreach in areas related to environmental
          issues, including, but not limited to sustainability, energy
          conservation, pollution, global warming, recycling, green building,
          ecology and organic living.
        </p>
      </div>
    </section>
  );
}
