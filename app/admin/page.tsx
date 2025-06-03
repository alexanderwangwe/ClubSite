import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Calendar,
  Image,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  // Fetch statistics
  const [
    { count: blogCount },
    { count: eventCount },
    { count: galleryCount },
    { count: subscriberCount },
  ] = await Promise.all([
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("event_gallery").select("*", { count: "exact", head: true }),
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      title: "Blog Posts",
      value: blogCount || 0,
      icon: FileText,
      description: "Total published articles",
    },
    {
      title: "Events",
      value: eventCount || 0,
      icon: Calendar,
      description: "Upcoming and past events",
    },
    {
      title: "Gallery Items",
      value: galleryCount || 0,
      icon: Image,
      description: "Event photos and media",
    },
    {
      title: "Subscribers",
      value: subscriberCount || 0,
      icon: Users,
      description: "Newsletter subscribers",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/blog/new"
                className="block p-2 text-sm text-green-600 hover:bg-green-50 rounded"
              >
                Create new blog post
              </a>
              <a
                href="/admin/events/new"
                className="block p-2 text-sm text-green-600 hover:bg-green-50 rounded"
              >
                Add new event
              </a>
              <a
                href="/admin/gallery/new"
                className="block p-2 text-sm text-green-600 hover:bg-green-50 rounded"
              >
                Upload gallery images
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
