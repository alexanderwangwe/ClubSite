"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Event } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Fetch events error:", error);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }

  async function deleteEvent(id: number | string | bigint) {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    const numericId = BigInt(id);

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", numericId);

    if (error) {
      alert("Failed to delete event: " + error.message);
      return;
    }

    alert("Event deleted successfully!");
    fetchEvents();
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>
      <Link href="/admin/events/new">
        <Button className="mb-6">+ Add New Event</Button>
      </Link>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id.toString()} className="border-b">
              <td className="p-2">{event.title}</td>
              <td className="p-2">{event.date}</td>
              <td className="p-2">{event.category}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/admin/events/${event.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p className="mt-4 text-gray-500">Loading events...</p>}
    </div>
  );
}
