"use client";
import React from "react";
import { motion } from "framer-motion";
import { clubs } from "@/data/mock";
import { ArrowRight, Users, Code, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ClubsPage() {
  return (
    <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 max-w-3xl">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Campus Clubs</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          Join a community of like-minded individuals. Collaborate, learn, and build amazing things together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {clubs.map((club, i) => (
          <motion.div
            key={club.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 flex flex-col items-start shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 group`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
              <Users className="w-8 h-8 text-white/80" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{club.name}</h3>
            <p className="text-foreground/60 mb-8 flex-1 leading-relaxed">{club.description}</p>
            
            <div className="flex gap-4 mb-8 w-full border-y border-white/5 py-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">{club.stats.members}</span>
                <span className="text-xs text-foreground/50 font-medium">Members</span>
              </div>
              <div className="w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">{club.stats.events}</span>
                <span className="text-xs text-foreground/50 font-medium">Events</span>
              </div>
            </div>

            <Link href={`/clubs/${club.slug}`}>
              <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group/btn">
                Explore {club.name}
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
