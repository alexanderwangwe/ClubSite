"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "ok" | "error" | "invalid">(null);

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("invalid");
      return;
    }

    // lightweight fallback: open mail client with subscription request.
    // Replace with API call to a newsletter provider in production.
    const subject = encodeURIComponent("Newsletter signup - SESC");
    const body = encodeURIComponent(
      `Please add me to the newsletter: ${email}`
    );
    window.location.href = `mailto:sesc@strathmore.edu?subject=${subject}&body=${body}`;
    setStatus("ok");
    setEmail("");
  }

  return (
    <footer
      className="bg-gray-900 text-gray-100 py-10 mt-12"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="SESC logo"
                width={40}
                height={40}
                className="rounded-full bg-white p-1"
                priority={false}
              />
              <span className="font-bold text-lg text-white">SESC</span>
            </Link>
            <p className="text-sm text-gray-300">
              Strathmore Environment Sustainability Club — empowering students
              to take climate action and build sustainable communities.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.strathmore.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                aria-label="Strathmore University website (opens in new tab)"
              >
                <Image
                  src="/Strathmore-University-Logo.png"
                  alt="Strathmore University"
                  width={100}
                  height={28}
                  className="object-contain bg-white rounded p-1"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-links" className="text-sm">
            <h3 id="footer-links" className="font-semibold mb-3 text-white">
              Quick links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              
              
              <li>
                <Link href="/get-involved" className="hover:underline">
                  Get Involved
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <div className="text-sm">
            <h3 className="font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/gallery" className="hover:underline">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">
                  Events
                </Link>
              </li>           
              
              
            </ul>
          </div>

          {/* Contact & Subscribe */}
          <div className="text-sm">
            <h3 className="font-semibold mb-3 text-white">Connect with us</h3>
            <p className="text-gray-300 mb-2">
              Email:{" "}
              <a href="mailto:sesc@strathmore.edu" className="hover:underline">
                sesc@strathmore.edu
              </a>
            </p>
            <p className="text-gray-300 mb-4">
              Phone:{" "}
              <a href="tel:+254700000000" className="hover:underline">
                +254 700 000 000
              </a>
            </p>

            <div className="flex items-center gap-3 mb-4">
  
              <a
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-400"
                href="https://www.instagram.com/strathmore_sesc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={18} aria-hidden />
              </a>
              
            </div>

            <form
              onSubmit={onSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                Subscribe to newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus(null);
                }}
                placeholder="Your email"
                aria-label="Your email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 border border-transparent text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Subscribe
              </button>
            </form>

            {status === "invalid" && (
              <p className="text-sm text-yellow-300 mt-2">
                Please enter a valid email.
              </p>
            )}
            {status === "ok" && (
              <p className="text-sm text-green-300 mt-2">
                Check your email to confirm signup.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-300 mt-2">
                Signup failed. Please try again later.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Strathmore University - SESC Club.
            All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <span>•</span>
            <span>
              Built with care •{" "}
              <a
                href="https://strathmore.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Strathmore
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
