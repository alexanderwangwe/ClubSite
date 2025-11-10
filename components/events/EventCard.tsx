"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* --- Event Card --- */}
      <Card
        onClick={() => setOpen(true)}
        className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group rounded-xl border border-green-100 cursor-pointer"
      >
        <div className="relative">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={600}
            height={300}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-xl"
          />
          {event.category && (
            <Badge className="absolute top-3 left-3 bg-green-700 text-white text-xs px-3 py-1 rounded-full shadow">
              {event.category}
            </Badge>
          )}
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-green-900">
            {event.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {event.description && (
            <p className="text-gray-700 text-sm">
              {event.description.length > 80
                ? event.description.slice(0, 80) + "..."
                : event.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {(() => {
                const dateObj = new Date(event.date);
                return isNaN(dateObj.getTime())
                  ? "Date unavailable"
                  : dateObj.toLocaleDateString();
              })()}
            </div>
            {event.time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            {event.location}
          </div>

          {event.register_link && (
            <div className="pt-2 flex justify-end">
              <a
                href={event.register_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="!bg-green-700 hover:bg-green-800 text-white px-6 rounded-md shadow">
                  RSVP
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- Popout Modal --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              {/* Scrollable content */}
              <div className="max-h-[90vh] overflow-y-auto p-6 space-y-5">
                <h2 className="text-2xl font-bold text-green-900">
                  {event.title}
                </h2>

                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-contain w-full"
                />

                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>

                {event.register_link && (
                  <div className="pt-4 flex justify-end">
                    <a
                      href={event.register_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="!bg-green-700 hover:bg-green-800 text-white px-6 rounded-md shadow">
                        RSVP
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
