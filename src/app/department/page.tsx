"use client";
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Award, Target } from "lucide-react";
import { facultyMembers } from "@/data/mock";

export default function DepartmentPage() {
  return (
    <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-4">About the Department</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          The Department of Advanced Computing (Eimples Lab) is dedicated to fostering innovation, 
          research, and excellence in the ever-evolving fields of technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="glass-card p-10 rounded-3xl">
          <Target className="w-10 h-10 text-primary mb-6" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-foreground/70 leading-relaxed">
            To be a globally recognized center of excellence in computing education and research, 
            producing leaders who drive technological advancements for the betterment of society.
          </p>
        </div>
        <div className="glass-card p-10 rounded-3xl">
          <BookOpen className="w-10 h-10 text-blue-400 mb-6" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-foreground/70 leading-relaxed">
            Providing state-of-the-art infrastructure, fostering an environment of collaborative research, 
            and bridging the gap between academia and industry through hands-on learning.
          </p>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-10 text-center">Our Distinguished Faculty</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyMembers.map((faculty, i) => (
            <motion.div 
              key={faculty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-24 h-24 rounded-full bg-white/10 mb-4 border-2 border-primary/20 group-hover:border-primary/60 transition-colors flex items-center justify-center overflow-hidden">
                 <Users className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="font-bold text-lg mb-1">{faculty.name}</h3>
              <p className="text-primary text-sm font-medium mb-4">{faculty.designation}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {faculty.researchAreas.map(area => (
                  <span key={area} className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-foreground/70">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
