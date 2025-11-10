"use client";

import { useEffect, useState } from "react";
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

export default function BlogForm({
  initialData,
  isEditing,
  blogId,
}: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.image && initialData.image.startsWith("http")
      ? initialData.image
      : null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const supabase = useSupabaseClient();

  const BUCKET = "posts-images";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  // Generate preview
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const f = e.target.files?.[0] ?? null;
    if (!f) return setFile(null);
    if (!ALLOWED_TYPES.includes(f.type)) {
      return setError("Only JPG, PNG, and WEBP images are allowed.");
    }
    if (f.size > MAX_FILE_SIZE) {
      return setError("Image too large. Max size is 4MB.");
    }
    setFile(f);
  }
  async function uploadImage(postId: number) {
    if (!file) return null;
    const ext = file.name.split(".").pop();
    const filePath = `posts/${postId}/${Date.now()}.${ext}`;


    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !excerpt.trim() || !content.trim() || !author.trim()) {
      setError("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && blogId) {
        const updateData: any = {
          title,
          excerpt,
          content,
          author,
          category,
        };

        if (file) {
          const publicUrl = await uploadImage(blogId);
          if (publicUrl) updateData.image = publicUrl;
        }

        const { error: updateError } = await supabase
          .from("posts")
          .update(updateData)
          .eq("id", blogId);

        if (updateError) throw updateError;
      } else {
        const insertData: any = {
          title,
          excerpt,
          content,
          author,
          category,
          date: new Date().toISOString(),
          read_time: "5 min",
          image: "", // placeholder
        };

        const { data: inserted, error: insertError } = await supabase
          .from("posts")
          .insert([insertData])
          .select()
          .single();

        if (insertError || !inserted?.id) {
          throw insertError || new Error("Failed to create post.");
        }

        const newId = inserted.id;
        if (file) {
          const publicUrl = await uploadImage(newId);
          if (publicUrl) {
            const { error: imgUpdateError } = await supabase
              .from("posts")
              .update({ image: publicUrl })
              .eq("id", newId);
            if (imgUpdateError) throw imgUpdateError;
          }
        }
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err: any) {
      // Optionally handle error here (e.g., show user notification)
      setError(err.message || "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  function removeSelectedFile() {
    setFile(null);
    setPreviewUrl(null);
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

      {/* File input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Select image (will upload on submit)
        </label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {previewUrl && (
          <div className="mt-2 flex items-start gap-3">
            <img
              src={previewUrl}
              alt="Selected preview"
              className="w-28 h-20 object-cover rounded-md border"
            />
            <div>
              <p className="text-sm text-gray-700 break-words max-w-xs">
                {file ? file.name : previewUrl}
              </p>
              <Button variant="outline" onClick={removeSelectedFile}>
                Remove
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Max 4MB. JPG / PNG / WEBP only.
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEditing ? "Update Blog" : "Create Blog"}
      </Button>
    </form>
  );
}
