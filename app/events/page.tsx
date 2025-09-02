import { Calendar, Clock, MapPin, Users, ArrowLeft, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/Navbar"
import Link from "next/link"
import Footer from "@/components/Footer"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Siwaka Cleanup Day",
      date: "2024-09-14",
      time: "9:00 AM",
      location: "Siwaka Estate",
      description: "Join fellow students in a community cleanup around Siwaka estate to promote a cleaner environment.",
      image: "/heroimage.png",
      attendees: 60,
      category: "Cleanup",
    },
    {
      id: 2,
      title: "Campus Tree Planting",
      date: "2024-09-28",
      time: "8:30 AM",
      location: "Strathmore University Grounds",
      description: "Help us plant trees across campus and contribute to a greener learning environment.",
      image: "/heroimage.png",
      attendees: 85,
      category: "Conservation",
    },
    {
      id: 3,
      title: "Recycling Awareness Workshop",
      date: "2024-10-05",
      time: "2:00 PM",
      location: "STMB Auditorium",
      description: "Interactive workshop on practical recycling methods and how to reduce waste in daily life.",
      image: "/heroimage.png",
      attendees: 45,
      category: "Workshop",
    },
    {
      id: 4,
      title: "Environmental Debate",
      date: "2024-10-19",
      time: "6:00 PM",
      location: "Main Auditorium",
      description: "Engage in a debate on climate policy and sustainability, featuring student and guest speakers.",
      image: "/heroimage.png",
      attendees: 120,
      category: "Debate",
    },
    {
      id: 5,
      title: "Sustainability Fair",
      date: "2024-11-02",
      time: "10:00 AM",
      location: "University Courtyard",
      description: "Discover eco-friendly innovations, sustainable products, and community initiatives from students and partners.",
      image: "/heroimage.png",
      attendees: 200,
      category: "Fair",
    },
    {
      id: 6,
      title: "Community Outreach Program",
      date: "2024-11-16",
      time: "9:30 AM",
      location: "Riverside Community",
      description: "Partnering with local residents to share sustainable practices and support neighborhood cleanups.",
      image: "/heroimage.png",
      attendees: 50,
      category: "Outreach",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
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
            Upcoming SESC Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl text-pretty">
            Be part of our journey toward a sustainable future. From cleanups to workshops, debates, and fairs —
            there’s always a way to get involved and make an impact with SESC.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{event.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-balance">{event.title}</CardTitle>
                  <CardDescription className="text-pretty">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees} attending
                    </div>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">RSVP</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Want to Start Something New?</h3>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Do you have an idea for an environmental initiative or event? Share it with SESC and let’s make it happen together.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Suggest an Event
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}
