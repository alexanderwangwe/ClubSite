import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, author, date, read_time, category, image, content")
    .eq("id", params.id)
    .single();

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Post not found.</p>
      </div>
    );
  }
  console.log("Blog detail post:", post);


  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 mb-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {post.title}
          </h1>
          <p className="text-muted-foreground">
            {post.author} · {new Date(post.date).toLocaleDateString()} ·{" "}
            {post.read_time}
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6">
          {post.image && (
            <img
              src={post.image.startsWith("http") ? post.image : `/uploads/${post.image}`}
              alt={post.title}
              className="w-full rounded-xl mb-8 shadow-md"
            />
          )}
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || ""}
            </ReactMarkdown>
          </article>
          <div className="mt-12">
            <Link href="/blog">
              <button className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                &larr; Back to Blogs
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
