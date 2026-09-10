import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  serverActions: {
    allowedOrigins: ['localhost:3000', '*.devtunnels.ms', '7p9g62x1-3000.inc1.devtunnels.ms'],
  },
};

export default nextConfig;
