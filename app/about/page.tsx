import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TreePine,
  Recycle,
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
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Our Club
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Learn about our journey, mission, and the passionate team working
            towards a cleaner, more sustainable Siwaka campus.
          </p>
        </div>
      </section>

      {/* Club Background */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The Strathmore University Environmental Club was founded in
                  2019 by a group of passionate students who recognized the
                  urgent need for environmental action on campus. What started
                  as a small initiative has grown into one of the most active
                  student organizations at Strathmore University.
                </p>
                <p>
                  Our club emerged from the observation that the Siwaka campus,
                  while beautiful, faced significant challenges with waste
                  management and environmental awareness. Students noticed
                  increasing litter, inadequate recycling systems, and a general
                  lack of environmental consciousness among the community.
                </p>
                <p>
                  Since our inception, we have organized over 50 clean-up
                  drives, planted more than 200 trees, and educated thousands of
                  students about sustainable practices. Our efforts have
                  contributed to a 40% reduction in campus litter and the
                  implementation of comprehensive recycling programs.
                </p>
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
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Mission, Vision & Values
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To promote environmental awareness and sustainable practices
                  within the Strathmore University community through education,
                  advocacy, and direct action initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To create a campus community where environmental stewardship
                  is a shared value, leading to a cleaner, greener, and more
                  sustainable Siwaka for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">Our Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Clean-up Events</div>
                  <div className="text-2xl font-bold text-green-600">200+</div>
                  <div className="text-sm text-gray-600">Trees Planted</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div>
            <h3 className="text-2xl font-bold text-green-800 text-center mb-8">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <Card
                  key={index}
                  className="border-green-200 text-center hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="mx-auto mb-2">{value.icon}</div>
                    <CardTitle className="text-green-800">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="border-green-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-green-800">
                    {member.name}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-500 mb-2">{member.year}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Siwaka Waste Management Project */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                  Our flagship initiative, the Siwaka Waste Management Project,
                  represents our commitment to creating a comprehensive solution
                  to campus waste challenges. This project aligns perfectly with
                  our club's core mission of promoting sustainable practices.
                </p>
                <p>
                  The project focuses on three key areas: waste reduction
                  through education, improved recycling infrastructure, and
                  community engagement. We work closely with university
                  administration, local waste management companies, and student
                  organizations to implement lasting change.
                </p>
                <div className="bg-white p-6 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3">
                    Project Achievements:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Installation of 25 new recycling stations across campus
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      40% reduction in general waste through composting programs
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Training of 100+ student waste management ambassadors
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                      Partnership with local recycling companies for proper
                      waste disposal
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 text-green-100">
            Be part of the change you want to see in our campus community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-800 hover:bg-green-50"
            >
              <Link href="/get-involved">Become a Member</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              <Link href="/events">View Our Events</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
