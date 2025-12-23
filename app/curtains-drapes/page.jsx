'use client'

import Link from 'next/link'
import Image from 'next/image'
import Reviews from '@/components/Homepage/Reviews';
import Showrooms from '@/components/Homepage/Showrooms';
import HeroSectionSlider1 from '@/components/Common/HeroSectionSlider-1';
import TextMarquee from '@/components/Common/TextMarquee';
import CategoryShowcase from '@/components/Common/CategoryShowcase';
import OrderingProcess from '@/components/Common/OrderingProcess';
import ProductShowcase from '@/components/Common/ProductShowcase';
import ClientLogoSlider, { ClientLogo } from '@/components/Common/ClientLogoSlider';
import CtaBanner from '@/components/Common/CtaBanner';

export default function CurtainsPage() {

  const clientData = [
      { id: 1, name: 'Novus Jiva', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c11.png', width: 300, height: 120 },
      { id: 2, name: 'Shangri-La', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c12.png', width: 320, height: 160 },
      { id: 3, name: 'Regent', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/regent-hotels-resorts-vector-logo-small-1.png', width: 300, height: 140 },
      { id: 4, name: 'The Dharmawangsa', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/cdnlogo.com_the-dharmawangsa.svg', width: 320, height: 180 },
      { id: 5, name: 'Blue Sky', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/wXZ8r94g_400x400.png', width: 100, height: 100 },
      { id: 6, name: 'The Pakubuwono Residence', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/Image_0435F73B_2D0F_4BF4_4181_65F86A8DAC19.png', width: 280, height: 140 },
      { id: 7, name: 'The Mirah Resort', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/305808178_495211225943167_3341768788749818185_n.png', width: 310, height: 130 },
      { id: 8, name: 'Apartment Essence Darmawangsa', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/unnamed-4.jpg', width: 320, height: 170 },
      { id: 9, name: 'Cosmo Amarosa', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c6.png', width: 300, height: 150 },
      { id: 10, name: 'Mandarin Oriental', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/1085px-Arms_of_the_Yang_di-Pertuan_Agong_of_Malaysia.svg.png', width: 290, height: 160 },
      { id: 11, name: 'Aloft Hotels', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c1.png', width: 300, height: 140 },
      { id: 12, name: 'Novus Gini', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c10.png', width: 320, height: 160 },
      { id: 13, name: 'Mercure Hotels', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c9.png', width: 300, height: 140 },
      { id: 14, name: 'Sunlake Hotel', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c8.png', width: 300, height: 140 },
      { id: 15, name: 'Manhattan Hotel', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c7.png', width: 300, height: 140 },
      { id: 16, name: 'Merlynn Park Hotel', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c5.png', width: 300, height: 140 },
      { id: 17, name: 'Fairmont', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c4.png', width: 300, height: 140 },
      { id: 18, name: 'Aston Anyer', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c3.png', width: 300, height: 140 },
      { id: 19, name: 'Amarossa Hotel', src: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2023/04/c2.png', width: 300, height: 140 },
    ];
  const slides = [
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/MAIN-BANNER-91-scaled.jpg',
      title: 'Elevate your Space',
      subtitle: 'Stylist curtains for every rooms',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Shop Now',
        href: '/curtains',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/MAIN-BANNER-9-scaled.jpg',
      title: 'High Quality Custom Curtains',
      subtitle: 'Free on-site Measurements & Consultation',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Get Consultation',
        href: '/contact',
        variant: 'outline'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/MAIN-BANNER-51-scaled.jpg',
      title: 'Curtains for every budget',
      subtitle: 'Starting from Rp 85,000',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'View Collection',
        href: '/curtains',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/08/CURTAIN-BANNER-21-scaled.jpg',
      title: 'Fast Shipping Delivery',
      subtitle: 'Huge Variety, unique & complete product range',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Order Now',
        href: '/order',
        variant: 'secondary'
      }
    }
  ]

  const curtains = [
  {
    id: 1,
    title: 'Blinds',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/06/116.jpg?w=300&h=300&crop=1',
    href: '/blinds',
  },
  {
    id: 2,
    title: 'Curtains',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/12/curtains-category-image.jpg',
    href: '/curtains',
  },
  {
    id: 3,
    title: 'Hardware',
    image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/MAIN-BANNER-51-scaled.jpg',
    href: '/hardware',
  },
];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner Slider */}
      <HeroSectionSlider1 slides={slides} autoPlayInterval={5000} />

      {/* Text Marquee */}
      <TextMarquee
        text="PREMIUM QUALITY • CUSTOM DESIGNS • PROFESSIONAL INSTALLATION • 10+ YEARS EXPERIENCE"
        speed={20}
        backgroundColor="bg-gray-900"
        textColor="text-white"
        pauseOnHover={true}
      />

      {/* First Category Showcase - Window Treatments */}
      <CategoryShowcase
        categories={curtains}
        title="Design Your Custom Curtain"
        buttons={[
          { text: "Visit Showroom", href: "/curtains" },
          { text: "Expert Advice", href: "https://api.whatsapp.com/send/?phone=6281806040506&text=Hi!%20I%E2%80%99d%20like%20to%20get%20expert%20advice%20about%20Custom%20Curtains.&type=phone_number&app_absent=0" }
        ]}
        backgroundColor="#FAFAFA"
      />

      <OrderingProcess />

      <ProductShowcase
        title="Ready Made Curtains"
        categoryTerm="Curtains"
        typeTerm="Sheer"
        linkHref="/curtains/sheer"
      />

      <CategoryShowcase
        categories={[
          {
            id: 1,
            title: 'Motorized Curtains',
            image: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/smart-curtain-tech-part-2.jpg',
            href: '/curtains/motorized'
          },
          {
            id: 2,
            title: 'Blackout Curtains',
            image: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/smart-curtain-tech-part-3.jpg',
            href: '/curtains/blackout'
          },
          {
            id: 3,
            title: 'Thermal Curtains',
            image: 'https://www.homedecorindonesia.com/staging/wp-content/uploads/2025/02/smart-curtain-tech-part-4.jpg',
            href: '/curtains/thermal'
          }
        ]}
        title="Our Smart Curtain Technology"
        buttons={[
          { text: "Discover More", href: "/smart-curtains" }
        ]}
        backgroundColor="#F5F5F5"
      />

      <ClientLogoSlider logos={clientData} />

      {/* Testimonial Section */}
      <Reviews />

      {/* Bagian Banner CTA Baru */}
      <CtaBanner 
        title="Book A Free Home Visit"
        buttonText="Book Now"
        linkHref="/appointment"
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600"
      />

      {/* Showroom Location Section */}
      <Showrooms />

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}