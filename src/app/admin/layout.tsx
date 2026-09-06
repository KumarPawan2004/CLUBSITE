"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, FileText, Calendar, Image as ImageIcon, 
  Bell, Award, Users, Settings, BarChart, LogOut, Terminal,
  UserCheck, MessageSquare, Search, Folder, LifeBuoy, User
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Notice Board", href: "/admin/notices", icon: Bell },
  { name: "Achievements", href: "/admin/achievements", icon: Award },
  { name: "Faculty", href: "/admin/faculty", icon: Users },
  { name: "Coordinators", href: "/admin/coordinators", icon: UserCheck },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Media Library", href: "/admin/media", icon: Folder },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Search Center", href: "/admin/search", icon: Search },
];

const BOTTOM_ITEMS = [
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Help Center", href: "/admin/help", icon: LifeBuoy },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip auth check for login page itself
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }
    
    // Check for mock authentication
    const auth = sessionStorage.getItem("ybn_admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("ybn_admin_auth");
    router.push("/admin/login");
  };

  if (!isAuthenticated) return <div className="h-screen bg-background flex items-center justify-center">Loading...</div>;

  // If we are on the login page, just render the page without the Admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Background gradients for Admin */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ width: 280 }}
        animate={{ width: collapsed ? 80 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full glass-card border-y-0 border-l-0 rounded-none z-10 flex flex-col relative shrink-0"
      >
        <div className={cn("h-12 flex items-center border-b border-white/5", collapsed ? "justify-center" : "px-6 justify-between")}>
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0">
                <Terminal className="w-3 h-3 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight whitespace-nowrap">Eimples</span>
            </Link>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors shrink-0"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 custom-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-foreground/70 hover:bg-white/5 hover:text-foreground"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary-foreground" : "text-foreground/50 group-hover:text-foreground")} />
                {!collapsed && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
              </Link>
            )
          })}

          <div className="my-4 border-t border-white/5" />
          
          {BOTTOM_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive ? "bg-white/10 text-foreground" : "text-foreground/50 hover:bg-white/5 hover:text-foreground"
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground")} />
                {!collapsed && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-foreground/70 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden z-10 relative">
        <header className="h-12 glass-nav shrink-0 flex items-center justify-end px-8 border-b border-white/5 z-20">
          <div className="flex items-center gap-4">
            <button className="w-8 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors relative">
              <Bell className="w-5 h-5 text-foreground/70" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 overflow-hidden border border-primary/30 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
