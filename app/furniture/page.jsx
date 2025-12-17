'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function FurniturePage() {
  // Data for shop by sections
  const shopByLivingRoom = [
    {
      id: 'sofa',
      name: 'Sofa',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-SOFA.jpg',
      href: '/furniture/living-room/sofas'
    },
    {
      id: 'sectional-sofa',
      name: 'Sectional Sofa',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-SOFA-L.jpg',
      href: '/furniture/living-room/sectional-sofas'
    },
    {
        id: 'cleopatra-sofa',
        name: 'Cleopatra Sofa',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/09/8.-DAYBED.jpg',
        href: '/furniture/living-room/cleopatra-day-beds'
    },
    {
        id: 'armchairs',
        name: 'Armchairs',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-ARMCHAIR.jpg',
        href: '/furniture/living-room/arm-chairs'
    },
    {
        id: 'Sidetable',
        name: 'Side Table',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/4.-SIDE-TABLE.jpg',
        href: '/furniture/living-room/sidetable'
    },
    {
        id: 'coffee-table',
        name: 'Coffee Table',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-COFFEE-TABLE.jpg',
        href: '/furniture/living-room/coffee-table'
    },
    {
        id: 'benchs',
        name: 'Benchs',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/7.-BENCH.jpg',
        href: '/furniture/living-room/benchs'
    },
    {
        id: 'ottoman-pouf',
        name: 'Ottoman & Pouf',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/6.-OTTOMAN-POUF.jpg',
        href: '/furniture/living-room/ottoman-pouf'
    },
    {
        id: 'decorative-stools',
        name: 'Decorative Stools',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/STOOL.jpg',
        href: '/furniture/living-room/decorative-stools'
    },
    {
        id: 'console-table',
        name: 'Console Table',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-CONSOLE-TABLE.jpg',
        href: '/furniture/living-room/console-table'
    },
    {
        id: 'chest-of-drawers',
        name: 'Chest of Drawers',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/4.-BUFFET.jpg',
        href: '/furniture/living-room/chest-of-drawers'
    },
    {
        id: 'Sideboard-buffet',
        name: 'Sideboard & buffet',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/8.-BUFFET.jpg',
        href: '/furniture/living-room/buffet'
    },
    {
        id: 'tv-stand',
        name: 'TV Stand',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/9.-TV-STAND.jpg',
        href: '/furniture/living-room/tv-stand'
    },
    {
        id: 'room-divider',
        name: 'Room Divider',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/6.-ROOM-DIVIDERS.png',
        href: '/furniture/living-room/room-divider'
    }
  ]

  const shopByBedroom = [
    { 
        id: 'beds', 
        name: 'Beds', 
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BED1.jpg', 
        href: 'furniture/bedroom/beds' 
    },
    {
        id: 'headboards',
        name: 'Headboards',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-HEADBOARDS.jpg',
        href: '/furniture/bedroom/headboards'
    },
    {
        id: 'Bedside-tables-nightstand',
        name: 'Bedside Tables & Nightstand',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BEDSIDE-NIGHTSTAND.jpg',
        href: '/furniture/bedroom/bedside-nightstand'
    },
    {
        id: "Make-up-dressing-tables",
        name: 'Make Up & Dressing Tables',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/6.-MAKE-UP-TABLE.jpg',
        href: '/furniture/bedroom/make-up-dressing-tables'
    },
    {
        id: 'Chests-of-drawers',
        name: 'Chests of Drawers',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/ezgif.com-webp-to-png-2.png',
        href: '/furniture/bedroom/chests-of-drawers'
    },
    {
        id: 'TV Cabinets',
        name: 'TV Cabinets',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/9.-TV-STAND.png',
        href: '/furniture/bedroom/tv-cabinets'
    },
    {
        id: 'Bed Benchs',
        name: 'Bed Benchs',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/7.-BENCH.png',
        href: '/furniture/bedroom/bed-benchs'
    }
  ]

  const shopByDiningRoom = [
    {
      id: 'dining-tables',
      name: 'Dining Tables',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-DINING-TABLE.jpg',
      href: '/furniture/dining-room/dining-tables'
    },
    {
        id: 'dining-chairs',
        name: 'Dining Chairs',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-DINING-CHAIR.jpg',
        href: '/furniture/dining-room/dining-chairs'
    },
    {
        id: 'bar-chairs-stools',
        name: 'Bar Chairs & Stools',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BAR-CHAIR.jpg',
        href: '/furniture/dining-room/bar-chairs-stools'
    },
    {
        id: 'trolleys-bar-carts',
        name: 'Trolleys & Bar Carts',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/TROLLEY.jpg',
        href: '/furniture/dining-room/trolleys-bar-carts'
    },
    {
        id: 'buffet-sideboards',
        name: 'Buffet & Sideboards',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/ezgif.com-webp-to-png-1.png',
        href: '/furniture/dining-room/buffet-sideboards'
    }
  ]

  const shopByHomeOffice = [
    {
        id: 'study-tables',
        name: 'Study Tables',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-STUDY-MAKEUP-TABLE.jpg',
        href: '/furniture/home-office/study-tables'
    },
    {
        id: 'study-chairs',
        name: 'Study Chairs',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-OFFICE-CHAIR.jpg',
        href: '/furniture/home-office/study-chairs'
    },
    {
        id: 'bookcases',
        name: 'Bookcases',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-BOOK-CASE.jpg',
        href: '/furniture/home-office/bookcases'
    }
  ]

  const shopByAccents =[
    {
        id: 'display-cabinet-chinoiserie',
    }
  ]

  // Accordion data for furniture information
  const furnitureInfoItems = [
    {
      id: 'about-us',
      title: 'Discover Modern Furniture at Home Decor Indonesia',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Where timeless tradition meets modern sensibilites in furniture design. We understand that modern living demands furniture that is not only aesthetically pleasing but also practical and durable.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
            <p className="text-sm text-green-800 font-medium">
              Experience the perfect blend of tradition and innovation in every piece we create.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'our-offerings',
      title: 'Our Offerings',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            At Home Decor Indonesia - Luxury Furniture Store, we offer a diverse range of home living furniture to suit any style and need. Our living room collection features comfortable and stylish sofas, sectional and corner sofas, and armchairs, perfect for relaxing and entertaining. For the bedroom, our beds and headboards are designed for the utmost comfort and style. Our dining room selection includes elegant, trending dining tables set and chairs, bar chairs, and trolleys & bar carts, ideal for both everyday use and special occasions. In the realm of home office furniture, we provide study tables and chairs that are both functional and fashionable, ensuring a productive and comfortable workspace. Our accents collection, including display cabinets and decorative stools, adds a unique touch to any room.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">LR</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Living Room</h4>
              <p className="text-sm text-gray-600">Sofas, chairs, tables & more</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">BR</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bedroom</h4>
              <p className="text-sm text-gray-600">Beds, wardrobes & storage</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">DR</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dining Room</h4>
              <p className="text-sm text-gray-600">Tables, chairs & storage</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'why-choose-us',
      title: 'Why Choose Us?',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            At Home Decor Indonesia, we're more than just a luxury furniture store; we're a destination for quality, beauty, and unparalleled customization. Our commitment to excellence is evident in every piece of furniture we offer. Here's why we stand out:
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Premium Quality Materials</h5>
                <p className="text-sm text-gray-600">Sourced from trusted suppliers with rigorous quality control</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Customization Options</h5>
                <p className="text-sm text-gray-600">Tailored designs to match your unique style and space</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Expert Craftsmanship</h5>
                <p className="text-sm text-gray-600">Skilled artisans with decades of experience</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900">Professional Service</h5>
                <p className="text-sm text-gray-600">From consultation to installation and beyond</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  // Most Popular Products Data
  const popularProducts = [
    {
      id: 1,
      name: 'Duke Chesterfield Sofa',
      category: 'Living Room',
      price: 21998813,
      originalPrice: 25141500,
      discount: 13,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg',
      description: 'Luxurious Chesterfield sofa with premium upholstery and elegant design',
      rating: 4.8,
      reviews: 124,
      url: '/product/duke-chesterfield-sofa',
      features: ['Premium Fabric', 'Classic Design', 'Comfortable Seating'],
      isNew: false
    },
    {
      id: 2,
      name: 'Livorno Single 11 Onyx',
      category: 'Living Room',
      price: 11280375,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/Livorno-Single-11-Onyx.jpg',
      description: 'Elegant armchair with sophisticated onyx finish',
      rating: 4.6,
      reviews: 89,
      url: '/product/livorno-single-11-onyx',
      features: ['Modern Design', 'Comfortable', 'Premium Materials'],
      isNew: true
    },
    {
      id: 3,
      name: 'Ellison Cocktail Table',
      category: 'Living Room',
      price: 33852780,
      originalPrice: 39826800,
      discount: 15,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/03/1-105-600x390.jpg.webp',
      description: 'Modern cocktail table with sleek design and premium finish',
      rating: 4.7,
      reviews: 67,
      url: '/product/ellison-cocktail-table',
      features: ['Modern Style', 'Durable', 'Easy Assembly'],
      isNew: false
    },
    {
      id: 4,
      name: 'Mane Stool 2308 Ivory',
      category: 'Living Room',
      price: 3361219,
      originalPrice: 3954375,
      discount: 15,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/11/Mane-Stool-2308-Ivory.jpg',
      description: 'Elegant ivory stool with comfortable cushioning',
      rating: 4.5,
      reviews: 45,
      url: '/product/mane-stool-2308-ivory',
      features: ['Compact Size', 'Versatile', 'Stylish'],
      isNew: false
    },
    {
      id: 5,
      name: 'Armchair Reims-02',
      category: 'Living Room',
      price: 7651000,
      originalPrice: 10930000,
      discount: 30,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/Armchair-Reims-02.jpg',
      description: 'Classic armchair with ergonomic design and premium comfort',
      rating: 4.9,
      reviews: 156,
      url: '/product/armchair-reims-02',
      features: ['Ergonomic', 'Classic Design', 'Premium Comfort'],
      isNew: false
    },
    {
      id: 6,
      name: 'Table Lamp HB-2688',
      category: 'Lighting',
      price: 6968025,
      originalPrice: 7742250,
      discount: 10,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1-758-600x390.jpg.webp',
      description: 'Modern table lamp with elegant design and warm lighting',
      rating: 4.4,
      reviews: 78,
      url: '/product/table-lamp-hb-2688',
      features: ['LED Compatible', 'Dimmable', 'Modern Design'],
      isNew: true
    },
    {
      id: 7,
      name: 'Bubal Coffee Table BU210',
      category: 'Living Room',
      price: 9240750,
      originalPrice: 10267500,
      discount: 10,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/06/1-35-600x390.jpg.webp',
      description: 'Stylish coffee table with modern design and ample storage',
      rating: 4.6,
      reviews: 92,
      url: '/product/bubal-coffee-table-bu210',
      features: ['Storage Space', 'Modern Style', 'Easy Clean'],
      isNew: false
    },
    {
      id: 8,
      name: 'Luxury Bed Frame',
      category: 'Bedroom',
      price: 18500000,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BED1.jpg',
      description: 'Premium wooden bed frame with upholstered headboard',
      rating: 4.8,
      reviews: 203,
      url: '/product/luxury-bed-frame',
      features: ['Solid Wood', 'Upholstered Headboard', 'King Size'],
      isNew: true
    },
    {
      id: 9,
      name: 'Modern Nightstand',
      category: 'Bedroom',
      price: 3250000,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BEDSIDE-NIGHTSTAND.jpg',
      description: 'Contemporary nightstand with drawer and storage shelf',
      rating: 4.3,
      reviews: 67,
      url: '/product/modern-nightstand',
      features: ['Drawer Storage', 'Shelf Space', 'Modern Design'],
      isNew: false
    },
    {
      id: 10,
      name: 'Dining Table Set',
      category: 'Dining Room',
      price: 12750000,
      originalPrice: 15000000,
      discount: 15,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-DINING-TABLE.jpg',
      description: 'Elegant dining table set for 6 people with premium finish',
      rating: 4.7,
      reviews: 145,
      url: '/product/dining-table-set',
      features: ['Seats 6', 'Solid Wood', 'Premium Finish'],
      isNew: false
    },
    {
      id: 11,
      name: 'Ergonomic Office Chair',
      category: 'Home Office',
      price: 8500000,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-OFFICE-CHAIR.jpg',
      description: 'Professional office chair with lumbar support and adjustable height',
      rating: 4.5,
      reviews: 89,
      url: '/product/ergonomic-office-chair',
      features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh'],
      isNew: true
    },
    {
      id: 12,
      name: 'Bookcase with Glass Doors',
      category: 'Home Office',
      price: 6800000,
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/5.-BOOK-CASE.jpg',
      description: 'Spacious bookcase with glass doors and adjustable shelves',
      rating: 4.6,
      reviews: 112,
      url: '/product/bookcase-glass-doors',
      features: ['Glass Doors', 'Adjustable Shelves', 'Spacious'],
      isNew: false
    }
  ]

  const whyChooseUsItems = [
    {
        id: 'why-choose-us-1',
        title: 'Quality & Durability',
        content: 'We understand that furniture is an investment. That’s why each piece in our collection isn’t just aesthetically pleasing—it’s built to endure, ensuring that your investment is not only stylish but also long-lasting.'
    },
    {
        id: 'why-choose-us-2',
        title: 'Tailored to Your Taste',
        content: 'Your home should reflect your unique style, and we make that possible. Our wide range of upholstered furniture can be customized to your preferences. From dimensions to fabric choices, the options are nearly limitless.'
    },
    {
        id: 'why-choose-us-3',
        title: 'Extensive Fabric Collection',
        content: 'We boast one of the region’s largest collections of upholstery fabrics, including exclusive designer selections. This vast array ensures that you’ll find the perfect match for your sofas, chairs, and decor.'
    },
    {
        id: 'why-choose-us-4',
        title: 'Expert Guidance',
        content: 'Our experienced staff are more than salespeople—they’re advisors who will work with you to create the ideal sofa, sectional, or chair that fits seamlessly into your space. They’ll assist you in navigating our extensive range, considering your space requirements, aesthetic desires, and color palette.'
    },
    {
        id: 'why-choose-us-5',
        title: 'Reputation of Excellence',
        content: 'Understanding that the beauty of wallpaper lies in its perfect application, we offer easy, professional installation services. Our team of skilled installers ensures a seamless and efficient process, from selecting the right wallpaper to achieving a flawless finish. This service is designed to eliminate any hassle for you, making the transformation of your space a convenient and enjoyable experience.'
    },
    {
        id: 'why-choose-us-6',
        title: 'Spacious Jakarta Stores',
        content: 'Visit our large stores in Central and South Jakarta for a hands-on experience with our furniture. Each showroom is filled with a wide variety of Indonesian designs, interior fabrics, and decor, allowing you to easily find and feel the quality of our products.'
    }
  ]

  return (
    <main className="min-h-screen">
        {/* Banner Section */}
        <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
            <Image
                src="https://www.homedecorindonesia.com/wp-content/uploads/2025/05/1.-FURNITURE.jpg"
                alt="Furniture Collection"
                fill
                className="object-cover object-center"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

            <div className="relative h-full flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-6xl mx-auto">
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider mb-6 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Luxury and Modern Furniture <br />
                    </motion.h1>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Discover timeless elegance and contemporary design in our curated collection of premium furniture
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                </div>
            </motion.div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <ShopBySection
            title="SHOP BY LIVING ROOM"
            items={shopByLivingRoom}
        />
        <ShopBySection
            title="SHOP BY BEDROOM"
            items={shopByBedroom}
        />
        <ShopBySection
            title="SHOP BY DINING ROOM"
            items={shopByDiningRoom}
        />
        <ShopBySection
            title="SHOP BY HOME OFFICE"
            items={shopByHomeOffice}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Discover Modern Furniture at Home Decor Indonesia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Where timeless tradition meets modern sensibilites in furniture design. We understand that modern living demands furniture that is not only aesthetically pleasing but also practical and durable.
            </p>
        </section>

        {/* Our Offerings Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Offerings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    At Home Decor Indonesia - Luxury Furniture Store, we offer a diverse range of home living furniture to suit any style and need. Our living room collection features comfortable and stylish sofas, sectional and corner sofas, and armchairs, perfect for relaxing and entertaining. For the bedroom, our beds and headboards are designed for the utmost comfort and style. Our dining room selection includes elegant, trending dining tables set and chairs, bar chairs, and trolleys & bar carts, ideal for both everyday use and special occasions. In the realm of home office furniture, we provide study tables and chairs that are both functional and fashionable, ensuring a productive and comfortable workspace. Our accents collection, including display cabinets and decorative stools, adds a unique touch to any room.
                </p>
            </div>
            <div className="relative">
                <img
                    src="https://www.homedecorindonesia.com/wp-content/uploads/2024/06/homedecor8.jpeg"
                    alt="Home Decor Indonesia Showroom"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>
        </section>

        {/* Why Choose Us Section */}
            <section className="text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Why Choose Us?
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                    At Home Decor Indonesia, we're more than just a luxury furniture store; we're a destination for quality, beauty, and unparalleled customization. Our commitment to excellence is evident in every piece of furniture we offer. Here's why we stand out:
                </p>
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose us?</h3>
                <Accordion
                items={whyChooseUsItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            {/* Most Popular Products Section */}
        <section className="py-16 bg-gray-50">
            <MostPopularProducts 
              apiEndpoint="/api/products/popular"
              itemsPerSlide={4}
              autoPlay={true}
            />
        </section>
        
        </div>
    </main>
  )
}