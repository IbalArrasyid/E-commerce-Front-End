'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- Sub-Component: Service Card (Tetap sama) ---
const ServiceCard = ({ title, image, link }) => {
  return (
    <div className="relative h-64 md:h-72 w-full overflow-hidden group rounded-lg shadow-md">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
        <h3 className="text-white text-xl md:text-2xl font-medium mb-6 drop-shadow-sm font-serif">
          {title}
        </h3>
        <Link 
          href={link || '#'} 
          className="bg-black text-white py-2 px-5 flex items-center gap-2 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300"
        >
          View More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </Link>
      </div>
    </div>
  );
};

// --- Main Component: Reusable ---
const ServicesSection = ({ 
  title = "Our Services", 
  topData = [], 
  bottomData = [] 
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Dynamic Title */}
        <h2 className="text-3xl md:text-4xl font-light text-center text-gray-700 mb-12 font-serif">
          {title}
        </h2>

        {/* --- ROW 1: 3 Columns (Jika data ada) --- */}
        {topData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {topData.map((item, index) => (
              <ServiceCard 
                key={item.id || index}
                title={item.title}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        )}

        {/* --- ROW 2: 2 Columns (Jika data ada) --- */}
        {bottomData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-4/5 mx-auto">
            {bottomData.map((item, index) => (
              <ServiceCard 
                key={item.id || index}
                title={item.title}
                image={item.image}
                link={item.link}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ServicesSection;