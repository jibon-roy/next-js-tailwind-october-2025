// src/lib/pages.ts
export async function getAllPages() {
  return [
    { path: "/", updatedAt: new Date("2025-10-28") },
    { path: "/demo", updatedAt: new Date("2025-10-20") },
    { path: "/contact", updatedAt: new Date("2025-10-18") },
  ];
}
