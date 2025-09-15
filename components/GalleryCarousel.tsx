"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem } from "@/lib/types";
import Link from "next/link";

export default function GalleryCarousel() {
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8); // show recent 8
      if (!error && data) setItems(data as GalleryItem[]);
    }
    fetchGallery();
  }, []);

  if (!items.length) return null;

  return (
    <section className="px-6 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-800">Latest Moments</h2>
          <Link
            href="/gallery"
            className="text-green-700 hover:text-green-900 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="snap-center shrink-0 w-80 h-56 rounded-lg overflow-hidden shadow hover:scale-105 transition"
              >
                <img
                  src={item.image_url}
                  alt={item.title || "Gallery image"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
