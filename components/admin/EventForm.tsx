"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface EventFormProps {
  initialData?: any;
  isEditing?: boolean;
  eventId?: number;
}

export default function EventForm({
  initialData,
  isEditing,
  eventId,
}: EventFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().slice(0, 16)
      : ""
  );
  const [location, setLocation] = useState(initialData?.location || "");
  const [registerLink, setRegisterLink] = useState(
    initialData?.register_link || ""
  );

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = useSupabaseClient();

  const BUCKET = "events-images";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // ✅ Resolve preview for existing event image
  useEffect(() => {
    if (!initialData?.image) return;
    const img = initialData.image as string;
    setPreviewUrl(img.startsWith("http") ? img : null);
  }, [initialData]);

  // ✅ Preview for newly selected file
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

  // ✅ Upload file and return public URL
  async function uploadFileForEvent(evId: number) {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !date.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && eventId) {
        // --- UPDATE ---
        const updateData: any = {
          title,
          description,
          date: new Date(date).toISOString(),
          location,
          register_link: registerLink,
        };

        if (file) {
          const fileUrl = await uploadFileForEvent(eventId);
          if (fileUrl) updateData.image = fileUrl;
        }

        const { error: updateError } = await supabase
          .from("events")
          .update(updateData)
          .eq("id", eventId);

        if (updateError) throw updateError;
      } else {
        // --- INSERT ---
        const insertData: any = {
          title,
          description,
          date: new Date(date).toISOString(),
          location,
          register_link: registerLink,
        };

        const { data: inserted, error: insertError } = await supabase
          .from("events")
          .insert([insertData])
          .select()
          .single();

        if (insertError || !inserted?.id) {
          throw insertError || new Error("Failed to create event.");
        }

        const newId = inserted.id as number;

        if (file) {
          const fileUrl = await uploadFileForEvent(newId);
          if (fileUrl) {
            const { error: imgUpdateError } = await supabase
              .from("events")
              .update({ image: fileUrl })
              .eq("id", newId);
            if (imgUpdateError) throw imgUpdateError;
          }
        }
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Unexpected error saving event.");
    } finally {
      setLoading(false);
    }
  }

  function removeSelectedFile() {
    setFile(null);
    setPreviewUrl(null);
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

      <Input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Input
        type="url"
        placeholder="Google Form / Registration Link (optional)"
        value={registerLink}
        onChange={(e) => setRegisterLink(e.target.value)}
      />

      {/* ✅ Full image upload section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Event image (uploads on submit)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block"
        />

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
                <Button
                  variant="outline"
                  type="button"
                  onClick={removeSelectedFile}
                >
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
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
      </Button>
    </form>
  );
}
