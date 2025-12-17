'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import GridHotspotGallery from '@/components/Common/GridHotspotGallery'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function DiningRoomPage() {
  // Data for shop by sections
const DiningRoomFurniture = [
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
        id: 'trolleys',
        name: 'Trolleys',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/TROLLEY.jpg',
        href: '/furniture/dining-room/trolleys'
    },
    {
        id: 'buffets-sideboards',
        name: 'Buffets & Sideboards',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/ezgif.com-webp-to-png-1.png',
        href: '/furniture/dining-room/buffets-sideboards'
    }
  ]

  // Grid gallery images and hotspots data
  const DiningRoomImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa.jpg',
      alt: 'Your Premier Dining Room Furniture Store for Luxury Dining Room Design'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-1.jpg',
      alt: 'Dining room detail'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-3.jpg',
      alt: 'Modern Dining Tables & Chairs'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-5.jpg',
      alt: 'Dining room lighting'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-2.jpg',
      alt: 'Dining table detail'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-4.jpg',
      alt: 'Modern dining setup'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/09/Ruang-Makan-Impian-Dimulai-dari-Sini.-Wujudkan-area-makan-yang-nyaman-dan-stylish-sebagai-pusa-6.jpg',
      alt: 'Dining room ambiance'
    }
  ]

  const DiningRoomHotspots = [
    // {
    //   id: 'brooks-swivel-dining-chair',
    //   imageIndex: 2,
    //   position: { top: '320px', right: '50px' },
    //   tooltipPosition: { top: '40px', right: '-70px' },
    //   title: 'Brooks Swivel Dining Chair',
    //   productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/05/Brooks-Swivel-Leather-Dining-Armchair-1.jpg',
    //   description: 'Brown, Silver',
    //   pricing: {
    //     original: 'Rp 7,020,750',
    //     sale: 'Rp 5,967,638'
    //   },
    //   url: 'https://www.homedecorindonesia.com/product/brooks-swivel-leather-dining-armchair/'
    // },
    // {
    //   id: 'dining-table-modern',
    //   imageIndex: 0,
    //   position: { bottom: '200px', left: '60px' },
    //   tooltipPosition: { bottom: '40px', left: '-70px' },
    //   title: 'Modern Dining Table',
    //   productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-DINING-TABLE.jpg',
    //   description: 'Extendable design, Premium wood finish',
    //   pricing: {
    //     original: 'Rp 15,500,000',
    //     sale: 'Rp 12,400,000'
    //   },
    //   url: 'https://www.homedecorindonesia.com/product/dining-table-modern/'
    // },
    // {
    //   id: 'chandelier-modern',
    //   imageIndex: 0,
    //   position: { top: '80px', right: '100px' },
    //   tooltipPosition: { top: '-40px', right: '-70px' },
    //   title: 'Modern Chandelier',
    //   productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/02/PO-21-600x390.jpg.webp',
    //   description: 'LED lighting, Contemporary design',
    //   pricing: {
    //     original: 'Rp 8,750,000',
    //     sale: 'Rp 6,125,000'
    //   },
    //   url: 'https://www.homedecorindonesia.com/product/chandelier-modern/'
    // }
  ]

  const whatWeOfferItems = [
    {
        id: 'whatWeOffer1',
        title: 'Dining Tables:',
        content: 'When you shop dining table models with us, you\'ll discover a wide array of options designed for every style. Our collection includes rectangular, square, round, oval, and extendable tables-practical and aesthetic solutions to maximize your space. Customization options are available for select models, allowing you to create a table that perfectly aligns with your preferences.'
    },
    {
        id: 'whatWeOffer2',
        title: 'Dining Chairs:',
        content: 'Find the perfect match for your table and create a set of nice dining table and chairs. We offer a selection of ready-to-purchase chairs directly from our showroom for your convenience. Additionally, embrace our custom options for sizes, shapes, and upholstery for a more personal and exclusive touch.'
    },
    {
        id: 'whatWeOffer3',
        title: 'Bar Chairs:',
        content: 'Explore our dynamic range of bar chairs, readily available for immediate purchase directly from our showroom. Each chair is crafted to provide both style and comfort, elevating the ambiance of your bar area. For a more personalized touch, delve into the possibilities of customization. We offer a variety of options for sizes, shapes, and upholstery, allowing you to tailor each bar chair to harmonize seamlessly with your individual taste and interior design.'
    },
    {
        id: 'whatWeOffer4',
        title: 'Buffets and Sideboards:',
        content: 'Perfect for storage and display, these pieces add functionality and style, completing your luxury dining room design.'
    },
    {
        id: 'whatWeOffer5',
        title: 'Bar Carts and Display Cabinets:',
        content: 'Enhance your dining experience with these elegant and versatile additions.'
    }
  ]

  const whyChooseUsItems = [
    {
        id: 'whyChooseUs1',
        title: 'Exclusive Collection for a Luxury Dining Room Design: ',
        content: 'Each of our dining room furniture sets is uniquely and elegantly designed to bring a distinctive charm to your space.'
    },
    {
        id: 'whyChooseUs2',
        title: 'Unmatched Quality and Craftsmanship:',
        content: 'We take immense pride in the quality and longevity of our products, crafted with a commitment to both aesthetic excellence and lasting durability.'
    },
    {
        id: 'whyChooseUs3',
        title: 'Wide Variety of Choices:',
        content: 'Our extensive range includes everything from modern dining table furniture to timeless classics, ensuring every taste is catered to.'
    },
    {
        id: 'whyChooseUs4',
        title: 'Personalized Customization Options:',
        content: 'Bring your vision to life. We offer bespoke customization services for select models, allowing you to choose specific sizes, materials, and finishes.'
    },
    {
        id: 'whyChooseUs5',
        title: 'Customer-First Experience:',
        content: 'Enjoy a seamless and satisfying shopping journey, whether you\'re browsing online or visiting our stores.'
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
                        Dining Room Furniture​ <br />
                    </motion.h1>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Your Premier Dining Room Furniture Store for Luxury Dining Room Design
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
            title="Dining Room Furniture"
            items={DiningRoomFurniture}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Premier Dining Room Furniture Store for Luxury Dining Room Design
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Welcome to Home Decor Indonesia, the premier dining room furniture store where your search for the perfect dining area ends. If you've been wondering where to buy a dining table that combines elegance and comfort, you've come to the right place. We specialize in transforming dining spaces, offering a curated collection ranging from sleek modern dining table furniture to timeless classics.
            </p>
        </section>

        {/* Interactive Hotspot Section */}
        <section className="py-12">
            <GridHotspotGallery
                images={DiningRoomImages}
                hotspots={DiningRoomHotspots}
                className="rounded-lg overflow-hidden shadow-lg"
            />
        </section>
        
            <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">What Do We Offer?</h3>
                <p>As a leading dining table furniture shop, we offer a range of products designed to meet every need and taste.</p>
                <Accordion
                items={whatWeOfferItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Are We the Best Place to Buy a Dining Table?</h3>
                <Accordion
                items={whyChooseUsItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            <section className="py-16 bg-gray-50">
                <MostPopularProducts 
                apiEndpoint="/api/products/popular"
                itemsPerSlide={4}
                autoPlay={true}
                />
            </section>

            <section>
                <h4>Conclusion</h4>
                <p>Home Decor Indonesia is the ultimate destination for those seeking to create the luxury dining room design of their dreams. As a leading dining table furniture shop, we are committed to providing quality products, customization options, and outstanding customer service. Whether you are searching for a set of nice dining table and chairs or functional complements like a buffet, we are here to help you create a dining space that is not only functional but also a true reflection of your personal style.</p>
            </section>
        
        </div>
    </main>
  )
}