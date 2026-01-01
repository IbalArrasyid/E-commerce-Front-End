import Theme from "@/theme-provider";
import "./globals.css";
import localFont from 'next/font/local';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsappFloating";
import BottomNavigation from "@/components/BottomNavigation";
import { AuthProvider } from "@/hooks/useAuth";
import ChatWidget from "@/components/ChatWidget";

const GeistMonoVF = localFont({
  src: './fonts/GeistMonoVF.woff',
  display: 'swap',
  variable: '--font-geist-mono',
})

export const metadata = {
  metadataBase: new URL('https://homedecorindonesia.com'),
  keywords: ['homedecorindonesia', 'homedecor'],
  title: {
    default: 'Homedecor',
    template: "Homedecor | %s",
  },
  verification: {
    google: ""
  },
  // openGraph: {
  //   description: '',
  //   images: [
  //     {
  //       url: '',
  //       alt: '',
  //       width: 1200,
  //       height: 630,
  //     }
  //   ]
  // },
  twitter: {
    card: "summary_large_image",
    title: "Home Decor Indonesia",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${GeistMonoVF.variable} antialiased`}
      >
        <Theme>
          <AuthProvider>
            <Header />
            {children}
            <ChatWidget />
            <BottomNavigation />
            <Footer />
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
