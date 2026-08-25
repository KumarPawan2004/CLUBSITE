"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Book, MessageCircle, FileText, ChevronDown, ChevronUp, LifeBuoy, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FAQS = [
  { q: "How do I create a new post?", a: "Navigate to the Posts tab on the sidebar and click the 'Create Post' button in the top right. Fill out the form, add a featured image, and click Publish." },
  { q: "How to manage gallery images?", a: "Go to the Gallery section. You can either upload images directly to the 'All Media' tab or create an Album first and upload images into it." },
  { q: "What happens when an event expires?", a: "Once an event's date passes, its status will automatically change from 'Upcoming' to 'Past', and it will be moved to the Past Events tab." },
  { q: "Can I undo a deleted post?", a: "No, currently deleted items are permanently removed from the database. Please be careful when deleting content." },
];

export default function AdminHelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto py-4">
      <div className="flex flex-col items-center text-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
          <LifeBuoy className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="text-foreground/60 max-w-lg">Find answers to your questions, explore admin guides, and get support for managing YBN Pulse.</p>
      </div>

      {/* Main Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto shadow-2xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
        <input
          type="text"
          placeholder="Search help articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-2xl pl-14 pr-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Admin Guides */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
          <h3 className="font-bold text-xl flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Book className="w-5 h-5 text-primary" /> Admin Guides
          </h3>
          <div className="flex flex-col gap-3">
            {[
              "Getting Started with the Dashboard",
              "Managing Posts & Content",
              "Event Creation Best Practices",
              "How to handle Gallery & Media",
              "Setting up Notifications"
            ].map((guide, i) => (
              <a key={i} href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm group-hover:text-primary transition-colors">{guide}</span>
              </a>
            ))}
          </div>
          <Button variant="ghost" className="mt-4 text-primary w-full">View All Guides</Button>
        </div>

        {/* FAQs */}
        <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
          <h3 className="font-bold text-xl flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <MessageCircle className="w-5 h-5 text-blue-400" /> Frequently Asked Questions
          </h3>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="w-4 h-4 text-foreground/50 shrink-0" /> : <ChevronDown className="w-4 h-4 text-foreground/50 shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 pt-1 text-sm text-foreground/70 leading-relaxed border-t border-white/5 mx-4 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Contact */}
      <div className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-primary/20 bg-gradient-to-br from-background to-primary/5 mt-4">
        <div>
          <h3 className="font-bold text-xl mb-2">Still need help?</h3>
          <p className="text-foreground/70 text-sm">Our technical support team is available 24/7 to assist you.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Mail className="w-4 h-4" /> Email Support
          </Button>
          <Button className="gap-2 flex-1 sm:flex-none">
            <MessageCircle className="w-4 h-4" /> Live Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
