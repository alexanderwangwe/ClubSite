"use client";

import { useEffect, useMemo, useState, useRef } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 6;
  const mountedRef = useRef(true);

  // Updated categories to reflect WasteWise focus
  const categories = [
    "All",
    "Recycling",
    "Waste Reduction",
    "Community Action",
    "Sustainable Living",
    "Eco Education",
    "Events",
  ];

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    fetchPosts(true);
  }, [categoryFilter]);

  async function fetchPosts(reset = false) {
    try {
      setError(null);
      setLoading(true);

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

      const { data, error: fetchError } = await query;
      if (!mountedRef.current) return;

      if (fetchError) {
        console.error("Error fetching posts:", fetchError);
        setError("Failed to load articles. Please try again.");
        return;
      }

      const fetched = (data as BlogPost[]) || [];
      if (reset) {
        setPosts(fetched);
        setPage(1);
      } else {
        setPosts((prev) => [...prev, ...fetched]);
        setPage((prev) => prev + 1);
      }

      setHasMore(fetched.length === pageSize);
    } catch (err) {
      console.error(err);
      if (!mountedRef.current) return;
      setError("An unexpected error occurred.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  const filteredPosts = useMemo(() => {
    if (!debouncedSearch) return posts;
    const q = debouncedSearch.toLowerCase();
    return posts.filter(
      (post) =>
        (post.title || "").toLowerCase().includes(q) ||
        (post.excerpt || "").toLowerCase().includes(q) ||
        (post.author || "").toLowerCase().includes(q)
    );
  }, [posts, debouncedSearch]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 hover:text-green-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4">
            WasteWise Blog
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            Stories, reflections, and practical tips on sustainability, recycling, and
            community action — helping us all make greener choices.
          </p>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const active = category === categoryFilter;
              return (
                <button
                  key={category}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "bg-green-700 text-white shadow-md"
                      : "border border-gray-300 text-gray-600 hover:bg-green-50"
                  }`}
                  onClick={() => {
                    if (category === categoryFilter) return;
                    setCategoryFilter(category);
                    setPage(0);
                    setHasMore(true);
                    setPosts([]);
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-4">
          <p className="text-sm text-gray-500" aria-live="polite">
            {loading && posts.length === 0
              ? "Loading articles..."
              : error
              ? error
              : `${filteredPosts.length} article${
                  filteredPosts.length !== 1 ? "s" : ""
                } found`}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {loading && posts.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-8 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-12">
              <p>{error}</p>
              <div className="mt-4">
                <Button onClick={() => fetchPosts(true)}>Retry</Button>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <BookOpen className="h-6 w-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">
                No articles match your search
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto mb-6">
                Try a different search term, clear filters, or browse all posts.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedSearch("");
                    setCategoryFilter("All");
                    setPage(0);
                    setPosts([]);
                    fetchPosts(true);
                  }}
                >
                  Reset filters
                </Button>
                <Link
                  href="/get-involved"
                  className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-colors"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          ) : (
            <>
              <BlogGrid posts={filteredPosts} />

              <div className="text-center mt-14">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-700 hover:bg-green-700 hover:text-white transition-all"
                  onClick={() => fetchPosts()}
                  disabled={loading || !hasMore}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0116 0H4z"
                        />
                      </svg>
                      Loading...
                    </>
                  ) : hasMore ? (
                    <>
                      <BookOpen className="mr-2 h-5 w-5" /> Load More Articles
                    </>
                  ) : (
                    "No more articles"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
