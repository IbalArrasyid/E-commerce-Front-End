'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import GridHotspotGallery from '@/components/Common/GridHotspotGallery'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function DecorationPage() {
  // Data for shop by sections
const HomeAccents = [
    {
      id: 'decorative-stools',
      name: 'Dining Tables',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/STOOL.jpg.webp',
      href: '/decoration/home-accents/decorative-stools'
    },
    {
      id: 'vase-ceramic-jars',
      name: 'Vase & Ceramic Jars',
      image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/07/1.-VASES-JARS.jpg.webp',
      href: '/decoration/home-accents/vase-ceramic-jars'
    },
    {
        id: 'photo-frames',
        name: 'Photo Frames',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-PHOTO-FRAMES.jpg.webp',
        href: '/decoration/home-accents/photo-frames'
    },
    {
        id: 'bowls-trays',
        name: 'Bowls & Trays',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/3.-BOWL-TRAYS.jpg.webp',
        href: '/decoration/home-accents/bowls-trays'
    },
    {
        id: 'books-bookends',
        name: 'Books & Bookends',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/4.-BOOKENDS.jpg.webp',
        href: '/decoration/home-accents/books-bookends'
    },
    {
        id: 'decor-arts-sculptures',
        name: 'Decor Arts & Sculptures',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/07/8.-SCULPTURE.jpg.webp',
        href: '/decoration/home-accents/decor-arts-sculptures'
    },
    {
        id: 'candle-holders',
        name: 'Candle Holders',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/07/9.-CANDLE-HOLDER.jpg.webp',
        href: '/decoration/home-accents/candle-holders'
    },
    {
        id: 'flower-arrangements',
        name: 'Flower Arrangements',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/07/7.-FLOWER-ARRANGEMENT.jpg.webp',
        href: '/decoration/home-accents/flower-arrangements'
    }
  ]

const WallDecor = [
    {
        id: 'wall-arts',
        name: 'Wall Arts',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/11/1-1219.png.webp',
        href: '/furniture/decoration/wall-decor/wall-arts'
    },
    {
        id: 'mirrors',
        name: 'Mirrors',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/MIRROR1.jpg.webp',
        href: '/furniture/decoration/wall-decor/mirrors'
    },
    {
        id: 'clocks',
        name: 'Clocks',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-CLOCKS.jpg.webp',
        href: '/furniture/decoration/wall-decor/clocks'
    }
]

const Cushions = [
    {
        id: 'square-cushions',
        name: 'Square Cushions',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/1.-SQUARE-CUSHIONS.jpg.webp',
        href: '/cushions/square-cushions'
    },
    {
        id: 'rectangle-cushions',
        name: 'Rectangle Cushions',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/2.-RECTANGLE-CUSHIONS.jpg.webp',
        href: '/cushions/rectangle-cushions'
    }
]

  // Grid gallery images and hotspots data
  const DecorationImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Siapa-sih-yang-nggak-pengen-punya-living-room-secakep-ini-%F0%9F%98%8D-Tiap-sudutnya-tuh-ngajak-kita-buat-.jpg?height=600&width=400',
      alt: 'decoration living room'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Romance-in-Every-Corner-%E2%9D%A4%EF%B8%8F%E2%9C%A8-Celebrate-love-with-a-touch-of-elegance-and-comfort.-This-Valentine.jpg?height=300&width=300',
      alt: 'Valentine decoration'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Keanggunan-yang-memikat-dalam-perpaduan-warna-biru-dan-emas.-Detail-mewah-pada-vas-ini-menonjolk.jpg?height=300&width=300',
      alt: 'blue and gold vase'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Realistic-Artificial-FlowersAdd-a-beautiful-finishing-touch-to-any-roomImported-from-Netherlands.jpg?height=300&width=300',
      alt: 'artificial flowers'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/08/Armchair-bergaya-klasik-dan-meja-elegan-berpadu-sempurna-dalam-ruangan-ini-menciptakan-atmosfer.jpg?height=300&width=300',
      alt: 'classic armchair setup'
    }
  ]

  const DecorationHotspots = [
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

  const faq = [
    {
        id: 'faq1',
        title: 'What is the "Rule of Three" in decorating?',
        content: 'The ‘Rule of Three’ is a classic design principle that suggests items arranged in odd numbers (especially three) are more visually appealing and memorable than even-numbered groupings. Try styling a group of three vases of varying heights on a console, or a candle, a small book, and a decorative object on a tray for a balanced, professional look.'
    },
    {
        id: 'faq2',
        title: 'How do I make my shelves or console table look styled, not cluttered?',
        content: 'The secret is to create small groupings (or ‘vignettes’) and to leave some “breathing room.” Group related items together and vary their height to create a dynamic visual skyline. Most importantly, resist the urge to fill every inch of the surface; empty space is a crucial element of sophisticated styling.'
    },
    {
        id: 'faq3',
        title: 'How do I mix different materials and textures like a designer?',
        content: 'Mixing textures is key to creating a rich, layered look. A great formula is to combine something hard & smooth (like a marble tray or a metal sculpture), something soft & textural (like a stack of linen-bound books or a ceramic vase), and something natural & organic (like a small plant or a wooden object). This creates beautiful, sophisticated contrast.'
    },
    {
        id: 'faq4',
        title: 'I have my main furniture. Where do I start with accent pieces?',
        content: 'Start by identifying the “empty moments” in your room a bare console table, an empty corner, a sofa with no cushions. Then, choose one beautiful statement piece to solve that one problem, like a large vase for the corner or a pair of beautiful cushions for the sofa. You can slowly build out from there. It’s about adding layers, not just filling space.'
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
                        Exclusive Home Decor Accessories <br />
                    </motion.h1>

                    <motion.div
                        className="mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Exclusive Home Decor Accessories to Elevate Your Living Space
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
            title="Shop By Home Accents"
            items={HomeAccents}
        />

        <ShopBySection
            title="Popular Wall Decor Collections"
            items={WallDecor}
        />

        <ShopBySection
            title="Cozy Cushions for Every Style"
            items={Cushions}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Functional Minimalist Furniture for Modern Living
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Finding the right accent should be an inspiring journey. Begin by exploring our collections, thoughtfully organized to help you find the perfect piece that speaks to your style. For the modern home where style meets practicality, our functional minimalist furniture offers the perfect solution. This collection features versatile pieces with clean lines and smart designs, crafted to enhance your daily life, declutter your space, and bring a sense of uncluttered harmony to your interior.
            </p>
        </section>

        {/* Interactive Hotspot Section */}
        <section className="py-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Embracing 2025 Interior Design Trends: Natural & Smart</h3>
            <GridHotspotGallery
                images={DecorationImages}
                hotspots={DecorationHotspots}
                className="rounded-lg overflow-hidden shadow-lg"
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
                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Commitment to Curated Quality</h4>
                <p>We believe that even the smallest objects in your home should be crafted with exceptional quality and artistic integrity. Every piece in our home decor collection is chosen for its superior materials, beautiful craftsmanship, and timeless design. These are the lasting details that are designed to bring you joy for years to come.</p>
        </section>
        
        <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h3>
                <Accordion
                items={faq}
                variant="luxurious"
                allowMultiple={true}
                />
        </section>
        
        </div>
    </main>
  )
}