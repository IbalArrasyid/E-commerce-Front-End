'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import CSS Swiper
import 'swiper/css';

// Komponen menerima props 'logos'
const ClientLogoSlider = ({ logos }) => {
  // Validasi sederhana: Jika data kosong atau undefined, jangan render apa-apa
  if (!logos || logos.length === 0) return null;

  return (
    <section className="w-full py-10">
        <h2 className="md:text-4xl text-2xl text-center font-extralight text-gray-700 tracking-wide">
            Our Clients
        </h2>
       <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={2} // Tampilan Mobile
          loop={true}
          speed={3000} // Kecepatan transisi (3 detik)
          autoplay={{
            delay: 0, // Jalan terus tanpa henti
            disableOnInteraction: false,
            pauseOnMouseEnter: true, 
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 40 },
            768: { slidesPerView: 4, spaceBetween: 50 },
            1024: { slidesPerView: 5, spaceBetween: 60 }, // Desktop
          }}
          className="w-full"
        >
          {logos.map((client) => (
            <SwiperSlide key={client.id} className="flex items-center justify-center py-4">
              <div className="relative w-full h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer">
                <Image
                  src={client.src}
                  alt={`${client.name} Logo`}
                  // Gunakan width/height dari data, atau fallback ke nilai default
                  width={client.width || 150} 
                  height={client.height || 80}
                  className="object-contain max-h-20 w-auto" 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
};

export default ClientLogoSlider;