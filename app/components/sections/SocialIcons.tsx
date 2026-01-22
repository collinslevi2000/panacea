import { cn } from "@/app/lib/utils";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

interface SocialIconsProps {
  className?: string;
}

const socialLinks = [
  {
    platform: "instagram",
    href: "https://www.instagram.com/panacea_genomics/",
    icon: Instagram,
    label: "Instagram",
  },
  {
    platform: "facebook",
    href: "https://www.facebook.com/panaceagenomics",
    icon: Facebook,
    label: "Facebook",
  },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/panaceagenetics/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    platform: "email",
    href: "mailto:contact@seekpanacea.com",
    icon: Mail,
    label: "Email",
  },
];

export default function SocialIcons({ className }: SocialIconsProps) {
  return (
    <div className={cn("flex justify-center space-x-6", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-accent-teal transition-colors duration-200"
          aria-label={link.label}
        >
          <span className="sr-only">{link.label}</span>
          <link.icon />
        </a>
      ))}
    </div>
  );
}
