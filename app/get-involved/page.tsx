"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Users, Heart, Recycle, Mail } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GetInvolvedPage() {
  const googleFormUrl = "https://forms.gle/signupSESC"; // Replace with actual form URL

  const participationWays = [
    {
      title: "Become a Member",
      description:
        "Join as an active member and help drive environmental change on campus. Members get access to training, projects, and leadership opportunities.",
      icon: <Users className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Volunteer",
      description:
        "Support specific events and clean-up activities whenever you are available — short tasks, shifts, or ongoing roles.",
      icon: <Heart className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Donate or Sponsor",
      description:
        "Contribute resources, equipment, or financial support to our initiatives and help scale impact.",
      icon: <Recycle className="h-10 w-10 text-green-600" />,
    },
  ];

  const faqs = [
    {
      question: "How do I join?",
      answer:
        "Fill out the sign-up form (opens in a new tab) or visit one of our meetings. Membership is open to all.",
    },
    {
      question: "What kind of time commitment is expected?",
      answer:
        "You choose your involvement. Volunteer occasionally or take a leadership role — everyone’s contribution matters.",
    },
  ];

  // Basic form preview before redirect to Google Form
  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [status, setStatus] = useState<null | "ok" | "invalid">(null);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !validateEmail(form.email)) {
      setStatus("invalid");
      return;
    }
    window.open(googleFormUrl, "_blank", "noopener,noreferrer");
    setStatus("ok");
    setForm({ name: "", email: "", notes: "" });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
            {/* Hero Text */}
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-green-700 hover:text-green-800 mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>

              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
                Get Involved with SESC
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Join students leading sustainability on campus — learn new
                skills, meet peers, and make a measurable impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-3 bg-green-700 text-white rounded-md font-semibold shadow hover:bg-green-800"
                >
                  Join / Volunteer
                </a>
                <Link
                  href="#contact"
                  className="inline-flex items-center px-5 py-3 border border-green-700 text-green-700 rounded-md font-semibold hover:bg-green-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Form Preview Card */}
            <aside id="membership" aria-labelledby="membership-heading">
              <Card className="shadow-md border-green-100">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-green-600" />
                    <CardTitle id="membership-heading">
                      Quick Sign-up
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    We'll collect your details via a short Google Form. Click
                    "Open form" to proceed.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />

                    <input
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />

                    <textarea
                      placeholder="Message (optional)"
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                    />

                    <div className="flex items-center justify-between gap-3">
                      <Button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800"
                      >
                        Open form
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="mailto:ianabuki@strathmore.edu">Email Us</a>
                      </Button>
                    </div>

                    {status === "invalid" && (
                      <p className="text-sm text-yellow-600">
                        Please enter a valid name and email.
                      </p>
                    )}
                    {status === "ok" && (
                      <p className="text-sm text-green-600">
                        Form opened in a new tab — thank you!
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>

        {/* Participation Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-8">
              Ways to Participate
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {participationWays.map((way, i) => (
                <Card
                  key={i}
                  className="border-green-100 shadow-sm hover:shadow-lg transition"
                >
                  <CardHeader className="flex flex-col items-center">
                    {way.icon}
                    <CardTitle className="mt-4 text-green-800 text-xl">
                      {way.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    {way.description}
                    <div className="mt-4">
                      <Link
                        href="/events"
                        className="text-green-700 hover:underline"
                      >
                        See related events →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-green-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Quick Contact
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Email Card */}
              <Card className="p-6 border-green-100 shadow-sm">
                <Mail className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-gray-700 mb-2">
                  environment@strathmore.edu
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" asChild>
                    <a href="mailto:ianabuki@strathmore.edu">Send Email</a>
                  </Button>
                  {/* <Button asChild>
                    <a
                      href={googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open sign-up form
                    </a>
                  </Button> */}
                </div>
              </Card>

              {/* Clubs Office */}
              <Card className="p-6 border-green-100 shadow-sm">
                <div className="mx-auto h-10 w-10 mb-2 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold">
                  CO
                </div>
                <p className="text-gray-700 mb-2">Clubs Office</p>
                <div className="flex justify-center">
                  <Link
                    href="/events"
                    className="inline-flex items-center px-4 py-2 border border-green-700 rounded-md text-green-700 hover:bg-green-50"
                  >
                    See Events
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-green-800 mb-4">FAQ</h2>
            <Card className="p-4 border-green-100 shadow-sm">
              <Accordion type="single" collapsible>
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-green-800">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section>

        {/* CTA Strip */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <Card className="bg-green-700 text-white p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">
                    Ready to take action?
                  </h3>
                  <p className="opacity-90">
                    Join a cleanup, host a workshop, or start a project with
                    peers.
                  </p>
                </div>

                <div className="flex gap-3">
                  <a
                    href={googleFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-md font-semibold"
                  >
                    Sign up
                  </a>
                  {/* <Link
                    href="/donate"
                    className="inline-flex items-center px-4 py-2 border border-white/30 rounded-md"
                  >
                    Support us
                  </Link> */}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
