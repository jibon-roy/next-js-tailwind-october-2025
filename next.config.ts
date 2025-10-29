import type { NextConfig } from "next";

// No custom rewrites for sitemap/robots: next-sitemap will generate
// public/robots.txt and public/sitemap.xml which will be served by Next.js.
const nextConfig: NextConfig = {};

export default nextConfig;
