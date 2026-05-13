import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // пока без next-intl — просто базовый роутинг
  },
  reactCompiler: true,
};

export default nextConfig;
