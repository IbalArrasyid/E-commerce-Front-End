/**
 * Category SEO metadata configuration
 * Maps category slugs to SEO-friendly metadata
 * Uses local data - no WooCommerce API calls
 */

const SITE_NAME = 'Home Decor Indonesia';
const BASE_URL = 'https://www.homedecorindonesia.com';

/**
 * Category metadata mapping
 * Add new categories here as needed
 */
export const categoryMetadata = {
    // Sale
    'sale-collection': {
        name: 'Sale Collection',
        description: 'Koleksi produk sale terbaik dengan harga spesial',
        path: '/sale/sale-collection',
    },
    'clearance-sale': {
        name: 'Clearance Sale',
        description: 'Koleksi clearance sale dengan diskon besar',
        path: '/sale/clearance-sale',
    },
    'allure-sale': {
        name: 'Allure Sale',
        description: 'Koleksi Allure sale dengan harga terbaik',
        path: '/sale/allure-sale',
    },

    // Furniture - Living Room
    'sofa': {
        name: 'Sofa',
        description: 'Koleksi sofa modern dan klasik untuk ruang tamu Anda',
        path: '/furniture/living-room/sofas',
    },
    'sofa-sets': {
        name: 'Sofa Sets',
        description: 'Set sofa lengkap untuk ruang tamu yang nyaman',
        path: '/furniture/living-room/sofa-sets',
    },
    'sectional-corner-sofas': {
        name: 'Sectional & Corner Sofas',
        description: 'Sofa sudut dan sectional untuk ruang tamu luas',
        path: '/furniture/living-room/sectional-corner-sofas',
    },
    'arm-chairs': {
        name: 'Arm Chairs',
        description: 'Kursi berlengan nyaman untuk santai',
        path: '/furniture/living-room/arm-chairs',
    },
    'coffee-table': {
        name: 'Coffee Table',
        description: 'Meja kopi elegan untuk ruang tamu',
        path: '/furniture/living-room/coffee-table',
    },
    'side-table': {
        name: 'Side Table',
        description: 'Meja samping praktis dan stylish',
        path: '/furniture/living-room/side-table',
    },
    'console-tables': {
        name: 'Console Tables',
        description: 'Meja konsol untuk dekorasi ruangan',
        path: '/furniture/living-room/console-tables',
    },
    'tv-stands': {
        name: 'TV Stands',
        description: 'Rak TV modern untuk ruang keluarga',
        path: '/furniture/living-room/tv-stands',
    },
    'buffet': {
        name: 'Buffet',
        description: 'Lemari buffet untuk penyimpanan elegan',
        path: '/furniture/living-room/buffet',
    },
    'chests': {
        name: 'Chests',
        description: 'Peti penyimpanan klasik dan modern',
        path: '/furniture/living-room/chests',
    },
    'bench': {
        name: 'Bench',
        description: 'Bangku dekoratif untuk berbagai ruangan',
        path: '/furniture/living-room/bench',
    },
    'ottoman-pouf': {
        name: 'Ottoman & Pouf',
        description: 'Ottoman dan pouf untuk kenyamanan ekstra',
        path: '/furniture/living-room/ottoman-pouf',
    },
    'decorative-stools': {
        name: 'Decorative Stools',
        description: 'Bangku dekoratif untuk aksen ruangan',
        path: '/furniture/living-room/decorative-stools',
    },
    'cleopatra-day-beds': {
        name: 'Cleopatra Day Beds',
        description: 'Day bed Cleopatra untuk bersantai',
        path: '/furniture/living-room/cleopatra-day-beds',
    },
    'room-deviders': {
        name: 'Room Dividers',
        description: 'Pembatas ruangan dekoratif',
        path: '/furniture/living-room/room-deviders',
    },

    // Furniture - Dining Room
    'dining-tables': {
        name: 'Dining Tables',
        description: 'Meja makan elegan untuk keluarga',
        path: '/furniture/dining-room/dining-tables',
    },
    'dining-chairs': {
        name: 'Dining Chairs',
        description: 'Kursi makan nyaman dan stylish',
        path: '/furniture/dining-room/dining-chairs',
    },
    'bar-chairs': {
        name: 'Bar Chairs',
        description: 'Kursi bar modern untuk dapur atau bar',
        path: '/furniture/dining-room/bar-chairs',
    },
    'trolleys-bar-carts': {
        name: 'Trolleys & Bar Carts',
        description: 'Trolley dan bar cart untuk serving',
        path: '/furniture/dining-room/trolleys-bar-carts',
    },

    // Furniture - Bedroom
    'bedsets': {
        name: 'Bed Sets',
        description: 'Set tempat tidur lengkap untuk kamar',
        path: '/furniture/bedroom/bedsets',
    },
    'bed-benches': {
        name: 'Bed Benches',
        description: 'Bangku untuk ujung tempat tidur',
        path: '/furniture/bedroom/bed-benches',
    },
    'bed-side-nightstand': {
        name: 'Bedside Nightstand',
        description: 'Meja samping tempat tidur',
        path: '/furniture/bedroom/bed-side-nightstand',
    },
    'headboards': {
        name: 'Headboards',
        description: 'Headboard untuk tempat tidur',
        path: '/furniture/bedroom/headboards',
    },
    'makeup-table': {
        name: 'Makeup Table',
        description: 'Meja rias untuk kamar tidur',
        path: '/furniture/bedroom/makeup-table',
    },
    'tv-cabinets': {
        name: 'TV Cabinets',
        description: 'Kabinet TV untuk kamar tidur',
        path: '/furniture/bedroom/tv-cabinets',
    },
    'chest-of-drawers-and-dressers': {
        name: 'Chest of Drawers & Dressers',
        description: 'Lemari laci untuk penyimpanan',
        path: '/furniture/bedroom/chest-of-drawers-and-dressers',
    },

    // Furniture - Home Office
    'study-tables': {
        name: 'Study Tables',
        description: 'Meja belajar dan kerja',
        path: '/furniture/home-office/study-tables',
    },
    'executive-chairs': {
        name: 'Executive Chairs',
        description: 'Kursi kantor eksekutif',
        path: '/furniture/home-office/executive-chairs',
    },

    // Lighting
    'ceiling-light': {
        name: 'Ceiling Light',
        description: 'Lampu langit-langit modern',
        path: '/lighting/ceiling-light',
    },

    // Decoration - Wall Decor
    'wall-arts': {
        name: 'Wall Arts',
        description: 'Seni dinding untuk dekorasi',
        path: '/decoration/wall-decor/wall-arts',
    },
    'mirrors': {
        name: 'Mirrors',
        description: 'Cermin dekoratif untuk ruangan',
        path: '/decoration/wall-decor/mirrors',
    },
    'clocks': {
        name: 'Clocks',
        description: 'Jam dinding dekoratif',
        path: '/decoration/wall-decor/clocks',
    },

    // Decoration - Home Accents
    'books-bookends': {
        name: 'Books & Bookends',
        description: 'Buku dekoratif dan bookends',
        path: '/decoration/home-accents/books-bookends',
    },
    'bowls-trays': {
        name: 'Bowls & Trays',
        description: 'Mangkuk dan nampan dekoratif',
        path: '/decoration/home-accents/bowls-trays',
    },
    'candle-holders': {
        name: 'Candle Holders',
        description: 'Tempat lilin dekoratif',
        path: '/decoration/home-accents/candle-holders',
    },
    'decor-arts-scluptures': {
        name: 'Decor Arts & Sculptures',
        description: 'Patung dan seni dekorasi',
        path: '/decoration/home-accents/decor-arts-scluptures',
    },
    'decorative-objects': {
        name: 'Decorative Objects',
        description: 'Objek dekoratif untuk ruangan',
        path: '/decoration/home-accents/decorative-objects',
    },
    'flower-arrangement': {
        name: 'Flower Arrangement',
        description: 'Rangkaian bunga dekoratif',
        path: '/decoration/home-accents/flower-arrangement',
    },
    'photo-frames': {
        name: 'Photo Frames',
        description: 'Bingkai foto untuk kenangan',
        path: '/decoration/home-accents/photo-frames',
    },
    'vase-ceramic-jars': {
        name: 'Vase & Ceramic Jars',
        description: 'Vas dan guci keramik',
        path: '/decoration/home-accents/vase-ceramic-jars',
    },

    // Curtains & Drapes
    'curtains': {
        name: 'Curtains',
        description: 'Gorden berkualitas untuk rumah Anda',
        path: '/curtains-drapes/curtains',
    },
    'sheer': {
        name: 'Sheer Curtains',
        description: 'Gorden tipis transparan',
        path: '/curtains-drapes/sheer',
    },
    'blackout-curtains': {
        name: 'Blackout Curtains',
        description: 'Gorden blackout penahan cahaya',
        path: '/curtains-drapes/blackout-curtains',
    },

    // Cushions
    'square-cushions': {
        name: 'Square Cushions',
        description: 'Bantal kotak untuk sofa',
        path: '/cushions/square-cushions',
    },
    'round-cushions': {
        name: 'Round Cushions',
        description: 'Bantal bulat dekoratif',
        path: '/cushions/round-cushions',
    },
    'rectangle-cushions': {
        name: 'Rectangle Cushions',
        description: 'Bantal persegi panjang',
        path: '/cushions/rectangle-cushions',
    },

    // Fabrics
    'drapery-fabrics': {
        name: 'Drapery Fabrics',
        description: 'Kain untuk gorden berkualitas',
        path: '/fabrics/drapery-fabrics',
    },
    'promotional-fabrics': {
        name: 'Promotional Fabrics',
        description: 'Kain promo dengan harga spesial',
        path: '/fabrics/promotional-fabrics',
    },
};

/**
 * Generate SEO metadata for category pages
 * Uses local data - no WooCommerce API calls required
 * 
 * @param {string} categorySlug - The category slug
 * @param {string} fallbackName - Fallback name if slug not in mapping
 * @returns {object} Next.js metadata object
 */
export function generateCategoryMetadata(categorySlug, fallbackName) {
    const category = categoryMetadata[categorySlug];
    const name = category?.name || fallbackName;
    const description = category?.description || `Koleksi ${name} terbaik dari Home Decor Indonesia`;
    const path = category?.path || `/${categorySlug}`;

    return {
        title: `${name} | ${SITE_NAME}`,
        description,
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${BASE_URL}${path}`,
        },
        openGraph: {
            title: `${name} | ${SITE_NAME}`,
            description,
            url: `${BASE_URL}${path}`,
            siteName: SITE_NAME,
            type: 'website',
            locale: 'id_ID',
        },
    };
}
