import Link from "next/link";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 hover:border-[var(--accent)]/40 transition">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">
        {post.category.replace(/-/g, " ")} · {post.date}
      </p>
      <h2 className="mt-2 text-xl font-semibold">
        <Link href={`/blog/${post.slug}`} className="text-[var(--foreground)] no-underline hover:text-[var(--accent)]">
          {post.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)] line-clamp-3">{post.description}</p>
      <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm font-medium">
        Read article →
      </Link>
    </article>
  );
}
