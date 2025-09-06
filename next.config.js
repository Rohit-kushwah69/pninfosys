/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // development me errors jaldi pakadne ke liye
  swcMinify: true, // fast build aur optimized bundle
  
  // Agar aap 'app' router use kar rahe ho to experimental features on kar sakte ho
  experimental: {
    appDir: true, 
  },

  images: {
    domains: [
      "localhost",            // local development ke liye
      "res.cloudinary.com",   // agar aap Cloudinary use karte ho
      "images.unsplash.com",  // agar Unsplash se images hai
      "your-cdn.com"          // apna CDN/domain yahan add karo
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`, 
      },
    ];
  },
};

module.exports = nextConfig;
