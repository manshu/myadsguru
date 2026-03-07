import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.batra.dev',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
