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
    scrollBy(-Math.max(240, Math.floor(width * 0.8)));
  }

  function next() {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    scrollBy(Math.max(240, Math.floor(width * 0.8)));
  }

  if (loading) {
    return (
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">
              Latest Moments
            </h2>
            <Link
              href="/gallery"
              className="text-green-700 hover:text-green-900 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-flow-col gap-4 auto-cols-[20rem] animate-pulse">
            <div className="h-44 bg-gray-100 rounded-lg" />
            <div className="h-44 bg-gray-100 rounded-lg" />
            <div className="h-44 bg-gray-100 rounded-lg" />
            <div className="h-44 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (!items.length) return null;

  return (
    <section className="px-6 py-12 bg-white" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2
            id="gallery-heading"
            className="text-2xl font-bold text-green-800"
          >
            Latest Moments
          </h2>
          <Link
            href="/gallery"
            className="text-green-700 hover:text-green-900 font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="relative">
          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            aria-label="Scroll gallery left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white focus:outline-none"
          >
            <svg
              className="h-5 w-5 text-green-700"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow hover:bg-white focus:outline-none"
          >
            <svg
              className="h-5 w-5 text-green-700"
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
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth px-2"
            role="list"
            tabIndex={0}
            aria-label="Gallery carousel"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") prev();
              if (e.key === "ArrowRight") next();
            }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/${item.id}`}
                className="snap-center shrink-0 w-80 h-56 rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 focus:scale-105 focus:outline-none"
                aria-label={item.title || "Gallery image"}
              >
                <div className="relative w-full h-full bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.title || "Gallery image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-90 pointer-events-none" />
                  {item.title && (
                    <div className="absolute left-3 right-3 bottom-3 text-white text-sm font-semibold drop-shadow">
                      {item.title}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
