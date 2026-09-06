"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, BellRing, Edit, Trash2, Calendar, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_NOTICES = [
  { id: 1, title: "Semester Exams Schedule Released", desc: "The final examination schedule for Even Semester 2026 has been published.", priority: "High", publishDate: "Aug 15, 2026", expiryDate: "Aug 30, 2026", status: "Active" },
  { id: 2, title: "Holiday Declaration - Independence Day", desc: "College will remain closed on 15th August 2026.", priority: "Normal", publishDate: "Aug 12, 2026", expiryDate: "Aug 16, 2026", status: "Expired" },
  { id: 3, title: "Library Membership Renewal", desc: "All students are requested to renew their library cards by the end of this month.", priority: "Normal", publishDate: "Aug 05, 2026", expiryDate: "Aug 31, 2026", status: "Active" },
  { id: 4, title: "Urgent: Fee Payment Deadline", desc: "Last date for semester fee payment without late fine is extended.", priority: "High", publishDate: "Aug 01, 2026", expiryDate: "Aug 10, 2026", status: "Expired" },
];

export default function AdminNoticesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredNotices = MOCK_NOTICES.filter(notice => 
    (statusFilter === "All Status" || notice.status === statusFilter) &&
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
          <p className="text-foreground/60 mt-1">Manage public notices, alerts, and circulars.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Notice
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <CustomDropdown 
            icon={<Filter className="w-3.5 h-3.5 text-foreground/50" />}
            value={statusFilter}
            options={["All Status", "Active", "Expired", "Draft"]}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotices.map((notice, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={notice.id}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:-translate-y-1 transition-transform relative overflow-hidden"
          >
            {notice.priority === "High" && (
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
            )}
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  notice.priority === "High" ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"
                )}>
                  {notice.priority === "High" ? <AlertCircle className="w-5 h-5" /> : <BellRing className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">{notice.title}</h3>
                  <p className="text-sm text-foreground/70 line-clamp-2">{notice.desc}</p>
                </div>
              </div>
              <span className={cn(
                "px-2.5 py-1 rounded-full text-xs font-medium border shrink-0",
                notice.status === "Active" 
                  ? "bg-green-500/10 text-green-400 border-green-500/20" 
                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
              )}>
                {notice.status}
              </span>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Published: {notice.publishDate}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Expiry: {notice.expiryDate}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-primary/20 text-foreground/50 hover:text-primary flex items-center justify-center transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-red-500/20 text-foreground/50 hover:text-red-400 flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Modal for Create Notice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-bold">Create Notice</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Notice Title</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Description</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Priority</label>
                  <CustomDropdown 
                    value="Normal"
                    options={["Normal", "High"]}
                    onChange={() => {}}
                    buttonClassName="px-4 py-2.5 h-[42px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Status</label>
                  <CustomDropdown 
                    value="Active"
                    options={["Active", "Draft"]}
                    onChange={() => {}}
                    buttonClassName="px-4 py-2.5 h-[42px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Publish Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Expiry Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/5">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Publish Notice</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function CustomDropdown({ value, options, onChange, icon }: { value: string, options: string[], onChange: (val: string) => void, icon?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl px-3 py-1.5 text-sm text-foreground/80 transition-colors w-full sm:w-auto min-w-[130px] justify-between h-9"
      >
        <div className="flex items-center gap-2">
          {icon}
          {value}
        </div>
        <ChevronDown className={cn("w-3.5 h-3.5 text-foreground/50 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 w-full min-w-[160px] bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 flex flex-col gap-0.5"
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={cn(
                "px-3 py-2 text-sm text-left rounded-lg transition-colors",
                value === opt ? "bg-primary/20 text-primary font-medium" : "text-foreground/80 hover:bg-white/10 hover:text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
