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
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(false);
  const videoId = "bKrzE03T6pc";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero */}
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
            About WasteWise
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            WasteWise is a movement dedicated to
            reshaping mindsets around waste management through awareness
           and community action starting right here at Strathmore University
            and extending into our surrounding communities.
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
                <h2 className="text-3xl font-bold text-green-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                To inspire responsible waste management and sustainable living by
                empowering students and communities with the knowledge, tools,
                and platforms to take meaningful action.
              </p>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <Lightbulb className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-green-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                A future where waste is treated as a resource, not a burden driven by conscious citizens championing cleaner, greener, and circular communities across Kenya and beyond.
              </p>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/wastewiselogo.png"
              alt="Students participating in a WasteWise initiative"
              width={500}
              height={400}
              className="rounded-3xl shadow-lg border border-border hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-green-900 mb-6">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            The principles that guide WasteWise in building awareness and driving
            lasting impact in our communities.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Heart className="h-12 w-12 text-green-700 mx-auto mb-4" />,
                title: "Community Engagement",
                desc: "We believe real change starts with people. We work collaboratively with students and neighborhoods to inspire action.",
              },
              {
                icon: <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />,
                title: "Sustainability",
                desc: "We promote simple, practical, and impactful approaches to reduce waste.",
              },
              {
                icon: <Users className="h-12 w-12 text-green-700 mx-auto mb-4" />,
                title: "Education & Awareness",
                desc: "We empower individuals with knowledge because an informed community becomes a transforming community.",
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

      {/* WasteWise in Action */}
      <section className="py-24 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-3">
              <Award className="h-8 w-8 text-green-700 mr-3" />
              <h2 className="text-4xl font-extrabold text-green-900">
                WasteWise in Action
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From campus awareness campaigns to community cleanups and digital
              advocacy, WasteWise is shaping a culture of sustainability — one
              initiative at a time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border hover:scale-[1.01] transition-transform">
              <Image
                src="/wastewise-movement.jpg"
                alt="WasteWise Movement in action"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-green-900 mb-4">
                Empowering Cleaner Communities
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our pilot project in{" "}
                <strong className="text-green-700">Siwaka</strong> showcases the
                power of student-led engagement  combining cleanups, awareness
                sessions, and partnerships to improve waste management practices
                where it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SESC Partnership Section */}
      <section className="py-24 bg-gradient-to-b from-white to-green-50/50 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center mb-3">
              <Handshake className="h-8 w-8 text-green-700 mr-3" />
              <h2 className="text-4xl font-extrabold text-green-900">
                Our Partnership with SESC
              </h2>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              WasteWise is proudly anchored within the{" "}
              <strong>Strathmore Environmental Sustainability Community (SESC)</strong>,
              ensuring continuity, student leadership, and long-term impact beyond
              the founding team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                SESC acts as the home and custodian of the WasteWise initiative —
                providing structure, mentorship, membership, and continuity year
                after year.
              </p>
              <br />
              <p>
                Together, SESC and WasteWise collaborate to deliver awareness
                programs, events, campaigns, and environmental projects that
                empower students to lead change on campus and in society.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg border border-border hover:scale-[1.01] transition-transform">
              <Image
                src="/Logo.png"
                alt="SESC club collaboration"
                width={300}
                height={100}
                className="w-full h-full object-cover"
              />
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
            Together, WasteWise and SESC are driving meaningful change within
            Strathmore and our wider community.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "30+", label: "Active Student Volunteers" },
              { value: "3", label: "Awareness Events" },  
              { value: "1", label: " Cleanup Event" },
              { value: "90+", label: "Students & Residents Reached" },
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
          <h2 className="text-4xl font-extrabold mb-4">
            Join the WasteWise Movement
          </h2>
          <p className="text-lg text-green-100 mb-8 leading-relaxed">
            Be part of a growing community of changemakers taking action for a
            cleaner, smarter, and more sustainable future.
          </p>
          <Link href="/get-involved">
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-green-100 transition"
            >
              <Users className="mr-2 h-5 w-5" /> Join the Movement
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
