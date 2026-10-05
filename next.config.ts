import type { NextConfig } from "next";

// The landing page is exported as plain static files.
// GitHub Pages serves it from /<repo name>, so CI passes that folder in as BASE_PATH.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
