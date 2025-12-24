'use client'

import Link from 'next/link'
import Image from 'next/image'
import HeroSectionSlider1 from '@/components/Common/HeroSectionSlider-1'
import Showrooms from '@/components/Homepage/Showrooms'
import CtaBanner from '@/components/Common/CtaBanner'
import ServicesSection from '@/components/Common/ServicesSection'
import BenefitsExpectation from '@/components/Common/BenefitExpectation'

export default function UpholsteryPage() {
  const slides = [
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/10/CURTAIN-BANNER-41-scaled.jpg',
      title: 'Premium Upholstery Services',
      subtitle: 'Transform your furniture with expert craftsmanship',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Get Quote',
        href: '/contact',
        variant: 'primary'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/114.jpg',
      title: 'Custom Furniture Solutions',
      subtitle: 'Bespoke designs tailored to your style',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'Explore Designs',
        href: '/upholstery/services',
        variant: 'outline'
      }
    },
    {
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/08/213-scaled.jpg',
      title: 'Quality Materials',
      subtitle: 'Premium fabrics and sustainable materials',
      contentPosition: 'items-center justify-center',
      button: {
        text: 'View Materials',
        href: '/upholstery/materials',
        variant: 'primary'
      }
    }
  ]

  const services = [
    {
      id: 'sofa-chair-upholstery',
      title: 'Sofa & Chair Upholstery',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/1.-SOFA-CHAIR-UPHOLSTERY.jpg',
      href: '/upholstery/sofa-chair'
    },
    {
      id: 'custom-sofas-chairs',
      title: 'Custom Sofas & Chairs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/1.-SOFA-CHAIR-UPHOLSTERY.jpg',
      href: '/upholstery/custom-sofas'
    },
    {
      id: 'custom-beds-headboards',
      title: 'Custom Beds & Headboards',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/03/3.-CUSTOM-BEDS-HEADBOARDS-scaled-1.jpg',
      href: '/upholstery/beds-headboards'
    }
  ]

  const customService = [
    {
      id: 'custom-foams-cushions',
      title: 'Custom Foams & Cushions',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/4.-CUSTOM-FOAMS-CUSHIONS_.jpg',
      href: '/upholstery/foams-cushions'
    },
    {
      id: 'fabric-wall-panelling',
      title: 'Custom Fabric Wall Panelling',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/02/5.-CUSTOM-FABRIC-WALL-PANELLING_.jpg',
      href: '/upholstery/wall-panelling'
    }
  ]

  const products = [
    {
      id: 'upholstery-fabrics indors',
      title: 'Upholstery Fabrics Indoors',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/03/6.-UPHOLSTERY-FABRICS-INDOORS.jpg',
      href: '/upholstery/fabrics-indoors'
    },
    {
      id: 'upholstery-fabrics-outdoors',
      title: 'Upholstery Fabrics Outdoors',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/03/7.-UPHOLSTERY-FABRICS-OUTDOORS.jpg',
      href: '/upholstery/fabrics-outdoors'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSectionSlider1 slides={slides} autoPlayInterval={5000} />

      {/* Welcome Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
              Upholstery Services: Give New Life to Your Beloved Furniture
            </h2>
            <p className="text-lg md:text-xl font-light tracking-wide text-gray-600 leading-relaxed">
              Welcome to our upholstery service section. We specialize in providing high-quality upholstery services to give your furniture a new lease of life.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection 
        title="Services"
        topData={services}
        bottomData={customService}
      />

      <ServicesSection
        title="Products"
        topData={[]}
        bottomData={products} 
      />

      <BenefitsExpectation />

      {/* Cta Banner Section */}
      <CtaBanner 
        title="Book A Free Home Visit"
        buttonText="Book Now"
        linkHref="/appointment"
        backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600"
      />

      {/* Showrooms Section */}
      <Showrooms />

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}