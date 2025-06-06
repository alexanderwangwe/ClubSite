import { getBlogPost } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getBlogPost(params.slug);

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navbar />

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author || "Anonymous"}
              </div>
            </div>
          </div>

          {post.cover_image && (
            <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>

        <Footer />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
