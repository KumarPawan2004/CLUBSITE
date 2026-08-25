"use client";

import React, { useState } from "react";
import { Save, Globe, Palette, Database, ShieldAlert, Key } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-foreground/60 mt-1">Configure global settings and preferences for YBN Pulse.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "general" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <Globe className="w-4 h-4" /> Global Settings
          </button>
          <button 
            onClick={() => setActiveTab("appearance")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "appearance" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <Palette className="w-4 h-4" /> Appearance
          </button>
          <button 
            onClick={() => setActiveTab("integrations")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "integrations" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <Key className="w-4 h-4" /> Integrations
          </button>
          <button 
            onClick={() => setActiveTab("advanced")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "advanced" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <ShieldAlert className="w-4 h-4" /> Advanced
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {activeTab === "general" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Global Settings</h2>
                <p className="text-sm text-foreground/60">Manage primary platform details.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Platform Name</label>
                  <input type="text" defaultValue="YBN Pulse" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Support Email Address</label>
                  <input type="email" defaultValue="support@pulse.ybn.edu" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Timezone</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer">
                    <option>Asia/Kolkata (IST)</option>
                    <option>UTC</option>
                    <option>America/New_York (EST)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Maintenance Mode</label>
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div>
                      <h4 className="font-medium text-foreground">Enable Maintenance Mode</h4>
                      <p className="text-sm text-foreground/60">Only administrators will be able to access the site.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Save Settings</Button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Appearance</h2>
                <p className="text-sm text-foreground/60">Customize the look and feel of the platform.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-3">Primary Theme Color</label>
                  <div className="flex gap-4">
                    {['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-orange-500'].map((color, i) => (
                      <button key={i} className={`w-10 h-10 rounded-full ${color} flex items-center justify-center ${i === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-3">Dashboard Logo</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/[0.02] transition-colors cursor-pointer bg-black/20">
                    <p className="text-sm font-medium">Click to upload new logo</p>
                    <p className="text-xs text-foreground/50">PNG or SVG, Max 2MB</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Apply Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Integrations & API Keys</h2>
                <p className="text-sm text-foreground/60">Connect external services.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2 flex justify-between">
                    Google Analytics Tracking ID
                    <span className="text-green-400 text-xs">Connected</span>
                  </label>
                  <input type="text" defaultValue="G-XXXXXXXXXX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2 flex justify-between">
                    Cloudinary API Key (Media Storage)
                    <span className="text-green-400 text-xs">Connected</span>
                  </label>
                  <input type="password" defaultValue="************************" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2 flex justify-between">
                    SendGrid API Key (Email)
                    <span className="text-foreground/50 text-xs">Not Configured</span>
                  </label>
                  <input type="password" placeholder="Enter API Key" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm" />
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Save Keys</Button>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="glass-card rounded-2xl overflow-hidden border-red-500/20">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold text-red-400">Advanced Settings</h2>
                <p className="text-sm text-foreground/60">Caution: These actions can be destructive.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div>
                    <h4 className="font-medium text-foreground">Clear Cache</h4>
                    <p className="text-sm text-foreground/60">Force rebuild of all static pages.</p>
                  </div>
                  <Button variant="outline" className="text-foreground hover:bg-white/10">Clear Cache</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <div>
                    <h4 className="font-medium text-red-400">Wipe Database</h4>
                    <p className="text-sm text-red-400/60">Delete all posts, events, and media.</p>
                  </div>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">Wipe Data</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
