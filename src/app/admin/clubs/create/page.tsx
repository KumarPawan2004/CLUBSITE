"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClub } from "@/actions/admin";

export default function CreateClubPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    } else {
      setError("Please select an image file.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    if (file) {
      formData.set("logoFile", file);
    }
    const result = await createClub(formData);

    if (result.success) {
      router.push("/admin/clubs");
    } else {
      setError(result.error || "Failed to create club");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/clubs" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Club</h1>
          <p className="text-foreground/60">Add a new club or society to the platform.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground/80">Club Name <span className="text-red-400">*</span></label>
            <input 
              required
              type="text" 
              id="name"
              name="name"
              placeholder="e.g. Coding Club" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground/80">Description <span className="text-red-400">*</span></label>
            <textarea 
              required
              id="description"
              name="description"
              rows={4} 
              placeholder="What does this club do?" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground/80">Club Logo</label>
              
              <div 
                className={`relative w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer overflow-hidden ${dragActive ? 'border-primary bg-primary/5' : 'border-white/20 hover:border-white/40 hover:bg-white/5'} ${preview ? 'border-none p-0' : 'p-4'}`}
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
                  <div className="relative w-full h-full group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
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
                  <div className="flex flex-col items-center gap-2 text-foreground/60 pointer-events-none">
                    <UploadCloud className="w-8 h-8" />
                    <p className="text-xs text-center"><span className="font-semibold text-primary">Click to upload</span> or drag and drop</p>
                    <p className="text-[10px] uppercase tracking-wider">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-sm font-medium text-foreground/80">Club Category</label>
              <input 
                type="text" 
                id="category"
                name="category"
                placeholder="e.g. Technology, Cultural, Sports" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 border-t border-white/10 pt-6">
            <Link href="/admin/clubs">
              <Button variant="outline" type="button" disabled={loading}>
                Cancel
              </Button>
            </Link>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Club"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
