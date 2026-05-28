import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    return getPostBySlug(slug)!;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    category: String(data.category ?? "personal-finance"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? "Finance Autopilot Team"),
    featured: Boolean(data.featured),
    affiliateIds: Array.isArray(data.affiliateIds)
      ? data.affiliateIds.map(String)
      : undefined,
    content,
  };
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(limit = 3): Post[] {
  const featured = getAllPosts().filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return getAllPosts().slice(0, limit);
}
