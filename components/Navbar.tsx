"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/get-involved", label: "Get Involved" },
  ];

  return (
    <nav className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Club Name */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/SESC_Logo.jpg"
              alt="Strathmore Logo"
              className="h-9 w-9 object-contain rounded-full border-2 border-[#c8102e] group-hover:border-[#00205b] transition"
            />
            <span className="font-extrabold text-xl text-[#c8102e] group-hover:text-[#00205b] transition">
              SESC
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium px-2 py-1 rounded transition",
                  pathname === link.href
                    ? "text-[#c8102e] bg-[#fbe9ec]"
                    : "text-[#00205b] hover:text-[#c8102e] hover:bg-[#fbe9ec]"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden flex items-center">
            {/* Future: Add mobile menu button here */}
          </div>
        </div>
      </div>
      {/* Future: Add mobile dropdown menu here */}
    </nav>
  );
}
