"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
  ];

  return (
    <Swiper loop={true} autoplay={{ delay: 3000 }}>
      {banners.map((src, index) => (
        <SwiperSlide key={index}>
          <img src={src} alt={`Banner ${index}`} className="w-full h-[400px] object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
