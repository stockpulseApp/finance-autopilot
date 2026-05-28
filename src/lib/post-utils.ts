import type { Post } from "./types";

/** ~200 words per minute for finance guides */
export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function firstParagraph(content: string): string {
  const blocks = content.split(/\n\n+/).map(stripMarkdown).filter((b) => b.length > 60);
  return blocks[0] ?? stripMarkdown(content).slice(0, 500);
}

function isWeakDescription(description: string): boolean {
  const d = description.trim();
  if (!d || d.length < 80) return true;
  if (d.endsWith("— an une") || d.endsWith("an une")) return true;
  if (/^You've probably tried/i.test(d) && d.length < 120) return true;
  return false;
}

export function getExcerpt(post: Pick<Post, "description" | "content">, max = 220): string {
  if (!isWeakDescription(post.description)) {
    return post.description.trim();
  }
  const para = firstParagraph(post.content);
  if (para.length <= max) return para;
  const cut = para.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function enrichPost(post: Post): Post & { readingTime: number; excerpt: string } {
  const excerpt = getExcerpt(post);
  return {
    ...post,
    description: excerpt,
    readingTime: getReadingTimeMinutes(post.content),
    excerpt,
  };
}
