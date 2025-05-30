import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Recycle,
  TreePine,
  Droplets,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured }: EventCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "clean-up":
        return <Recycle className="h-5 w-5" />;
      case "conservation":
        return <TreePine className="h-5 w-5" />;
      case "education":
        return <Droplets className="h-5 w-5" />;
      case "festival":
        return <Leaf className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card
      className={`border-green-200 hover:shadow-lg transition-shadow overflow-hidden ${
        featured ? "ring-2 ring-green-200" : ""
      }`}
    >
      {featured && (
        <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
          Featured Event
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-48 md:h-auto">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 flex items-center gap-1"
            >
              {getCategoryIcon(event.category)}
              {event.category}
            </Badge>
            <div className="text-sm text-gray-500">
              {event.registered_volunteers}/{event.max_volunteers} registered
            </div>
          </div>

          <h3 className="text-xl font-bold text-green-800 mb-3">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{event.description}</p>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-600" />
              {formattedDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-green-600" />
              {event.start_time} - {event.end_time}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-green-600" />
              {event.location}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-green-600" />
              {event.registered_volunteers} volunteers registered
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
