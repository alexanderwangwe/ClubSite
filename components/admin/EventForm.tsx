"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// ------------------------
// Exported type for form
// ------------------------
export interface EventFormData {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM (new field)
  category?: string; // (new field)
  location?: string;
  register_link?: string;
  image?: string; // public URL
}

// ------------------------
// Props
// ------------------------
interface EventFormProps {
  initialData?: EventFormData;
  isEditing?: boolean;
  eventId?: string; // Changed to string for consistency with URL params
  loading?: boolean;
  onSubmit?: (form: EventFormData) => Promise<void>;
}

export default function EventForm({
  initialData,
  isEditing,
  eventId,
  loading: externalLoading,
  onSubmit,
}: EventFormProps) {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  
  // Adjusted: date state only holds the YYYY-MM-DD part
  const [date, setDate] = useState(initialData?.date || "");
  
  // New: separate time state
  const [time, setTime] = useState(initialData?.time || "");

  const [location, setLocation] = useState(initialData?.location || "");
  const [registerLink, setRegisterLink] = useState(initialData?.register_link || "");
  
  // New: category state
  const [category, setCategory] = useState(initialData?.category || "");


  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BUCKET = "events-images";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // ... (handleFileChange, removeSelectedFile, useEffect for file preview remain the same) ...
  
  // ------------------------
  // Handle file selection (No change)
  // ------------------------
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const f = e.target.files?.[0] ?? null;
    if (!f) {
      setFile(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError("Image is too large. Max size is 4 MB.");
      return;
    }
    setFile(f);
  }

  function removeSelectedFile() {
    setFile(null);
    setPreviewUrl(null);
  }

  // ------------------------
  // Upload image to Supabase (No change needed here, as eventId is passed as a string now)
  // ------------------------
  async function uploadFileForEvent(evId: string) { // Updated type to string
    if (!file) return null;

    const ext = file.name.split(".").pop();
    const filePath = `events/${evId}/${Date.now()}_${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return data?.publicUrl || null;
  }
  
  // ------------------------
  // Handle submit
  // ------------------------
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Validation adjusted for separate date and time
    if (!title.trim() || !description.trim() || !date.trim() || !time.trim()) {
      setError("Please fill in all required fields (Title, Description, Date, and Time).");
      return;
    }

    setLoading(true);

    try {
      // Construct the form data object
      const formData: EventFormData = {
        title,
        description,
        date, // Now just the date string
        time, // New time string
        category: category || undefined, // New category
        location: location || undefined,
        register_link: registerLink || undefined,
        image: previewUrl || undefined,
      };

      if (onSubmit) {
        // Use custom handler if passed
        await onSubmit(formData);
      } else if (isEditing && eventId) {
        // Update existing event
        const updateData = { ...formData };
        const { error: updateError } = await supabase
          .from("events")
          .update(updateData)
          .eq("id", eventId.toString()); // FIX: Use .toString() on ID
          
        if (updateError) throw updateError;
        alert("Event updated successfully!");
        router.push("/admin/events");
      } else {
        // Create new event
        const { data: inserted, error: insertError } = await supabase
          .from("events")
          .insert([formData])
          .select("id") // Select only ID for efficiency
          .single();
          
        if (insertError || !inserted?.id) throw insertError || new Error("Failed to create event.");
        alert("Event created successfully!");
        router.push("/admin/events");
      }
    } catch (err: any) {
      console.error("EventForm Error:", err);
      setError(err?.message || "Unexpected error saving event.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      {/* New Row for Date and Time */}
      <div className="flex gap-4">
        <Input
          type="date" // Changed to type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          type="time" // New input for time
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      
      {/* New Input for Category */}
      <Input
        type="text"
        placeholder="Category (e.g., Workshop, Social, Seminar)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Input
        type="url"
        placeholder="Registration Link (optional)"
        value={registerLink}
        onChange={(e) => setRegisterLink(e.target.value)}
      />

      {/* Image Upload remains the same */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Event Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <div className="mt-2 flex items-start gap-3">
            <img
              src={previewUrl}
              alt="Event preview"
              className="w-36 h-24 object-cover rounded-md border"
            />
            <div>
              <div className="text-sm text-gray-700 break-words max-w-xs">
                {file ? file.name : previewUrl}
              </div>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" type="button" onClick={removeSelectedFile}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Max 4MB. JPG / PNG / WEBP recommended.
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={loading || externalLoading}>
        {loading || externalLoading
          ? "Saving..."
          : isEditing
          ? "Update Event"
          : "Create Event"}
      </Button>
    </form>
  );
}