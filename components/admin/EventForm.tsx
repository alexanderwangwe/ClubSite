"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time?: string;
  category?: string;
  location?: string;
  register_link?: string;
  image?: string | null;
}

interface EventFormProps {
  initialData?: EventFormData;
  isEditing?: boolean;
  eventId?: string;
  loading?: boolean;
}

export default function EventForm({
  initialData,
  isEditing,
  eventId,
  loading: externalLoading,
}: EventFormProps) {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [time, setTime] = useState(initialData?.time || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [registerLink, setRegisterLink] = useState(initialData?.register_link || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image && initialData.image.startsWith("http") ? initialData.image : null
  );
  const [removed, setRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BUCKET = "events-images";
  const MAX_FILE_SIZE = 4 * 1024 * 1024;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);

    console.log("📸 Selected file:", f.name, f.type, f.size);

    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError("Image is too large. Max size is 4 MB.");
      return;
    }
    setFile(f);
    setRemoved(false);
  }

  function removeSelectedFile() {
    setFile(null);
    setPreviewUrl(null);
    setRemoved(true);
  }

  async function uploadFileForEvent(evId: string) {
    if (!file) {
      console.log("No file selected — skipping upload");
      return null;
    }

    const ext = file.name.split(".").pop();
    const filePath = `events/${evId}/${Date.now()}_${crypto.randomUUID()}.${ext}`;
    console.log("Uploading file to:", filePath);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    console.log("Public URL received:", data?.publicUrl);
    return data?.publicUrl || null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !date.trim() || !time.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    console.log("Submitting event...");

    try {
      const baseData = {
        title,
        description,
        date,
        time,
        category: category || undefined,
        location: location || undefined,
        register_link: registerLink || undefined,
      };

      if (isEditing && eventId) {
        console.log("🛠 Editing event:", eventId);
        let finalImageUrl = initialData?.image || null;

        if (file) {
          finalImageUrl = await uploadFileForEvent(eventId);
        } else if (removed) {
          finalImageUrl = null;
        }

        const updateData = { ...baseData, image: finalImageUrl };
        console.log("Updating with data:", updateData);

        const { error: updateError } = await supabase
          .from("events")
          .update(updateData)
          .eq("id", eventId);

        if (updateError) throw updateError;
        alert("Event updated successfully!");
      } else {
        console.log("✨ Creating new event");
        const { data: inserted, error: insertError } = await supabase
          .from("events")
          .insert([{ ...baseData, image: null }])
          .select("id")
          .single();

        if (insertError || !inserted?.id) throw insertError || new Error("Failed to create event.");

        const newId = inserted.id.toString();
        console.log("New event ID:", newId);

        let publicUrl = null;
        if (file) publicUrl = await uploadFileForEvent(newId);

        if (publicUrl) {
          console.log("Updating DB with image:", publicUrl);
          const { error: imgUpdateError } = await supabase
            .from("events")
            .update({ image: publicUrl })
            .eq("id", newId);

          if (imgUpdateError) throw imgUpdateError;
        } else {
          console.log("No image uploaded for event.");
        }

        alert("Event created successfully!");
      }

      router.push("/admin/events");
    } catch (err: any) {
      console.error("EventForm error:", err);
      setError(err?.message || "Unexpected error saving event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <Input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea placeholder="Event Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <div className="flex gap-4">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
      </div>

      <Input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <Input type="text" placeholder="Category (e.g., Workshop, Social, Seminar)" value={category} onChange={(e) => setCategory(e.target.value)} />
      <Input type="url" placeholder="Registration Link (optional)" value={registerLink} onChange={(e) => setRegisterLink(e.target.value)} />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Event Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <div className="mt-2 flex items-start gap-3">
            <img src={previewUrl} alt="Event preview" className="w-36 h-24 object-cover rounded-md border" />
            <div>
              <div className="text-sm text-gray-700 break-words max-w-xs">{file ? file.name : "Saved Image"}</div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" type="button" onClick={removeSelectedFile}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground">Max 4MB. JPG / PNG / WEBP recommended.</div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading || externalLoading}>
        {loading || externalLoading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
      </Button>
    </form>
  );
}
