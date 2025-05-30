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
        aria-label="Facebook"
      >
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-5 w-5" />
        </a>
      </Button>
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-green-100 hover:text-white hover:bg-green-800"
        aria-label="Instagram"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </Button>
      <Button
        asChild
        size="sm"
        variant="ghost"
        className="text-green-100 hover:text-white hover:bg-green-800"
        aria-label="Twitter"
      >
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-6 w-6" aria-hidden="true" />
              <span className="font-bold text-lg">
                Strathmore Environmental Club
              </span>
            </div>
            <p className="text-green-100 mb-4">
              Building a sustainable future for our campus community through
              environmental action and education.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-green-100">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>+254 703 034 000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>environment@strathmore.edu</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
                <span>Strathmore University, Nairobi</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
          <p>
            &copy; {new Date().getFullYear()} Strathmore University
            Environmental Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
