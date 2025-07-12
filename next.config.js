/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js configuration for Vercel
  experimental: {
    appDir: true,
  },
  // Add other Next.js config here if needed
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
