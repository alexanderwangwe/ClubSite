import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Leaf, Calendar, User, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/types";

export default async function BlogPage() {
  const { posts, total } = await getBlogPosts();
  const featuredPost = posts[0]; // First post is featured
  const remainingPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Environmental Blog
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover insights, tips, and stories about environmental
            conservation, sustainable living, and our campus initiatives.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <Badge className="bg-green-100 text-green-800 mb-4">
                Featured Article
              </Badge>
              <div className="border-green-200 overflow-hidden hover:shadow-lg transition-shadow rounded-lg bg-white">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredPost.cover_image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(featuredPost.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author || "Anonymous"}
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-green-800 mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {featuredPost.excerpt ||
                        featuredPost.content.substring(0, 200) + "..."}
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Latest Articles
            </h2>
            <p className="text-gray-600">
              Stay updated with our latest environmental insights and campus
              initiatives
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {total > 6 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
