"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Trophy, Edit, Trash2, Award, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_ACHIEVEMENTS = [
  { id: 1, name: "Rahul Sharma", title: "1st Place - National Hackathon", category: "Technology", date: "Aug 10, 2026", desc: "Won the first prize in the Smart India Hackathon 2026 for developing an AI-based agriculture solution.", hasCertificate: true },
  { id: 2, name: "YBN Robotics Club", title: "Best Innovation Award", category: "Club", date: "Jul 25, 2026", desc: "Received the Best Innovation Award at Techfest IIT Bombay.", hasCertificate: true },
  { id: 3, name: "Priya Patel", title: "Gold Medalist - State Athletics", category: "Sports", date: "Jun 15, 2026", desc: "Secured gold in 100m sprint at the State Level Inter-University Sports Meet.", hasCertificate: false },
  { id: 4, name: "Drama Society", title: "Best Play - 'Nukkad Natak'", category: "Cultural", date: "May 20, 2026", desc: "Won the best play award at the National Youth Festival.", hasCertificate: true },
];

export default function AdminAchievementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-foreground/60 mt-1">Manage and highlight student and club achievements.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Achievement
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm">
            <Filter className="w-4 h-4 text-foreground/50" />
            <select className="bg-transparent border-none outline-none text-foreground/80 cursor-pointer">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Club</option>
            </select>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ACHIEVEMENTS.map((achievement, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={achievement.id}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:-translate-y-1 transition-transform border border-primary/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="w-24 h-24" />
            </div>

            <div className="flex justify-between items-start z-10">
              <div className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 shrink-0">
                {achievement.category}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/20 text-foreground/70 hover:text-primary flex items-center justify-center transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-foreground/70 hover:text-red-400 flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="z-10 flex-1">
              <h3 className="font-bold text-xl leading-tight mb-1">{achievement.title}</h3>
              <p className="text-primary font-medium text-sm mb-3">{achievement.name}</p>
              <p className="text-sm text-foreground/70 line-clamp-3">{achievement.desc}</p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-medium">
                <Calendar className="w-3.5 h-3.5" /> {achievement.date}
              </div>
              {achievement.hasCertificate && (
                <button className="flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  <Award className="w-3.5 h-3.5" /> View Certificate
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Modal for Add Achievement */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-xl font-bold">Add Achievement</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Student / Club Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Achievement Title</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option>Technology</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Club</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
                <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Certificate / Image Upload</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/[0.02] transition-colors cursor-pointer bg-black/20">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-foreground/50" />
                  </div>
                  <p className="text-sm font-medium">Click to upload file</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/5 shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Save Achievement</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
