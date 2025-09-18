// This file defines a React component for editing a gallery item in an admin interface.
// It fetches the existing item data, displays a form with initial values,
// and handles form submission to update the item in the database.
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import GalleryForm, { GalleryFormData } from "@/components/admin/GalleryForm";

export default function EditGalleryItemPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [initialData, setInitialData] = useState<GalleryFormData | null>(null);

  useEffect(() => {
    async function fetchItem() {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("id", id)
        .single();
      if (!error && data) {
        setInitialData(data as GalleryFormData);
      }
    }
    if (id) fetchItem();
  }, [id, supabase]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleUpdate(form: GalleryFormData) {
    const { error } = await supabase.from("gallery").update(form).eq("id", id);
    if (error) {
      setErrorMsg("Error updating gallery item: " + error.message);
    } else {
      router.push("/admin/gallery");
    }
  }

  if (!initialData) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Photo</h1>
      {errorMsg && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
          {errorMsg}
        </div>
      )}
      <GalleryForm initialData={initialData} onSubmit={handleUpdate} />
    </div>
  );
}
