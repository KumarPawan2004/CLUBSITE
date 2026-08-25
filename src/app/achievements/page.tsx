"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="pt-26 pb-20 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-16 max-w-3xl">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-1">Achievements</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          Celebrating the milestones and successes of our students and faculty across national and international platforms.
        </p>
      </motion.div>

      <div className="relative border-l-2 border-white/10 ml-6 md:ml-12 pl-8 space-y-5">
        {[2026, 2025, 2024].map((year, i) => (
          <div key={year} className="relative">
            <div className="absolute -left-[41px] w-5 h-5 rounded-full bg-primary ring-4 ring-background" />
            <h2 className="text-2xl font-bold text-primary mb-4">{year}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <Award className="w-8 h-8 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Smart India Hackathon Winners</h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    Team ACE emerged as winners in the Software Edition, building a blockchain-based voting system.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full">Hackathon</span>
                    <span className="text-[10px] px-2 py-1 bg-white/5 rounded-full">Tech Club</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
