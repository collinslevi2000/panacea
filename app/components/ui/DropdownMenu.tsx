"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MenuItem } from "@/types/navigation";
import { cn } from "@/app/lib/utils";

interface DropdownMenuProps {
  title: string;
  items: MenuItem[];
  className?: string;
}

export default function DropdownMenu({
  title,
  items,
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseleave", handleClickOutside);
    return () => document.removeEventListener("mouseleave", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onMouseOver={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center text-white hover:text-accent-teal transition-colors duration-200 font-medium",
          className,
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="menu-item-title-wrap dd-title">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 ml-1 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 mt-2 w-72 bg-black rounded-lg shadow-xl shadow-slate-700 z-50 transition-all duration-200 origin-top",
          isOpen
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible",
        )}
      >
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block font-bold px-4 py-3 text-gray-100  hover:text-accent-teal transition-colors duration-150"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
