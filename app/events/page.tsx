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
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Accessibility Skip Link */}
      <a
        href="#events-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white p-2 rounded shadow"
      >
        Skip to content
      </a>

      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4">
            WasteWise Events <span className="text-green-600 font-semibold text-lg">(in collaboration with SESC)</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Join WasteWise and SESC as we host workshops, cleanups, recycling drives, and
            community action initiatives — working together for a greener, sustainable future.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <main
        id="events-main"
        className="py-20 bg-gray-50"
        role="main"
        aria-live="polite"
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Status / Helper */}
          <div className="mb-8">
            {loading && events.length === 0 ? (
              <p className="text-sm text-gray-500">Loading events…</p>
            ) : error ? (
              <div className="text-sm text-red-600">
                <p>{error}</p>
                <div className="mt-4">
                  <button
                    onClick={fetchEvents}
                    className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : events.length === 0 ? (
              <p className="text-sm text-gray-500">
                No upcoming events currently scheduled. Check back soon or get involved!
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                {events.length} event{events.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Loading Skeleton */}
          {loading && events.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-8 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : events.length === 0 ? (
            /* Empty State */
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-md p-10 max-w-xl text-center">
                <h3 className="text-2xl font-bold text-green-900 mb-3">
                  No Upcoming Events
                </h3>
                <p className="text-gray-600 mb-6">
                  We don’t have any scheduled events right now. Check back soon or join WasteWise to organize one.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    href="/get-involved"
                    className="inline-flex items-center px-5 py-2.5 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-5 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Events Grid */
            <EventGrid
              events={events.map(
                (e) =>
                  ({
                    ...e,
                    formattedDate: formatDate(e.date),
                    collaboration: "WasteWise & SESC",
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
