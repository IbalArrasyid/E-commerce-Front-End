'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import InteractiveHotspot from '@/components/Common/InteractiveHotspot'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function LivingRoomPage() {
  // Data for shop by sections
const LivingRoomFurniture = [
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
        id: 'sofa-set',
        name: 'Sofa Set',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/10.-SOFA-SETS.jpg',
        href: '/furniture/living-room/sofa-sets'
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

  // Interactive hotspot data
  const livingRoomImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/SnapInsta.to_506076833_1371193378346484_1638906915380293301_n.jpg',
      alt: 'Luxury & Warmth in One Place'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Hadirkan-Sentuhan-Elegan-dan-Nyaman-di-Ruang-Tamu-Anda-✨Dengan-perpaduan-sofa-klasik-meja-denga.jpg',
      alt: 'Perpaduan Sofa Klasik meja kopi, sofa chesterfield, chest drawerst home decor indonesia'
    }
  ]

  const livingRoomHotspots = [
    {
      id: 'duke-sofa-1',
      imageIndex: 0,
      position: { top: '55%', left: '50%' },
      tooltipPosition: { top: '-120px', left: '-70px' },
      title: 'Duke Chesterfield Sofa',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg?height=60&width=60',
      description: 'Dimensions :<br/>– Length 218 cm x Depth 100 cm<br/>– Height 74 cm x Seat Height 46 cm',
      pricing: {
        original: 'Rp 25,141,500',
        sale: 'Rp 21,998,813'
      },
      url: 'https://www.homedecorindonesia.com/product/duke-chesterfield-sofa-cfb-01/'
    },
    {
      id: 'livorno-chair',
      imageIndex: 0,
      position: { bottom: '25%', left: '5%' },
      tooltipPosition: { bottom: '120px', left: '0px' },
      title: 'Livorno Single 11 Onyx',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/12/Livorno-Single-11-Onyx.jpg?height=60&width=60',
      description: 'Dimensions :<br/>– Length 72 cm x Depth 83 cm<br/>– Height 108 cm x Seat Height 49 cm',
      price: 'Rp 11,280,375',
      url: 'https://www.homedecorindonesia.com/product/livorno-single-11-onyx/'
    },
    {
      id: 'ellison-table',
      imageIndex: 0,
      position: { top: '70%', left: '50%' },
      tooltipPosition: { top: '50px', left: '-70px' },
      title: 'Ellison Cocktail Table',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/03/1-105-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 123 x 41 cm',
      pricing: {
        original: 'Rp 39,826,800',
        sale: 'Rp 33,852,780'
      },
      url: 'https://www.homedecorindonesia.com/product/ellison-cocktail-table/'
    },
    {
      id: 'mane-stool',
      imageIndex: 0,
      position: { top: '70%', left: '80%' },
      tooltipPosition: { top: '50px', left: '-70px' },
      title: 'Mane Stool 2308 Ivory',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/11/Mane-Stool-2308-Ivory.jpg?height=60&width=60',
      description: 'Dimensions : 42 x 50 cm',
      pricing: {
        original: 'Rp 3,954,375',
        sale: 'Rp 3,361,219'
      },
      url: 'https://www.homedecorindonesia.com/product/mane-stool-2308-ivory/'
    },
    {
      id: 'reims-chair',
      imageIndex: 1,
      position: { top: '60%', right: '80%' },
      tooltipPosition: { top: '-80px', right: '-160px' },
      title: 'Armchair Reims-02',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/05/Armchair-Reims-02.jpg?height=60&width=60',
      description: 'Dimensions : 80 × 85 × 92 cm',
      pricing: {
        original: 'Rp 10,930,000',
        sale: 'Rp 7,651,000'
      },
      url: 'https://www.homedecorindonesia.com/product/armchair-reims-02/'
    },
    {
      id: 'table-lamp',
      imageIndex: 1,
      position: { top: '45%', left: '34%' },
      tooltipPosition: { top: '-50px', left: '-70px' },
      title: 'Table Lamp HB-2688',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1-758-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 43 x 78 cm',
      pricing: {
        original: 'Rp 7,742,250',
        sale: 'Rp 6,968,025'
      },
      url: 'https://www.homedecorindonesia.com/product/table-lamp-hb-2688/'
    },
    {
      id: 'bubal-table',
      imageIndex: 1,
      position: { top: '62%', left: '30%' },
      tooltipPosition: { top: '50px', left: '0px' },
      title: 'Bubal Coffee Table BU210',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/06/1-35-600x390.jpg.webp?height=60&width=60',
      description: 'Dimensions : 80 x 80 x 36 cm',
      pricing: {
        original: 'Rp 10,267,500',
        sale: 'Rp 9,240,750'
      },
      url: 'https://www.homedecorindonesia.com/product/bubal-coffee-table-bu210/'
    },
    {
      id: 'duke-sofa-2',
      imageIndex: 1,
      position: { top: '60%', left: '60%' },
      tooltipPosition: { top: '50px', left: '-30px' },
      title: 'Duke Chesterfield Sofa',
      productImage: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/07/Duke-Chesterfiled-Sofa-CFB-01-PO-1.jpg?height=60&width=60',
      description: 'Dimensions :<br/>– Length 218 cm x Depth 100 cm<br/>– Height 74 cm x Seat Height 46 cm',
      pricing: {
        original: 'Rp 25,141,500',
        sale: 'Rp 21,998,813'
      },
      url: 'https://www.homedecorindonesia.com/product/duke-chesterfield-sofa-cfb-01/'
    }
  ]

  const whatWeOfferItems = [
    {
        id: 'whatWeOffer1',
        title: 'Sofas and Sectionals:',
        content: 'Our sofas are the epitome of comfort and style. Choose from a variety of designs, including L-shaped and U-shaped sectionals, perfect for larger spaces.'
    },
    {
        id: 'whatWeOffer2',
        title: 'Coffee Tables:',
        content: 'Our coffee tables are not just functional but also add a touch of elegance to your living room. From traditional wooden tables to modern glass designs, we have it all.'
    },
    {
        id: 'whatWeOffer3',
        title: 'Accent Chairs and Ottomans:',
        content: 'Add a pop of color or an extra seating option with our range of accent chairs and ottomans.'
    },
    {
        id: 'whatWeOffer4',
        title: 'TV Stands and Entertainment Units:',
        content: 'Keep your living room organized and stylish with our range of TV stands and entertainment units.'
    }
  ]

  const whyChooseUsItems = [
    {
        id: 'whyChooseUs1',
        title: 'Quality and Craftsmanship:',
        content: 'Our furniture is crafted from the finest materials, ensuring durability and longevity.'
    },
    {
        id: 'whyChooseUs2',
        title: 'Unique Designs:',
        content: 'We offer unique living room furniture that sets your home apart.'
    },
    {
        id: 'whyChooseUs3',
        title: 'Customizable Fabric Options:',
        content: 'Dive into a world of choices with thousands of high-quality, ready-stocked performance and designer upholstery fabrics. Tailor your sofas and chairs to perfectly match your taste and functional needs.'
    },
    {
        id: 'whyChooseUs4',
        title: 'Personalized Size, Firmness, and Design:',
        content: 'Beyond our showroom displays, we offer the freedom to customize. Whether it’s adjusting the firmness, tweaking dimensions, or opting for a completely unique design, we’re here to bring your vision to life. You can even bring in your designs, and we’ll help create your dream furniture.'
    },
    {
        id: 'whyChooseUs5',
        title: 'Affordability:',
        content: 'Despite our focus on quality, our living room furniture is affordable, offering great value for money.'
    },
    {
        id: 'whyChooseUs6',
        title: 'Online Convenience:',
        content: 'With living room furniture online, you can browse and buy from the comfort of your home.'
    },
    {
        id: 'whyChooseUs7',
        title: 'Visually Stunning and Harmonized Showroom Experience:',
        content: 'Our furniture stores offer living room sets that are coordinated and thoughtfully put together creating a complete interior story.'
    },
    {
        id: 'whyChooseUs8',
        title: 'Customer Satisfaction:',
        content: 'Our commitment to customer satisfaction makes us one of the best living room furniture stores.'
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
                        Living Room Furniture​ <br />
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
            title="Living Room Furniture"
            items={LivingRoomFurniture}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Discover Modern Living Room Furniture at Home Decor Indonesia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Welcome to Home Decor Indonesia’s Living Room Furniture Section, Choosing living room furniture is a significant decision, and at Home Decor Indonesia, we strive to make this process as enjoyable and satisfying as possible. With our wide selection, affordable prices, and commitment to quality, we are confident that you will find the perfect pieces to create a living room that you love.
            </p>
        </section>

        {/* Interactive Hotspot Section */}
        <section className="py-12">
            <InteractiveHotspot
                images={livingRoomImages}
                hotspots={livingRoomHotspots}
                className="rounded-lg overflow-hidden shadow-lg"
            />
        </section>
        
            <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">What Do We Offer?</h3>
                <Accordion
                items={whatWeOfferItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose us?</h3>
                <Accordion
                items={whyChooseUsItems}
                variant="luxurious"
                allowMultiple={true}
                />
            </section>

            <section>
                <h4>Conclusion</h4>
                <p>At Home Decor Indonesia, we offer more than just Living room furnitures; we provide a pathway to your dream living space. With our quality, unique designs, and customizable options, we ensure every piece reflects your personal style and meets your needs. Experience the joy of transforming your living room into a space you love, with the ease and convenience of our service. Call us for creating a home that’s uniquely yours.</p>
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