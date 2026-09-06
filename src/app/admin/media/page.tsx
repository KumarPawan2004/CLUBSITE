"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Search, Filter, Trash2, CheckSquare, Square, File as FileIcon, FileText, Film, Image as ImageIcon, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

const MOCK_MEDIA = [
  { id: 1, name: "campus_front.jpg", type: "image", size: "2.4 MB", date: "Aug 18, 2026", url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=80" },
  { id: 2, name: "tech_fest_banner.png", type: "image", size: "4.1 MB", date: "Aug 15, 2026", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
  { id: 3, name: "annual_report_2025.pdf", type: "document", size: "12.8 MB", date: "Jul 10, 2026", url: "" },
  { id: 4, name: "alumni_meet_promo.mp4", type: "video", size: "45.2 MB", date: "Jun 22, 2026", url: "" },
  { id: 5, name: "sports_meet_logo.svg", type: "image", size: "156 KB", date: "May 14, 2026", url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" },
  { id: 6, name: "syllabus_update.docx", type: "document", size: "1.2 MB", date: "Apr 05, 2026", url: "" },
];

export default function AdminMediaLibraryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<number[]>([]);
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredMedia = MOCK_MEDIA.filter(item => 
    (typeFilter === "All Types" || item.type === typeFilter.toLowerCase().replace("s", "")) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter(mediaId => mediaId !== id));
    } else {
      setSelectedMedia([...selectedMedia, id]);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="w-8 h-8 text-blue-400" />;
      case "document": return <FileText className="w-8 h-8 text-orange-400" />;
      case "video": return <Film className="w-8 h-8 text-purple-400" />;
      default: return <FileIcon className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-foreground/60 mt-1">Manage all uploaded files, images, and documents.</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Files
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <CustomDropdown 
              icon={<Filter className="w-3.5 h-3.5 text-foreground/50" />}
              value={typeFilter}
              options={["All Types", "Images", "Documents", "Videos"]}
              onChange={setTypeFilter}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedMedia.length > 0 && (
            <div className="flex items-center gap-3 border-r border-white/10 pr-4">
              <span className="text-sm font-medium text-primary">{selectedMedia.length} selected</span>
              <Button variant="outline" size="sm" className="h-9 text-red-400 border-red-500/20 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4 mr-1.5" /> Delete
              </Button>
            </div>
          )}
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-white/10 text-foreground" : "text-foreground/50 hover:text-foreground")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-white/10 text-foreground" : "text-foreground/50 hover:text-foreground")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item, index) => {
            const isSelected = selectedMedia.includes(item.id);
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={cn(
                  "glass-card rounded-xl overflow-hidden flex flex-col cursor-pointer group transition-all",
                  isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-white/5"
                )}
              >
                <div className="relative aspect-square w-full bg-black/20 flex items-center justify-center overflow-hidden">
                  <div className={cn(
                    "absolute top-2 left-2 z-20 w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary border-primary text-white" : "bg-black/40 border-white/50 text-transparent opacity-0 group-hover:opacity-100"
                  )}>
                    <CheckSquare className="w-3.5 h-3.5" />
                  </div>
                  
                  {item.type === "image" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                      {getIconForType(item.type)}
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col gap-1 border-t border-white/5">
                  <span className="text-sm font-medium truncate" title={item.name}>{item.name}</span>
                  <div className="flex justify-between items-center text-xs text-foreground/50">
                    <span>{item.size}</span>
                    <span className="uppercase">{item.type}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Media List View */}
      {viewMode === "list" && (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-foreground/70 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 w-12 text-center">
                    <button className="text-foreground/50 hover:text-foreground">
                      <Square className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">File Name</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium">Uploaded On</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMedia.map((item, index) => {
                  const isSelected = selectedMedia.includes(item.id);
                  return (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={item.id} 
                      className={cn("transition-colors group", isSelected ? "bg-primary/5" : "hover:bg-white/[0.02]")}
                    >
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => toggleSelect(item.id)}
                          className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center transition-colors mx-auto",
                            isSelected ? "bg-primary border-primary text-white" : "border-white/20 text-transparent hover:border-white/50"
                          )}
                        >
                          <CheckSquare className="w-3.5 h-3.5" />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                            {item.type === "image" ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              React.cloneElement(getIconForType(item.type) as React.ReactElement, { className: "w-5 h-5 text-foreground/70" })
                            )}
                          </div>
                          <span className="font-medium text-base group-hover:text-primary transition-colors">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground/70 capitalize">{item.type}</td>
                      <td className="px-6 py-4 text-foreground/70">{item.size}</td>
                      <td className="px-6 py-4 text-foreground/70">{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 rounded-lg hover:bg-red-500/20 text-foreground/60 hover:text-red-400 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
