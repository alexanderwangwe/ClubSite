"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import EventForm, { EventFormData } from "@/components/admin/EventForm";

import { useState } from "react";

export default function NewEventPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleCreate(form: EventFormData) {
    setErrorMsg(null);
    const { error } = await supabase.from("events").insert([form]);
    if (error) {
      setErrorMsg("Error creating event: " + error.message);
    } else {
      router.push("/admin/events");
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
      <EventForm onSubmit={handleCreate} />
    </div>
  );
}
