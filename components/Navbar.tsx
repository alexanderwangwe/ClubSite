"use client";

import Link from "next/link";
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
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* Strathmore University Logo */}
            <img
              src="/Strathmore-University-Logo.png"
              alt="Strathmore University Logo"
              className="h-12 object-contain"
            />

            {/* Divider */}
            <span className="text-gray-700">|</span>

            {/* SESC Logo + Text */}
            <div className="flex items-center space-x-2">
              <img
                src="/SESC_Logo.jpg"
                alt="SESC Logo"
                className="h-9 w-9 object-contain rounded-full border-2 border-[#c8102e] group-hover:border-[#00205b] transition"
              />
              <span className="font-extrabold text-xl text-[#c8102e] group-hover:text-[#00205b] transition">
                SESC
              </span>
            </div>
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

          {/* Mobile Nav Placeholder */}
          <div className="md:hidden flex items-center">
            {/* TODO: Add mobile menu toggle */}
          </div>
        </div>
      </div>
    </nav>
  );
}
