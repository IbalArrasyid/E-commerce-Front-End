const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.homedecorindonesia.com',
        pathname: '/**', // Izinkan semua path termasuk /staging
      },
    ],
    // Opsi ini membantu jika server staging lambat merespon request gambar
    minimumCacheTTL: 60,
  },
  // ... konfigurasi lainnya
}

module.exports = nextConfig
