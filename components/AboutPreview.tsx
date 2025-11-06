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
          About WasteWise
        </h2>

        <p className="mt-4 text-lg text-green-700 font-medium">
          Driving a culture of responsible waste management through awareness, education, and community action.
        </p>

        <p className="mt-8 text-gray-700 leading-relaxed text-lg sm:text-xl max-w-3xl mx-auto">
          WasteWise is a movement dedicated to addressing the growing challenge of waste management by promoting
          sustainable habits, responsible disposal, and environmental awareness within Strathmore University and beyond.
          <br />
          <br />
          This platform was developed under the WasteWise Project to create awareness, share knowledge, highlight
          impactful initiatives, and inspire students and communities to take action towards a cleaner, zero-waste
          future. The Strathmore Environment Sustainability Club (SESC) partners with WasteWise to ensure continuity,
          student engagement, and long-term impact through campus-driven initiatives and environmental leadership.
        </p>

        <div className="mt-10">
          <Link
            href="/about"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-lg shadow hover:bg-green-800 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
