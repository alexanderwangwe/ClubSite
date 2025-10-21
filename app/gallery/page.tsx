"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // lightbox state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    async function fetchGallery() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*, events(title)")
          .order("created_at", { ascending: false });

        if (!mountedRef.current) return;

        if (error) {
          console.error("Gallery fetch error:", error);
          setError("Failed to load gallery.");
          setItems([]);
        } else {
          setItems((data as GalleryItem[]) || []);
        }
      } catch (err) {
        console.error(err);
        if (!mountedRef.current) return;
        setError("Unexpected error loading gallery.");
        setItems([]);
      } finally {
        if (mountedRef.current) setLoading(false);
      }
    }
    fetchGallery();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Lightbox keyboard & body-scroll lock (uses full items list, no filter)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    if (activeIndex !== null) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, items]);

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  function showPrev() {
    if (activeIndex === null) return;
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }

  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Moments from our events and initiatives — browse and view
            high-resolution photos.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Photos</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="text-sm text-muted-foreground ml-2">
              {loading
                ? "Loading…"
                : `${items.length} photo${items.length !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>

        {error ? (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Retry
            </button>
          </div>
        ) : loading && items.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-60 bg-gray-100 rounded-lg"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg font-semibold mb-2">No photos available</p>
            <p className="text-muted-foreground mb-4">
              Check back later or get involved to help capture moments.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex px-4 py-2 bg-green-700 text-white rounded-md"
            >
              Get Involved
            </Link>
          </div>
        ) : (
          <>
            {/* Masonry-like layout using CSS columns for a creative layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {items.map((item, i) => (
                <figure
                  key={item.id}
                  className="break-inside-avoid-column mb-4 rounded-lg overflow-hidden shadow-lg group cursor-pointer relative"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title || "Gallery image"}
                    className="w-full block object-cover"
                    loading="lazy"
                    decoding="async"
                  />

                  <figcaption className="absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        {item.title && (
                          <div className="font-semibold">{item.title}</div>
                        )}
                        {(item as any).events?.title && (
                          <div className="text-sm opacity-90">
                            {(item as any).events.title}
                          </div>
                        )}
                      </div>

                      <div className="text-xs opacity-90">View</div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/gallery"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                View all images →
              </Link>
            </div>
          </>
        )}
      </main>

      {/* Lightbox */}
      {activeIndex !== null && items[activeIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[activeIndex].title || "Image preview"}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-[90vw] max-h-[90vh] w-full flex flex-col">
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2 shadow hover:bg-white focus:outline-none"
            >
              <X className="w-4 h-4 text-gray-800" />
            </button>

            <button
              onClick={showPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow hover:bg-white focus:outline-none"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow hover:bg-white focus:outline-none"
            >
              <ArrowRight className="w-5 h-5 text-gray-800" />
            </button>

            <div className="flex-1 overflow-auto flex items-center justify-center">
              <img
                src={items[activeIndex].image_url}
                alt={items[activeIndex].title || "Gallery image"}
                className="max-h-[80vh] max-w-full object-contain rounded-md shadow-lg"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="mt-3 bg-white/95 p-4 rounded-b-md shadow-inner text-gray-900">
              {items[activeIndex].title && (
                <div className="font-semibold text-lg">
                  {items[activeIndex].title}
                </div>
              )}
              {items[activeIndex].description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {items[activeIndex].description}
                </p>
              )}
              {(items[activeIndex] as any).events?.title && (
                <p className="text-sm mt-2 text-gray-600">
                  Event:{" "}
                  <strong>{(items[activeIndex] as any).events.title}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
