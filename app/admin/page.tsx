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

  // Fetch authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email;

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, <span className="font-semibold">{email ?? "Admin"}</span>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="hover:shadow-md transition-shadow border border-gray-200"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
              
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/blogs/new"
                className="block px-4 py-2 rounded-md text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 transition"
              >
                ➕ Create new blog post
              </a> 
              <a
                href="/admin/events/new"
                className="block px-4 py-2 rounded-md text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 transition"
              >
                📅 Add new event
              </a>
              <a
                href="/admin/gallery/new"
                className="block px-4 py-2 rounded-md text-sm font-medium text-green-700 border border-green-200 hover:bg-green-50 transition"
              >
                🖼️ Upload gallery images
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
