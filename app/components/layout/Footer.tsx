import Link from "next/link";
import { MenuItem } from "@/types/navigation";

const footerLinks: MenuItem[] = [
  { id: "home", title: "Home", href: "/", type: "link" },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    href: "/faq",
    type: "link",
  },
  {
    id: "science",
    title: "Science",
    href: "/fascinating-science",
    type: "link",
  },
  {
    id: "reports",
    title: "Report and Results",
    href: "/disease-risks",
    type: "link",
  },
  { id: "about", title: "Who We Are", href: "/who-we-are", type: "link" },
  { id: "stories", title: "Real Stories", href: "/real-stories", type: "link" },
  { id: "media", title: "Media & Press", href: "/media-press", type: "link" },
  { id: "contact", title: "Contact Us", href: "/contact-us", type: "link" },
];

const legalLinks = [
  { id: "privacy", title: "Privacy Policy", href: "/privacy-policy" },
  { id: "terms", title: "Terms of Service", href: "/terms-of-service" },
  { id: "cookies", title: "Cookie Policy", href: "/cookie-policy" },
  {
    id: "disclaimer",
    title: "Medical Disclaimer",
    href: "/medical-disclaimer",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-white">
      <div className=" py-12 ">
        <div className="container mx-auto px-4">
          <nav className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
            {footerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-gray-300 hover:text-accent-teal transition-colors duration-200 font-medium"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
