// src/app/api/sitemap/route.ts
import { NextResponse } from "next/server";

import { getAllPages } from "@/src/lib/SEO/pages"; // Optional: if you have static pages
import { getAllPostsSlugs } from "@/src/lib/SEO/posts";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  // Example: fetch dynamic slugs from DB
  const posts = await getAllPostsSlugs(); // returns array of { slug: string, updatedAt: Date }
  const pages = await getAllPages(); // returns array of { path: string, updatedAt: Date }

  // Build sitemap XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static pages -->
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${baseUrl}${page.path}</loc>
      <lastmod>${page.updatedAt.toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `
    )
    .join("")}

  <!-- Dynamic posts -->
  ${posts
    .map(
      (post) => `
    <url>
      <loc>${baseUrl}/posts/${post.slug}</loc>
      <lastmod>${post.updatedAt.toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>
  `
    )
    .join("")}
</urlset>
`;

  return new NextResponse(sitemapXml.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
