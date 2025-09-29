"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem } from "@/lib/types";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Link } from "lucide-react";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*, events(title)")
        .order("created_at", { ascending: false });

      if (!error && data) setItems(data as GalleryItem[]);
    }
    fetchGallery();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A collection of moments from our events and initiatives, showcasing
            our commitment to sustainability and community engagement.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Photos</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={item.image_url}
                alt={item.title || "Gallery image"}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-4">
                {item.title && <h3 className="font-semibold">{item.title}</h3>}
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
