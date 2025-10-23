import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 60; // ISR: revalidate every 60s (adjust as needed)

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
    // Use Next's notFound to return proper 404 page / headers
    return notFound();
  }

  // Safe formatted date and read_time fallback
  const formattedDate = post.date
    ? new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(post.date))
    : "";
  const readTime = post.read_time || "—";

  // Image src handling: allow absolute URLs or internal uploads
  const imageSrc = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `/uploads/${post.image}`
    : null;

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
            {post.author} · {formattedDate} · {readTime}
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="flex-1" role="main">
        <div className="max-w-4xl mx-auto px-6">
          {imageSrc && (
            <div className="w-full rounded-xl mb-8 shadow-md overflow-hidden">
              {/* next/image requires remoteDomains in next.config.js for external hosts */}
              <Image
                src={imageSrc}
                alt={post.title}
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
                priority={false}
                sizes="(max-width: 640px) 100vw, 800px"
              />
            </div>
          )}

          <article
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground"
            aria-label={post.title}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
            >
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
