import EventEditor from "@/components/admin/EventEditor";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">New Event</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <EventEditor />
      </div>
    </div>
  );
}
