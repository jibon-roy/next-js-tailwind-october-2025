// src/app/api/robot/route.ts
import { NextResponse } from "next/server";

// GET handler for robots.txt
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const robotsTxt = `
# Robots.txt for ${baseUrl}
# SEO optimized robots.txt
# Sitemap included for better indexing

User-agent: *
Disallow: /admin
Allow: /

# Optional crawl-delay
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
