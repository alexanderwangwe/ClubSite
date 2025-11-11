"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/get-involved", label: "Get Involved" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    }
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-green-50 via-white to-green-50 backdrop-blur-sm border-b border-green-100/60 shadow-[0_1px_6px_rgba(0,0,0,0.04)] sticky top-0 z-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 sm:h-20">
          {/* ---------- Brand Section ---------- */}
          <Link
            href="/"
            className="flex flex-col items-start sm:items-center group transition-all"
          >
            <Image
              src="/wastewiselogo.png"
              alt="WasteWise Logo"
              width={140}
              height={48}
              className="h-10 sm:h-12 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="text-[0.7rem] sm:text-xs text-green-800/70 italic mt-1 tracking-wide 
                            group-hover:text-green-900 transition-colors duration-300">
              A Strathmore & SESC Initiative
            </span>
          </Link>

          {/* ---------- Desktop Nav ---------- */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-5 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-medium px-2 py-1 transition duration-200 rounded-md text-sm lg:text-base",
                  pathname === link.href
                    ? "text-green-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-green-700 after:rounded-full"
                    : "text-gray-700 hover:text-green-700 hover:bg-green-100/50"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ---------- Mobile Menu Button ---------- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="text-gray-700 hover:text-green-700 p-2 focus:outline-none transition"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
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

        {/* ---------- Mobile Menu ---------- */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-green-100 bg-white/95 backdrop-blur-sm"
            role="menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block font-medium px-3 py-2 rounded transition duration-200",
                    pathname === link.href
                      ? "text-green-800 bg-green-50"
                      : "text-gray-700 hover:text-green-700 hover:bg-green-50"
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
