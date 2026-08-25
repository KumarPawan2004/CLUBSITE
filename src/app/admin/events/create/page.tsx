"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save, Send, Calendar as CalendarIcon, Clock, MapPin, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CreateEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [type, setType] = useState("Tech");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground/70" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
          <p className="text-foreground/60 mt-1">Schedule and publish a new event for the college.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Main Content Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Banner Upload */}
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" /> Event Banner
            </h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl h-64 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer group bg-black/20">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-6 h-6 text-foreground/50 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-base font-medium">Click to upload banner image</p>
                <p className="text-sm text-foreground/50 mt-1">Recommended size: 1920x1080 (16:9 ratio)</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col gap-6">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/10 pb-4">
              <AlignLeft className="w-5 h-5 text-primary" /> Event Details
            </h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Event Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Annual Tech Symposium 2026" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description about the event..." 
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Schedule & Location</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" /> Date
                </label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Time
                </label>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Venue
                </label>
                <input 
                  type="text" 
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g., Main Auditorium"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Registration & Type</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Event Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
                >
                  <option>Tech</option>
                  <option>Cultural</option>
                  <option>Workshop</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Registration Link (Optional)</label>
                <input 
                  type="url" 
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  placeholder="https://forms.google.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 sticky top-24">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Actions</h3>
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full gap-2 justify-center">
                <Send className="w-4 h-4" /> Publish Event
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-center">
                <Save className="w-4 h-4" /> Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
