import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Leaf,
  Recycle,
  TreePine,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import AboutPreview from "@/components/AboutPreview";
import CallToActionStrip from "@/components/CallToActionStrip";
import UpcomingEventHighlight from "@/components/UpcomingEventHighlight";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Herosection />
      <AboutPreview />      
      <UpcomingEventHighlight />
      <CallToActionStrip />
      <Footer />
    </div>
  );
}
