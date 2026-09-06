"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomDropdownProps {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}

export function CustomDropdown({ value, options, onChange, icon, className, buttonClassName }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-sm text-foreground/80 transition-colors w-full justify-between",
          buttonClassName || "px-3 py-1.5 min-w-[130px] h-9"
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          {value}
        </div>
        <ChevronDown className={cn("w-3.5 h-3.5 text-foreground/50 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 left-0 w-full min-w-[160px] bg-background/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1.5 flex flex-col gap-0.5"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={cn(
                "px-3 py-2 text-sm text-left rounded-lg transition-colors",
                value === opt ? "bg-primary/20 text-primary font-medium" : "text-foreground/80 hover:bg-white/10 hover:text-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
