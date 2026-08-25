"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Edit, Trash2, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MOCK_FACULTY = [
  { id: 1, name: "Dr. Ananya Sharma", designation: "HOD, Computer Science", department: "Computer Science", email: "ananya.s@ybn.edu", phone: "+91 98765 43210", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" },
  { id: 2, name: "Prof. Rajesh Kumar", designation: "Associate Professor", department: "Mechanical Engg.", email: "rajesh.k@ybn.edu", phone: "+91 98765 43211", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
  { id: 3, name: "Dr. Meera Patel", designation: "Assistant Professor", department: "Electrical Engg.", email: "meera.p@ybn.edu", phone: "+91 98765 43212", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80" },
  { id: 4, name: "Mr. Vikram Singh", designation: "Lab Instructor", department: "Computer Science", email: "vikram.s@ybn.edu", phone: "+91 98765 43213", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
];

export default function AdminFacultyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Directory</h1>
          <p className="text-foreground/60 mt-1">Manage faculty profiles and contact information.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Faculty
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm">
            <Filter className="w-4 h-4 text-foreground/50" />
            <select className="bg-transparent border-none outline-none text-foreground/80 cursor-pointer">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mechanical Engg.</option>
              <option>Electrical Engg.</option>
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_FACULTY.map((faculty, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={faculty.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform border border-white/5"
          >
            <div className="h-24 bg-gradient-to-r from-primary/40 to-blue-500/40 relative">
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-7 h-7 rounded bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-primary transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            
            <div className="px-5 pb-5 flex flex-col items-center -mt-12 relative z-10 text-center flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={faculty.photo} alt={faculty.name} className="w-24 h-24 rounded-full border-4 border-background object-cover bg-white/5 mb-3 shadow-lg" />
              
              <h3 className="font-bold text-lg leading-tight mb-1">{faculty.name}</h3>
              <p className="text-primary font-medium text-sm mb-1">{faculty.designation}</p>
              <p className="text-xs text-foreground/60 font-medium px-3 py-1 bg-white/5 rounded-full mb-4">
                {faculty.department}
              </p>
              
              <div className="w-full flex flex-col gap-2 mt-auto">
                <div className="flex items-center gap-2 text-sm text-foreground/70 bg-white/5 p-2 rounded-lg">
                  <Mail className="w-4 h-4 shrink-0 text-foreground/50" />
                  <span className="truncate">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/70 bg-white/5 p-2 rounded-lg">
                  <Phone className="w-4 h-4 shrink-0 text-foreground/50" />
                  <span>{faculty.phone}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4 text-xs h-9">
                View Profile
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mock Modal for Add Faculty */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-xl font-bold">Add Faculty Profile</h2>
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
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Designation</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Department</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option>Computer Science</option>
                    <option>Mechanical Engg.</option>
                    <option>Electrical Engg.</option>
                  </select>
                </div>
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
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Profile Details / Bio</label>
                <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/5 shrink-0">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary">Save Profile</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
