"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogGrid from "@/components/blogs/BlogGrid";
import { BlogPost } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 6; // number of posts per fetch

  const categories = [
    "All",
    "Campus Life",
    "Recycling",
    "Conservation",
    "Awareness",
    "Community Action",
    "Science",
  ];

  async function fetchPosts(reset = false) {
    const from = reset ? 0 : page * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select("id, title, excerpt, author, date, read_time, category, image")
      .order("date", { ascending: false })
      .range(from, to);

    if (categoryFilter !== "All") {
      query = query.eq("category", categoryFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    if (reset) {
      setPosts(data as BlogPost[]);
      setPage(1);
    } else {
      setPosts((prev) => [...prev, ...(data as BlogPost[])]);
      setPage((prev) => prev + 1);
    }

    if (!data || data.length < pageSize) {
      setHasMore(false); // no more posts
    } else {
      setHasMore(true);
    }
  }

  // Fetch posts when category changes
  useEffect(() => {
    fetchPosts(true);
  }, [categoryFilter]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">SESC Blog</h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Stories, reflections, and insights from Strathmore students and
            faculty working toward a cleaner, greener community.
          </p>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === categoryFilter ? "default" : "outline"}
                size="sm"
                className={
                  category === categoryFilter
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
                onClick={() => {
                  setCategoryFilter(category);
                  setPage(0);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <BlogGrid posts={filteredPosts} />

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                onClick={() => fetchPosts()}
              >
                <BookOpen className="mr-2 h-5 w-5" />
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
