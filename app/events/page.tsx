"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventGrid from "@/components/events/EventGrid";
import { Event } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data as Event[]);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
            workshops, debates, and fairs — there’s always a way to get involved.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <EventGrid events={events} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
