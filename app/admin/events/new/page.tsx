"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import EventForm, { EventFormData } from "@/components/admin/EventForm";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleCreate(form: EventFormData) {
    setErrorMsg(null);
    setLoading(true);

    try {
      
      const { data: inserted, error } = await supabase
        .from("events")
        .insert([form])
        .select("id") 
        .single();

      if (error || !inserted?.id) throw error || new Error("Failed to create event.");

      alert("Event created successfully!");
      router.push("/admin/events");
    } catch (err: any) {
      console.error("Insert Error:", err);
      setErrorMsg(err?.message || "Unexpected error creating event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

      {errorMsg && (
        <div className="mb-4 text-red-600 border border-red-300 rounded p-2 bg-red-50">
          {errorMsg}
        </div>
      )}

      {/* Passed the handleCreate function to the form */}
      <EventForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}