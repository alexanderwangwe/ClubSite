"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, Users, Heart, Recycle, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GetInvolvedPage() {
  const participationWays = [
    {
      title: "Become a Member",
      description:
        "Join as an active member and help drive environmental change on campus.",
      icon: <Users className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Volunteer",
      description:
        "Support specific events and clean-up activities whenever you are available.",
      icon: <Heart className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Donate or Sponsor",
      description:
        "Contribute resources or financial support to our initiatives.",
      icon: <Recycle className="h-10 w-10 text-green-600" />,
    },
  ];

  const faqs = [
    {
      question: "How do I join?",
      answer:
        "Simply fill out our membership form or attend one of our weekly meetings. Membership is free.",
    },
    {
      question: "Do I need to study Environmental Science?",
      answer:
        "No. We welcome students from all faculties. Everyone can play a role in sustainability.",
    },
    {
      question: "What events do you organize?",
      answer:
        "Clean-ups, tree planting, recycling workshops, and awareness campaigns throughout the year.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-green-700 hover:text-green-800 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
              Join SESC and Make a Difference
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Be part of our journey toward a sustainable future. From cleanups
              to workshops, debates, and fairs — there’s always a way to get
              involved and make an impact with SESC.
            </p>
          </div>
        </section>

        {/* Ways to Participate */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
              Ways to Participate
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {participationWays.map((way, index) => (
                <Card
                  key={index}
                  className="border-green-100 shadow-sm hover:shadow-lg transition"
                >
                  <CardHeader className="flex flex-col items-center">
                    {way.icon}
                    <CardTitle className="mt-4 text-green-800 text-xl">
                      {way.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600 text-center">
                    {way.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Contact */}
        <section className="py-16 bg-green-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-8">
              Get in Touch
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-green-100 shadow-sm">
                <Mail className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-gray-700 mb-2">environment@strathmore.edu</p>
                <Button variant="outline" asChild>
                  <a href="mailto:environment@strathmore.edu">Send Email</a>
                </Button>
              </Card>
              <Card className="p-6 border-green-100 shadow-sm">
                <Phone className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-gray-700 mb-2">+254 703 034 000</p>
                <Button variant="outline" asChild>
                  <a href="tel:+254703034000">Call Now</a>
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              FAQ
            </h2>
            <Card className="p-6 border-green-100 shadow-sm">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-green-100 last:border-none"
                  >
                    <AccordionTrigger className="text-green-800 text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        </section> */}

        <Footer />
      </main>
    </>
  );
}
