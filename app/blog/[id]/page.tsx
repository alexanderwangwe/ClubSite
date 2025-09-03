import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const { data: post } = await supabase
    .from("posts")
    .select("id, title, author, date, read_time, category, image, content")
    .eq("id", params.id)
    .single();

  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-muted-foreground mb-6">
          {post.author} · {new Date(post.date).toLocaleDateString()} · {post.read_time}
        </p>
        <img src={post.image} alt={post.title} className="w-full rounded-lg mb-8" />
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content || ""}
          </ReactMarkdown>
        </article>
      </section>
      <Footer />
    </div>
  );
}
