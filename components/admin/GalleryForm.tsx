"use client";

import { useState } from "react";
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
  onSubmit: (data: GalleryFormData) => Promise<void>;
  loading?: boolean;
}

export default function GalleryForm({ initialData, onSubmit, loading }: GalleryFormProps) {
  const [form, setForm] = useState<GalleryFormData>(
    initialData || { title: "", description: "", image_url: "", category: "", event_id: undefined }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input name="title" placeholder="Title (optional)" value={form.title || ""} onChange={handleChange} />
      <Textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description || ""}
        onChange={handleChange}
      />
      <Input
        name="image_url"
        placeholder="Image URL"
        value={form.image_url}
        onChange={handleChange}
        required
      />
      <Input name="category" placeholder="Category (optional)" value={form.category || ""} onChange={handleChange} />
      <Input
        name="event_id"
        type="number"
        placeholder="Event ID (optional)"
        value={form.event_id !== undefined ? String(form.event_id) : ""}
        onChange={handleChange}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Photo"}
      </Button>
    </form>
  );
}
