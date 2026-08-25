"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save, Send, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["tech", "update"]);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground/70" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
          <p className="text-foreground/60 mt-1">Publish a new article or announcement.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Main Content Form */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Post Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title here" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg font-medium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Short Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief summary of the post..." 
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Main Content</label>
              <div className="w-full h-80 bg-white/5 border border-white/10 rounded-xl flex flex-col overflow-hidden">
                {/* Mock WYSIWYG Toolbar */}
                <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                  {["B", "I", "U"].map((format) => (
                    <button key={format} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-serif font-bold text-foreground/70">
                      {format}
                    </button>
                  ))}
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button className="px-3 h-8 rounded hover:bg-white/10 flex items-center justify-center text-sm font-medium text-foreground/70">H1</button>
                  <button className="px-3 h-8 rounded hover:bg-white/10 flex items-center justify-center text-sm font-medium text-foreground/70">H2</button>
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-foreground/70">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                {/* Editor Area */}
                <textarea 
                  className="flex-1 w-full bg-transparent p-4 outline-none resize-none"
                  placeholder="Write your post content here... (Markdown supported in this mock)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Publish</h3>
            
            <div className="flex flex-col gap-3">
              <Button variant="primary" className="w-full gap-2 justify-center">
                <Send className="w-4 h-4" /> Publish Now
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-center">
                <Save className="w-4 h-4" /> Save as Draft
              </Button>
              <Button variant="ghost" className="w-full justify-center text-foreground/70 hover:text-foreground">
                Preview Post
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Category & Tags</h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer"
              >
                <option>Technology</option>
                <option>Events</option>
                <option>News</option>
                <option>Sports</option>
                <option>Alumni</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map(tag => (
                  <span key={tag} className="bg-primary/20 text-primary px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 border border-primary/30">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:bg-primary/30 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input 
                type="text" 
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type and press Enter to add..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="font-semibold text-lg border-b border-white/10 pb-4">Featured Image</h3>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-5 h-5 text-foreground/50 group-hover:text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs text-foreground/50 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
