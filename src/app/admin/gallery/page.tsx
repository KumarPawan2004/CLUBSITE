"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Image as ImageIcon, Trash2, Edit, CheckSquare, Square, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MOCK_ALBUMS = [
  { id: 1, title: "Tech Symposium 2026", count: 45, date: "Aug 25, 2026", cover: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
  { id: 2, title: "Cultural Fest 'Rhythm'", count: 120, date: "Sep 15, 2026", cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80" },
  { id: 3, title: "Robotics Workshop", count: 24, date: "Sep 20, 2026", cover: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80" },
];

const MOCK_IMAGES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  url: `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=500&q=80`,
  selected: false
}));

export default function AdminGalleryPage() {
  const [activeTab, setActiveTab] = useState("albums");
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter(imgId => imgId !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const selectAll = () => {
    if (selectedImages.length === MOCK_IMAGES.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(MOCK_IMAGES.map(img => img.id));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
          <p className="text-foreground/60 mt-1">Manage event albums and campus photos.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <FolderPlus className="w-4 h-4" /> Create Album
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Upload Media
          </Button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/10">
        <button 
          onClick={() => setActiveTab("albums")}
          className={cn("pb-3 px-2 font-medium text-sm border-b-2 transition-colors", activeTab === "albums" ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground")}
        >
          Albums
        </button>
        <button 
          onClick={() => setActiveTab("all_media")}
          className={cn("pb-3 px-2 font-medium text-sm border-b-2 transition-colors", activeTab === "all_media" ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground")}
        >
          All Media
        </button>
      </div>

      {activeTab === "albums" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_ALBUMS.map((album, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={album.id}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-primary text-white transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-red-500 text-white transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="font-bold text-white text-lg line-clamp-1">{album.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> {album.count} items
                    </span>
                    <span>{album.date}</span>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}

        </div>
      )}

      {activeTab === "all_media" && (
        <div className="flex flex-col gap-6">
          <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={selectAll}
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {selectedImages.length === MOCK_IMAGES.length ? <CheckSquare className="w-4 h-4 text-primary" /> : <Square className="w-4 h-4" />}
                Select All
              </button>
              {selectedImages.length > 0 && (
                <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                  <span className="text-sm font-medium text-primary">{selectedImages.length} selected</span>
                  <Button variant="outline" size="sm" className="h-8 text-red-400 border-red-500/20 hover:bg-red-500/10">
                    <Trash2 className="w-3 h-3 mr-1.5" /> Delete
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm">
                <Filter className="w-4 h-4 text-foreground/50" />
                <select className="bg-transparent border-none outline-none text-foreground/80 cursor-pointer">
                  <option>All Albums</option>
                  <option>Tech Symposium</option>
                  <option>Cultural Fest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MOCK_IMAGES.map((img, index) => {
              const isSelected = selectedImages.includes(img.id);
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (index % 12) * 0.05 }}
                  key={img.id}
                  onClick={() => toggleSelect(img.id)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden cursor-pointer group",
                    isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "hover:ring-2 hover:ring-white/30"
                  )}
                >
                  <div className={cn(
                    "absolute top-2 left-2 z-20 w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary border-primary text-white" : "bg-black/40 border-white/50 text-transparent opacity-0 group-hover:opacity-100"
                  )}>
                    <CheckSquare className="w-3.5 h-3.5" />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`Gallery image ${img.id}`} className={cn(
                    "w-full h-full object-cover transition-transform duration-500",
                    isSelected ? "scale-105" : "group-hover:scale-110"
                  )} />
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
