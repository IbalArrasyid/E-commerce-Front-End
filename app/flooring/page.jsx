import Image from "next/image";
import Link from "next/link";
import styles from "./flooring.module.css";

export const metadata = {
    title: "Flooring - Home Decor Indonesia",
    description: "Discover premium flooring solutions including laminate wooden flooring, carpets, vinyl, and carpet tiles at Home Decor Indonesia.",
};

// Hero slides
const heroSlides = [
    "https://www.homedecorindonesia.com/wp-content/uploads/2024/08/110-scaled.jpg.webp",
    "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/2-65-scaled.jpg.webp",
    "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/3-27-scaled.jpg",
    "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/4-6-scaled.jpg.webp",
    "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/5-3-scaled.jpg.webp",
];

// Product categories
const productCategories = [
    {
        name: "Laminate Wooden Floorings",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/laminate-flooring.jpg.webp",
        link: "/rugs",
    },
    {
        name: "Loop-Pile Carpets",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/loop-pile-carpet.jpg.webp",
        link: "/rugs",
    },
    {
        name: "Cut-Pile Carpets",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/cut-pile-carpet.jpg.webp",
        link: "/rugs",
    },
];

const additionalProducts = [
    {
        name: "Carpet Tiles",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/carpet-tiles.jpg.webp",
        link: "/rugs",
    },
    {
        name: "Custom Carpet",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/custom-carpet.jpg.webp",
        link: "/rugs",
    },
];

// Offerings features
const offerings = [
    {
        title: "Premium Quality",
        description: "Only the finest materials from renowned international brands.",
        icon: "quality",
    },
    {
        title: "Expert Installation",
        description: "Professional installation by our experienced craftsmen.",
        icon: "installation",
    },
    {
        title: "Wide Selection",
        description: "Extensive range of styles, colors, and textures to choose from.",
        icon: "selection",
    },
    {
        title: "Free Consultation",
        description: "Expert advice to help you choose the perfect flooring solution.",
        icon: "consultation",
    },
];

export default function FlooringPage() {
    return (
        <div className={styles.flooringPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <Image
                        src={heroSlides[0]}
                        alt="Flooring Solutions"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
            </section>

            {/* Intro Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h1 className={styles.mainTitle}>Discover Flooring at Home Decor Indonesia</h1>
                    <p className={styles.introText}>
                        Discover the epitome of elegance and sophistication with our premium flooring collection.
                        From timeless hardwood to exquisite tiles and plush carpets, our curated selection offers
                        the perfect foundation for any luxury interior. Elevate your space with flooring solutions
                        that combine unparalleled quality, durability, and style.
                    </p>
                </div>
            </section>

            {/* Product Catalogues Section */}
            <section className={styles.catalogueSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Product Catalogues</h2>

                    {/* Main Categories - 3 columns */}
                    <div className={styles.productsGrid}>
                        {productCategories.map((product, index) => (
                            <Link key={index} href={product.link} className={styles.productCard}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className={styles.cardOverlay}>
                                        <h3 className={styles.cardTitle}>{product.name}</h3>
                                        <span className={styles.viewMoreBtn}>View More →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Additional Categories - 2 columns */}
                    <div className={styles.productsGridTwo}>
                        {additionalProducts.map((product, index) => (
                            <Link key={index} href={product.link} className={styles.productCard}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className={styles.cardOverlay}>
                                        <h3 className={styles.cardTitle}>{product.name}</h3>
                                        <span className={styles.viewMoreBtn}>View More →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Offerings Section */}
            <section className={styles.offeringsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Our Offerings</h2>
                    <p className={styles.sectionDescription}>
                        With our quality, variety, and personalized service, we ensure your flooring reflects
                        your unique style and requirements. Transform your space today with the elegance and
                        convenience of our premium flooring solutions.
                    </p>

                    <div className={styles.offeringsGrid}>
                        {offerings.map((offering, index) => (
                            <div key={index} className={styles.offeringCard}>
                                <div className={styles.offeringIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h3 className={styles.offeringTitle}>{offering.title}</h3>
                                <p className={styles.offeringDescription}>{offering.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Image Section */}
            <section className={styles.featuredSection}>
                <div className={styles.featuredImage}>
                    <Image
                        src="https://www.homedecorindonesia.com/wp-content/uploads/2023/09/flooring-featured.jpg.webp"
                        alt="Luxury Flooring"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.featuredContent}>
                    <h2 className={styles.featuredTitle}>Transform Your Space</h2>
                    <p className={styles.featuredText}>
                        From classic elegance to modern sophistication, our flooring solutions create
                        the perfect foundation for your dream interior.
                    </p>
                    <Link href="/contact" className={styles.featuredButton}>
                        Request a Consultation →
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Visit Our Showroom</h2>
                    <p className={styles.ctaDescription}>
                        Experience our premium flooring collection in person. Our expert consultants
                        are ready to help you find the perfect solution for your space.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Contact Us
                        </Link>
                        <Link href="/showroom-galery" className={styles.ctaButtonOutline}>
                            View Showroom Gallery
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
