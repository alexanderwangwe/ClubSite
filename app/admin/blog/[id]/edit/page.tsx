import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import BlogPostEditor from "@/components/admin/BlogPostEditor";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog Post</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <BlogPostEditor post={post} />
      </div>
    </div>
  );
}
