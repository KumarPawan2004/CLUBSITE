"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Calendar as CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { createClient } from "@/lib/supabase/client";
import { Club } from "@/types";

export default function AdminClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);

  React.useEffect(() => {
    const fetchClubs = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('clubs').select('*');
      if (data) setClubs(data);
      setLoading(false);
    };
    fetchClubs();
  }, []);

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clubs</h1>
          <p className="text-foreground/60 mt-1">Manage all college clubs and societies.</p>
        </div>
        <Link href="/admin/clubs/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Club
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Clubs List */}
      {loading ? (
        <div className="flex justify-center items-center py-20 text-foreground/50">Loading clubs...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClubs.map((club, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={club.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform"
            >
              <div className={cn("h-24 w-full relative", club.gradient || 'bg-white/5')}>
                <div className="absolute -bottom-8 left-6 w-16 h-16 rounded-2xl bg-black/50 backdrop-blur-md flex items-center justify-center border-2 border-background shadow-xl text-2xl font-bold overflow-hidden">
                  {club.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={club.logo} alt={club.name} className="w-full h-full object-cover" />
                  ) : (
                    club.name.substring(0, 2).toUpperCase()
                  )}
                </div>
              </div>
              
              <div className="p-6 pt-12 flex flex-col flex-1 gap-3">
                <div>
                  <h3 className="font-bold text-xl">{club.name}</h3>
                  {club.category && <p className="text-primary text-xs font-medium uppercase tracking-wider">{club.category}</p>}
                </div>
                <p className="text-sm text-foreground/70 line-clamp-2">{club.description}</p>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Members</span>
                    <span className="font-bold text-lg">{club.stats?.members || "0"}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex flex-col">
                    <span className="text-xs text-foreground/50 uppercase tracking-wider font-medium">Events</span>
                    <span className="font-bold text-lg">{club.stats?.events || "0"}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 justify-center">
                    <Eye className="w-4 h-4 mr-2" /> View
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3 hover:bg-primary/20 text-primary">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3 hover:bg-red-500/20 text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredClubs.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
              <Users className="w-12 h-12 text-foreground/20 mb-4" />
              <h3 className="text-lg font-medium">No clubs found</h3>
              <p className="text-foreground/50 mt-1">There are no clubs matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
