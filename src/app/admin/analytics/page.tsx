"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Users, Eye, Calendar, ImageIcon, TrendingUp, TrendingDown, Clock, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const KPIS = [
    { title: "Website Visitors", value: "24.5K", change: "+12.5%", trend: "up", icon: Users },
    { title: "Post Views", value: "142.8K", change: "+5.2%", trend: "up", icon: Eye },
    { title: "Event Registrations", value: "1,245", change: "-2.4%", trend: "down", icon: Calendar },
    { title: "Gallery Views", value: "45.2K", change: "+18.9%", trend: "up", icon: ImageIcon },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-foreground/60 mt-1">Monitor website traffic, engagement, and content performance.</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex">
            {[
              { id: "7d", label: "7D" },
              { id: "30d", label: "30D" },
              { id: "90d", label: "90D" },
              { id: "1y", label: "1Y" }
            ].map(range => (
              <button 
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  timeRange === range.id ? "bg-white/10 text-foreground" : "text-foreground/50 hover:text-foreground"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {KPIS.map((kpi, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={kpi.title} 
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <kpi.icon className="w-24 h-24" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <kpi.icon className="w-5 h-5 text-foreground/70" />
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 border",
                  kpi.trend === "up" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {kpi.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
              
              <div>
                <p className="text-foreground/60 text-sm font-medium mb-1">{kpi.title}</p>
                <h2 className="text-3xl font-bold tracking-tight">{kpi.value}</h2>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section (Mocked) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="font-bold text-lg">Traffic Overview</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-foreground/70">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-foreground/70">Page Views</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02] p-8 gap-4">
            {/* Minimal SVG Chart Mock */}
            <svg className="w-full h-full max-h-[250px]" viewBox="0 0 500 150" preserveAspectRatio="none">
              <path d="M0,100 C50,80 100,120 150,60 C200,20 250,90 300,50 C350,10 400,70 450,40 L500,20 L500,150 L0,150 Z" fill="url(#grad1)" opacity="0.2" />
              <path d="M0,100 C50,80 100,120 150,60 C200,20 250,90 300,50 C350,10 400,70 450,40 L500,20" fill="none" stroke="currentColor" className="text-primary" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              
              <path d="M0,130 C50,110 100,140 150,90 C200,60 250,110 300,80 C350,40 400,90 450,70 L500,50 L500,150 L0,150 Z" fill="url(#grad2)" opacity="0.1" />
              <path d="M0,130 C50,110 100,140 150,90 C200,60 250,110 300,80 C350,40 400,90 450,70 L500,50" fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
              
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" className="text-blue-500" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" className="text-blue-500" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-foreground/40 text-sm">Interactive Line Chart Placeholder</span>
          </div>
        </div>

        {/* Device/Source Breakdown */}
        <div className="glass-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-6 border-b border-white/5 pb-4">Traffic Sources</h3>
          
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <span className="font-medium">Direct</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">45%</span>
                <span className="text-xs text-foreground/50">11K visitors</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                </div>
                <span className="font-medium">Search</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">32%</span>
                <span className="text-xs text-foreground/50">7.8K visitors</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                </div>
                <span className="font-medium">Social</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">18%</span>
                <span className="text-xs text-foreground/50">4.4K visitors</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-gray-500" />
                </div>
                <span className="font-medium">Referral</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">5%</span>
                <span className="text-xs text-foreground/50">1.2K visitors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-4">Top Pages</h3>
          <div className="flex flex-col gap-3">
            {[
              { path: "/", views: "12,450", avgTime: "2m 14s" },
              { path: "/events", views: "8,230", avgTime: "3m 45s" },
              { path: "/notice-board", views: "6,100", avgTime: "1m 30s" },
              { path: "/gallery", views: "5,420", avgTime: "4m 10s" },
              { path: "/contact", views: "2,100", avgTime: "0m 55s" },
            ].map((page, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-foreground/40 font-mono text-sm w-4">{i + 1}</span>
                  <span className="font-medium">{page.path}</span>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-foreground/70 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {page.views}</span>
                  <span className="text-foreground/70 flex items-center gap-1.5 w-20 justify-end"><Clock className="w-3.5 h-3.5" /> {page.avgTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-4">Engagement Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-foreground/60 text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> Avg. Session Duration</span>
              <span className="text-2xl font-bold">2m 45s</span>
              <span className="text-xs text-green-400 flex items-center gap-1">+12s from last period</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-foreground/60 text-sm font-medium flex items-center gap-2"><MousePointer2 className="w-4 h-4 text-orange-400" /> Bounce Rate</span>
              <span className="text-2xl font-bold">42.8%</span>
              <span className="text-xs text-green-400 flex items-center gap-1">-2.1% from last period</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-foreground/60 text-sm font-medium flex items-center gap-2"><Users className="w-4 h-4 text-purple-400" /> New Users</span>
              <span className="text-2xl font-bold">68%</span>
              <span className="text-xs text-green-400 flex items-center gap-1">+5% from last period</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-foreground/60 text-sm font-medium flex items-center gap-2"><Eye className="w-4 h-4 text-pink-400" /> Pages per Session</span>
              <span className="text-2xl font-bold">3.2</span>
              <span className="text-xs text-red-400 flex items-center gap-1">-0.4 from last period</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
