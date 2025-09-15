"use client";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import type { GalleryItem } from "../../lib/types";

export default function GalleryGrid() {
  const supabase = useSupabaseClient();
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (error) {
        console.error("Error fetching images:", error.message);
      } else if (data) {
        setImages(data as GalleryItem[]);
      }
    }
    fetchImages();
  }, [supabase]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <div key={img.id} className="rounded overflow-hidden shadow">
          <img
            src={img.image_url}
            alt={img.caption || "Gallery image"}
            className="w-full h-48 object-cover"
          />
          {img.caption && (
            <div className="p-2 text-sm text-gray-700">{img.caption}</div>
          )}
          {img.event_id && (
            <div className="p-2 text-xs text-gray-500">
              Linked to event #{img.event_id}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
