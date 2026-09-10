import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "yunasop.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/collections/beach",
        destination: "/collections/hydrating-glycerin-bars",
        permanent: true,
      },
      {
        source: "/collections/signature",
        destination: "/collections",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
