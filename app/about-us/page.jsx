import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const revalidate = 3600;

// Products & Services data
const productsServices = [
  { icon: "/images/icons/furniture.png", title: "Furniture" },
  { icon: "/images/icons/fabric.png", title: "Interior Fabrics" },
  { icon: "/images/icons/upholstery.png", title: "Upholstery" },
  { icon: "/images/icons/curtains.png", title: "Curtains, rods, tiebacks, and drapery accessories" },
  { icon: "/images/icons/wallpaper.png", title: "Wallpaper" },
  { icon: "/images/icons/blinds.png", title: "Blinds/blackout blinds" },
  { icon: "/images/icons/flooring.png", title: "Laminate wooden flooring/parquet flooring" },
  { icon: "/images/icons/carpets.png", title: "Carpets" },
  { icon: "/images/icons/lighting.png", title: "Lighting" },
  { icon: "/images/icons/decor.png", title: "Wall art, mirrors, and other decorative items" },
  { icon: "/images/icons/sofa.png", title: "Custom Sofas & Chairs" },
  { icon: "/images/icons/service.png", title: "Measurements-stitching-delivery-installation" },
];

// Brand partners
const brandPartners = [
  { name: "Brand 1", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b1.png" },
  { name: "Brand 2", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b2.png" },
  { name: "Brand 3", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b3.png" },
  { name: "Brand 4", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b4.png" },
  { name: "Brand 5", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b5.png" },
  { name: "Brand 6", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/b6.png" },
];

// Client logos
const clientLogos = [
  { name: "Aston Anyer Beach Hotel", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c3.png" },
  { name: "Fairmont Hotels", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c4.png" },
  { name: "Manhattan Hotel", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c7.png" },
  { name: "Sunlake Hotel", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c8.png" },
  { name: "Mercure Hotels", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c9.png" },
  { name: "Shangri-La", logo: "https://www.homedecorindonesia.com/wp-content/uploads/2023/04/c12.png" },
];

export default async function AboutUs() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src="https://www.homedecorindonesia.com/wp-content/uploads/2023/10/gedung3-scaled.jpg"
            alt="Home Decor Indonesia Building"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Main Title Section */}
      <section className={styles.titleSection}>
        <div className={styles.container}>
          <h1 className={styles.mainTitle}>
            About Us: Jakarta Luxury Interior Experts Since 1992
          </h1>
        </div>
      </section>

      {/* About Intro Section */}
      <section className={styles.aboutIntro}>
        <div className={styles.container}>
          <div className={styles.twoColumnGrid}>
            <div className={styles.textColumn}>
              <h2 className={styles.sectionSubtitle}>Home Decor Indonesia -</h2>
              <h2 className={styles.sectionTitle}>A Premier Furniture and Interior Store</h2>
              <p className={styles.paragraphText}>
                Established in <strong>1992</strong>, Home Decor Indonesia is your{" "}
                <strong>premier destination for premium interior solutions</strong> in Jakarta.
                We curate a comprehensive collection encompassing luxurious Curtains, custom
                Furniture, quality Sofa Fabrics, elegant Wallpapers, artistic Lighting, unique
                Decorations, durable Flooring, and exclusive Rugs.{" "}
                <strong>For over 30 years</strong>, our legacy lies in an unwavering commitment
                to <strong>uncompromising design quality</strong> and{" "}
                <strong>fully personalized service</strong>. Our solid reputation, built on
                expertise in <strong>masterful artistry</strong> and{" "}
                <strong>meticulous hand-finishing</strong>, makes us a trusted partner for
                discerning wholesale and commercial clients who prioritize excellence. Tangible
                proof of our expertise can be seen in prestigious projects within luxury hotels,
                renowned private residences, and even royal palaces.
              </p>
            </div>
            <div className={styles.imageColumn}>
              <Image
                src="https://www.homedecorindonesia.com/wp-content/uploads/2023/10/test-banner-1024x669.jpg.webp"
                alt="Home Decor Indonesia Showroom"
                width={980}
                height={640}
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products & Services Section */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Products &amp; Services</h2>
          <p className={styles.sectionDescription}>
            We offer a broad range of products and services, including:
          </p>
          <div className={styles.productsGrid}>
            {productsServices.map((item, index) => (
              <div key={index} className={styles.productCard}>
                <div className={styles.productIconWrapper}>
                  <Image
                    src={`https://www.homedecorindonesia.com/wp-content/uploads/2023/04/p${index + 1}-1.png`}
                    alt={item.title}
                    width={60}
                    height={60}
                    className={styles.productIcon}
                  />
                </div>
                <h3 className={styles.productTitle}>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale Division Section */}
      <section className={styles.wholesaleSection}>
        <div className={styles.container}>
          <div className={styles.twoColumnGrid}>
            <div className={styles.imageColumn}>
              <Image
                src="https://www.homedecorindonesia.com/wp-content/uploads/2023/04/wholesale.jpg.webp"
                alt="Wholesale Division"
                width={608}
                height={397}
                className={styles.wholesaleImage}
              />
            </div>
            <div className={styles.textColumn}>
              <h2 className={styles.sectionTitle}>Wholesale Division</h2>
              <p className={styles.paragraphText}>
                Our wholesale division supplies fabrics to major stores across the archipelago.
                Our affiliated Singapore-based office, Fabs International, distributes fabrics
                to commercial enterprises and retail shops in Singapore and Malaysia. By
                establishing ourselves as a reputable wholesaler, we are able to support our
                retail division by offering competitive prices, holding a large inventory,
                asserting control over the supply chain, and reverse engineering fabrics
                according to client/project requirements for bulk orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Partners Section */}
      <section className={styles.partnersSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Brand Partners</h2>
          <p className={styles.sectionDescription}>
            We are proud distributors and agents of the following international brands:
          </p>
          <div className={styles.logosGrid}>
            {brandPartners.map((brand, index) => (
              <div key={index} className={styles.logoCard}>
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={150}
                  height={150}
                  className={styles.brandLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className={styles.clientsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Clients</h2>
          <p className={styles.sectionDescription}>
            We are honored to serve prestigious hotels and establishments:
          </p>
          <div className={styles.logosGrid}>
            {clientLogos.map((client, index) => (
              <div key={index} className={styles.logoCard}>
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={150}
                  height={150}
                  className={styles.clientLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us / Contact CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Visit Our Showroom</h2>
          <p className={styles.ctaDescription}>
            Experience our exquisite collection in person at our Jakarta showroom.
            Our expert consultants are ready to help bring your interior vision to life.
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

      {/* Google Maps Section */}
      <section className={styles.mapSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Find Us</h2>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2915!2d106.82!3d-6.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMTIuMCJTIDEwNsKwNDknMTguNCJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Home Decor Indonesia Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
