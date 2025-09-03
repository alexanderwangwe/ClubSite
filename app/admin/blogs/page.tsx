// app/admin/blogs/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BlogsListPage() {
  const supabase = useSupabaseClient();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchBlogs() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) setBlogs(data);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setLoading(true);
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      alert("Error deleting blog: " + error.message);
    } else {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/new">
          <Button>Create Blog</Button>
        </Link>
      </div>
      <ul className="space-y-4">
        {blogs.length === 0 && (
          <li className="text-gray-500">No blogs found. Create one to get started!</li>
        )}
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <span>{blog.title}</span>
            <div className="flex gap-2">
              <Link href={`/admin/blogs/${blog.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button
                variant="destructive"
                disabled={loading}
                onClick={() => handleDelete(blog.id)}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
