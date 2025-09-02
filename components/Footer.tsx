// ...existing code...
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Copyright */}
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Strathmore University SESC Club.
            All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <a
              href="https://www.strathmore.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/Strathmore-University-Logo.png"
                alt="Strathmore University Logo"
                className="h-10 w-auto object-contain bg-white rounded shadow p-1"
              />
            </a>
            <a href="#">
              <img
                src="/SESC_Logo.jpg"
                alt="SESC Logo"
                className="h-10 w-auto object-contain bg-white rounded shadow p-1"
              />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/blog" className="hover:underline">Blog</a></li>
            <li><a href="/events" className="hover:underline">Events</a></li>
            <li><a href="/get-involved" className="hover:underline">Get Involved</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <p className="text-sm mb-2">Email: sesc@strathmore.edu</p>
          <p className="text-sm mb-4">Phone: +254 700 000 000</p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/strathmoreuniversity" aria-label="Facebook" className="hover:text-blue-500" target="_blank" rel="noopener noreferrer"><FaFacebook size={20} /></a>
            <a href="https://twitter.com/StrathU" aria-label="Twitter" className="hover:text-sky-400" target="_blank" rel="noopener noreferrer"><FaTwitter size={20} /></a>
            <a href="https://www.instagram.com/strathmoreuniversity" aria-label="Instagram" className="hover:text-pink-500" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a>
            <a href="https://www.linkedin.com/school/strathmore-university/" aria-label="LinkedIn" className="hover:text-blue-300" target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
