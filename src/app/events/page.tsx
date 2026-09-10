"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { Event } from "@/types";

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('events').select('*');
      if (data) setUpcomingEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="pt-25 pb-15 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 max-w-3xl">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-4">Events</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          Discover workshops, hackathons, seminars, and cultural festivals happening on campus.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-foreground/50">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {upcomingEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group"
          >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 p-6 flex flex-col justify-between relative overflow-hidden">
              <span className="relative inline-block px-3 py-1 bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold w-max border border-white/10">
                {event.category}
              </span>
              <h3 className="relative text-2xl font-bold max-w-[80%] leading-tight text-white">{event.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-foreground/70 mb-6 text-sm line-clamp-2">{event.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-foreground/50 mb-0.5">Date</p>
                    <p className="text-sm font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-foreground/50 mb-0.5">Time</p>
                    <p className="text-sm font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-2">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-foreground/50 mb-0.5">Venue</p>
                    <p className="text-sm font-medium">{event.venue}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full">View Details & Register</Button>
            </div>
          </motion.div>
        ))}
        </div>
      )}
    </div>
  );
}
