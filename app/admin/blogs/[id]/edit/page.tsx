"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import BlogForm from "@/components/admin/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const supabase = useSupabaseClient();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase.from("posts").select("*").eq("id", id).single();
      setBlog(data);
    }
    if (id) fetchBlog();
  }, [id, supabase]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} isEditing blogId={Number(id)} />
    </div>
  );
}
