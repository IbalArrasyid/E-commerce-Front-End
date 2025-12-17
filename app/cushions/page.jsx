'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ShopBySection from '@/components/Common/ShopBySection'
import Accordion from '@/components/Common/Accordion'
import GridHotspotGallery from '@/components/Common/GridHotspotGallery'
import MostPopularProducts from '@/components/Common/MostPopularProducts'

export default function CushionsPage() {
  // Data for shop by sections
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
    },
    {
        id: 'rounds-cushions',
        name: 'Round Cushions',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2024/06/PO-3.jpg.webp',
        href: '/cushions/rounds-cushions'
    }
  ]

  // Grid gallery images and hotspots data
  const cushionsImages = [
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy.jpg',
      alt: 'Cozy Sofa with Cushions'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-1.jpg',
      alt: 'living room with Cushions'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-2.jpg',
      alt: 'modern sofa with cushions'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-3.jpg',
      alt: 'elegant living room setup'
    },
    {
      src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-4.jpg',
      alt: 'cushions on sofa'
    },
    {
        src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-5.jpg',
        alt: 'cozy cushions setup'
    },
    {
        src: 'https://www.homedecorindonesia.com/wp-content/uploads/2025/11/Bikin-sofa-kamu-jadi-spot-favorit-keluarga-%F0%9F%9B%8B%EF%B8%8F%F0%9F%A6%A2-Bantal-bulu-angsa-siap-menemani-hari-hari-cozy-6.jpg',
        alt: 'modern living room with cushions'
    }
  ]

  const cushionsHotspots = [
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
        title: 'How many cushions or pillows should I put on my sofa?',
        content: 'For optimal comfort and aesthetics, choose cushions that are proportional to your sofa size. Standard sofas typically look best with cushions ranging from 45cm to 50cm square. Larger sectionals can accommodate bigger cushions up to 60cm, while smaller loveseats work well with 40cm cushions. Consider using a mix of sizes for added visual interest.'
    },
    {
        id: 'faq2',
        title: 'What fabric is best for high-traffic areas?',
        content: 'For high-traffic living spaces, we recommend durable fabrics like leather and tightly-woven cotton. These materials are easier to clean and maintain their appearance over time. Velvet, while luxurious, is better suited for decorative purposes or lower-traffic areas. Always check the care instructions for specific cleaning recommendations.'
    },
    {
        id: 'faq3',
        title: 'How many cushions should I place on my sofa?',
        content: 'The “Rule of Three” works beautifully for cushion arrangements. For a three-seater sofa, 3-5 cushions create a balanced, inviting look without overwhelming the space. Two-seater sofas typically look best with 2-3 cushions, while sectionals can accommodate 5-7 pieces. Remember to leave enough seating space for comfortable use.'
    },
    {
        id: 'faq4',
        title: 'How do I mix and match pillow and cushion colors & patterns?',
        content: 'Start with a neutral base color that complements your sofa, then add accent cushions in complementary colors or patterns. A successful combination typically includes a mix of solid colors and one or two patterned pieces. Keep within a cohesive color palette of 3-4 colors for a sophisticated look. Varying textures adds depth and visual interest.'
    },
    {
        id: 'faq5',
        title: 'How do I care for my luxury cushions?',
        content: 'Care requirements vary by fabric. Leather cushions should be wiped with a damp cloth and conditioned periodically. Velvet benefits from gentle brushing to maintain its pile. Cotton and linen covers are often machine washable (check labels). For all cushions, regular plumping and rotating helps maintain their shape. Always follow the specific care instructions provided with each product.'
    },
    {
        id: 'faq6',
        title: 'Do you offer custom pillow or cushion sizes or designs?',
        content: 'Yes, we offer custom cushion services for clients seeking specific sizes, fabrics, or designs. Our team can work with you to create bespoke cushions that perfectly match your requirements. Please contact our customer service team to discuss your custom cushion needs and receive a personalized quotation.'
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
                        Luxury Sofa Cushions & Decorative Pillows <br />
                    </motion.h1>

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
            title="Cushion Styles"
            items={Cushions}
        />

        {/* Introduction Section */}
        <section className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transform Your Space with Premium Sofa Cushions & Pillows
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Discover the perfect blend of comfort and style with our exclusive collection of premium sofa cushions and decorative pillows. Each piece is meticulously crafted from the finest materials, featuring luxurious fabrics including supple leather, plush velvet, natural linen, and soft cotton. Whether you’re looking to refresh your existing furniture or complete a new interior design, our pillows and cushions offer the ideal solution to elevate your home’s aesthetic.
            </p>
            <br />
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl">
                Our collection showcases a diverse range of colors, patterns, and textures to complement any interior style—from modern minimalist to classic elegance. Every sofa pillow is selected for its exceptional quality, ensuring lasting durability and timeless appeal. Transform your living room, bedroom, or lounge area into a sanctuary of comfort and sophistication.
            </p>
        </section>

        {/* Interactive Hotspot Section */}
        <section className="py-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Explore Our Cushion Collection</h3>
            <GridHotspotGallery
                images={cushionsImages}
                hotspots={cushionsHotspots}
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
                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Choose Our Luxury Cushions & Sofa Pillows?</h4>
                <p>We believe that every element in your home should contribute to both comfort and beauty. Our sofa pillows are more than just decorative accessories—they’re thoughtfully designed pieces that enhance your daily living experience. Each cushion and pillow undergoes rigorous quality control to ensure it meets our high standards for craftsmanship, durability, and aesthetic excellence.</p>
                <p>From the selection of premium materials to the final stitching, we prioritize quality at every step. Our collection features various styles to suit different preferences: classic solid colors for timeless elegance, bold patterns for statement-making style, and textured fabrics for added dimension. Mix and match to create your perfect arrangement, or choose coordinating sets for a cohesive look. Whatever your style, our cushions provide the finishing touch that transforms a house into a home.</p>
        </section>
        
        <section>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions About Sofa Cushions & Pillows</h3>
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