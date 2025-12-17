import Image from "next/image";
import Link from "next/link";
import styles from "./catalogues.module.css";

export const metadata = {
    title: "Catalogues - Home Decor Indonesia",
    description: "Browse our complete catalogue collection including curtains, blinds, upholstery, carpets, wallpaper, and flooring products.",
};

// Catalogue categories with subcategories
const catalogueCategories = [
    {
        title: "Curtains",
        items: [
            { name: "Day Curtains", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/day-curtain.jpg.webp", link: "/curtains" },
            { name: "Night Curtains - Blackouts", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/night-curtain.jpg.webp", link: "/curtains" },
            { name: "Night Curtains - Dimouts", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/dimout.jpg.webp", link: "/curtains" },
        ]
    },
    {
        title: "Indoor Blinds",
        items: [
            { name: "Roller Blinds", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/roller-blinds.jpg.webp", link: "/curtains" },
            { name: "Roman Blinds", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/roman-blinds.jpg.webp", link: "/curtains" },
            { name: "Wooden Blinds", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/wooden-blinds.jpg.webp", link: "/curtains" },
        ]
    },
    {
        title: "Outdoor Blinds",
        items: [
            { name: "Outdoor Roller Blinds", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/outdoor-roller.jpg.webp", link: "/curtains" },
            { name: "Outdoor Roman Blinds", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/outdoor-roman.jpg.webp", link: "/curtains" },
        ]
    },
    {
        title: "Curtains Accessories",
        items: [
            { name: "Rods", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/rods.jpg.webp", link: "/curtains" },
            { name: "Tassels", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/tassels.jpg.webp", link: "/curtains" },
            { name: "Hooks", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/hooks.jpg.webp", link: "/curtains" },
            { name: "Trimmings", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/trimmings.jpg.webp", link: "/curtains" },
        ]
    },
    {
        title: "Upholstery Products",
        items: [
            { name: "Upholstery Fabric - Indoors", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/upholstery-indoor.jpg.webp", link: "/upholstery" },
            { name: "Upholstery Fabric - Outdoors", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/upholstery-outdoor.jpg.webp", link: "/upholstery" },
        ]
    },
    {
        title: "Carpet Products",
        items: [
            { name: "Commercial Vinyl Floorings", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/vinyl.jpg.webp", link: "/rugs" },
            { name: "Laminate Wooden Floorings", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/laminate.jpg.webp", link: "/rugs" },
            { name: "Cut-Pile Carpets", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/cut-pile.jpg.webp", link: "/rugs" },
            { name: "Loop-Pile Carpets", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/loop-pile.jpg.webp", link: "/rugs" },
            { name: "Carpet Tiles", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/carpet-tiles.jpg.webp", link: "/rugs" },
        ]
    },
    {
        title: "Wallpaper",
        items: [
            { name: "Premium Wallpaper", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/wallpaper-premium.jpg.webp", link: "/wallpapers" },
            { name: "Designer Wallpaper", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/wallpaper-designer.jpg.webp", link: "/wallpapers" },
        ]
    },
    {
        title: "Rugs",
        items: [
            { name: "Hand-Knotted Rugs", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/hand-knotted.jpg.webp", link: "/rugs" },
            { name: "Machine-Made Rugs", image: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/machine-made.jpg.webp", link: "/rugs" },
        ]
    },
];

export default function CataloguesPage() {
    return (
        <div className={styles.cataloguesPage}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroImage}>
                    <Image
                        src="https://www.homedecorindonesia.com/wp-content/uploads/2023/09/katalog3-scaled.jpg"
                        alt="Home Decor Indonesia Catalogues"
                        fill
                        priority
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className={styles.heroOverlay}></div>
            </section>

            {/* Page Title */}
            <section className={styles.titleSection}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Catalogues</h1>
                </div>
            </section>

            {/* Catalogue Categories */}
            {catalogueCategories.map((category, categoryIndex) => (
                <section key={categoryIndex} className={styles.categorySection}>
                    <div className={styles.container}>
                        <h2 className={styles.categoryTitle}>{category.title}</h2>
                        <div className={`${styles.itemsGrid} ${category.items.length === 2 ? styles.twoColumns : category.items.length === 4 ? styles.fourColumns : styles.threeColumns}`}>
                            {category.items.map((item, itemIndex) => (
                                <Link key={itemIndex} href={item.link} className={styles.catalogueCard}>
                                    <div className={styles.cardImageWrapper}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className={styles.cardOverlay}>
                                            <h3 className={styles.cardTitle}>{item.name}</h3>
                                            <span className={styles.viewMoreBtn}>View More →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className={styles.container}>
                    <h2 className={styles.ctaTitle}>Need Help Choosing?</h2>
                    <p className={styles.ctaDescription}>
                        Our expert consultants are ready to help you find the perfect solution for your space.
                        Visit our showroom or schedule a free home consultation.
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/contact" className={styles.ctaButton}>
                            Contact Us
                        </Link>
                        <Link href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello! I need help with choosing products." className={styles.ctaButtonOutline}>
                            WhatsApp Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
