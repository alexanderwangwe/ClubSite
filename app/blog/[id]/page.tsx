import { supabase } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";

export const revalidate = 60;

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
    return notFound();
  }

  const formattedDate = post.date
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(post.date))
    : "Unknown date";

  const readTime = post.read_time || "—";

  const imageSrc = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `/uploads/${post.image}`
    : null;

  return (
    <>
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={`Read "${post.title}" by ${post.author}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={`Published on ${formattedDate}`} />
        {imageSrc && <meta property="og:image" content={imageSrc} />}
      </Head>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />

        {/* Header */}
        <header className="py-12 mb-10 bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            {post.category && (
              <span className="inline-block bg-primary/20 text-primary-foreground px-3 py-1 rounded-full mb-3 text-sm font-medium">
                {post.category}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {post.author} · {formattedDate} · {readTime}
            </p>
          </div>

          {imageSrc && (
            <div className="max-w-4xl mx-auto mt-8 px-6 rounded-xl overflow-hidden shadow-md">
              <Image
                src={imageSrc}
                alt={`Featured image for ${post.title}`}
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
                priority={false}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 800px"
              />
            </div>
          )}
        </header>

        {/* Body */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6">
            <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {post.content || "*No content available.*"}
              </ReactMarkdown>
            </article>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Link href="/blog" passHref>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow hover:bg-primary/90 hover:shadow-md transition">
                  &larr; Back to Blogs
                </button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
