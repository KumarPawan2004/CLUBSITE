"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 container mx-auto px-4 md:px-6 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 max-w-3xl text-center mx-auto">
        <h1 className="text-3xl md:text-3xl font-bold tracking-tight mb-2">Contact Us</h1>
        <p className="text-m text-foreground/60 leading-relaxed">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">First Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Last Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 transition-colors text-sm resize-none" placeholder="How can we help?" />
              </div>
              <Button className="w-full mt-4">Send Message</Button>
            </form>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="glass-card p-8 rounded-3xl flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Department of Advanced Computing (Eimples Lab)<br />
                YBN University, Ranchi<br />
                Jharkhand, India
              </p>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-3xl flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                acelab@ybn.edu.in<br />
                support@ybnpulse.com
              </p>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                +91 123 456 7890<br />
                Mon-Fri, 9:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
