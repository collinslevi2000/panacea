"use client";

import { useState } from "react";
import DesktopNav from "../navigation/DesktopNav";
import MobileMenu from "../ui/MobileMenu";
import MobileNav from "../navigation/MobileNav";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header fixed top-0 w-full z-50 bg-black">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 bg-white"
        href="#content"
      >
        Skip to content
      </a>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <DesktopNav />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMenuOpen={isMobileMenuOpen}
        />
      </div>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
