"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, Calendar, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Overview</h1>
          <p className="text-foreground/60">Welcome back, Admin. Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Visitors" value="12,450" change="+12%" icon={<Users />} />
        <KPICard title="Active Posts" value="48" change="+4%" icon={<FileText />} />
        <KPICard title="Upcoming Events" value="12" change="+2" icon={<Calendar />} />
        <KPICard title="Platform Engagement" value="84%" change="+8%" icon={<Activity />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Engagement Overview</h3>
            <select className="bg-transparent border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          {/* Placeholder for Chart */}
          <div className="flex-1 flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <span className="text-foreground/40 text-sm">Line Chart Visualization (Mock)</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
          <div className="flex-1 flex flex-col gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <p className="text-sm font-medium">New event registered by Tech Club</p>
                  <p className="text-xs text-foreground/50">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-primary">View All Activity</Button>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  const isPositive = change.startsWith("+");
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl group hover:-translate-y-1 transition-transform"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-white/5 text-foreground/70 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
          {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full", isPositive ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
          {isPositive && <ArrowUpRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <div>
        <h4 className="text-foreground/60 text-sm font-medium mb-1">{title}</h4>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
