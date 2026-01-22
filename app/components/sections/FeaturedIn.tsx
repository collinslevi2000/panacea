"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const logos = [
  {
    id: 1,
    src: "	https://seekpanacea.com/wp-content/uploads/2024/03/City-biz-logo.png",
    alt: "Victoria Advocate",
  },
  {
    id: 2,
    src: "https://seekpanacea.com/wp-content/uploads/2024/03/yahoo-finance.png",
    alt: "Yahoo Finance",
  },
  {
    id: 3,
    src: "https://seekpanacea.com/wp-content/uploads/2024/03/BNN-logo.png",
    alt: "BNN",
  },
  {
    id: 4,
    src: "	https://seekpanacea.com/wp-content/uploads/2024/03/City-biz-logo.png",
    alt: "City Biz",
  },
  {
    id: 5,
    src: "https://seekpanacea.com/wp-content/uploads/2024/03/Healthcare-Brew-logo.png",
    alt: "Healthcare Brew",
  },
  {
    id: 6,
    src: "	https://seekpanacea.com/wp-content/uploads/2024/03/Healthcare-Dive-logo.png",
    alt: "Healthcare Dive",
  },
  {
    id: 7,
    src: "	https://seekpanacea.com/wp-content/uploads/2024/03/palm-beach-illustrated-logo-white.png",
    alt: "Palm Beach Illustrated",
  },
  {
    id: 8,
    src: "	https://seekpanacea.com/wp-content/uploads/2024/03/vator-news-logo.png",
    alt: "Vator News",
  },
];

export default function FeaturedIn() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured in
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="w-full"
        >
          {logos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="flex items-center justify-center h-24">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="object-contain max-h-16"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
