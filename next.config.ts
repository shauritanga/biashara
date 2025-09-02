import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Move serverComponentsExternalPackages to the correct location
  serverExternalPackages: ['cloudinary'],
  experimental: {
    // Other experimental features can go here
  },
};

export default nextConfig;
