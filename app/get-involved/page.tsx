"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Leaf,
  Users,
  Heart,
  TreePine,
  Recycle,
  Mail,
  Phone,
  MessageCircle,
  QrCode,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GetInvolvedPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    interests: "",
    message: "",
  })

  const participationWays = [
    {
      title: "Active Membership",
      description:
        "Join as a full member and participate in all club activities, meetings, and decision-making processes.",
      icon: <Users className="h-8 w-8 text-green-600" />,
      commitment: "2-4 hours per week",
      benefits: ["Voting rights", "Leadership opportunities", "Priority event registration", "Club merchandise"],
    },
    {
      title: "Volunteer Participation",
      description: "Participate in specific events and activities without full membership commitment.",
      icon: <Heart className="h-8 w-8 text-green-600" />,
      commitment: "Flexible schedule",
      benefits: [
        "Event participation",
        "Community service hours",
        "Networking opportunities",
        "Environmental education",
      ],
    },
    {
      title: "Project Partnerships",
      description: "Collaborate with us on specific environmental projects or research initiatives.",
      icon: <TreePine className="h-8 w-8 text-green-600" />,
      commitment: "Project-based",
      benefits: [
        "Research collaboration",
        "Academic credit opportunities",
        "Professional development",
        "Publication opportunities",
      ],
    },
    {
      title: "Donations & Sponsorship",
      description: "Support our initiatives through financial contributions or resource donations.",
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      commitment: "One-time or recurring",
      benefits: ["Tax deductions", "Recognition opportunities", "Impact reports", "Sponsor visibility"],
    },
  ]

  const faqs = [
    {
      question: "How do I become a member of the Environmental Club?",
      answer:
        "You can become a member by filling out our membership form below, attending one of our weekly meetings, or joining us at any of our events. Membership is open to all Strathmore University students and staff.",
    },
    {
      question: "What is the time commitment for club membership?",
      answer:
        "Active members typically commit 2-4 hours per week, including attending weekly meetings (1 hour) and participating in events. However, we understand academic priorities and offer flexible participation options.",
    },
    {
      question: "Are there any membership fees?",
      answer:
        "Basic membership is free for all Strathmore University students and staff. We may occasionally request small contributions for specific projects or events, but these are always voluntary.",
    },
    {
      question: "Can I participate if I'm not studying environmental science?",
      answer:
        "We welcome students from all faculties and disciplines. Environmental issues affect everyone, and we value diverse perspectives and skills from different academic backgrounds.",
    },
    {
      question: "How can I stay updated on club activities?",
      answer:
        "Join our WhatsApp group, follow our social media accounts, subscribe to our newsletter, and check our website regularly. We also send weekly updates to all registered members.",
    },
    {
      question: "What kind of events does the club organize?",
      answer:
        "We organize clean-up drives, tree planting initiatives, educational workshops, environmental seminars, awareness campaigns, recycling programs, and community outreach activities.",
    },
    {
      question: "Can I propose my own environmental project?",
      answer:
        "Yes! We encourage member-led initiatives. Present your idea at a club meeting or contact our leadership team. We provide support, resources, and guidance for viable environmental projects.",
    },
    {
      question: "How does the club contribute to academic credit?",
      answer:
        "Many of our activities can count towards community service hours required by various programs. We also offer research collaboration opportunities and can provide recommendation letters for active members.",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code
    alert("QR Code generated! This would typically open a QR code generator.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-green-800">Strathmore Environmental Club</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-700 hover:text-green-900 font-medium">
                Home
              </Link>
              <Link href="/about" className="text-green-700 hover:text-green-900 font-medium">
                About
              </Link>
              <Link href="/blog" className="text-green-700 hover:text-green-900 font-medium">
                Blog
              </Link>
              <Link href="/events" className="text-green-700 hover:text-green-900 font-medium">
                Events
              </Link>
              <Link
                href="/get-involved"
                className="text-green-700 hover:text-green-900 font-medium border-b-2 border-green-600"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Join our community of environmental champions and help create a sustainable future for the Siwaka campus.
            Every action counts, every voice matters.
          </p>
        </div>
      </section>

      {/* Ways to Participate */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Ways to Participate</h2>
            <p className="text-lg text-gray-600">
              Choose the level of involvement that works best for your schedule and interests
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {participationWays.map((way, index) => (
              <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {way.icon}
                    <div>
                      <CardTitle className="text-green-800">{way.title}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2">
                        {way.commitment}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{way.description}</p>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {way.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600">Have questions? Reach out to us through any of these channels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Send us your questions or suggestions</p>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  environment@strathmore.edu
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Speak directly with our team</p>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  +254 703 034 000
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">WhatsApp Group</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Join our active community chat</p>
                <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  Join Group
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
 
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about club membership and participation
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-green-200 rounded-lg px-6">
                <AccordionTrigger className="text-green-800 hover:text-green-900">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" />
              <span className="font-bold text-lg">Strathmore Environmental Club</span>
            </div>
            <p className="text-green-100">Building a sustainable future for our campus community</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
