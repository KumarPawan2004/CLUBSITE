"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

const MOCK_COORDINATORS: any[] = [];

export default function AdminCoordinatorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [modalRole, setModalRole] = useState("President");

  const filteredCoordinators = MOCK_COORDINATORS.filter(coordinator => 
    (roleFilter === "All Roles" || coordinator.role.includes(roleFilter.replace("Heads", "Head").replace("Members", "Member"))) &&
    coordinator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Coordinators</h1>
          <p className="text-foreground/60 mt-1">Manage student coordinators and club heads.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Coordinator
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search coordinators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <CustomDropdown 
            icon={<Filter className="w-3.5 h-3.5 text-foreground/50" />}
            value={roleFilter}
            options={["All Roles", "President", "Vice President", "Heads", "Members"]}
            onChange={setRoleFilter}
          />
        </div>
      </div>

      {/* Coordinators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCoordinators.map((coordinator, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={coordinator.id}
            className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:-translate-y-1 transition-transform border border-white/5 relative"
          >
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-7 h-7 rounded bg-white/10 text-foreground/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded bg-white/10 text-foreground/80 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coordinator.photo} alt={coordinator.name} className="w-20 h-20 rounded-full object-cover bg-white/5 mb-4 shadow-lg ring-2 ring-primary/20" />
              
              <h3 className="font-bold text-lg leading-tight mb-1">{coordinator.name}</h3>
              <p className="text-primary font-medium text-sm mb-1">{coordinator.role}</p>
              <p className="text-xs text-foreground/60 font-medium mb-3">
                {coordinator.course}
              </p>
              
              <div className="w-full bg-white/5 rounded-lg p-3 text-sm text-foreground/80 flex items-start gap-2 mb-4 text-left">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-snug">{coordinator.responsibility}</span>
              </div>
              
              <div className="w-full flex flex-col gap-2 mt-auto text-left">
                <div className="flex items-center gap-3 text-xs text-foreground/70 hover:text-primary transition-colors cursor-pointer">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{coordinator.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/70 hover:text-primary transition-colors cursor-pointer">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{coordinator.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Modal for Add Coordinator */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-xl font-bold">Add Coordinator</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">
                ✕
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div className="flex justify-center mb-2">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors group">
                  <ExternalLink className="w-6 h-6 text-foreground/50 group-hover:text-primary mb-1" />
                  <span className="text-[10px] text-foreground/50">Upload Photo</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Course & Year</label>
                  <input type="text" placeholder="e.g. B.Tech CSE - 3rd Yr" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Role</label>
                  <CustomDropdown 
                    value={modalRole}
                    options={["President", "Vice President", "Technical Head", "PR Head", "Executive Member"]}
                    onChange={setModalRole}
                    buttonClassName="px-4 py-2.5 h-[42px]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Responsibility</label>
                <input type="text" placeholder="e.g. Event Operations" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/5 shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Save Coordinator</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
