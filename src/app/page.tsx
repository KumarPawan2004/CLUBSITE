"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, Calendar, Users, Trophy, Code, Zap,
  MapPin, Clock, Award, Star, BookOpen, Heart, MessageCircle, Share2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Event, Post, Notice, Faculty, GalleryItem } from "@/types";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const [
        { data: eventsData },
        { data: postsData },
        { data: noticesData },
        { data: facultyData },
        { data: galleryData }
      ] = await Promise.all([
        supabase.from('events').select('*').limit(2),
        supabase.from('posts').select('*').limit(2),
        supabase.from('notices').select('*').limit(4),
        supabase.from('faculty').select('*').limit(4),
        supabase.from('gallery').select('*').limit(4)
      ]);
      
      if (eventsData) setUpcomingEvents(eventsData);
      if (postsData) setPosts(postsData);
      if (noticesData) setNotices(noticesData);
      if (facultyData) setFaculty(facultyData);
      if (galleryData) setGallery(galleryData);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full my-0" ref={containerRef}>

      {/* Ticker Section */}
      <div className="w-full bg-primary/10 border-b border-primary/20 overflow-hidden py-2 z-20 relative mt-20">
        <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-red-400">URGENT:</span> End Semester Lab Exams Schedule Released
              </span>
              <span className="text-sm text-foreground/60">•</span>
              <span className="text-sm font-medium">Registration for HackSprint 2026 is now open!</span>
              <span className="text-sm text-foreground/60">•</span>
              <span className="text-sm font-medium text-primary">Guest Lecture by Dr. Rajesh from ISRO on Friday</span>
              <span className="text-sm text-foreground/60">•</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-0 overflow-hidden">
        <div className="container mx-auto px-0 md:px-0 relative z-10 flex flex-col items-center text-center">

          <motion.h1
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-3xl lg:text-3xl font-bold tracking-tighter mb-1 max-w-6xl"
          >
            Department of <br className="hidden md:block" />
            <span className="text-gradient">Advanced Computing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-m md:text-m text-foreground/60 max-w-2xl mb-8"
          >
            Innovating the Future Through Technology. Join the digital campus ecosystem at YBN University, Ranchi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-2"
          >


            <Button
              className="w-full sm:w-auto h-11 px-6 gap-2 group text-sm"
              onClick={() => document.getElementById('clubs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Clubs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="glass"
              className="w-full sm:w-auto h-11 px-6 text-sm"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Upcoming Events
            </Button>
          </motion.div>

          {/* Floating Stats Cards */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
            <StatCard icon={<Users />} count="500+" label="Students" delay={0.4} />
            <StatCard icon={<Zap />} count="20+" label="Faculty" delay={0.5} />
            <StatCard icon={<Calendar />} count="100+" label="Events" delay={0.6} />
            <StatCard icon={<Trophy />} count="3" label="Clubs" delay={0.7} />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-0 relative mt-24 scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight mb-3">Upcoming Events</h2>
              <p className="text-foreground/60 text-m">Don't miss out on what's happening on campus.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 p-6 flex flex-col justify-between relative overflow-hidden">
                  <span className="relative inline-block px-3 py-1 bg-background/50 backdrop-blur-md rounded-full text-xs font-semibold w-max border border-white/10">
                    {event.category}
                  </span>
                  <h3 className="relative text-2xl font-bold max-w-[80%] leading-tight text-white">{event.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-foreground/70 mb-6 text-sm line-clamp-2">{event.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-foreground/50 mb-0.5">Date</p>
                        <p className="text-sm font-medium">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-foreground/50 mb-0.5">Time</p>
                        <p className="text-sm font-medium">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 col-span-2">
                      <MapPin className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-foreground/50 mb-0.5">Venue</p>
                        <p className="text-sm font-medium">{event.venue}</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">View Details & Register</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section id="clubs" className="py-24 relative bg-white/[0.02] border-y border-white/5 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Campus Communities</h2>
            <p className="text-foreground/60 max-w-2xl text-m">
              Join our thriving technical, sports, and cultural communities to elevate your campus experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ClubCard
              title="Tech Club"
              slug="tech-club"
              description="Explore AI, Cloud computing, Cybersecurity, and open-source projects."
              icon={<Code className="w-8 h-8 text-blue-400" />}
              color="bg-blue-500/10 border-blue-500/20"
              glow="shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            />
            <ClubCard
              title="Sports Club"
              slug="sports-club"
              description="Participate in tournaments, athletics, and inter-university competitions."
              icon={<Trophy className="w-8 h-8 text-green-400" />}
              color="bg-green-500/10 border-green-500/20"
              glow="shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            />
            <ClubCard
              title="Cultural Club"
              slug="cultural-club"
              description="Express yourself through music, dance, drama, and fine arts."
              icon={<Users className="w-8 h-8 text-purple-400" />}
              color="bg-purple-500/10 border-purple-500/20"
              glow="shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            />
          </div>
        </div>
      </section>

      {/* Social Feed & Announcements */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h2>
              <div className="space-y-6">
                {posts.map(post => (
                  <SocialPost
                    key={post.id}
                    author={post.author}
                    time={post.date}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-8">Notice Board</h2>
              <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
                {notices.map(notice => (
                  <NoticeItem 
                    key={notice.id} 
                    title={notice.title} 
                    date={notice.date} 
                    urgent={notice.urgent} 
                  />
                ))}
                <Link href="/notice" className="w-full mt-2">
                  <Button variant="outline" className="w-full">View All Notices</Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Gallery Preview Section */}
      <section className="py-24 relative bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Campus Life Gallery</h2>
              <p className="text-foreground/60 text-m">Glimpses of our vibrant community and events.</p>
            </div>
            <Link href="/gallery">
              <Button variant="outline" className="hidden md:flex">View Full Gallery</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden glass-card relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-2 inline-block">HackSprint 2026</span>
                <h3 className="text-white font-bold text-xl">48-Hour Hackathon Winners</h3>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden glass-card relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 mix-blend-overlay" />
            </div>
            <div className="rounded-2xl overflow-hidden glass-card relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 mix-blend-overlay" />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden glass-card relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Team Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-3xl font-bold tracking-tight mb-4">Core Faculty</h2>
            <p className="text-foreground/60 max-w-2xl text-m">
              Learn from industry veterans and experienced researchers shaping the future of tech.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {faculty.map((member) => (
              <div key={member.id} className="glass-card rounded-3xl p-6 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 rounded-full bg-white/10 mb-4 border-2 border-primary/20 group-hover:border-primary/60 transition-colors overflow-hidden flex items-center justify-center">
                  <Users className="w-8 h-8 text-white/30" />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{member.designation}</p>
                <p className="text-sm text-foreground/60 mb-6 line-clamp-2">Research interests include {member.researchAreas.join(', ')}.</p>
                <div className="flex gap-2 w-full">
                  <Link href="/department#faculty" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">Profile</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// Components

function StatCard({ icon, count, label, delay }: { icon: React.ReactNode, count: string, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-primary">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
      </div>
      <h3 className="text-3xl font-bold mb-1">{count}</h3>
      <p className="text-sm text-foreground/60 font-medium">{label}</p>
    </motion.div>
  );
}


function ClubCard({ title, description, icon, color, glow, slug }: { title: string, description: string, icon: React.ReactNode, color: string, glow: string, slug: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`glass-card p-8 flex flex-col items-start ${glow} transition-all duration-300 group`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${color} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/60 mb-8 flex-1 leading-relaxed">{description}</p>
      <Link href={`/clubs/${slug}`}>
        <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-primary group/btn">
          Explore {title}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
}

function SocialPost({ author, time, content, likes, comments }: { author: string, time: string, content: string, likes: number, comments: number }) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">{author}</h4>
            <p className="text-xs text-foreground/50">{time}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Star className="w-4 h-4" /></Button>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed mb-6">
        {content}
      </p>
      <div className="flex items-center gap-6 border-t border-white/10 pt-4">
        <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-red-400 transition-colors group">
          <Heart className="w-4 h-4 group-hover:fill-red-400" /> {likes}
        </button>
        <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
          <MessageCircle className="w-4 h-4" /> {comments}
        </button>
        <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors ml-auto">
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
    </div>
  );
}

function NoticeItem({ title, date, urgent = false }: { title: string, date: string, urgent?: boolean }) {
  return (
    <div className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
      <div className="flex items-start justify-between gap-4">
        <h4 className={`text-sm font-medium leading-tight group-hover:text-primary transition-colors ${urgent ? 'text-red-400' : ''}`}>
          {urgent && <span className="mr-2 px-1.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-500 font-bold tracking-wider uppercase">Urgent</span>}
          {title}
        </h4>
        <ArrowRight className="w-4 h-4 text-foreground/30 group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
      </div>
      <p className="text-xs text-foreground/50">{date}</p>
    </div>
  );
}
