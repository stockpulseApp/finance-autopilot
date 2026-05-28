import Link from "next/link";
import type { Post } from "@/lib/types";
import { getCategoryMeta } from "@/lib/categories";

function formatDate(date: string) {
  if (!date) return "";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const cat = getCategoryMeta(post.category);

  return (
    <article
      className={`group glass-card flex flex-col overflow-hidden rounded-2xl transition-transform hover:-translate-y-1 ${
        featured ? "md:flex-row md:items-stretch" : ""
      }`}
    >
      <div
        className={`bg-gradient-to-br ${cat.accent} ${featured ? "md:w-2/5 min-h-[180px]" : "h-32"}`}
        aria-hidden
      />
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:justify-center" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-semibold uppercase tracking-wide text-emerald-300">
            {cat.label}
          </span>
          <span className="text-[var(--muted)]">{formatDate(post.date)}</span>
        </div>
        <h2 className="font-display mt-3 text-xl font-semibold leading-snug md:text-2xl">
          <Link
            href={`/blog/${post.slug}`}
            className="text-[var(--foreground)] no-underline transition-colors group-hover:text-[var(--accent-bright)]"
          >
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
          {post.description}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] no-underline"
        >
          Read the full guide
          <span className="transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
