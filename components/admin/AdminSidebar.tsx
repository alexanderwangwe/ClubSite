"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Image,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="w-64 bg-white h-screen border-r">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-600">Admin Panel</h1>
      </div>
      <nav className="space-y-1 px-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md",
              pathname === item.href
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </nav>
    </div>
  );
}
