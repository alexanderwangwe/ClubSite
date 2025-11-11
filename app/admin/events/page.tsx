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
    console.log("fetchEvents: starting");
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      console.log("fetchEvents: supabase response", { data, error });

      if (error) {
        console.error("Fetch events error:", error);
      } else {
        setEvents(data || []);
      }
    } catch (err) {
      console.error("fetchEvents: unexpected error", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEvent(id: number | string) {
    console.log("deleteEvent: called", { id });
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) {
      console.log("deleteEvent: cancelled by user");
      return;
    }

    const numericId = Number(id);
    console.log("deleteEvent: numericId", numericId);
    if (isNaN(numericId)) {
      console.error("deleteEvent: invalid id", id);
      alert("Invalid event ID");
      return;
    }

    try {
      console.log("deleteEvent: sending delete request for id", numericId);
      const { data, error } = await supabase
        .from("events")
        .delete()
        .eq("id", numericId);

      console.log("deleteEvent: supabase response", { data, error });

      if (error) {
        console.error("Delete event error:", error);
        alert("Failed to delete event: " + error.message);
        return;
      }

      console.log("deleteEvent: success for id", numericId);
      alert("Event deleted successfully!");
      await fetchEvents();
    } catch (err) {
      console.error("deleteEvent: unexpected error", err);
      alert("Unexpected error deleting event. Check console for details.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Manage Events</h1>

      <Link href="/admin/events/new">
        <Button className="mb-6">+ Add New Event</Button>
      </Link>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id} className="border-b">
                <td className="p-2">{event.title}</td>
                <td className="p-2">{event.date}</td>
                <td className="p-2">{event.category}</td>
                <td className="p-2 flex gap-2 justify-center">
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
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500 italic">
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && <p className="mt-4 text-gray-500">Loading events...</p>}
    </div>
  );
}
