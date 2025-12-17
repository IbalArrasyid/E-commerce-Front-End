'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import InteractiveHotspot from '@/components/Common/InteractiveHotspot'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function BedRoomPage() {
  // Data for shop by sections
const BedRoomFurniture = [
    {
      id: 'beds',
      name: 'Beds',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-BED1.jpg',
      href: '/furniture/bedroom/beds'
    },
    {
      id: 'headboards',
      name: 'Headboards',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-HEADBOARDS.jpg',
      href: '/furniture/bedroom/headboards'
    },
    {
        id: 'bedside-nightstands',
        name: 'Bedside & Nightstands',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BEDSIDE-NIGHTSTAND.jpg',
        href: '/furniture/bedroom/bedside-nightstands'
    },
    {
        id: 'makeup-tables',
        name: 'Makeup Tables',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/6.-MAKE-UP-TABLE.jpg',
        href: '/furniture/bedroom/makeup-tables'
    },
    {
        id: 'Chest-of-drawers',
        name: 'Chest of Drawers and Dressers',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/4.-BUFFET.png',
        href: '/furniture/bedroom/chest-of-drawers-and-dressers'
    },
    {
        id: 'tv-stands',
        name: 'TV Stands',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/9.-TV-STAND.png',
        href: '/furniture/bedroom/tv-stands'
    },
    {
        id: 'bed-benches',
        name: 'Bed Benches',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/7.-BENCH.png',
        href: '/furniture/bedroom/bed-benches'
    }
  ]

  // Interactive hotspot data
  const BedRoomImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Discover-unparalleled-comfort-in-our-latest-bedroom-collection.-Experience-quality-sleep-like-ne.jpg',
      alt: 'Elegance in simplicity Transform your space with our luxurious leather chair, intricate geomet'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Elegance-in-simplicity-✨-Transform-your-space-with-our-luxurious-leather-chair-intricate-geomet.jpg',
      alt: 'Discover unparalleled comfort in our latest bedroom collection. Experience quality sleep like ne'
    }
  ]

  const BedRoomHotspots = [
    {
      id: 'maggie-bed-setrc-01-sandsheel',
      imageIndex: 0,
      position: { top: '60%', left: '40%' },
      tooltipPosition: { top: '-120px', left: '-70px' },
      title: 'Maggie Bed Set RC 01 Sandsheel',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/08/Maggie-Bed-Set-RC-01-Sandsheel-1-1.jpg?height=60&width=60',
      description: 'Dimensions :<br/>-Divan = T. 73 x 190 x 227 cm<br/>-Headboard = T. 159 x 190 cm',
      price: '23,493,1500',
      url: 'https://www.homedecorindonesia.com/product/maggie-bed-set-rc-01-sandsheel/'
    },
    {
      id: 'theron-nightstand',
      imageIndex: 0,
      position: { bottom: '25%', left: '5%' },
      tooltipPosition: { bottom: '120px', left: '0px' },
      title: 'Theron Nightstand',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/1-1343-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions :<br/>– 60 x 60 x 45 cm<br/>– Color : Brown<br />Frame Material :<br />– Wood : Oak, Oak Veneer, MDF<br />– Base : Iron',
      price: 'Rp Rp8,730,150',
      url: 'https://www.homedecorindonesia.com/product/theron-nightstand/'
    },
    {
      id: 'chandelier-d8067-16br',
      imageIndex: 0,
      position: { top: '10%', left: '65%' },
      tooltipPosition: { top: '50px', left: '-70px' },
      title: 'Chandelier D8067-16BR',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/02/PO-21-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 81 x 81 x 56 cm',
      pricing: {
        original: 'Rp 23,742,900',
        sale: 'Rp 18,994,320'
      },
      url: 'https://www.homedecorindonesia.com/product/chandelier-d8067-16br/'
    },
    {
      id: 'emond-carpet-150x240',
      imageIndex: 0,
      position: { top: '87%', left: '60%' },
      tooltipPosition: { top: '-70px', left: '-70px' },
      title: 'Emond Carpet (150x240)',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/04/1-7.jpg?height=60&width=60',
      description: 'Dimensions : 150 x 240 cm',
      pricing: {
        original: 'Rp 13,875,000',
        sale: 'Rp 9,018,750'
      },
      url: 'https://www.homedecorindonesia.com/product/emond-carpet-150x240/'
    },
    {
      id: 'culkin-chair-cp62',
      imageIndex: 1,
      position: { top: '50%', right: '10%' },
      tooltipPosition: { top: '-80px', right: '-40px' },
      title: 'Culkin Chair CP62',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/11/Culkin-Chair-CP62-PO.jpg?height=60&width=60',
      description: 'Dimensions : 72 x 82 x 79.5 cm',
      pricing: {
        original: 'Rp 15,207,000',
        sale: 'Rp 9,884,550'
      },
      url: 'https://www.homedecorindonesia.com/product/culkin-chair-cp62/'
    },
    {
      id: 'gascoin-tv-stand-ga222',
      imageIndex: 1,
      position: { top: '53%', left: '10%' },
      tooltipPosition: { top: '-50px', left: '-20px' },
      title: 'Gascoin TV Stand GA222',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/1-901-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 204 x 60 x 42.5 cm',
      price: 'Rp 25,058,250',
      url: 'https://www.homedecorindonesia.com/product/gascoin-tv-stand-ga222/'
    },
    {
      id: 'table-base-hds526',
      imageIndex: 1,
      position: { top: '55%', left: '47%' },
      tooltipPosition: { top: '50px', left: '0px' },
      title: 'Table Base HDS526',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/10/1-17-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : Diameter 50 x 60 cm<br />Frame Material : Synthetic Stone, Metal',
      pricing: {
        original: 'Rp 9,379,500',
        sale: 'Rp 7,972,575'
      },
      url: 'https://www.homedecorindonesia.com/product/table-base-hds526/'
    },
    {
      id: '07-110322-mirror',
      imageIndex: 1,
      position: { top: '4%', left: '16%' },
      tooltipPosition: { top: '50px', left: '-30px' },
      title: '07-110322 Mirror',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/1-1171.jpg?height=60&width=60',
      description: 'Dimensions : 140 x 90 cm',
      pricing: {
        original: 'Rp 10,572,750',
        sale: 'Rp 7,929,563'
      },
      url: 'https://www.homedecorindonesia.com/product/07-110322mirror/'
    }
  ]

  const whatWeOfferItems = [
    {
        id: 'whatWeOffer1',
        title: 'Beds and Headboards:',
        content: 'Discover a variety of bed styles, including luxurious upholstered headboards and sturdy wooden frames, embodying the essence of Indonesian bedroom furniture.'
    },
    {
        id: 'whatWeOffer2',
        title: 'Chest of Drawers and Dressers:',
        content: 'Our coffee tables are not just functional but also add a touch of elegance to your living room. From traditional wooden tables to modern glass designs, we have it all.'
    },
    {
        id: 'whatWeOffer3',
        title: 'Nightstands:',
        content: 'Complete your bedroom set with our elegant nightstands, perfect for keeping your essentials within reach and out of sight.'
    },
    {
        id: 'whatWeOffer4',
        title: 'Makeup Tables:',
        content: 'Experience the perfect blend of style and convenience with our makeup tables. Designed with your needs in mind, these tables not only enhance your bedroom’s look but also streamline your daily routine. Visit us to explore our collection and find the ideal makeup table that brings ease and elegance to your beauty rituals.'
    },
    {
        id: 'whatWeOffer5',
        title: 'TV Cabinets:',
        content: 'Elevate your bedroom entertainment experience with our beautifully crafted TV cabinets. Designed with a perfect balance of contemporary elegance and practical functionality, these cabinets offer a sleek, space-saving solution for organizing your media essentials while enhancing the overall aesthetic of your bedroom.'
    },
    {
        id: 'whatWeOffer6',
        title: 'Bed Benches:',
        content: 'Add a touch of sophistication and convenience to your bedroom with our elegant bed benches. Perfect for the foot of your bed, these benches not only provide a chic seating option but also serve as a practical space for laying out tomorrow’s outfit or storing extra blankets. Our collection features a range of styles, from modern to classic, all crafted to complement your bedroom decor while offering an extra layer of comfort and luxury.'
    }
  ]

  const whyChooseUsItems = [
    {
        id: 'whyChooseUs1',
        title: 'Exclusive Collections:',
        content: 'Our bedroom furniture collections are curated to offer unique and stylish options.'
    },
    {
        id: 'whyChooseUs2',
        title: 'Quality Assurance:',
        content: 'We pride ourselves on providing high-quality Indonesian bedroom furniture that stands the test of time.'
    },
    {
        id: 'whyChooseUs3',
        title: 'Customizable Fabric Options:',
        content: 'Dive into a world of choices with thousands of high-quality, ready-stocked performance and designer upholstery fabrics. Tailor your upholstered beds, bed benches, and bedroom sofas and chairs to perfectly match your taste and functional needs.'
    },
    {
        id: 'whyChooseUs4',
        title: 'Affordability:',
        content: 'Despite our focus on quality, our bedroom furniture is affordable, offering great value for money.'
    },
    {
        id: 'whyChooseUs5',
        title: 'Online Convenience:',
        content: 'Our bedroom furniture online section allows you to browse and buy from the comfort of your home.'
    },
    {
        id: 'whyChooseUs6',
        title: 'Visually Stunning and Harmonized Showroom Experience:',
        content: 'Experience our visually stunning and harmonized showrooms, offering bedroom sets that are coordinated and thoughtfully put together, creating a complete interior story.'
    },
    {
        id: 'whyChooseUs7',
        title: 'Customer Satisfaction:',
        content: 'Our commitment to customer satisfaction makes us one of the best bedroom furniture stores.'
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
                        Bedroom Furniture​ <br />
                    </motion.h1>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Discover the Serenity of Bedroom Furniture at Home Decor Indonesia
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
            title="Bedroom Furniture"
            items={BedRoomFurniture}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-4">
                Discover the Serenity of Bedroom Furniture at Home Decor Indonesia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Welcome to Home Decor Indonesia, where our bedroom furniture collections are designed to create a haven of comfort and style in your private sanctuary. Our bedroom furniture offers a blend of contemporary design, quality craftsmanship, and international flair, making us one of the most sought-after bedroom furniture shops.
            </p>
        </section>

        {/* Interactive Hotspot Section */}
        <section className="py-12">
            <InteractiveHotspot
                images={BedRoomImages}
                hotspots={BedRoomHotspots}
                className="rounded-lg overflow-hidden shadow-lg"
            />
        </section>
        
            <section>
                <h3 className="text-2xl font-light mb-6 text-gray-900">What Do We Offer?</h3>
                <Accordion
                items={whatWeOfferItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            <section>
                <h3 className="text-2xl font-light mb-6 text-gray-900">Why Choose us?</h3>
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

            <section>
                <h4>Conclusion</h4>
                <p>Discover the difference with Home Decor Indonesia. Our unique bedroom collections blend contemporary design with enduring quality, making your bedroom not just a space, but a sanctuary of style. From luxurious upholstered beds to sleek TV cabinets, each piece promises both elegance and functionality at an affordable price. Experience the ease of customizing your choices to reflect your personal style and enjoy the convenience of our online shopping. Choose Home Decor Indonesia, where your taste and comfort shape the bedroom of your dreams. Your dream bedroom awaits. Call us.</p>
            </section>
        
        </div>
    </main>
  )
}