"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl text-green-800">
              Strathmore Environmental Club
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={cn(
                "text-green-700 hover:text-green-900 font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:transform after:scale-x-0 after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                isActive("/") && "after:scale-x-100"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-green-700 hover:text-green-900 font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:transform after:scale-x-0 after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                isActive("/about") && "after:scale-x-100"
              )}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-green-700 hover:text-green-900 font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:transform after:scale-x-0 after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                isActive("/blog") && "after:scale-x-100"
              )}
            >
              Blog
            </Link>
            <Link
              href="/events"
              className={cn(
                "text-green-700 hover:text-green-900 font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:transform after:scale-x-0 after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                isActive("/events") && "after:scale-x-100"
              )}
            >
              Events
            </Link>
            <Link
              href="/get-involved"
              className={cn(
                "text-green-700 hover:text-green-900 font-medium transition-colors relative",
                "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 after:transform after:scale-x-0 after:transition-transform after:duration-300",
                "hover:after:scale-x-100",
                isActive("/get-involved") && "after:scale-x-100"
              )}
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
