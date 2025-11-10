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
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      if (!id) return;

      
      const idAsString = id.toString();

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", idAsString) 
        .single();

      if (error) {
        console.error("Fetch Error:", error);
        setFetchError("Failed to load event.");
        return;
      }

      if (!data) {
        setFetchError("Event not found.");
        return;
      }

      
      const formData: EventFormData = {
        title: data.title,
        description: data.description,
        date: data.date, 
        time: data.time || "", 
        category: data.category || "", 
        location: data.location || "",
        register_link: data.register_link || "",
        image: data.image || undefined,
      };

      setInitialData(formData);
    }

    fetchEvent();
  }, [id]);

  async function handleUpdate(form: EventFormData) {
    setLoading(true);

    
    const idAsString = id.toString();

    const { error } = await supabase
      .from("events")
      .update(form)
      .eq("id", idAsString);

    setLoading(false);

    if (error) {
      alert("Error updating event: " + error.message);
    } else {
      alert("Event updated successfully!");
      router.push("/admin/events");
    }
  }

  if (fetchError) return <p className="text-red-600">{fetchError}</p>;
  if (!initialData) return <p>Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm
        initialData={initialData}
        isEditing
        eventId={id} 
        onSubmit={handleUpdate} 
        loading={loading}
      />
    </div>
  );
}