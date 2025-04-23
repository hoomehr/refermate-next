import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['randomuser.me', 'api.dicebear.com'], // Add any domains you need for images
  },
  experimental: {
    // Removed Prisma packages from serverComponentsExternalPackages
  },
};

export default nextConfig;
