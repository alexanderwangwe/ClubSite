"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import EventForm, { EventFormData } from "@/components/admin/EventForm";

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EventFormData | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data } = await supabase.from("events").select("*").eq("id", id).single();
      if (data) setInitialData(data as EventFormData);
    }
    if (id) fetchEvent();
  }, [id]);

  async function handleUpdate(form: EventFormData) {
    setLoading(true);
    const { error } = await supabase.from("events").update(form).eq("id", id);
    setLoading(false);

    if (error) {
      alert("Error updating event: " + error.message);
    } else {
      router.push("/admin/events");
    }
  }

  if (!initialData) return <p>Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm initialData={initialData} onSubmit={handleUpdate} loading={loading} />
    </div>
  );
}
