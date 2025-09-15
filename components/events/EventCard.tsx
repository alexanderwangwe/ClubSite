import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          alt={event.title}
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
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          {event.description
            ? event.description.length > 80
              ? event.description.slice(0, 80) + "..."
              : event.description
            : ""}
        </p>
            {
              (() => {
                const dateObj = new Date(event.date);
                return isNaN(dateObj.getTime())
                  ? "Date unavailable"
                  : dateObj.toLocaleDateString();
              })()
            }
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(event.date).toLocaleDateString()}
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
          {event.location}
        </div>

        <div className="flex justify-end">
          {event.register_link && (
            <a
              href={event.register_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                RSVP
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
