"use client";

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useParams, useRouter } from "next/navigation";
import EventForm, { EventFormData } from "@/components/admin/EventForm";

export default function EditEventPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EventFormData | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        setInitialData(data as EventFormData);
      }
    }
    if (id) fetchEvent();
  }, [id, supabase]);

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
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm
        initialData={initialData}
        onSubmit={handleUpdate}  
        loading={loading}
      />
    </div>
  );
}
