import EventCard from "./EventCard";
import { Event } from "@/lib/types";

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-muted-foreground">No events available.</p>
      )}
    </div>
  );
}
