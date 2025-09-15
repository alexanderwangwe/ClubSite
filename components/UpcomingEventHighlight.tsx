"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

import type { Event } from "@/lib/types";

export default function UpcomingEventHighlight() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString()) // only upcoming
        .order("date", { ascending: true })
        .limit(3); // show top 3
      if (!error && data) setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <section id="events" className="px-6 py-16 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-10">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming events yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-green-900">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()} • {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  {event.register_link && (
                    <Link
                      href={event.register_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-800 transition"
                    >
                      RSVP
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/events"
            className="text-green-700 hover:text-green-900 font-semibold underline"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
