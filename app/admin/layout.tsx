"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white flex flex-col">
        <div className="p-6 border-b border-green-700 flex flex-col items-center">
          <img
            src="/Logo.png"
            alt="SESC Logo"
            className="h-12 mb-2"
            style={{ objectFit: "contain" }}
          />
          <h2 className="text-xl font-bold">SESC Admin Portal</h2>
          <p className="text-xs text-green-200 mt-1">Agents of Change</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-green-700 text-white"
                    : "text-green-100 hover:bg-green-700 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-center bg-red-600 hover:bg-red-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}
