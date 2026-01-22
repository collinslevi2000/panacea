export interface MenuItem {
  id: string;
  title: string;
  href: string;
  type: "link" | "dropdown";
  children?: MenuItem[];
}

export interface SocialLink {
  id: string;
  platform: "instagram" | "facebook" | "linkedin" | "email";
  href: string;
  icon: string;
}
