"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, CheckCircle2, Quote, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_TESTIMONIALS = [
  { id: 1, name: "Priya Singh", course: "B.Tech CSE - Alumni 2024", text: "The tech club provided me with the platform to showcase my skills and learn from the best. The hackathons were a turning point in my career.", status: "Approved", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80" },
  { id: 2, name: "Rahul Verma", course: "BBA - 3rd Year", text: "Being part of the organizing committee for the cultural fest was an amazing experience. It taught me invaluable management skills.", status: "Pending", photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=80" },
  { id: 3, name: "Anjali Gupta", course: "B.Tech ECE - Alumni 2025", text: "The robotics workshops were hands-on and incredibly informative. I highly recommend joining the club.", status: "Approved", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80" },
  { id: 4, name: "Amit Kumar", course: "B.Sc Physics - 2nd Year", text: "I found a great community here. The events are well-organized and everyone is very supportive.", status: "Approved", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
];

export default function AdminTestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-foreground/60 mt-1">Manage reviews and testimonials from students and alumni.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm">
            <Filter className="w-4 h-4 text-foreground/50" />
            <select className="bg-transparent border-none outline-none text-foreground/80 cursor-pointer">
              <option>All Status</option>
              <option>Approved</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((testimonial, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={testimonial.id}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:-translate-y-1 transition-transform border border-white/5 relative"
          >
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-12 h-12" />
            </div>

            <div className="flex items-start gap-4 z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={testimonial.photo} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover bg-white/5 shadow-md" />
              <div>
                <h3 className="font-bold text-base leading-tight">{testimonial.name}</h3>
                <p className="text-xs text-foreground/60">{testimonial.course}</p>
              </div>
            </div>

            <div className="z-10 flex-1 py-2">
              <p className="text-sm text-foreground/80 italic line-clamp-4 leading-relaxed">&quot;{testimonial.text}&quot;</p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between z-10">
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5",
                testimonial.status === "Approved" 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              )}>
                {testimonial.status === "Approved" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {testimonial.status}
              </span>
              
              <div className="flex gap-1.5">
                {testimonial.status === "Pending" && (
                  <button className="w-8 h-8 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 flex items-center justify-center transition-colors" title="Approve">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary flex items-center justify-center transition-colors" title="Edit">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-foreground/70 hover:text-red-400 flex items-center justify-center transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Modal for Add Testimonial */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-xl font-bold">Add Testimonial</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div className="flex justify-center mb-2">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors group">
                  <ExternalLink className="w-5 h-5 text-foreground/50 group-hover:text-primary mb-1" />
                  <span className="text-[10px] text-foreground/50">Upload Photo</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Course / Year</label>
                  <input type="text" placeholder="e.g. B.Tech CSE - Alumni 2024" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Status</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option>Approved</option>
                    <option>Pending</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Testimonial Text</label>
                <textarea rows={4} placeholder="Write testimonial here..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/5 shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Save Testimonial</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
