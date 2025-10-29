import fs from "fs";
import path from "path";

const APP_DIR = path.join(process.cwd(), "src", "app");
const POSTS_DIR = path.join(process.cwd(), "src", "demo");

function isPageFile(name) {
  return (
    name === "page.tsx" ||
    name === "page.jsx" ||
    name === "page.js" ||
    name === "page.ts"
  );
}

async function walk(dir) {
  const entries = [];
  const items = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === "api") continue;
      entries.push(...(await walk(full)));
    } else if (item.isFile() && isPageFile(item.name)) {
      entries.push(full);
    }
  }
  return entries;
}

function toRoute(filePath) {
  const rel = path
    .relative(APP_DIR, filePath)
    .split(path.posix.sep)
    .join(path.sep);
  const parts = rel.split(path.sep);
  if (parts[parts.length - 1].startsWith("page.")) parts.pop();
  const urlParts = parts
    .filter((p) => p && !p.startsWith("(") && !p.endsWith(")"))
    .map((p) => p);
  const route = "/" + urlParts.join("/");
  return route === "/" ? "/" : route.replace(/\\\\/g, "/");
}

async function getPostsSlugs() {
  try {
    const items = await fs.promises.readdir(POSTS_DIR);
    const slugs = items
      .filter(Boolean)
      .map((f) => f.replace(/\.(mdx?|json|html|txt)$/, ""));
    return slugs;
  } catch {
    return [];
  }
}

const config = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://example.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/admin",
      },
    ],
  },
  additionalPaths: async () => {
    const out = [];
    const pageFiles = await walk(APP_DIR);
    const posts = await getPostsSlugs();

    for (const file of pageFiles) {
      const route = toRoute(file);

      if (route.includes("[")) {
        if (route.includes("[slug]") && posts.length > 0) {
          for (const slug of posts) {
            let lastmod = new Date().toISOString();
            try {
              const f = path.join(POSTS_DIR, slug + ".md");
              const stats = await fs.promises.stat(f);
              lastmod = stats.mtime.toISOString();
            } catch {}

            out.push({
              loc: route.replace("[slug]", slug),
              lastmod,
              changefreq: "daily",
              priority: 0.9,
            });
          }
        }
        continue;
      }

      try {
        const stats = await fs.promises.stat(file);
        out.push({
          loc: route,
          lastmod: stats.mtime.toISOString(),
          changefreq: "weekly",
          priority: 0.8,
        });
      } catch {
        out.push({ loc: route });
      }
    }

    // next-sitemap expects full URLs (siteUrl + path) when additionalPaths returns objects
    // but it will also accept loc starting with '/'. Keep them as paths; next-sitemap will prepend siteUrl.
    return out;
  },
};

export default config;
