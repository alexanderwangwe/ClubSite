"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newsletter: true,
    events: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("subscribers").insert([
        {
          name: formData.name,
          email: formData.email,
          subscribed_to_newsletter: formData.newsletter,
          subscribed_to_events: formData.events,
        },
      ]);

      if (error) throw error;

      toast.success("Successfully signed up! Welcome to our community!");
      setFormData({
        name: "",
        email: "",
        newsletter: true,
        events: true,
      });
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-8">
      <h3 className="text-2xl font-bold text-green-800 mb-2">
        Join Our Community
      </h3>
      <p className="text-gray-600 mb-6">
        Sign up to receive updates about our environmental initiatives, events,
        and blog posts.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="border-green-200 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            className="border-green-200 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  newsletter: checked as boolean,
                }))
              }
            />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="events"
              checked={formData.events}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  events: checked as boolean,
                }))
              }
            />
            <Label htmlFor="events">Get notified about events</Label>
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
