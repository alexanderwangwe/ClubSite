"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Leaf, Users, Heart, Recycle, Mail, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function GetInvolvedPage() {
  const participationWays = [
    {
      title: "Become a Member",
      description: "Join as an active member and help drive environmental change on campus.",
      icon: <Users className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Volunteer",
      description: "Support specific events and clean-up activities whenever you are available.",
      icon: <Heart className="h-8 w-8 text-green-600" />,
    },
    {
      title: "Donate or Sponsor",
      description: "Contribute resources or financial support to our initiatives.",
      icon: <Recycle className="h-8 w-8 text-green-600" />,
    },
  ]

  const faqs = [
    {
      question: "How do I join?",
      answer: "Simply fill out our membership form or attend one of our weekly meetings. Membership is free.",
    },
    {
      question: "Do I need to study Environmental Science?",
      answer: "No. We welcome students from all faculties. Everyone can play a role in sustainability.",
    },
    {
      question: "What events do you organize?",
      answer: "Clean-ups, tree planting, recycling workshops, and awareness campaigns throughout the year.",
    },
  ]

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <Leaf className="h-10 w-10 mx-auto mb-4 text-green-200" />
          <h1 className="text-4xl font-bold mb-4">Get Involved</h1>
          <p className="text-lg text-green-100">
            Every action counts. Join us to make Siwaka cleaner and more sustainable.
          </p>
        </div>
      </section>

      {/* Ways to Participate */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-10">Ways to Participate</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {participationWays.map((way, index) => (
              <Card key={index} className="border-green-200 hover:shadow-md transition">
                <CardHeader className="flex flex-col items-center">
                  {way.icon}
                  <CardTitle className="mt-3 text-green-800">{way.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-sm">{way.description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-green-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-green-800 mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Mail className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-gray-700">environment@strathmore.edu</p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <p className="text-gray-700">+254 703 034 000</p>
            </div>            
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-green-200 rounded-lg px-4">
                <AccordionTrigger className="text-green-800">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 text-center">
        <p className="text-sm">© 2025 Strathmore Environmental Club · #SiwakaClean</p>
      </footer>
    </div>
  </>
);
}
