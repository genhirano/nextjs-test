import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/nextjs-test',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
