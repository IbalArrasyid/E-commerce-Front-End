import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Default categories data
const defaultCategories = [
  {
    id: 1,
    title: 'Blinds',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BLINDS.jpg.webp',
    href: '/blinds',
  },
  {
    id: 2,
    title: 'Curtains',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-CURTAINS.jpg.webp',
    href: '/curtains',
  },
  {
    id: 3,
    title: 'Hardware',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-HARDWARE.jpg.webp',
    href: '/hardware',
  },
];

const CategoryShowcase = ({
  categories = defaultCategories,
  title = "Design Your Custom Curtain",
  description,
  showButtons = true,
  buttons = [
    { text: "Visit Showroom", href: "/showroom" },
    { text: "Expert Advice", href: "/expert-advice" }
  ],
  backgroundColor = "#F5F5F5",
  contentPosition = "left" // "left" or "right"
}) => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto">

        {/* Grid Layout: 1 Kolom di Mobile, 4 Kolom di Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">

          {/* Render content based on position */}
          {contentPosition === "left" && (
            <>
              {/* Kolom 1: Call to Action (CTA) - Left */}
              <div className="flex flex-col space-y-6 lg:col-span-1">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 leading-tight">
                  {title.split(' ').map((word, index) =>
                    index === title.split(' ').length - 1 ? <span key={index}>{word}</span> : <><span key={index}>{word}</span><br /></>
                  )}
                </h2>

                {description && (
                  <p className="text-gray-600 text-base leading-relaxed">
                    {description}
                  </p>
                )}

                {showButtons && (
                  <div className="flex flex-col space-y-4 w-full md:w-fit lg:w-full">
                    {buttons.map((button, index) => (
                      <Link
                        key={index}
                        href={button.href}
                        className="group flex items-center justify-between border border-black rounded-full px-6 py-3 text-black hover:bg-black hover:text-white transition-all duration-300"
                      >
                        <span className="font-medium">{button.text}</span>
                        {/* Icon Double Chevron */}
                        <span className="font-bold text-lg group-hover:translate-x-1 transition-transform">»</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Kolom 2, 3, 4: Product Cards (Mapping Data) */}
              {categories.map((category) => (
                <article key={category.id} className="group cursor-pointer lg:col-span-1">

                  {/* Image Container with Rounded Styling */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] shadow-sm">
                    <Image
                      src={category.image}
                      alt={`Design inspiration for ${category.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Card Footer: Title & See More Link */}
                  <div className="flex justify-between items-end mt-4 px-1">
                    <h3 className="text-xl font-normal text-gray-900">
                      {category.title}
                    </h3>
                    <Link
                      href={category.href}
                      className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black transition-all pb-0.5 flex items-center gap-1"
                    >
                      See More <span className="text-xs">&gt;&gt;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </>
          )}

          {contentPosition === "right" && (
            <>
              {/* Kolom 1, 2, 3: Product Cards (Mapping Data) */}
              {categories.map((category) => (
                <article key={category.id} className="group cursor-pointer lg:col-span-1">

                  {/* Image Container with Rounded Styling */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] shadow-sm">
                    <Image
                      src={category.image}
                      alt={`Design inspiration for ${category.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Card Footer: Title & See More Link */}
                  <div className="flex justify-between items-end mt-4 px-1">
                    <h3 className="text-xl font-normal text-gray-900">
                      {category.title}
                    </h3>
                    <Link
                      href={category.href}
                      className="text-sm font-bold text-black border-b-2 border-transparent hover:border-black transition-all pb-0.5 flex items-center gap-1"
                    >
                      See More <span className="text-xs">&gt;&gt;</span>
                    </Link>
                  </div>
                </article>
              ))}

              {/* Kolom 4: Call to Action (CTA) - Right */}
              <div className="flex flex-col space-y-6 lg:col-span-1">
                <h2 className="text-3xl md:text-4xl font-normal text-gray-900 leading-tight">
                  {title.split(' ').map((word, index) =>
                    index === title.split(' ').length - 1 ? <span key={index}>{word}</span> : <><span key={index}>{word}</span><br /></>
                  )}
                </h2>

                {description && (
                  <p className="text-gray-600 text-base leading-relaxed">
                    {description}
                  </p>
                )}

                {showButtons && (
                  <div className="flex flex-col space-y-4 w-full md:w-fit lg:w-full">
                    {buttons.map((button, index) => (
                      <Link
                        key={index}
                        href={button.href}
                        className="group flex items-center justify-between border border-black rounded-full px-6 py-3 text-black hover:bg-black hover:text-white transition-all duration-300"
                      >
                        <span className="font-medium">{button.text}</span>
                        {/* Icon Double Chevron */}
                        <span className="font-bold text-lg group-hover:translate-x-1 transition-transform">»</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

        </div>
          
      </div>
    </section>
  );
};

export default CategoryShowcase;