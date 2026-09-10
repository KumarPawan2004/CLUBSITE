"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Github, Twitter, Linkedin, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-white/5 bg-background/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[200px] bg-primary/10 blur-[120px] rounded-[100%]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-4 lg:py-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:bg-primary/30 transition-colors">
                <Terminal className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-2xl tracking-tight">Eimples Lab</span>
            </Link>
            <p className="text-foreground/60 mb-6 max-w-sm leading-relaxed">
              The digital campus ecosystem for the Department of Advanced Computing (Eimples Lab) at YBN University.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Github className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Linkedin className="w-4 h-4" />} href="#" />
              <SocialLink icon={<Instagram className="w-4 h-4" />} href="#" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-6 text-foreground/90">Platform</h3>
            <ul className="space-y-4">
              <FooterLink href="/department">Department</FooterLink>
              <FooterLink href="/events">Events</FooterLink>
              <FooterLink href="/clubs">Clubs</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/achievements">Achievements</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-6 text-foreground/90">Resources</h3>
            <ul className="space-y-4">
              <FooterLink href="/notice">Notice Board</FooterLink>
              <FooterLink href="/department#faculty">Faculty Team</FooterLink>
              <FooterLink href="/admin">Admin Dashboard</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-semibold text-lg mb-6 text-foreground/90">Contact Us</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-foreground/60">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Department of Advanced Computing,<br/>YBN University, Ranchi, Jharkhand</span>
              </li>
              <li className="flex items-center gap-3 text-foreground/60">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>acelab@ybn.edu.in</span>
              </li>
            </ul>
            <div className="glass-card p-1 rounded-2xl flex items-center">
              <input 
                type="email" 
                placeholder="Subscribe to newsletter" 
                className="bg-transparent border-none outline-none px-4 py-2 w-full text-sm text-foreground placeholder:text-foreground/40"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
          <p>© {new Date().getFullYear()} YBN University ACE Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href}
      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-foreground/60 hover:text-primary transition-colors text-sm font-medium">
        {children}
      </Link>
    </li>
  );
}
