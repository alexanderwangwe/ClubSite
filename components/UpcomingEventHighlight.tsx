"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

import type { Event } from "@/lib/types";

export default function UpcomingEventHighlight() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true })
          .limit(3); // showing top 3 events

        if (fetchError) throw fetchError;
        if (mounted) setEvents(data ?? []);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Failed to load events");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchEvents();
    return () => {
      mounted = false;
    };
  }, []);

  function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    try {
      return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
        new Date(dateStr)
      );
    } catch {
      return dateStr;
    }
  }

  return (
    <section
      id="events"
      className="px-6 py-20 bg-green-50"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="upcoming-events-heading"
          className="text-3xl font-bold text-green-800 text-center mb-12"
        >
          Upcoming Events
        </h2>

        <div aria-live="polite" aria-atomic="true" className="min-h-[6rem]">
          {loading ? (
            <div role="status" className="flex justify-center">
              <div className="animate-pulse grid md:grid-cols-3 gap-8 w-full">
                <div className="h-52 bg-white rounded-lg shadow-sm" />
                <div className="h-52 bg-white rounded-lg shadow-sm" />
                <div className="h-52 bg-white rounded-lg shadow-sm" />
              </div>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : events.length === 0 ? (
            <div className="flex justify-center">
              <div
                role="status"
                className="bg-white rounded-lg shadow-sm p-8 max-w-xl text-center"
              >
                <Calendar
                  className="mx-auto text-green-700 h-8 w-8"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  No events found
                </h3>
                <p className="mt-2 text-gray-600">
                  We don’t have any events right now. Check back soon or explore
                  other ways to get involved.
                </p>

                <div className="mt-4 flex justify-center gap-3">
                  <Link
                    href="/events"
                    className="text-green-700 hover:text-green-900 font-semibold underline"
                  >
                    Browse events
                  </Link>

                  <Link
                    href="/get-involved"
                    className="inline-block bg-green-700 text-white px-3 py-2 rounded hover:bg-green-800 transition"
                  >
                    Get involved
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                {events.map((event) => (
                  <article
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    aria-labelledby={`event-title-${event.id}`}
                  >
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title ?? "Event image"}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <div className="p-5">
                      <h3
                        id={`event-title-${event.id}`}
                        className="font-semibold text-lg mb-2 text-green-900"
                      >
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {event.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" aria-hidden />
                        <span>
                          {formatDate(event.date)}{" "}
                          {event.time ? ` • ${event.time}` : ""}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <MapPin className="h-4 w-4 mr-2" aria-hidden />
                        <span>{event.location}</span>
                      </div>

                      {event.register_link && (
                        <Link
                          href={event.register_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-green-700 text-white text-sm px-4 py-2 rounded-md hover:bg-green-800 transition"
                          aria-label={`RSVP for ${event.title}`}
                        >
                          RSVP
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* ✅ Added View All Events button */}
              <div className="text-center">
                <Link
                  href="/events"
                  className="inline-block bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-green-800 transition"
                >
                  View All Events
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
