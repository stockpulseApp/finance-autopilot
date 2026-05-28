import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { enrichPost } from "./post-utils";
import type { Post } from "./types";

export type EnrichedPost = Post & { readingTime: number; excerpt: string };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  return getEnrichedPosts();
}

export function getEnrichedPosts(): EnrichedPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter((p): p is Post => p !== null)
    .map(enrichPost);
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
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    sources: Array.isArray(data.sources)
      ? (data.sources as { title?: string; url?: string; outlet?: string }[]).map(
          (s) => ({
            title: String(s.title ?? ""),
            url: String(s.url ?? ""),
            outlet: String(s.outlet ?? ""),
          }),
        )
      : undefined,
    socialQuotes: Array.isArray(data.socialQuotes)
      ? (data.socialQuotes as { paraphrase?: string; url?: string; attribution?: string }[]).map(
          (q) => ({
            paraphrase: String(q.paraphrase ?? ""),
            url: String(q.url ?? ""),
            attribution: String(q.attribution ?? ""),
          }),
        )
      : undefined,
    content,
  };
}

export function getPostsByCategory(category: string): EnrichedPost[] {
  return getEnrichedPosts().filter((p) => p.category === category);
}

export function getFeaturedPosts(limit = 3): EnrichedPost[] {
  const all = getEnrichedPosts();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= limit) return featured.slice(0, limit);
  return all.slice(0, limit);
}

export function getEnrichedPostBySlug(slug: string): EnrichedPost | null {
  const post = getPostBySlug(slug);
  return post ? enrichPost(post) : null;
}
