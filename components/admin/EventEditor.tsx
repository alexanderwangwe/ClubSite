"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import type { Event } from "@/lib/types";

interface EventEditorProps {
  event?: Event;
}

const eventCategories = [
  "Clean-up",
  "Education",
  "Conservation",
  "Festival",
  "Other",
];

export default function EventEditor({ event }: EventEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    event_date: event?.event_date || "",
    start_time: event?.start_time || "",
    end_time: event?.end_time || "",
    location: event?.location || "",
    category: event?.category || "",
    image: event?.image || "",
    max_volunteers: event?.max_volunteers || 0,
    featured: event?.featured || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (event) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", event.id);

        if (error) throw error;
        toast.success("Event updated successfully!");
      } else {
        // Create new event
        const { error } = await supabase.from("events").insert([
          {
            ...formData,
            registered_volunteers: 0,
          },
        ]);

        if (error) throw error;
        toast.success("Event created successfully!");
      }

      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="event_date">Date</Label>
            <Input
              id="event_date"
              type="date"
              value={formData.event_date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, event_date: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    start_time: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, end_time: e.target.value }))
                }
                required
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {eventCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="max_volunteers">Maximum Volunteers</Label>
          <Input
            id="max_volunteers"
            type="number"
            min="0"
            value={formData.max_volunteers}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                max_volunteers: parseInt(e.target.value),
              }))
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, featured: checked as boolean }))
            }
          />
          <Label htmlFor="featured">Feature this event</Label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/events")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
