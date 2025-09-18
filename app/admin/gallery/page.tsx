// This file defines a React component for managing a gallery in an admin interface.
// It fetches gallery items from the database, displays them in a grid,
// and provides CRUD operations for the items.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { GalleryItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function GalleryAdminPage() {
  const supabase = useSupabaseClient();
  const [items, setItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
      if (data) setItems(data as GalleryItem[]);
    }
    fetchGallery();
  }, [supabase]);

  async function handleDelete(id: number) {
    await supabase.from("gallery").delete().eq("id", id);
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gallery Admin</h1>
        <Link href="/admin/gallery/new">
          <Button>Add New Photo</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="rounded-lg shadow overflow-hidden">
            <img src={item.image_url} alt={item.title || "Gallery"} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{item.title || "Untitled"}</h3>
              <div className="flex gap-2 mt-2">
                <Link href={`/admin/gallery/${item.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
