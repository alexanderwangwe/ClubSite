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
  }, [activeIndex, items]);

  function openLightbox(index: number) {
    setActiveIndex(index);
  }
  function closeLightbox() {
    setActiveIndex(null);
  }
  function showPrev() {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length));
  }
  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex((i) => (i === null ? null : (i + 1) % items.length));
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <section className="bg-gradient-to-r from-green-50 to-emerald-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Home
          </Link>

          <h2 className="text-5xl font-bold text-green-900 mb-4 leading-tight">
            Past Events
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
            Explore moments that define our journey toward sustainability.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Photos</h1>
          <div className="text-base text-gray-500">
            {loading ? "Loading…" : `${items.length} photo${items.length !== 1 ? "s" : ""}`}
          </div>
        </div>

        {error ? (
          <div className="text-center py-20 text-red-600">
            <p>{error}</p>
            <button
              onClick={() => location.reload()}
              className="mt-6 px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Retry
            </button>
          </div>
        ) : loading && items.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse h-64 bg-gray-100 rounded-xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-semibold mb-3">No photos available</p>
            <p className="text-gray-600 mb-6">
              Check back later or join our team to capture the next event.
            </p>
            <Link
              href="/get-involved"
              className="inline-flex px-5 py-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            >
              Get Involved
            </Link>
          </div>
        ) : (
          <>
            {/* Masonry layout */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {items.map((item, i) => (
                <figure
                  key={item.id}
                  className="break-inside-avoid overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group relative"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.image_url}
                    alt={item.title || "Gallery image"}
                    className="w-full object-cover transform group-hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        {item.title && <div className="font-semibold text-base">{item.title}</div>}
                        {(item as any).events?.title && (
                          <div className="text-sm opacity-80">{(item as any).events.title}</div>
                        )}
                      </div>
                      <span className="text-xs opacity-75">View</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/events"
                className="inline-flex items-center text-green-700 hover:text-green-900 font-medium text-lg transition"
              >
                View upcoming events <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </main>

      {activeIndex !== null && items[activeIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[activeIndex].title || "Image preview"}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80" onClick={closeLightbox} aria-hidden="true" />

          <div className="relative z-10 max-w-[90vw] max-h-[90vh] w-full flex flex-col">
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={showPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={showNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition"
            >
              <ArrowRight className="w-5 h-5 text-gray-800" />
            </button>

            <div className="flex-1 flex items-center justify-center">
              <img
                src={items[activeIndex].image_url}
                alt={items[activeIndex].title || "Gallery image"}
                className="max-h-[80vh] max-w-full object-contain rounded-md shadow-lg"
              />
            </div>

            <div className="mt-4 bg-white/95 p-4 rounded-b-md text-gray-900">
              {items[activeIndex].title && (
                <div className="font-semibold text-lg">{items[activeIndex].title}</div>
              )}
              {items[activeIndex].description && (
                <p className="text-sm text-gray-600 mt-1">{items[activeIndex].description}</p>
              )}
              {(items[activeIndex] as any).events?.title && (
                <p className="text-sm mt-2 text-gray-700">
                  Event: <strong>{(items[activeIndex] as any).events.title}</strong>
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
