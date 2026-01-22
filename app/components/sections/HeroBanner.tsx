"use client";

import { useRef, useEffect } from "react";
import CTAButton from "../ui/CTAButton";

interface HeroBannerProps {
  videoSrc?: string;
}

export default function HeroBanner({ videoSrc }: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(console.error);
    }
  }, [videoSrc]);

  return (
    <section className=" min-h-screen bg-black flex items-center  overflow-hidden">
      {/* Content */}
      <div className="items-center  z-10 px-5 mx-8  text-accent-teal">
        <h1 className="text-6xl md:text-6xl  font-extrabold text-accent-teal mb-6">
          DISEASE PREVENTION STARTS WITH YOU
        </h1>

        <p className="text-xl md:text-xl text-white mb-10 max-w-3xl ">
          Discover your disease risks. Make preventative healthcare a reality.
        </p>

        <div className="flex justify-start ">
          <CTAButton href="/contact-us" variant="extra" size="lg">
            REQUEST A TEST
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
