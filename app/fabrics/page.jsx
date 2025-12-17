import Image from "next/image";
import Link from "next/link";
import styles from "./fabrics.module.css";

export const metadata = {
    title: "Fabrics - Home Decor Indonesia",
    description: "Discover premium fabric collections including drapery fabrics and upholstery materials at Home Decor Indonesia.",
};

// Fabric categories
const fabricCategories = [
    {
        name: "Drapery Fabrics",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/drapery-fabric.jpg.webp",
        description: "Premium fabrics for curtains and window treatments",
        link: "/fabrics/drapery-fabrics",
    },
    {
        name: "Promotional Fabrics",
        image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/promotional-fabric.jpg.webp",
        description: "Special offers on quality fabrics",
        link: "/fabrics/promotional-fabrics",
    },
];

// Fabric types
const fabricTypes = [
    { name: "Velvet", description: "Luxurious soft texture" },
    { name: "Linen", description: "Natural elegance" },
    { name: "Cotton", description: "Classic comfort" },
    { name: "Silk", description: "Premium sophistication" },
    { name: "Jacquard", description: "Intricate patterns" },
    { name: "Sheer", description: "Light and airy" },
];

// Features
const features = [
    {
        title: "Quality Materials",
        description: "Sourced from premium international suppliers",
    },
    {
        title: "Wide Selection",
        description: "Hundreds of colors, patterns, and textures",
    },
    {
        title: "Sample Service",
        description: "Order fabric samples before you buy",
    },
    {
        title: "Expert Advice",
        description: "Professional guidance on fabric selection",
    },
];

export default function FabricsPage() {
    return (
        <div className={styles.fabricsPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <Image
                        src="https://www.homedecorindonesia.com/wp-content/uploads/2023/09/fabrics-banner.jpg"
                        alt="Fabrics Collection"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Fabric Collections</h1>
                    <p className={styles.heroSubtitle}>
                        Premium materials for your interior
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Discover Our Fabric Range</h2>
                    <p className={styles.introText}>
                        Explore our extensive collection of premium fabrics sourced from renowned
                        international manufacturers. From luxurious velvets to elegant linens,
                        find the perfect material for your curtains, upholstery, and soft furnishings.
                    </p>
                </div>
            </section>

            {/* Categories Section */}
            <section className={styles.categoriesSection}>
                <div className={styles.container}>
                    <div className={styles.categoriesGrid}>
                        {fabricCategories.map((category, index) => (
                            <Link key={index} href={category.link} className={styles.categoryCard}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                    <div className={styles.cardOverlay}>
                                        <h3 className={styles.cardTitle}>{category.name}</h3>
                                        <p className={styles.cardDescription}>{category.description}</p>
                                        <span className={styles.viewMoreBtn}>Explore Collection →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fabric Types Section */}
            <section className={styles.typesSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Fabric Types</h2>
                    <div className={styles.typesGrid}>
                        {fabricTypes.map((type, index) => (
                            <div key={index} className={styles.typeCard}>
                                <h3 className={styles.typeName}>{type.name}</h3>
                                <p className={styles.typeDescription}>{type.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

            {/* Sample Request Section */}
            <section className={styles.sampleSection}>
                <div className={styles.container}>
                    <div className={styles.sampleContent}>
                        <h2 className={styles.sampleTitle}>Request Fabric Samples</h2>
                        <p className={styles.sampleText}>
                            Can{`'`}t decide on a fabric? Order samples and see how they look
                            in your space before making your final decision. Our sample
                            service makes it easy to compare colors and textures.
                        </p>
                        <Link href="/contact" className={styles.sampleButton}>
                            Request Samples →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Visit Our Showroom</h2>
                    <p className={styles.ctaDescription}>
                        Experience our fabric collection in person. Touch and feel the quality
                        of our materials and get expert advice from our consultants.
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
