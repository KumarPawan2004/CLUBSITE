"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Calendar, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Club } from "@/types";

export default function ClubDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('clubs')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (data) setClub(data);
      setLoading(false);
    };
    fetchClub();
  }, [slug]);

  if (loading) {
    return <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen flex items-center justify-center">Loading club...</div>;
  }

  if (!club) {
    return (
      <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Club Not Found</h1>
        <Button onClick={() => router.push("/clubs")}>Back to Clubs</Button>
      </div>
    );
  }

  return (
    <div className="pt-25 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <Link href="/clubs">
        <Button variant="ghost" className="mb-8 p-0 hover:bg-transparent hover:text-primary gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Clubs
        </Button>
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border border-white/10 bg-white/5`}>
          <Users className="w-10 h-10 text-white/80" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{club.name}</h1>
        <p className="text-xl text-foreground/60 leading-relaxed max-w-3xl">
          {club.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" /> Stats
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-foreground/60">Members</span>
              <span className="text-2xl font-bold">{club.stats.members}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-foreground/60">Events Hosted</span>
              <span className="text-2xl font-bold">{club.stats.events}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground/60">Active Projects</span>
              <span className="text-2xl font-bold">{club.stats.projects}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-3xl"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Coordinators
          </h3>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-foreground/50 mb-1">Faculty Coordinator</p>
              <p className="font-bold">{club.facultyCoordinator.name}</p>
              <p className="text-sm text-primary">{club.facultyCoordinator.designation}</p>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div>
              <p className="text-sm text-foreground/50 mb-1">Student Coordinator</p>
              <p className="font-bold">{club.studentCoordinator.name}</p>
              <p className="text-sm text-primary">{club.studentCoordinator.role}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-3xl flex flex-col justify-center items-center text-center gap-6"
        >
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Want to join?</h3>
            <p className="text-foreground/60 mb-6">Become a part of {club.name} and unlock new opportunities.</p>
            <Link href="/contact">
              <Button className="w-full">Apply Now</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
