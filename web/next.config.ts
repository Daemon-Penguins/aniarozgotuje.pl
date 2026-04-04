import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — wymagane dla shared hostingu (FTP deploy)
  output: "export",

  // Trailing slash — kompatybilność z .htaccess i shared hostingiem
  trailingSlash: true,

  // Prefix assetów — pusty dla root deploy, ustaw dla subdirectory
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",

  // Obrazy — wyłączone dla static export (shared hosting nie ma Next.js servera)
  images: {
    unoptimized: true,
  },

  // Env dostępne w przeglądarce
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default nextConfig;
