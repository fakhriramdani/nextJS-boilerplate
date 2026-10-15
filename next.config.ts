import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // "standalone" menghasilkan bundle minimal di `.next/standalone` untuk Docker.
  output: "standalone",
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
