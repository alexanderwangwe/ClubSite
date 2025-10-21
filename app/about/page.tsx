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
  const videoId = "bKrzE03T6pc"; // YouTube ID

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            About SESC
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            The{" "}
            <strong>Strathmore Environmental Sustainability Club (SESC)</strong>{" "}
            drives environmental awareness and sustainable action through
            education, collaboration, and innovation — empowering students and
            communities to lead the green revolution.
          </p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="flex items-center mb-3">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold font-serif">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To inspire and empower the Strathmore community to take
                meaningful action for a sustainable future through awareness,
                research, and active participation.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <Lightbulb className="h-8 w-8 text-accent mr-3" />
                <h2 className="text-3xl font-bold font-serif">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A future where every member of Strathmore actively contributes
                to environmental stewardship — setting an example for
                communities across Kenya and beyond.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/about-section.png"
              alt="SESC members during a cleanup activity"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg border border-border"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            The principles that guide SESC in its mission to protect and sustain
            our environment.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Community First</h4>
              <p className="text-muted-foreground">
                We collaborate with students, residents, and organizations to
                inspire action and collective responsibility.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <Recycle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Sustainability</h4>
              <p className="text-muted-foreground">
                Every project is designed with long-term environmental and
                social impact in mind.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Education</h4>
              <p className="text-muted-foreground">
                We believe informed individuals are powerful change agents — we
                learn, share, and act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight: WasteWise Movement */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold font-serif">
                Spotlight: WasteWise Movement
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A student-led initiative redefining waste management through
              awareness, and action <br /> starting with our pilot project in
              Siwaka community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden border border-border shadow-md">
              <Image
                src="/wastewise-movement.jpg"
                alt="WasteWise Movement"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">
                Towards Cleaner Communities
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                The{" "}
                <span className="font-semibold text-primary">
                  WasteWise Movement
                </span>{" "}
                creates awareness on waste management and sustainable practices.
                Its pilot project in
                <span className="font-semibold"> Siwaka</span> focuses on
                community cleanups, digital campaigns, and local partnerships to
                improve waste handling.
              </p>
            </div>
          </div>
        </div>

        {/* Video Highlights Section - improved: lazy, accessible, privacy-aware */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">
              Watch Our Highlights
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Explore moments from our Mazingira day activities.
            </p>

            <figure className="mx-auto max-w-4xl">
              {/* Poster + play button: only load YouTube iframe after explicit play to avoid third-party cookies and improve perf */}
              {!videoLoaded ? (
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                    alt="Video thumbnail: WasteWise x SESC highlights"
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    onClick={() => setVideoLoaded(true)}
                    className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transform transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-300"
                    aria-label="Play SESC highlights video"
                  >
                    <svg
                      className="w-8 h-8 text-green-700"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  <figcaption className="p-4 text-left text-sm text-gray-300 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="font-semibold text-white">
                      Wastewise and SESC Mazingira Day Highlights
                    </div>
                    <div className="text-xs">
                    2025 Cleanup Day Activation Drive!
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Videos load only after you press play to respect privacy
                      and reduce third-party cookies.
                    </div>
                  </figcaption>
                </div>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border">
                  {/* privacy-enhanced YouTube embed; no autoplay */}
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title="SESC Highlights — YouTube"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              )}
              <div className="mt-4 text-sm text-muted-foreground">
              
                <span className="mx-2">•</span>
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  📺 Watch on YouTube
                </a>
              </div>
            </figure>
          </div>
        </section>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">Our Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Together, we’re driving meaningful change in the Strathmore
            community and beyond.
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
                className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Join SESC Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Be part of a vibrant community of changemakers working toward a
            cleaner, more sustainable future.
          </p>
          <Link href="/get-involved">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Users className="mr-2 h-5 w-5" /> Join Our Community
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
