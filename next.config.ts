import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

// No custom rewrites for sitemap/robots: next-sitemap will generate
// public/robots.txt and public/sitemap.xml which will be served by Next.js.
const nextConfig: NextConfig = {
  // Keep Turbopack happy when plugins inject webpack config by providing
  // an empty turbopack config. This silences the error that appears when
  // a plugin (like next-pwa) adds webpack config while Turbopack is active.
  turbopack: {},
};

/**
 * Use next-pwa to generate a service worker into /public (so it's available at /sw.js).
 * We disable generation in development to avoid dev workflow interruptions.
 */
const withPwaConfig = withPWA({
  dest: "public",
  register: true,
  // disable in development
  disable: process.env.NODE_ENV === "development",
  // pass Workbox options for skipWaiting/clientsClaim
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
  },
});

export default withPwaConfig(nextConfig);
