// src/lib/posts.ts
import fs from "fs";
import path from "path";

interface Post {
  slug: string;
  updatedAt: Date;
}

export function getAllPostsSlugs(): Post[] {
  const postsDir = path.join(process.cwd(), "src/demo");

  // If the demo/posts directory doesn't exist, return an empty list instead of throwing.
  // This prevents build-time/pre-render errors when the directory is optional.
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  let files: string[] = [];
  try {
    files = fs.readdirSync(postsDir);
  } catch {
    // If reading fails for any reason, return empty list to avoid crashing prerender.
    return [];
  }

  const posts: Post[] = files.map((file) => {
    const filePath = path.join(postsDir, file);
    const stats = fs.statSync(filePath);

    // Remove extension to get slug
    const slug = file.replace(/\.(md|json|mdx)$/, "");

    return {
      slug,
      updatedAt: stats.mtime, // last modified date
    };
  });

  return posts;
}
