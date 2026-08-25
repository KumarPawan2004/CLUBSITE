"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GalleryPage() {
  return (
    <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 max-w-3xl">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Gallery</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          Moments captured across our campus events, hackathons, and cultural fests.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl overflow-hidden glass-card relative group ${i === 1 || i === 4 ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className={`absolute inset-0 mix-blend-overlay ${i % 2 === 0 ? 'bg-primary/20' : 'bg-blue-500/20'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
