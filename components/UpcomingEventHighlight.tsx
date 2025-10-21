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
        // NOTE: for best SEO and perf consider fetching on the server
        // (server components / getServerSideProps or a cached API route).
        const { data, error: fetchError } = await supabase
          .from("events")
          .select("*")
          .gte("date", new Date().toISOString()) // only upcoming (ensure dates in DB are comparable UTC)
          .order("date", { ascending: true })
          .limit(3);

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
      className="px-6 py-16 bg-green-50"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="upcoming-events-heading"
          className="text-3xl font-bold text-green-800 text-center mb-10"
        >
          Upcoming Events
        </h2>

        {/* Live region for screenreader updates */}
        <div aria-live="polite" aria-atomic="true" className="min-h-[6rem]">
          {loading ? (
            // simple skeleton / loading state
            <div role="status" className="flex justify-center">
              <div className="animate-pulse grid md:grid-cols-3 gap-8 w-full">
                <div className="h-48 bg-white rounded-lg shadow-sm" />
                <div className="h-48 bg-white rounded-lg shadow-sm" />
                <div className="h-48 bg-white rounded-lg shadow-sm" />
              </div>
            </div>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-500">No upcoming events yet.
            
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  aria-labelledby={`event-title-${event.id}`}
                >
                  {event.image && (
                    // Using <img> to avoid requiring next.config change here.
                    // For production consider next/image + remotePatterns in next.config.js.
                    <img
                      src={event.image}
                      alt={event.title ?? "Event image"}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="p-4">
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
          )}
        </div>

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
