"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category?: string;
  register_link?: string;
}

export interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
  loading?: boolean;
}

export default function EventForm({
  initialData,
  onSubmit,
  loading,
}: EventFormProps) {
  const [form, setForm] = useState<EventFormData>(
    initialData || {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
      category: "",
      register_link: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <Input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <Input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />
      <Input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <Input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />
      <Input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <Input
        name="register_link"
        placeholder="Registration Link"
        value={form.register_link}
        onChange={handleChange}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Event"}
      </Button>
    </form>
  );
}
