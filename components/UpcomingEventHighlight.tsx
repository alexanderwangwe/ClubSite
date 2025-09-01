import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function UpcomingEventHighlight() {
  return (
    <section id="events" className="px-12 py-20 bg-green-50">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-green-800 text-center">
      Upcoming Events
    </h2>

    <div className="grid md:grid-cols-3 gap-8 mt-10">
      {/* Event Card */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-green-700">
          Community Clean-Up Day
        </h3>
        <p className="mt-2 text-gray-600">
          Join us in Siwaka for a full-day cleanup activity.
        </p>
        <p className="mt-4 text-sm text-gray-500">📅 October 12, 2025</p>
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900">
          Sign Up
        </button>
      </div>

      {/* Another Event Card */}
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold text-green-700">
          Recycling Workshop
        </h3>
        <p className="mt-2 text-gray-600">
          Learn how to sort, recycle, and reuse waste effectively.
        </p>
        <p className="mt-4 text-sm text-gray-500">📅 November 3, 2025</p>
        <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-900">
          Register
        </button>
      </div>
    </div>
  </div>
</section>
  );
}
