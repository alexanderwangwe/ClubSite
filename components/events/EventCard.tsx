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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group rounded-xl border border-green-100">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
        />
        {event.category && (
          <Badge className="absolute top-3 left-3 bg-green-700 text-white text-xs px-3 py-1 rounded-full shadow">
            {event.category}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-green-900">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {event.description && (
          <p className="text-gray-700 text-sm">
            {event.description.length > 80
              ? event.description.slice(0, 80) + "..."
              : event.description}
          </p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {(() => {
              const dateObj = new Date(event.date);
              return isNaN(dateObj.getTime())
                ? "Date unavailable"
                : dateObj.toLocaleDateString();
            })()}
          </div>
          {event.time && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.time}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>

        {event.register_link && (
          <div className="pt-2 flex justify-end">
            <a
              href={event.register_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="!bg-green-700 hover:bg-green-800 text-white px-6 rounded-md shadow">
                RSVP
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
