import Image from "next/image";
import Link from "next/link";
import styles from "./lighting.module.css";
import ShopBySection from '@/components/Common/ShopBySection'

export const metadata = {
    title: "Lighting - Home Decor Indonesia",
    description: "Discover premium lighting solutions including ceiling lights, floor lamps, table lamps, and decorative lighting at Home Decor Indonesia.",
};

// Lighting categories
const lightingCategories = [
    {
        id: 'ceiling-light',
        name: 'Ceiling Lights',
        image: 'https://www.homedecorindonesia.com/wp-content/uploads/2023/06/HANGING-LAMP1.jpg.webp',
        href: '/lighting/ceiling-light'
    },
    {
        id: "floor-lamp",
        name: "Floor Lamps",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2024/02/1-768-768x499-1.png.webp",
        href: "/lighting/floor-lamp",
    },
    {
        id: "table-lamp",
        name: "Table Lamps",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/06/7.-TABLE-LAMP.jpg.webp",
        href: "/lighting/table-lamp",
    },
];

// Features
const features = [
    {
        title: "Premium Quality",
        description: "Handcrafted lighting from international designers",
    },
    {
        title: "Wide Selection",
        description: "From classic to contemporary styles",
    },
    {
        title: "Expert Advice",
        description: "Professional lighting consultation available",
    },
    {
        title: "Installation",
        description: "Professional installation services",
    },
];

export default function LightingPage() {
    return (
        <div className={styles.lightingPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <Image
                        src="https://www.homedecorindonesia.com/wp-content/uploads/2023/09/lighting-banner.jpg"
                        alt="Luxury Lighting Collection"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Executive Lighting Collection</h1>
                    <p className={styles.heroSubtitle}>
                        Illuminate your space with elegance
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Discover Lighting at Home Decor Indonesia</h2>
                    <p className={styles.introText}>
                        Transform your space with our curated collection of premium lighting fixtures.
                        From stunning chandeliers to elegant table lamps, find the perfect lighting
                        solutions that combine style, functionality, and exceptional craftsmanship.
                    </p>
                </div>
            </section>

            <ShopBySection
                title="Shop By Indoor Lighting"
                items={lightingCategories}
            />

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Why Choose Us</h2>
                    <div className={styles.featuresGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDescription}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Visit Our Showroom</h2>
                    <p className={styles.ctaDescription}>
                        Experience our lighting collection in person and get expert advice
                        from our interior consultants.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Contact Us
                        </Link>
                        <Link href="/showroom-gallery" className={styles.ctaButtonOutline}>
                            View Showroom
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
