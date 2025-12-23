'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Komponen menerima props: title, buttonText, linkHref, dan backgroundImage
const CtaBanner = ({ 
  title = "Book A Free Home Visit", // Default value jika props tidak diisi
  buttonText = "Book Now", 
  linkHref = "/book-appointment", 
  backgroundImage = "/images/meeting-bg.jpg" // Ganti dengan path default Anda
}) => {
  return (
    <section className="relative w-full h-[200px] md:h-[250px] flex items-center overflow-hidden">
      
      {/* 1. Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Banner Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-slate-900/60"></div>
      </div>

      {/* 2. Content Container */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            {title}
          </h2>
        </div>

        {/* Button Section */}
        <div>
          <Link 
            href={linkHref} 
            className="group bg-[#dcb162] hover:bg-[#c9a055] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            {buttonText}
            
            {/* Icon Panah */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" height="20" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round"
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;