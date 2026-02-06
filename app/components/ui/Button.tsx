import { cn } from "@/app/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "white" | "danger";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  color = "white",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "w-full rounded-4xl py-4 px-4 flex items-center justify-center gap-3 font-medium shadow-sm transition-all duration-500";

  const colorStyles: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-900 text-white hover:bg-gray-800",
    white: "bg-white text-gray-900 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(baseStyles, colorStyles[color], className)}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
      {children}
    </button>
  );
};

export default Button;
