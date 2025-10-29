import { NextResponse } from "next/server";

// Deprecated: robots.txt is now generated into /robots.txt by next-sitemap.
export async function GET() {
  return NextResponse.redirect("/robots.txt");
}
