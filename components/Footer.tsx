"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "ok" | "error" | "invalid">(null);

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  function onSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus("invalid");
      return;
    }

    const subject = encodeURIComponent("Newsletter signup - SESC");
    const body = encodeURIComponent(`Please add me to the newsletter: ${email}`);
    window.location.href = `mailto:sesc@strathmore.edu?subject=${subject}&body=${body}`;
    setStatus("ok");
    setEmail("");
  }

  return (
    <footer className="bg-gray-900 text-gray-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* ---------- Brand & Partners ---------- */}
          <div className="space-y-6">
            {/* Main Logo */}
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="SESC logo"
                width={58}
                height={48}
                className="rounded-full bg-white p-1"
              />
              <span className="font-bold text-xl text-white">SESC</span>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed">
              Empowering students
              to take environmental action and build sustainable communities.
            </p>

            {/* Partner Logos */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <Image
                  src="/wastewiselogo.png"
                  alt="WasteWise logo"
                  width={80}
                  height={28}
                  className="object-contain bg-white rounded p-1"
                />
                <span className="text-xs text-gray-300">WasteWise</span>
              </div>

              <div className="flex items-center gap-2">
                <Image
                  src="/Strathmore-University-Logo.png"
                  alt="Strathmore University logo"
                  width={100}
                  height={28}
                  className="object-contain bg-white rounded p-1"
                />
                <span className="text-xs text-gray-300">Strathmore University</span>
              </div>
            </div>
          </div>

          {/* ---------- Quick Links ---------- */}
          <nav className="text-sm">
            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/get-involved" className="hover:underline">Get Involved</Link></li>
            </ul>
          </nav>

          {/* ---------- Resources ---------- */}
          <div className="text-sm">
            <h3 className="font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/events" className="hover:underline">Events</Link></li>
            </ul>
          </div>

          {/* ---------- Contact & Subscribe ---------- */}
          <div className="text-sm">
            <h3 className="font-semibold mb-3 text-white">Connect with us</h3>
            <p className="text-gray-300 mb-2">
              Email:{" "}
              <a
                href="mailto:strathmoreenvironmentalclub@gmail.com"
                className="hover:underline"
              >
                strathmoreenvironmentalclub@gmail.com
              </a>
            </p>

            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://www.instagram.com/strathmore_sesc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>

            <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus(null);
                }}
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Subscribe
              </button>
            </form>

            {status === "invalid" && <p className="text-yellow-300 mt-2">Please enter a valid email.</p>}
            {status === "ok" && <p className="text-green-300 mt-2">Check your email to confirm signup.</p>}
            {status === "error" && <p className="text-red-300 mt-2">Signup failed. Please try again later.</p>}
          </div>
        </div>

        {/* ---------- Footer Bottom ---------- */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center md:text-left text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Strathmore University · WasteWise · SESC.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
