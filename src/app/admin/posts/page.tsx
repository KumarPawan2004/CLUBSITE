"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_POSTS = [
  { id: 1, title: "Annual Tech Symposium 2026", category: "Technology", author: "Admin", date: "Aug 18, 2026", status: "Published", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
  { id: 2, title: "Cultural Fest Highlights", category: "Events", author: "Student Council", date: "Aug 15, 2026", status: "Draft", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80" },
  { id: 3, title: "New Robotics Lab Inauguration", category: "News", author: "Admin", date: "Aug 10, 2026", status: "Published", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80" },
  { id: 4, title: "Sports Week Winners Announced", category: "Sports", author: "Sports Comm.", date: "Aug 05, 2026", status: "Published", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80" },
  { id: 5, title: "Alumni Meet 2026 - Save the Date", category: "Alumni", author: "Admin", date: "Jul 28, 2026", status: "Draft", image: "https://images.unsplash.com/photo-1523580494112-071dcb92a71d?w=500&q=80" },
];

export default function AdminPostsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || post.status === statusFilter;
    const matchesCategory = categoryFilter === "All Categories" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-foreground/60 mt-1">Manage blog posts, announcements, and articles.</p>
        </div>
        <Link href="/admin/posts/create">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-3 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <CustomDropdown 
            icon={<Filter className="w-3.5 h-3.5 text-foreground/50" />}
            value={statusFilter}
            options={["All Status", "Published", "Draft"]}
            onChange={setStatusFilter}
          />
          <CustomDropdown 
            value={categoryFilter}
            options={["All Categories", "Technology", "Events", "News", "Sports", "Alumni"]}
            onChange={setCategoryFilter}
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-foreground/70 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Post</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPosts.length > 0 ? filteredPosts.map((post, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={post.id} 
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-medium text-base group-hover:text-primary transition-colors line-clamp-1">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{post.category}</td>
                  <td className="px-6 py-4 text-foreground/70">{post.author}</td>
                  <td className="px-6 py-4 text-foreground/70">{post.date}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      post.status === "Published" 
                        ? "bg-green-500/10 text-green-400 border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    )}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-foreground/60 hover:text-foreground transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-primary/20 text-foreground/60 hover:text-primary transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/20 text-foreground/60 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-foreground/50">
                    No posts found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-foreground/60">
          <span>Showing 1 to 5 of 48 posts</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-lg bg-primary text-primary-foreground">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">3</button>
            <button className="px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      </div>
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
