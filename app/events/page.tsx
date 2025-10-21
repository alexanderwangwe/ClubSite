"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import EventGrid from "@/components/events/EventGrid";
import { Event } from "@/lib/types";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    fetchEvents();
    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchEvents() {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (!mountedRef.current) return;

      if (fetchError) {
        console.error("Error fetching events:", fetchError);
        setError("Failed to load events. Please try again.");
        setEvents([]);
        return;
      }

      setEvents((data as Event[]) || []);
    } catch (err) {
      console.error("Unexpected error fetching events:", err);
      if (!mountedRef.current) return;
      setError("An unexpected error occurred. Please try again.");
      setEvents([]);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  function formatDate(dateStr?: string) {
    if (!dateStr) return "";
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Skip link */}
      <a
        href="#events-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white p-2 rounded shadow"
      >
        Skip to content
      </a>

      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming SESC Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Be part of our journey toward a sustainable future. From cleanups to
            workshops, debates, and fairs — there’s always a way to get
            involved.
          </p>
        </div>
      </section>

      <main id="events-main" className="py-16" role="main" aria-live="polite">
        <div className="max-w-7xl mx-auto px-4">
          {/* Status / helper */}
          <div className="mb-6">
            {loading && events.length === 0 ? (
              <p className="text-sm text-muted-foreground">Loading events…</p>
            ) : error ? (
              <div className="text-sm text-red-600">
                <p>{error}</p>
                <div className="mt-3">
                  <button
                    onClick={fetchEvents}
                    className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : events.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No upcoming events currently scheduled.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {events.length} upcoming event{events.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && events.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="h-40 bg-gray-100 rounded-lg" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            // Empty state with CTAs
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow p-8 max-w-xl text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No upcoming events
                </h3>
                <p className="text-gray-600 mb-4">
                  We don’t have any scheduled events right now. Check back soon
                  or get involved to help organize one.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Events grid
            <EventGrid
              events={events.map(
                (e) =>
                  ({
                    ...e,
                    formattedDate: formatDate(e.date),
                  } as Event)
              )}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
