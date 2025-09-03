import { Calendar, Clock, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title || "Event image"}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {event.category && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {event.category}
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
        {event.description && (
          <CardDescription>{event.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {event.date ? new Date(event.date).toLocaleDateString() : "TBA"}
          </div>
          {event.time && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {event.time}
            </div>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {event.location || "Location TBA"}
        </div>

        <div className="flex items-center justify-between">
          {event.attendees && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              {event.attendees} attending
            </div>
          )}
          {event.register_link ? (
            <a
              href={event.register_link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                RSVP
              </Button>
            </a>
          ) : (
            <span className="text-sm text-muted-foreground ml-auto">
              No registration required
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
