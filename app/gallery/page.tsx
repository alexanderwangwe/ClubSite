"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem } from "@/lib/types";
import Navbar from "@/components/Navbar";

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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Gallery</h1>
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
