"use client";

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export interface GalleryFormData {
  title?: string;
  description?: string;
  image_url: string;
  category?: string;
  event_id?: number;
}

interface GalleryFormProps {
  initialData?: GalleryFormData;
  isEditing?: boolean;
  galleryId?: number;
  loading?: boolean;
}

export default function GalleryForm({
  initialData,
  isEditing,
  galleryId,
  loading,
}: GalleryFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [eventId, setEventId] = useState(initialData?.event_id || undefined);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image_url?.startsWith("http") ? initialData.image_url : null
  );

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const supabase = useSupabaseClient();

  // ✅ Correct bucket name
  const BUCKET = "gallery-images";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // ✅ Generate preview when file selected
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // ✅ Validate file input
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);
    if (!ALLOWED_TYPES.includes(f.type)) {
      return setError("Only JPG, PNG, and WEBP images are allowed.");
    }
    if (f.size > MAX_FILE_SIZE) {
      return setError("Image too large. Max size is 4MB.");
    }
    setFile(f);
  }

  // ✅ Upload image to Supabase Storage
  async function uploadImage() {
    if (!file) throw new Error("No image selected");

    const ext = file.name.split(".").pop();
    const filePath = `${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
    return data.publicUrl;
  }

  // ✅ Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file && !initialData?.image_url) {
      setError("Please upload an image.");
      return;
    }

    try {
      setUploading(true);

      let imageUrl = initialData?.image_url || "";

      // Upload image if selected
      if (file) {
        imageUrl = await uploadImage();
      }

      // Insert or update gallery record
      let dbError;
      if (isEditing && galleryId) {
        // Update existing record
        const { error } = await supabase.from("gallery").update({
          title,
          description,
          category,
          event_id: eventId,
          image_url: imageUrl,
        }).eq("id", galleryId);
        dbError = error;
      } else {
        // Insert new record (omit id)
        const { error } = await supabase.from("gallery").insert({
          title,
          description,
          category,
          event_id: eventId,
          image_url: imageUrl,
        });
        dbError = error;
      }

      if (dbError) throw dbError;

      alert("Photo saved successfully!");
      setFile(null);
    } catch (err: any) {
      console.error("Error saving photo:", err);
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  }

  // ✅ Remove selected image
  function removeSelectedFile() {
    setFile(null);
    setPreviewUrl(null);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* File Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select image (uploads on submit)
        </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <div className="mt-2 flex items-start gap-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-28 h-20 object-cover rounded-md border"
            />
            <div>
              <p className="text-sm text-gray-700 break-words max-w-xs">
                {file ? file.name : previewUrl}
              </p>
              <Button variant="outline" onClick={removeSelectedFile}>
                Remove
              </Button>
            </div>
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Max 4MB. JPG / PNG / WEBP only.
        </p>
      </div>

      <Input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Event ID (optional)"
        value={eventId || ""}
        onChange={(e) => setEventId(Number(e.target.value))}
      />

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={uploading || loading}>
        {uploading || loading ? "Saving..." : isEditing ? "Update Photo" : "Save Photo"}
      </Button>
    </form>
  );
}
