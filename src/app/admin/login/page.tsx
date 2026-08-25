"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Lock, ArrowRight, ShieldCheck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === "ADMIN@DAC2023") {
      setError(false);
      // Simulate login by setting a flag in sessionStorage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("ybn_admin_auth", "true");
      }
      router.push("/admin");
    } else {
      setError(true);
      setKey("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-10 rounded-3xl z-10 flex flex-col items-center relative"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 mb-6">
          <Terminal className="w-8 h-8 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-center tracking-tight">Admin Gateway</h1>
        <p className="text-foreground/60 text-center mb-8 text-sm">
          Department of Advanced Computing
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
              Security Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-foreground/40" />
              </div>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className={`w-full bg-black/20 border rounded-xl pl-11 pr-4 py-3 outline-none transition-colors text-sm font-mono ${
                  error ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-primary/50"
                }`}
                placeholder="Enter access key"
                autoFocus
              />
            </div>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center gap-2 text-red-400 text-xs font-medium bg-red-500/10 p-3 rounded-lg"
            >
              <XCircle className="w-4 h-4 shrink-0" />
              Invalid security key. Access denied.
            </motion.div>
          )}

          <Button type="submit" className="w-full h-12 mt-4 text-sm font-bold gap-2">
            <ShieldCheck className="w-4 h-4" />
            Authenticate
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 w-full text-center">
          <button onClick={() => router.push("/")} className="text-xs text-foreground/50 hover:text-foreground transition-colors flex items-center justify-center gap-1 mx-auto">
            Return to Campus Portal <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
