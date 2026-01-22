"use client";

import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";

interface MobileNavProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function MobileNav({
  onMenuToggle,
  isMenuOpen,
}: MobileNavProps) {
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Logo size="sm" />
        </div>

        <button
          onClick={onMenuToggle}
          className="text-white hover:text-accent-teal transition-colors duration-200 p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>
    </nav>
  );
}
