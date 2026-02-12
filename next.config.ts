import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize build performance for static generation
    workerThreads: false, // Reduce memory usage during build
    cpus: 4, // Limit concurrent builds to avoid connection pool exhaustion
  },
};

export default nextConfig;
