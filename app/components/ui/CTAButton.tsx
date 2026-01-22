import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "extra";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    { href, variant = "primary", size = "md", children, className, ...props },
    ref,
  ) => {
    const baseStyles =
      "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center";

    const variants = {
      primary: "bg-accent-teal text-black hover:bg-teal-400 shadow-lg",
      extra: "bg-[#DBB13B] text-black hover:bg-[#DBB14B] shadow-lg",
      secondary: "bg-white text-black hover:bg-gray-100",
      outline:
        "border-2 border-white text-white hover:bg-white hover:text-black",
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-12 py-4 text-lg",
    };

    const buttonClass = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className,
    );

    if (href) {
      return (
        <Link href={href} className={buttonClass}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
