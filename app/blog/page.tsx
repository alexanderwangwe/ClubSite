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
  const pageSize = 6; // number of posts per fetch
  const mountedRef = useRef(true);

  const categories = [
    "All",
    "Campus Life",
    "Recycling",
    "Conservation",
    "Awareness",
    "Community Action",
    "Science",
  ];

  // Debounce search input for better UX / fewer renders
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Cleanup mounted flag
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Initial load (and whenever category changes we reset)
  useEffect(() => {
    // reset and fetch first page
    fetchPosts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setError("Failed to load posts. Please try again.");
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

      // If fewer than pageSize returned, no more pages
      setHasMore(fetched.length === pageSize);
    } catch (err) {
      console.error(err);
      if (!mountedRef.current) return;
      setError("An unexpected error occurred.");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  // Client-side filtering/search over fetched posts (debounced)
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
            faculty working towards a cleaner, greener community.
          </p>
        </div>
      </section>

      {/* Search + Categories */}
      <section
        className="py-8 border-b border-border"
        aria-labelledby="blog-controls"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div
            className="relative flex-1 max-w-md"
            role="search"
            aria-label="Search articles"
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <Input
              id="blog-search"
              type="text"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
              aria-describedby="search-help"
            />
            <p id="search-help" className="sr-only">
              Type to filter articles by title, excerpt or author. Results
              update after you pause typing.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by category"
          >
            {categories.map((category) => {
              const active = category === categoryFilter;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  className={`px-3 py-1 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent border border-border text-muted-foreground hover:bg-muted/50"
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

        {/* Results / status */}
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
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

      {/* Blog Posts */}
      <section
        className="py-16"
        aria-labelledby="blog-results"
        aria-busy={loading}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading skeleton for initial load */}
          {loading && posts.length === 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse space-y-3">
                  <div className="h-40 bg-gray-100 rounded-lg" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
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
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/20 mb-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No articles match your search
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
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
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h3 id="blog-results" className="sr-only">
                Blog results
              </h3>

              <BlogGrid posts={filteredPosts} />

              {/* Load More */}
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                  onClick={() => fetchPosts()}
                  disabled={loading || !hasMore}
                  aria-disabled={loading || !hasMore}
                >
                  {loading ? (
                    <span className="inline-flex items-center">
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
                    </span>
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
