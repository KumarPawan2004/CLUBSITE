"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Calendar as CalendarIcon, MapPin, Clock, Edit, Trash2, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { createClient } from "@/lib/supabase/client";
import { Event } from "@/types";

export default function AdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [typeFilter, setTypeFilter] = useState("All Types");
  
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('events').select('*');
      if (data) setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => 
    (activeTab === "upcoming" ? event.status !== "Past" : event.status === "Past") &&
    (typeFilter === "All Types" || event.category === typeFilter) &&
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-foreground/60 mt-1">Manage college events, workshops, and fests.</p>
        </div>
        <Link href="/admin/events/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 border-b border-white/10">
        <button 
          onClick={() => setActiveTab("upcoming")}
          className={cn("pb-3 px-2 font-medium text-sm border-b-2 transition-colors", activeTab === "upcoming" ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground")}
        >
          Upcoming Events
        </button>
        <button 
          onClick={() => setActiveTab("past")}
          className={cn("pb-3 px-2 font-medium text-sm border-b-2 transition-colors", activeTab === "past" ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground")}
        >
          Past Events
        </button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <CustomDropdown 
            icon={<Filter className="w-3.5 h-3.5 text-foreground/50" />}
            value={typeFilter}
            options={["All Types", "Tech", "Cultural", "Workshop", "Sports"]}
            onChange={setTypeFilter}
          />
        </div>
      </div>

      {/* Event Cards */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-foreground/50">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={event.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", event.status === "Upcoming" ? "bg-green-400" : "bg-gray-400")} />
                {event.status}
              </div>
              <div className="absolute top-3 right-3 z-10 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg">
                {event.category}
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            
            <div className="p-5 flex flex-col flex-1 gap-4">
              <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
              
              <div className="flex flex-col gap-2.5 text-sm text-foreground/70">
                <div className="flex items-center gap-2.5">
                  <CalendarIcon className="w-4 h-4 shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{event.venue}</span>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 justify-center">
                  <Eye className="w-4 h-4 mr-2" /> View
                </Button>
                <Button variant="ghost" size="sm" className="px-3 hover:bg-primary/20 text-primary">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="px-3 hover:bg-red-500/20 text-red-400">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
              <CalendarIcon className="w-12 h-12 text-foreground/20 mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p className="text-foreground/50 mt-1">There are no {activeTab} events matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CustomDropdown({ value, options, onChange, icon }: { value: string, options: string[], onChange: (val: string) => void, icon?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl px-3 py-1.5 text-sm text-foreground/80 transition-colors w-full sm:w-auto min-w-[130px] justify-between h-9"
      >
        <div className="flex items-center gap-2">
          {icon}
          {value}
        </div>
        <ChevronDown className={cn("w-3.5 h-3.5 text-foreground/50 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 w-full min-w-[160px] bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 flex flex-col gap-0.5"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={cn(
                "px-3 py-2 text-sm text-left rounded-lg transition-colors",
                value === opt ? "bg-primary/20 text-primary font-medium" : "text-foreground/80 hover:bg-white/10 hover:text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
