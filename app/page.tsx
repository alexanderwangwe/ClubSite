import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Leaf,
  Recycle,
  TreePine,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="font-bold text-xl text-green-800">
                Strathmore Environmental Club
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Blog
              </Link>
              <Link
                href="/events"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Events
              </Link>
              <Link
                href="/get-involved"
                className="text-green-700 hover:text-green-900 font-medium"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Towards Cleaner Communities
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-green-100">
            Join the Movement
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-green-100">
            Together, we're building a sustainable future for our campus
            community through environmental awareness, waste management, and
            collective action.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-800 hover:bg-green-50"
            >
              <Link href="/get-involved">Join the Club</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              <Link href="/events">Upcoming Events</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-800"
            >
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering the Strathmore University community to embrace
              sustainable practices and environmental stewardship through
              education, action, and collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">
                  Waste Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Promoting sustainable waste management practices across the
                  Siwaka campus through education and practical initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">
                  Community Action
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Organizing clean-up drives, awareness campaigns, and volunteer
                  activities to engage the entire university community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <TreePine className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-green-800">
                  Environmental Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Providing educational resources and workshops on environmental
                  conservation, recycling, and sustainable living practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join hundreds of students already making Siwaka a cleaner, greener
            place
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
              <Link href="/blog">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
