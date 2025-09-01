import { Leaf, ArrowLeft, Users, Target, Award, TreePine, Recycle, Lightbulb, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <Navbar />
{/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4 text-balance">
            About SESC
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
            The Strathmore Environmental Sustainability Club (SESC) is dedicated to creating a cleaner,
            greener community through awareness, action, and collaboration with students, residents, and partners.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-3xl font-bold font-serif text-foreground">Our Mission</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                To inspire and empower the Strathmore community to take meaningful action for a sustainable
                environment through education, research, advocacy, and hands-on initiatives.
              </p>
              <div className="flex items-center mb-6">
                <Lightbulb className="h-8 w-8 text-accent mr-3" />
                <h3 className="text-3xl font-bold font-serif text-foreground">Our Vision</h3>
              </div>
              <p className="text-lg text-muted-foreground text-pretty">
                A future where every member of Strathmore University actively participates in environmental
                stewardship and models sustainable practices for the wider society.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/heroimage.png"
                alt="SESC students during a cleanup activity"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-serif text-foreground mb-4">Our Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide SESC in its environmental advocacy and community engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-3">Community First</h4>
              <p className="text-muted-foreground text-pretty">
                We work hand-in-hand with students, residents, and partners to build collective action for change.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Recycle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-3">Sustainability</h4>
              <p className="text-muted-foreground text-pretty">
                Every initiative is designed to be long-term, practical, and impactful for future generations.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-xl font-bold text-foreground mb-3">Education</h4>
              <p className="text-muted-foreground text-pretty">
                We believe knowledge drives action. Awareness campaigns and research are at the heart of SESC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-3xl font-bold font-serif text-foreground">Featured Projects</h3>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A glimpse of our ongoing efforts to create a cleaner and more sustainable community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src="/heroimage.png"
                alt="Siwaka Waste Management"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <TreePine className="h-5 w-5 text-primary mr-2" />
                  <h4 className="text-xl font-bold text-foreground">Siwaka Waste Management</h4>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Tackling waste issues around Siwaka estate through awareness, organized cleanup days,
                  and improved disposal practices.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src="/heroimage.png"
                alt="Campus Cleanups"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Recycle className="h-5 w-5 text-accent mr-2" />
                  <h4 className="text-xl font-bold text-foreground">Campus Cleanups</h4>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Regular student-led cleanups within campus and neighboring communities to raise awareness
                  and encourage responsible disposal.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src="/heroimage.png"
                alt="Recycling Awareness"
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-5 w-5 text-primary mr-2" />
                  <h4 className="text-xl font-bold text-foreground">Recycling Awareness</h4>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Campaigns and workshops to educate the Strathmore community on reducing waste
                  and adopting recycling as a daily habit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold font-serif text-foreground mb-4">Our Impact</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, we’re building momentum for environmental action at Strathmore and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">20+</div>
              <div className="text-muted-foreground">Events Organized</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-muted-foreground">Volunteer Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold font-serif text-foreground mb-4">Join SESC Today</h3>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Be part of a vibrant community of students leading the change toward a sustainable Strathmore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Users className="mr-2 h-5 w-5" />
                Join Our Community
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
