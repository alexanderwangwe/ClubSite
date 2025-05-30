import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, Users, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getEvents } from "@/lib/api";
import type { Event } from "@/lib/types";

export default async function EventsPage() {
  const { events, total } = await getEvents();
  const featuredEvent = events.find((event) => event.featured);
  const upcomingEvents = events.filter((event) => !event.featured);

  const eventCategories = [
    "All Events",
    "Clean-up",
    "Education",
    "Conservation",
    "Festival",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Environmental Events
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Join our community initiatives, workshops, and conservation
            activities. Together, we're making a lasting impact on our campus
            environment.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {eventCategories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={
                    index === 0
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Featured Event
              </h2>
              <EventCard event={featuredEvent} featured />
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">
              Mark your calendar and join us in making a difference
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {total > 6 && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Load More Events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sign up to receive updates about our events, blog posts, and
                environmental initiatives. Be the first to know about upcoming
                activities and join our growing community of environmental
                advocates.
              </p>
            </div>
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
