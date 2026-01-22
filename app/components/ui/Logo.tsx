import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  className,
  variant = "default",
  size = "md",
}: LogoProps) {
  const logoMap = {
    default:
      "https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea_won_black-removebg-preview.png",
    light:
      "https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea_won_black-removebg-preview.png",
    dark: "https://seekpanacea.com/wp-content/uploads/2023/03/cropped-panecea_won_black-removebg-preview.png",
  };

  const sizeMap = {
    sm: { width: 120, height: 83 },
    md: { width: 160, height: 110 },
    lg: { width: 200, height: 138 },
  };

  const dimensions = sizeMap[size];

  return (
    <Link href="/" className={className} aria-label="Panacea Home">
      <div className="relative">
        <Image
          src={logoMap[variant]}
          alt="White Panacea logo"
          width={dimensions.width}
          height={dimensions.height}
          className="h-auto object-contain"
          priority
        />
      </div>
    </Link>
  );
}
