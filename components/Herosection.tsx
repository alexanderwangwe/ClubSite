import { Badge, Leaf } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";


export default function Herosection() {
  return (
    <section className="grid md:grid-cols-2 gap-8 px-12 py-16 items-center bg-green-50">
      {/* Left */}
      <div>
        <h1 className="text-5xl font-bold text-green-800">
          Strathmore Environment and Sustainability Club
        </h1>
        <div className="flex justify-center mb-4">
            <Badge className="bg-green-500/20 text-green-100 px-3 py-1">
              <Leaf className="h-4 w-4 mr-1" /> Sustainability in Action
            </Badge>
          </div>
        <a
          href="/about"
          className="mt-6 inline-block px-6 py-3 bg-green-700 text-white rounded-md hover:bg-green-900 transition"
        >
          Learn More
        </a>
      </div>

      {/* Right */}
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-full h-full bg-green-200 rounded-[60%] rotate-6"></div>
        <img
          src="/heroimage.png"
          alt="Volunteers"
          width={500}
          height={400}
          className="relative rounded-[40%]"
        />
      </div>
    </section>
  );
}
