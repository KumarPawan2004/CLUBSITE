"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { Notice } from "@/types";

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('notices').select('*');
      if (data) setNotices(data);
      setLoading(false);
    };
    fetchNotices();
  }, []);

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 max-w-3xl">
        <h1 className="text-1xl md:text-3xl font-bold tracking-tight mb-6">Notice Board</h1>
        <p className="text-m text-foreground/60 leading-relaxed mb-3">
          Official announcements, exam schedules, and important updates from the department.
        </p>
        
        <div className="glass-card p-2 rounded-2xl flex items-center max-w-md">
          <Search className="w-5 h-4 text-foreground/40 ml-3" />
          <input 
            type="text" 
            placeholder="Search notices..." 
            className="bg-transparent border-none outline-none px-2 py-1 w-full text-sm text-foreground"
          />
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-foreground/50">Loading notices...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {notices.map((notice, i) => (
          <motion.div 
            key={notice.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white/5 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl flex-shrink-0 ${notice.urgent ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {notice.urgent && <span className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] font-bold rounded uppercase tracking-wider">Urgent</span>}
                  <span className="text-xs text-foreground/50">{notice.department}</span>
                  <span className="text-xs text-foreground/50">• {notice.date}</span>
                </div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{notice.title}</h3>
              </div>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              <Download className="w-4 h-4 mr-2" /> Download PDF
            </Button>
          </motion.div>
        ))}
        </div>
      )}
    </div>
  );
}
