'use client'

import Link from 'next/link'
import Image from 'next/image'
import Reviews from '@/components/Homepage/Reviews';
import Showrooms from '@/components/Homepage/Showrooms';
import HeroSectionSlider1 from '@/components/Common/HeroSectionSlider-1';
import TextMarquee from '@/components/Common/TextMarquee';
import CategoryShowcase from '@/components/Common/CategoryShowcase';
import OrderingProcess from '@/components/Common/OrderingProcess';

export default function CurtainsPage() {
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

      {/* Second Category Showcase - Custom Curtains */}
      <CategoryShowcase
        categories={[
          {
            id: 1,
            title: 'Living Room',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/living-room-curtains.jpg',
            href: '/curtains/living-room'
          },
          {
            id: 2,
            title: 'Bedroom',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/bedroom-curtains.jpg',
            href: '/curtains/bedroom'
          },
          {
            id: 3,
            title: 'Office',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/office-curtains.jpg',
            href: '/curtains/office'
          }
        ]}
        title="Custom Curtains by Room"
        description="Tailored curtain solutions for every space in your home or office"
        buttons={[
          { text: "Start Custom Order", href: "/custom-order" },
          { text: "Room Inspiration", href: "/gallery" }
        ]}
        backgroundColor="#F8F8F8"
        contentPosition="right"
      />

      {/* Third Category Showcase - Smart Solutions */}
      <CategoryShowcase
        categories={[
          {
            id: 1,
            title: 'Motorized Curtains',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/smart-curtain-tech-part-2.jpg',
            href: '/curtains/motorized'
          },
          {
            id: 2,
            title: 'Blackout Curtains',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/blackout-curtains.jpg',
            href: '/curtains/blackout'
          },
          {
            id: 3,
            title: 'Thermal Curtains',
            image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/thermal-curtains.jpg',
            href: '/curtains/thermal'
          }
        ]}
        title="Smart Curtain Solutions"
        description="Advanced curtain technologies for modern living and energy efficiency"
        buttons={[
          { text: "Explore Smart Tech", href: "/smart-curtains" },
          { text: "Schedule Demo", href: "/schedule-demo" }
        ]}
        backgroundColor="#F5F5F5"
      />

      {/* Product Cards Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              OUR PRODUCTS
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/CUSTOM-CURTAINS2.jpg"
                  alt="Curtains"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Curtains</h3>
              <p className="text-gray-600 text-center font-light">
                Elegant and functional window treatments in various styles and fabrics
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/CUSTOM-BLINDS2.jpg"
                  alt="Blinds"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Blinds</h3>
              <p className="text-gray-600 text-center font-light">
                Modern and practical window solutions with light control features
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/CUSTOM-HARDWARE2.jpg"
                  alt="Hardware"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Hardware</h3>
              <p className="text-gray-600 text-center font-light">
                Premium quality curtain rods, tracks, and accessories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Processing Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              ORDER PROCESS
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Expert consultation to understand your needs and preferences' },
              { step: '02', title: 'Measurement', desc: 'Professional measurement of your windows for perfect fit' },
              { step: '03', title: 'Design', desc: 'Custom design selection based on your style and requirements' },
              { step: '04', title: 'Installation', desc: 'Professional installation by our experienced team' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-gray-400 mb-4">{item.step}</div>
                <h3 className="text-xl font-light tracking-wide mb-2">{item.title}</h3>
                <p className="text-gray-600 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              SPECIAL FEATURES
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/smart-curtain-tech-part-2.jpg"
                  alt="Motorized Curtains"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Motorized Curtains</h3>
              <p className="text-gray-600 text-center font-light">
                Automated curtain systems with remote control and smart home integration
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/smart-curtain-tech-part-3.jpg"
                  alt="Energy Saving Fabrics"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Energy Saving Fabrics</h3>
              <p className="text-gray-600 text-center font-light">
                Thermal and blackout fabrics that help reduce energy costs
              </p>
            </div>

            <div className="group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <Image
                  src="https://www.homedecorindonesia.com/wp-content/uploads/2025/02/smart-curtain-tech-part-4.jpg"
                  alt="Low Maintenance Fabric"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-center mb-2">Low Maintenance Fabric</h3>
              <p className="text-gray-600 text-center font-light">
                Durable, easy-to-clean fabrics perfect for everyday use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
              OUR CLIENTS
            </h2>
            <div className="w-24 h-0.5 bg-gray-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Residential', desc: 'Home owners' },
              { name: 'Commercial', desc: 'Office spaces' },
              { name: 'Hospitality', desc: 'Hotels & resorts' },
              { name: 'Retail', desc: 'Stores & boutiques' },
              { name: 'Healthcare', desc: 'Hospitals & clinics' },
              { name: 'Education', desc: 'Schools & universities' }
            ].map((client, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                  <Image
                    src="https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c9.png"
                    alt={client.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-light tracking-wide">{client.name}</h3>
                <p className="text-xs text-gray-500">{client.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <Reviews />

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