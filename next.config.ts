import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  // existing
      },
      {
        protocol: 'https',
        hostname: 'pnserver-0euo.onrender.com', // your live backend
      },
    ],
  },
};

export default nextConfig;
