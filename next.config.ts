import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://placehold.co/**")],
  },
  async redirects() {
    return [{ source: "/tools", destination: "/", permanent: true }];
  },
};

export default nextConfig;
