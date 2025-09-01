import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Users,
  Heart,
  Recycle,
  TreePine,
  Mail,
  Target,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Wanjiku",
      role: "Club President",
      year: "4th Year Environmental Science",
      bio: "Passionate about sustainable development and community engagement.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "David Kimani",
      role: "Vice President",
      year: "3rd Year Business Administration",
      bio: "Focused on creating sustainable business practices and environmental policies.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Grace Achieng",
      role: "Secretary",
      year: "2nd Year Communications",
      bio: "Dedicated to spreading environmental awareness through effective communication.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Ochieng",
      role: "Events Coordinator",
      year: "3rd Year Engineering",
      bio: "Organizing impactful environmental initiatives and community clean-up drives.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  const coreValues = [
    {
      icon: <TreePine className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description:
        "Promoting long-term environmental health through sustainable practices and education.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community",
      description:
        "Building a strong network of environmentally conscious students and staff.",
    },
    {
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      title: "Action",
      description:
        "Taking concrete steps to address environmental challenges in our community.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Responsibility",
      description:
        "Encouraging personal and collective responsibility for environmental stewardship.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <Badge className="bg-green-500/20 text-green-100 px-3 py-1">
              <Leaf className="h-4 w-4 mr-1" /> Sustainability in Action
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Club</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Learn about our journey, mission, and the passionate team working
            towards a cleaner, more sustainable Siwaka campus.
          </p>
        </div>
      </section>

      {/* Club Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="space-y-4 text-gray-600">
              <p>
                The Strathmore Environment Sustainability Club (SESC) is a
                student-led organization at Strathmore University dedicated to
                promoting environmental conservation and sustainability.
                Established in 2014, SESC engages students, faculty, and alumni
                in impactful activities like tree planting, recycling, waste
                management, and eco-friendly innovation.
              </p>
              <p>
                Our mission is to inspire change through education, outreach,
                and active involvement in issues such as pollution, climate
                change, green technology, and organic living.
              </p>
              <p>
                Our purpose is to advocate for sustainability, energy
                conservation, pollution reduction, and organic living.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-green-700">Founded</h4>
                <p className="text-gray-600">2014 under University Policy</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h4 className="font-semibold text-green-700">Membership</h4>
                <p className="text-gray-600">100+ active members</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Environmental Club Activities"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-green-600 opacity-10 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600">
              Dedicated student leaders driving environmental change on campus
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="border-green-200 hover:shadow-lg transition-transform hover:-translate-y-2"
              >
                <CardHeader className="text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-green-800">{member.name}</CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{member.year}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-3 text-green-600">
                    <Link href="#">
                      <Users className="h-5 w-5 hover:text-green-800" />
                    </Link>
                    <Link href="#">
                      <Mail className="h-5 w-5 hover:text-green-800" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Siwaka Waste Management Project */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Siwaka Waste Management Project"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Siwaka Waste Management Project
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Our flagship initiative represents our commitment to creating a
                comprehensive solution to campus waste challenges.
              </p>
              <p>
                The project focuses on three areas: waste reduction through
                education, improved recycling infrastructure, and community
                engagement.
              </p>

              {/* Achievements */}
              <div className="bg-white p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-3">
                  Project Achievements:
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Installation of 25 new recycling stations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    40% reduction in general waste
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Training of 100+ student ambassadors
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    Partnerships with local recycling companies
                  </li>
                </ul>
              </div>             
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-800 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us</h2>
        <p className="text-xl mb-8 text-green-100">
          Be part of the change you want to see
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-green-800 hover:bg-green-50 flex items-center gap-2"
          >
            <Link href="/get-involved">
              <Users className="h-5 w-5" /> Become a Member
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border-white text-white hover:bg-white hover:text-green-800 flex items-center gap-2"
          >
            <Link href="/events">
              <Target className="h-5 w-5" /> View Our Events
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
