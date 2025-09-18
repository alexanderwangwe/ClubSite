// This file defines a React component for creating a new gallery item in an admin interface.
// It displays a form for inputting item details and handles form submission to add the item to the database.
"use client";

import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import GalleryForm, { GalleryFormData } from "@/components/admin/GalleryForm";

import { useState } from "react";

export default function NewGalleryItemPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleCreate(form: GalleryFormData) {
    setErrorMsg(null);
    const { error } = await supabase.from("gallery").insert([form]);
    if (error) {
      setErrorMsg("Error creating gallery item: " + error.message);
    } else {
      router.push("/admin/gallery");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Photo</h1>
      {errorMsg && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded p-2">
          {errorMsg}
        </div>
      )}
      <GalleryForm onSubmit={handleCreate} />
    </div>
  );
}
