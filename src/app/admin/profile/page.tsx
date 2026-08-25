"use client";

import React, { useState } from "react";
import { Save, User, Mail, Lock, Camera, Shield, Bell } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile & Account</h1>
        <p className="text-foreground/60 mt-1">Manage your admin profile details and security settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "general" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <User className="w-4 h-4" /> General Info
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "security" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <Shield className="w-4 h-4" /> Security & Password
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-left ${activeTab === "notifications" ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/5 text-foreground/70 hover:text-foreground border border-transparent"}`}
          >
            <Bell className="w-4 h-4" /> Notification Prefs
          </button>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {activeTab === "general" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">General Information</h2>
                <p className="text-sm text-foreground/60">Update your basic profile information.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-background overflow-hidden">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-background hover:bg-primary/80 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Eimples Admin</h3>
                    <p className="text-foreground/60 text-sm">Super Administrator</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                      <input type="text" defaultValue="Eimples" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                      <input type="text" defaultValue="Admin" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                      <input type="email" defaultValue="admin@ybn.edu" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Security & Password</h2>
                <p className="text-sm text-foreground/60">Ensure your account is secure with a strong password.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <input type="password" placeholder="Enter current password" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <input type="password" placeholder="Enter new password" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <input type="password" placeholder="Confirm new password" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Update Password</Button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/10 bg-white/5">
                <h2 className="text-xl font-bold">Notification Preferences</h2>
                <p className="text-sm text-foreground/60">Choose what updates you want to receive.</p>
              </div>
              
              <div className="p-6 flex flex-col gap-6">
                {[
                  { title: "Email Alerts", desc: "Receive email when a new post is pending review." },
                  { title: "System Notifications", desc: "Show in-app alerts for system updates." },
                  { title: "Event Reminders", desc: "Get notified 24 hours before an event." },
                  { title: "Security Alerts", desc: "Receive emails about unauthorized login attempts." },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-foreground/60">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Save Preferences</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
