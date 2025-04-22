import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['randomuser.me'], // Add any domains you need for images
  },
  experimental: {
    serverComponentsExternalPackages: ['prisma', '@prisma/client'],
  },
};

export default nextConfig;
