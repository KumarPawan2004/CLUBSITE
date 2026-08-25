"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Calendar, Bell, Users, Award, Image as ImageIcon, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_RESULTS = [
  { id: 1, type: "Post", title: "Annual Tech Symposium 2026", desc: "Published in Technology", icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
  { id: 2, type: "Event", title: "Cultural Fest 'Rhythm'", desc: "Scheduled for Sep 15, 2026", icon: Calendar, color: "text-purple-400", bg: "bg-purple-400/10" },
  { id: 3, type: "Notice", title: "Semester Exams Schedule", desc: "High Priority - Expires Aug 30", icon: Bell, color: "text-red-400", bg: "bg-red-400/10" },
  { id: 4, type: "Faculty", title: "Dr. Ananya Sharma", desc: "HOD, Computer Science", icon: Users, color: "text-green-400", bg: "bg-green-400/10" },
  { id: 5, type: "Achievement", title: "Rahul Sharma - Hackathon", desc: "1st Place - National Level", icon: Award, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { id: 6, type: "Media", title: "tech_fest_banner.png", desc: "Image - 4.1 MB", icon: ImageIcon, color: "text-orange-400", bg: "bg-orange-400/10" },
];

export default function AdminSearchCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Posts", "Events", "Notices", "Faculty", "Coordinators", "Media"];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto py-8">
      <div className="flex flex-col items-center text-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Search Center</h1>
        <p className="text-foreground/60">Find anything across the entire admin platform.</p>
      </div>

      {/* Main Search Bar */}
      <div className="relative w-full shadow-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/50" />
        <input
          type="text"
          placeholder="Type to search posts, events, faculty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-2xl pl-16 pr-16 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md shadow-inner"
          autoFocus
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-foreground/50 hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
              activeFilter === category 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-white/5 text-foreground/70 border-white/10 hover:bg-white/10 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results Area */}
      <div className="mt-8 flex flex-col gap-4">
        {searchTerm ? (
          <>
            <h3 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-2">Search Results ({MOCK_RESULTS.length})</h3>
            <div className="flex flex-col gap-3">
              {MOCK_RESULTS.map((result, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={result.id}
                  className="glass-card p-4 rounded-xl flex items-center justify-between group cursor-pointer hover:-translate-y-1 transition-transform border border-white/5 hover:border-primary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", result.bg, result.color)}>
                      <result.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{result.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-foreground/60 mt-0.5">
                        <span className={cn("text-xs font-medium px-2 py-0.5 rounded bg-white/10", result.color)}>{result.type}</span>
                        <span>•</span>
                        <span>{result.desc}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-foreground/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
            <Search className="w-12 h-12 text-foreground/20 mb-4" />
            <h3 className="text-lg font-medium">Start typing to search</h3>
            <p className="text-foreground/50 mt-1 max-w-sm">Results will appear here instantly as you type your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
