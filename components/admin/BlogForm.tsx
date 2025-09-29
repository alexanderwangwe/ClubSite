// components/admin/BlogForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
  blogId?: number;
}

export default function BlogForm({ initialData, isEditing, blogId }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = useSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let finalImageUrl = imageUrl;

    // ✅ Upload file to Supabase Storage if provided
    if (file) {
      const filePath = `posts/${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("posts-images") // bucket name
        .upload(filePath, file);

      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    const blogData = {
      title,
      excerpt,
      content,
      author,
      category,
      image: finalImageUrl,
      date: new Date().toISOString(),
      read_time: "5 min", // can calculate dynamically later
    };

    let res;
    if (isEditing && blogId) {
      res = await supabase.from("posts").update(blogData).eq("id", blogId);
    } else {
      res = await supabase.from("posts").insert([blogData]);
    }

    if (res.error) {
      setError(res.error.message);
    } else {
      router.push("/admin/blogs");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Excerpt (short preview)"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        required
      />
      <Textarea
        placeholder="Full Content (Markdown/HTML supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      {/* Either upload file OR paste a link */}
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Or paste Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
}
