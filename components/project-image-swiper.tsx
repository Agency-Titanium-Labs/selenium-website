"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProjectImageSwiperProps {
  images: string[];
  title: string;
  accentColor?: string;
}

export default function ProjectImageSwiper({
  images,
  title,
  accentColor,
}: ProjectImageSwiperProps) {
  return (
    <div className="project-swiper">
      <style>{`
        .project-swiper .swiper-button-next,
        .project-swiper .swiper-button-prev {
          color: ${accentColor ?? "white"};
        }
        .project-swiper .swiper-pagination-bullet {
          background: ${accentColor ?? "white"};
          opacity: 0.3;
          transition: opacity 0.2s, width 0.2s;
          border-radius: 4px;
        }
        .project-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 20px;
        }
      `}</style>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        spaceBetween={16}
        slidesPerView="auto"
        className="rounded-xl overflow-hidden"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <Image
              width={1920}
              height={1080}
              src={image}
              alt={`${title} screenshot ${i + 1}`}
              className="h-72 w-auto rounded-xl object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
