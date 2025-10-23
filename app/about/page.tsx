"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Users,
  Target,
  Award,
  Recycle,
  Lightbulb,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false); // added
  const videoId = "bKrzE03T6pc"; // YouTube ID

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-green-50 to-green-100/40 py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-green-900 mb-6">
            About SESC
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <strong>Strathmore Environmental Sustainability Club (SESC)</strong>{" "}
            drives environmental awareness and action through education,
            innovation, and collaboration — empowering students to lead the
            green revolution.
          </p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-green-700 mr-3" />
                <h2 className="text-3xl font-bold text-green-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To inspire and empower the Strathmore community to take
                meaningful action for a sustainable future through awareness,
                research, and participation.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Lightbulb className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                A future where every member of Strathmore actively contributes
                to environmental stewardship — setting an example for Kenya and
                beyond.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/about-section.png"
              alt="SESC members during a cleanup activity"
              width={600}
              height={400}
              className="rounded-3xl shadow-lg border border-border hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-green-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            The principles that guide SESC in its mission to protect and sustain
            our environment.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <Heart className="h-12 w-12 text-green-700 mx-auto mb-4" />
                ),
                title: "Community First",
                desc: "We collaborate with students, residents, and organizations to inspire collective responsibility.",
              },
              {
                icon: (
                  <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                ),
                title: "Sustainability",
                desc: "Every project is designed for long-term environmental and social impact.",
              },
              {
                icon: (
                  <Users className="h-12 w-12 text-green-700 mx-auto mb-4" />
                ),
                title: "Education",
                desc: "We believe informed individuals are powerful change agents — we learn, share, and act.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {v.icon}
                <h4 className="text-2xl font-semibold mb-3 text-green-900">
                  {v.title}
                </h4>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="py-24 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <Award className="h-8 w-8 text-green-700 mr-3" />
              <h2 className="text-4xl font-extrabold text-green-900">
                Spotlight: WasteWise Movement
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A student-led initiative redefining waste management through
              awareness and community action, beginning with our pilot project
              in Siwaka.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border hover:scale-[1.01] transition-transform">
              <Image
                src="/wastewise-movement.jpg"
                alt="WasteWise Movement"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-900 mb-4">
                Towards Cleaner Communities
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                The{" "}
                <span className="font-semibold text-green-700">
                  WasteWise Movement
                </span>{" "}
                creates awareness on waste management and sustainability. Its
                pilot project in <strong>Siwaka</strong> focuses on community
                cleanups, digital campaigns, and local partnerships to improve
                waste handling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section (decorated, improved UX) */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50/50 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-green-900 mb-6">
            Watch Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Discover how WasteWise and SESC members are making a difference through
            innovation, leadership, and action.
          </p>

          <div className="relative max-w-4xl mx-auto">
            {/* decorative background shapes */}
            <div className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-tr from-green-100 to-white opacity-80 blur-3xl transform -rotate-12"></div>
            <div className="pointer-events-none absolute -bottom-10 -right-10 w-56 h-56 rounded-2xl bg-gradient-to-br from-white to-green-50 opacity-60 blur-2xl"></div>

            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              {/* subtle framed ring */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-green-50/60"></div>

              {/* Clickable thumbnail with large play affordance */}
              {!videoLoaded && (
                <button
                  type="button"
                  onClick={() => {
                    setVideoLoaded(true);
                    setIframeLoading(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setVideoLoaded(true);
                      setIframeLoading(true);
                    }
                  }}
                  aria-label="Play SESC video"
                  className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-b from-white/60 to-white/40 hover:from-white/80 focus:outline-none focus:ring-4 focus:ring-green-200"
                >
                  {/* Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt="YouTube Video Thumbnail"
                    fill
                    className="object-cover cursor-pointer"
                  />

                  {/* Play button overlay */}
                  <span className="absolute z-20 flex items-center justify-center">
                    <span className="rounded-full bg-black/70 p-4 shadow-lg transform transition-transform hover:scale-105">
                      <svg
                        className="w-9 h-9 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>

                  {/* Caption overlay */}
                  <span className="absolute bottom-4 left-4 right-4 text-sm text-gray-800 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                    Watch: WasteWise and SESC on Mazingira day 2025 (Click to play)
                  </span>
                </button>
              )}

              {/* Embedded iframe loads only after user interaction */}
              {videoLoaded && (
                <div className="w-full h-full relative">
                  {/* Loading overlay while iframe initializes */}
                  {iframeLoading && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60">
                      <svg
                        className="animate-spin h-10 w-10 text-green-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8"
                          strokeWidth="4"
                        ></path>
                      </svg>
                    </div>
                  )}

                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title="SESC Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    onLoad={() => setIframeLoading(false)}
                  />
                </div>
              )}
            </div>

            {/* CTA + external link */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-green-700 border border-green-200 hover:shadow-md transition"
              >
                Open on YouTube
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M14 3h7v7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 21H3V3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-gradient-to-t from-green-50/60 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-green-900 mb-6">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            Together, we’re driving measurable change within Strathmore and the
            communities we serve.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Active Members" },
              { value: "10+", label: "Events Organized" },
              { value: "10+", label: "Projects Completed" },
              { value: "100+", label: "Volunteer Hours" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl font-bold text-green-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Join SESC Today</h2>
          <p className="text-lg text-green-100 mb-8 leading-relaxed">
            Be part of a vibrant community of changemakers working toward a
            cleaner, more sustainable future.
          </p>
          <Link href="/get-involved">
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-green-100 transition"
            >
              <Users className="mr-2 h-5 w-5" /> Join Our Community
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
