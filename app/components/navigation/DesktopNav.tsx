import { MenuItem } from "@/types/navigation";
import Link from "next/link";
import CTAButton from "../ui/CTAButton";
import DropdownMenu from "../ui/DropdownMenu";
import Logo from "../ui/Logo";

const primaryMenuItems: MenuItem[] = [
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

export default function DesktopNav() {
  return (
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" aria-label="Panacea Home">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {primaryMenuItems.map((item) => (
              <li key={item.id}>
                {item.type === "dropdown" && item.children ? (
                  <DropdownMenu title={item.title} items={item.children} />
                ) : (
                  <Link
                    href={item.href}
                    className="text-white hover:text-accent-teal transition-colors duration-200 font-medium"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <CTAButton href="/contact-us" variant="primary">
            REQUEST A TEST
          </CTAButton>
        </div>
      </div>
    </nav>
  );
}
