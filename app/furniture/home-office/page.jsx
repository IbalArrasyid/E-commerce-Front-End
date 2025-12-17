'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import GridHotspotGallery from '@/components/Common/GridHotspotGallery'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function HomeOfficePage() {
  // Data for shop by sections
const HomeOfficeFurniture = [
    {
      id: 'study-tables',
      name: 'Study Tables',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-STUDY-MAKEUP-TABLE.jpg.webp',
      href: '/furniture/home-office/study-tables'
    },
    {
      id: 'executive-chairs',
      name: 'Executive Chairs',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-OFFICE-CHAIR.jpg.webp',
      href: '/furniture/home-office/executive-chairs'
    },
    {
        id: 'bookcases',
        name: 'Bookcases',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-BOOK-CASE.jpg.webp',
        href: '/furniture/home-office/bookcases'
    }
  ]

  return (
    <main className="min-h-screen">


        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <ShopBySection
            title="Home Office Furniture"
            items={HomeOfficeFurniture}
        />
        
        </div>
    </main>
  )
}