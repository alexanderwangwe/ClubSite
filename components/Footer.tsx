import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialLinks() {
  return (
    <div className="flex space-x-4">     
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-green-100 hover:text-white hover:bg-green-800"
        aria-label="Instagram"
      >
        <a
          href="https://www.instagram.com/strathmore_sesc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#c8102e] py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/SESC_Logo.jpg"
            alt="Strathmore Logo"
            className="h-8 w-8 object-contain rounded-full border-2 border-[#c8102e]"
          />
          <span className="font-extrabold text-lg text-[#c8102e]">Strathmore Waste Club</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 text-center">Agents of change for a better, greener future.</p>
        <div className="flex gap-6 items-center mb-4">
          <a href="mailto:strathmoreenvironmentalclub@strathmore.edu" className="text-[#00205b] hover:text-[#c8102e] text-sm flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a href="https://maps.app.goo.gl/StrathmoreUniversity" target="_blank" rel="noopener noreferrer" className="text-[#00205b] hover:text-[#c8102e] text-sm flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Nairobi
          </a>
          <SocialLinks />
        </div>
        <div className="text-xs text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Strathmore University Waste Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
