"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GalleryItem } from "@/lib/types";
import Link from "next/link";

export default function GalleryCarousel() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchGallery() {
      setLoading(true);
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8);
      if (mounted) {
        if (!error && data) setItems(data as GalleryItem[]);
        setLoading(false);
      }
    }
    fetchGallery();
    return () => {
      mounted = false;
    };
  }, []);

  function scrollBy(amount: number) {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  function prev() {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    scrollBy(-Math.max(400, Math.floor(width * 0.9)));
  }

  function next() {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    scrollBy(Math.max(400, Math.floor(width * 0.9)));
  }

  if (loading) {
    return (
      <section className="px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-green-800 tracking-tight">
              Latest Moments
            </h2>
            <Link
              href="/gallery"
              className="text-green-700 hover:text-green-900 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-flow-col gap-8 auto-cols-[25rem] animate-pulse">
            <div className="h-64 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
            <div className="h-64 bg-gray-100 rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section
      className="px-10 py-20 bg-white"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2
            id="gallery-heading"
            className="text-3xl font-bold text-green-800 tracking-tight"
          >
            Latest Moments
          </h2>
          
        </div>

        <div className="relative">
          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            aria-label="Scroll gallery left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all"
          >
            <svg
              className="h-6 w-6 text-green-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 18l-6-6 6-6"
              />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Scroll gallery right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all"
          >
            <svg
              className="h-6 w-6 text-green-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 6l6 6-6 6"
              />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scroll-smooth px-4 hide-scrollbar"
            role="list"
            tabIndex={0}
            aria-label="Gallery carousel"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="snap-center shrink-0 w-[30rem] h-[20rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] focus:outline-none"
              >
                <div className="relative w-full h-full bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.title || "Gallery image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  {item.title && (
                    <div className="absolute left-5 right-5 bottom-5 text-white text-lg font-semibold drop-shadow">
                      {item.title}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-green-700 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-green-800 transition"
          >
            View More Images
          </Link>
        </div>
      </div>
    </section>
  );
}
