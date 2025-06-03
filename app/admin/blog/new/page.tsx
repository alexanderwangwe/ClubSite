import BlogPostEditor from "@/components/admin/BlogPostEditor";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Blog Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogPostEditor />
      </div>
    </div>
  );
}
