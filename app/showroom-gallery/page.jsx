import Image from "next/image";
import Link from "next/link";
import styles from "./showroom.module.css";

export const metadata = {
    title: "Showroom Gallery - Home Decor Indonesia",
    description: "Explore our Jakarta showrooms featuring luxury furniture, curtains, wallpaper, and interior design solutions.",
};

// Gallery images
const galleryImages = [
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/10/gedung3-scaled.jpg", alt: "Home Decor Indonesia Building" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/10/test-banner-1024x669.jpg.webp", alt: "Interior Display" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/wholesale.jpg.webp", alt: "Wholesale Division" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2024/08/110-scaled.jpg.webp", alt: "Flooring Display" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/1-120-scaled.jpg", alt: "Wallpaper Collection" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/MAIN-BANNER-91-scaled.jpg", alt: "Curtain Display" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2023/09/katalog3-scaled.jpg", alt: "Catalogue Area" },
    { src: "https://www.homedecorindonesia.com/wp-content/uploads/2024/07/TEST1.jpg", alt: "Modern Interior" },
];

// Showroom features
const features = [
    {
        title: "Extensive Collection",
        description: "Browse through thousands of fabric samples, wallpapers, and furniture pieces.",
    },
    {
        title: "Expert Consultation",
        description: "Our experienced interior consultants are ready to assist you.",
    },
    {
        title: "Room Settings",
        description: "View products in realistic room settings to envision your space.",
    },
    {
        title: "Quality Materials",
        description: "Touch and feel the premium quality of our materials firsthand.",
    },
];

export default function ShowroomGalleryPage() {
    return (
        <div className={styles.showroomPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <Image
                        src="https://www.homedecorindonesia.com/wp-content/uploads/2023/10/gedung3-scaled.jpg"
                        alt="Home Decor Indonesia Showroom"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Showroom Gallery</h1>
                    <p className={styles.heroSubtitle}>
                        Step inside our world of design
                    </p>
                </div>
            </section>

            {/* Introduction Section */}
            <section className={styles.introSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Experience Luxury Interior Design</h2>
                    <p className={styles.introText}>
                        Our showrooms showcase our spaces and the way we work, where every detail is
                        designed around you. Visit us to explore our extensive collection of premium
                        furniture, curtains, wallpapers, and interior accessories.
                    </p>
                </div>
            </section>

            {/* Gallery Grid Section */}
            <section className={styles.gallerySection}>
                <div className={styles.container}>
                    <div className={styles.galleryGrid}>
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className={`${styles.galleryItem} ${index === 0 || index === 6 ? styles.galleryItemLarge : ''}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                                <div className={styles.galleryOverlay}>
                                    <span className={styles.zoomIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                            <line x1="11" y1="8" x2="11" y2="14"></line>
                                            <line x1="8" y1="11" x2="14" y2="11"></line>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>What to Expect</h2>
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

            {/* Locations Section */}
            <section className={styles.locationsSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Our Locations</h2>
                    <div className={styles.locationsGrid}>
                        <div className={styles.locationCard}>
                            <h3 className={styles.locationName}>Fatmawati Showroom</h3>
                            <p className={styles.locationAddress}>
                                Jalan Rs Fatmawati No. 5A,C,D, RT.1/RW.6, Gandaria Utara,
                                Kby. Baru, Kota Jakarta Selatan, DKI Jakarta 12140
                            </p>
                            <p className={styles.locationHours}>
                                <strong>Hours:</strong><br />
                                Mon - Sat: 9:30 AM - 6:30 PM<br />
                                Sunday: 11:59 AM - 5:00 PM
                            </p>
                            <Link
                                href="https://maps.google.com/maps?q=Jalan+Rs+Fatmawati+No.+5A,C,D"
                                target="_blank"
                                className={styles.locationLink}
                            >
                                Get Directions →
                            </Link>
                        </div>

                        <div className={styles.locationCard}>
                            <h3 className={styles.locationName}>Pintu Air Showroom</h3>
                            <p className={styles.locationAddress}>
                                Jl. Pintu Air Raya No.29, RT.6/RW.1, Ps. Baru,
                                Kecamatan Sawah Besar, Kota Jakarta Pusat, DKI Jakarta 10710
                            </p>
                            <p className={styles.locationHours}>
                                <strong>Hours:</strong><br />
                                Mon - Sat: 9:30 AM - 7:00 PM<br />
                                Sunday: 11:59 AM - 5:00 PM
                            </p>
                            <Link
                                href="https://maps.google.com/maps?q=Jl.+Pintu+Air+Raya+No.29"
                                target="_blank"
                                className={styles.locationLink}
                            >
                                Get Directions →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Book a Showroom Visit</h2>
                    <p className={styles.ctaDescription}>
                        Schedule a personalized tour of our showroom with one of our expert consultants.
                        We{`'`}ll help you discover the perfect solutions for your interior design needs.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Book Appointment
                        </Link>
                        <Link
                            href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello! I would like to book a showroom visit."
                            className={styles.ctaButtonOutline}
                        >
                            WhatsApp Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
