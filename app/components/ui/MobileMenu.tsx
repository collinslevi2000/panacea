"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { MenuItem } from "@/types/navigation";
import Logo from "./Logo";
import CTAButton from "./CTAButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileMenuItems: MenuItem[] = [
  {
    id: "learn-more",
    title: "Learn More",
    href: "#",
    type: "dropdown",
    children: [
      {
        id: "faq",
        title: "Frequently Asked Questions",
        href: "/faq",
        type: "dropdown",
      },
      {
        id: "genetic-counseling",
        title: "Genetic Counseling",
        href: "/genetic-counseling",
        type: "dropdown",
      },
      {
        id: "science",
        title: "Science",
        href: "/fascinating-science",
        type: "dropdown",
      },
      {
        id: "reports",
        title: "Report and Results",
        href: "/disease-risks",
        type: "dropdown",
      },
      {
        id: "about",
        title: "Who We Are",
        href: "/who-we-are",
        type: "dropdown",
      },
      {
        id: "media",
        title: "Media & Press",
        href: "/media-press",
        type: "dropdown",
      },
      {
        id: "stories",
        title: "Real Stories",
        href: "/real-stories",
        type: "dropdown",
      },
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    href: "/contact-us",
    type: "link",
  },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-gray-900 text-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <Logo variant="light" size="sm" />
            <button
              onClick={onClose}
              className="text-white hover:text-accent-teal transition-colors p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-4">
              {mobileMenuItems.map((item) => (
                <div key={item.id}>
                  {item.type === "dropdown" && item.children ? (
                    <div className="space-y-2">
                      <div className="font-semibold text-lg py-2 border-b border-gray-800">
                        {item.title}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            className="block py-2 text-gray-300 hover:text-accent-teal transition-colors"
                            onClick={onClose}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-semibold text-lg py-3 hover:text-accent-teal transition-colors border-b border-gray-800"
                      onClick={onClose}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <CTAButton
                href="/contact-us"
                variant="primary"
                className="w-full justify-center"
                onClick={onClose}
              >
                REQUEST A TEST
              </CTAButton>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-800">
            <div className="text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Panacea</p>
              <p className="mt-2">Disease prevention starts with you</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
