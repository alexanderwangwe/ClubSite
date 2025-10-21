
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import AboutPreview from "@/components/AboutPreview";
import CallToActionStrip from "@/components/CallToActionStrip";
import UpcomingEventHighlight from "@/components/UpcomingEventHighlight";
import GalleryGrid from "@/components/events/GalleryGrid";
import GalleryCarousel from "@/components/GalleryCarousel";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      <Herosection />
      <AboutPreview />  
      <UpcomingEventHighlight />
      <GalleryCarousel />
      <CallToActionStrip />
      <Footer />
    </div>
  );
}
