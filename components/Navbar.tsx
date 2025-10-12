"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/get-involved", label: "Get Involved" },
  ];

  return (
    <nav className="bg-white border-b border-green-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group"
          >
            {/* Strathmore University Logo */}
            <img
              src="/Strathmore-University-Logo.png"
              alt="Strathmore University Logo"
              className="h-8 sm:h-12 object-contain"
            />

            {/* Divider */}
            <span className="text-gray-700 hidden sm:inline">|</span>

            {/* SESC Logo + Text */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <img
                src="/Logo.png"
                alt="SESC Logo"
                className="h-6 w-6 sm:h-8 sm:w-8 object-cover rounded-full border border-[#c8102e] group-hover:border-[#00205b] transition-colors duration-200 flex-shrink-0"
              />
              <span className="font-bold text-base sm:text-lg lg:text-xl text-[#c8102e] group-hover:text-[#00205b] transition-colors duration-200 whitespace-nowrap">
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
                    ? "text-[#c8102e] bg-[#e9eafb]"
                    : "text-[#00205b] hover:text-[#c8102e] hover:bg-[#fbe9ec]"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#00205b] hover:text-[#c8102e] focus:outline-none focus:text-[#c8102e] p-2"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-green-100 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block font-medium px-3 py-2 rounded transition",
                    pathname === link.href
                      ? "text-[#c8102e] bg-[#e9eafb]"
                      : "text-[#00205b] hover:text-[#c8102e] hover:bg-[#fbe9ec]"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
