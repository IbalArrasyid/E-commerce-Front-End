import Image from "next/image";
import Link from "next/link";
import styles from "./contact.module.css";

export const metadata = {
    title: "Contact Us - Home Decor Indonesia",
    description: "Visit our showrooms in Jakarta. Contact Home Decor Indonesia for luxury furniture, curtains, wallpaper, and interior solutions.",
};

// Showroom data
const showrooms = [
    {
        name: "Fatmawati",
        address: "Jalan Rs Fatmawati No. 5A,C,D, RT.1/RW.6, Gandaria Utara, Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12140",
        hours: {
            weekday: "Monday - Saturday : 9.30 AM - 6.30 PM",
            weekend: "Sunday : 11.59 AM - 5.00 PM"
        },
        mapUrl: "https://maps.google.com/maps?q=Jalan%20Rs%20Fatmawati%20No.%205A%2CC%2CD%201%2C%20RT.1%2FRW.6%2C%20Gandaria%20Utara%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012140%2C%20Indonesia&t=m&z=16&output=embed&iwloc=near"
    },
    {
        name: "Pintu Air",
        address: "Jl. Pintu Air Raya No.29, RT.6/RW.1, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710",
        hours: {
            weekday: "Monday - Saturday : 9.30 AM - 7.00 PM",
            weekend: "Sunday : 11.59 AM - 5.00 PM"
        },
        mapUrl: "https://maps.google.com/maps?q=Home%20Decor%20Indonesia%2C%20Jl.%20Pintu%20Air%20Raya%20No.29%2C%20RT.8%2FRW.1%2C%20Pasar%20Baru%2C%20Sawah%20Besar%2C%20Central%20Jakarta%20City%2C%20Jakarta%2010710&t=m&z=16&output=embed&iwloc=near"
    }
];

// Contact info
const contactInfo = [
    { type: "email", value: "sales@homedecorindonesia.com", icon: "envelope" },
    { type: "phone", value: "(021) 7224248", label: "Hunting" },
    { type: "phone", value: "(021) 72794215", label: "Fatmawati" },
    { type: "phone", value: "(021) 72789513", label: "Pintu Air" },
    { type: "phone", value: "(021) 7230970", label: "General Inquiries" },
];

export default function ContactPage() {
    return (
        <div className={styles.contactPage}>
            {/* Page Header */}
            <section className={styles.pageHeader}>
                <div className={styles.container}>
                    <h1 className={styles.pageTitle}>Visit Our Showrooms</h1>
                </div>
            </section>

            {/* Showrooms Section */}
            <section className={styles.showroomsSection}>
                <div className={styles.container}>
                    <div className={styles.showroomsGrid}>
                        {showrooms.map((showroom, index) => (
                            <div key={index} className={styles.showroomCard}>
                                <h2 className={styles.showroomName}>{showroom.name}</h2>

                                <div className={styles.showroomInfo}>
                                    <div className={styles.infoItem}>
                                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                        <span>{showroom.address}</span>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        <div className={styles.hoursGroup}>
                                            <span>{showroom.hours.weekday}</span>
                                            <span>{showroom.hours.weekend}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.mapWrapper}>
                                    <iframe
                                        src={showroom.mapUrl}
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`${showroom.name} Location`}
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.galleryCtaSection}>
                <div className={styles.container}>
                    <p className={styles.ctaText}>
                        Step inside our world of design. Our Showroom Gallery showcases our spaces and the way we work, where every detail is designed around you.
                    </p>
                    <Link href="/showroom-galery" className={styles.ctaButton}>
                        View Our Showrooms →
                    </Link>
                </div>
            </section>

            {/* Book Appointment Section */}
            <section className={styles.appointmentSection}>
                <div className={styles.container}>
                    <div className={styles.appointmentContent}>
                        <h2 className={styles.appointmentTitle}>Book A Free Home Visit</h2>
                        <Link href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello! I would like to book a free home visit." className={styles.appointmentButton}>
                            Book Now →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className={styles.contactInfoSection}>
                <div className={styles.container}>
                    <div className={styles.contactGrid}>
                        <div className={styles.contactTextColumn}>
                            <h2 className={styles.sectionTitle}>Contact Us</h2>
                            <p className={styles.contactDescription}>
                                We are here to help you find the perfect piece for your home. Reach out with any questions about our luxury furniture collection, in-store appointments, or custom design services, and we will get back to you promptly.
                            </p>
                        </div>

                        <div className={styles.contactDetailsColumn}>
                            <ul className={styles.contactList}>
                                <li className={styles.contactItem}>
                                    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                    <a href="mailto:sales@homedecorindonesia.com">sales@homedecorindonesia.com</a>
                                </li>
                                {contactInfo.filter(c => c.type === "phone").map((contact, index) => (
                                    <li key={index} className={styles.contactItem}>
                                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                        <a href={`tel:${contact.value.replace(/[^0-9+]/g, '')}`}>
                                            {contact.value} {contact.label && `(${contact.label})`}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* WhatsApp Float Button */}
            <a
                href="https://api.whatsapp.com/send?phone=+6281806040506&text=Hello! I'm interested in your products."
                className={styles.whatsappFloat}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </div>
    );
}
