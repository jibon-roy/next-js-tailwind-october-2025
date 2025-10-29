// src/app/api/sitemap/route.ts
import { NextResponse } from "next/server";

// Deprecated: sitemap is now generated into /sitemap.xml by next-sitemap.
// Use the incoming request URL as the base so we always redirect to an absolute URL.
export async function GET(request: Request) {
  // Build an absolute URL for the static sitemap to satisfy Next.js prerender.
  // new URL(relative, request.url) will produce an absolute URL using the request origin.
  const sitemapUrl = new URL("/sitemap.xml", request.url);
  return NextResponse.redirect(sitemapUrl);
}
