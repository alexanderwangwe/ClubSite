// app/admin/blogs/new/page.tsx
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Blog</h1>
      <BlogForm />
    </div>
  );
}
