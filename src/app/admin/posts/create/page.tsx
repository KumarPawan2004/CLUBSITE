"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Save, Send, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>(["tech", "update"]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");
  
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

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

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    const newText = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    setContent(newText);
    
    // Set focus back and adjust cursor position
    setTimeout(() => {
      textarea.focus();
      if (selectedText.length > 0) {
        textarea.setSelectionRange(start, start + prefix.length + selectedText.length + suffix.length);
      } else {
        textarea.setSelectionRange(start + prefix.length, start + prefix.length);
      }
    }, 0);
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
                  <button onClick={() => insertMarkdown("**", "**")} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-serif font-bold text-foreground/70">B</button>
                  <button onClick={() => insertMarkdown("_", "_")} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-serif italic text-foreground/70">I</button>
                  <button onClick={() => insertMarkdown("<u>", "</u>")} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center font-serif underline text-foreground/70">U</button>
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button onClick={() => insertMarkdown("# ", "")} className="px-3 h-8 rounded hover:bg-white/10 flex items-center justify-center text-sm font-medium text-foreground/70">H1</button>
                  <button onClick={() => insertMarkdown("## ", "")} className="px-3 h-8 rounded hover:bg-white/10 flex items-center justify-center text-sm font-medium text-foreground/70">H2</button>
                  <div className="w-px h-6 bg-white/10 mx-2" />
                  <button onClick={() => insertMarkdown("![Alt Text](", ")")} className="w-8 h-8 rounded hover:bg-white/10 flex items-center justify-center text-foreground/70">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                {/* Editor Area */}
                <textarea 
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 w-full bg-transparent p-4 outline-none resize-none font-mono text-sm"
                  placeholder="Write your post content here... (Markdown supported)"
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
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer appearance-none"
              >
                <option className="bg-background text-foreground" value="Technology">Technology</option>
                <option className="bg-background text-foreground" value="Events">Events</option>
                <option className="bg-background text-foreground" value="News">News</option>
                <option className="bg-background text-foreground" value="Sports">Sports</option>
                <option className="bg-background text-foreground" value="Alumni">Alumni</option>
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
            <div 
              className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-colors cursor-pointer group overflow-hidden h-48 ${dragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/30 hover:bg-white/[0.02]'} ${preview ? 'border-none p-0' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              {preview ? (
                <div className="relative w-full h-full group/img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-20">
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeFile(); }}
                      className="p-2 bg-red-500/80 hover:bg-red-500 rounded-full text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors pointer-events-none">
                    <Upload className="w-5 h-5 text-foreground/50 group-hover:text-primary" />
                  </div>
                  <div className="pointer-events-none">
                    <p className="text-sm font-medium"><span className="text-primary font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-foreground/50 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
