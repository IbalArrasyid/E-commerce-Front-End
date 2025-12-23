'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- 1. Type Definitions (Strong Typing) ---
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subCategory: string; // e.g., 'Sheer', 'Blackout'
  image: string;
  slug: string;
}

interface ProductShowcaseProps {
  title: string;          // Judul Section (e.g., "Ready Made Curtains")
  categoryTerm: string;   // Filter Utama (e.g., "Curtains")
  typeTerm?: string;      // Filter Sekunder (e.g., "Sheer") - Optional
  linkHref: string;       // Link untuk tombol "Show More"
}

// --- 2. Mock Data (Simulasi Database) ---
const PRODUCT_DATA: Product[] = [
  {
    id: '1',
    name: 'Sheer Castello C2145 – Offwhite – Sheer',
    price: 281000,
    category: 'Curtains',
    subCategory: 'Sheer',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/10/3.-CASTELLO-C2145-1.jpg', // Ganti dengan path aktual
    slug: 'sheer-castello-c2145-offwhite-sheer',
  },
  {
    id: '2',
    name: 'Sheer Castello C2143 – Offwhite – Sheer',
    price: 281000,
    category: 'Curtains',
    subCategory: 'Sheer',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/10/2.-CASTELLO-C2143-1.jpg',
    slug: 'sheer-castello-c2143-offwhite-sheer',
  },
  {
    id: '3',
    name: 'Sheer Castello C2105 – Offwhite – Sheer',
    price: 294000,
    category: 'Curtains',
    subCategory: 'Sheer',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/10/1.-CASTELLO-C2105-1.jpg',
    slug: 'sheer-castello-c2105-offwhite-sheer',
  }
];

// --- 3. Helper Function ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ 
  title, 
  categoryTerm, 
  typeTerm,
  linkHref 
}) => {
  
  // Filtering Logic: Menggunakan useMemo untuk efisiensi performa
  const displayedProducts = useMemo(() => {
    return PRODUCT_DATA.filter(product => {
      const matchCategory = product.category === categoryTerm;
      const matchType = typeTerm ? product.subCategory === typeTerm : true;
      return matchCategory && matchType;
    }).slice(0, 3); // Ambil max 3 produk
  }, [categoryTerm, typeTerm]);

  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid Container: 4 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-center">
          
          {/* --- BLOCK 1: Product Cards (Columns 1-3) --- */}
          {/* Kita map produk yang sudah difilter di sini */}
          {displayedProducts.map((product) => (
            <article key={product.id} className="flex flex-col group lg:col-span-1">
              
              {/* Image Container (Portrait Ratio 3:4) */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-base text-gray-800 font-normal leading-relaxed mb-2 line-clamp-2 min-h-[3rem]">
                  {product.name} {typeTerm && `– ${typeTerm}`}
                </h3>
                <p className="text-gray-600 font-medium mb-4">
                  {formatCurrency(product.price)}
                </p>
                
                {/* Button: Shop Now (Style Kotak Abu-abu sesuai screenshot) */}
                <Link 
                  href={`/products/${product.slug}`}
                  className="mt-auto w-full md:w-fit px-8 py-2.5 bg-[#F3F3F3] text-gray-700 text-sm font-medium rounded hover:bg-gray-200 transition-colors text-center"
                >
                  Shop Now
                </Link>
              </div>
            </article>
          ))}

          {/* --- BLOCK 2: Sidebar CTA (Column 4) --- */}
          {/* Bagian ini berada di kanan (desktop) atau bawah (mobile) */}
          <aside className="flex flex-col items-center text-center lg:items-end lg:text-right lg:col-span-1 h-full justify-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
              {/* Memecah judul menjadi baris baru jika panjang */}
              {title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h2>

            <Link 
              href={linkHref}
              className="group flex items-center justify-between gap-3 border border-black rounded-full px-8 py-3 text-black hover:bg-black hover:text-white transition-all duration-300"
            >
              <span className="font-medium">Show More</span>
              <span className="font-bold text-lg group-hover:translate-x-1 transition-transform">»</span>
            </Link>
          </aside>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;