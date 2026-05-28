import Image from "next/image";
import Link from "next/link";
import { getImageAlt, resolveVisualImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import type { Post } from "@/lib/types";

export function ArticleCard({
  post,
  variant = "default",
}: {
  post: Post & { excerpt: string; readingTime: number };
  variant?: "default" | "compact" | "horizontal";
}) {
  const cat = getCategoryMeta(post.category);
  const image = resolveVisualImage({
    slug: post.slug,
    category: post.category,
    coverImage: post.coverImage,
  });
  const imageAlt = getImageAlt(post.slug, post.title, cat.label);
  const href = `/blog/${post.slug}`;

  if (variant === "horizontal") {
    return (
      <article className="group flex gap-5 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm transition hover:shadow-md md:gap-6 md:p-5">
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg md:h-32 md:w-40">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="160px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase text-[var(--primary)]">{cat.label}</p>
          <h3 className="mt-1 text-lg font-bold leading-snug group-hover:text-[var(--primary)]">
            <Link href={href} className="text-[var(--foreground)] no-underline">
              {post.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--muted)]">
            {post.excerpt}
          </p>
          <p className="mt-2 text-xs text-[var(--muted)]">
            {post.readingTime} min read · {post.date}
          </p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-4 border-b border-[var(--border)] py-4 last:border-0">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg md:h-20 md:w-24">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase text-[var(--primary)]">{cat.label}</p>
          <h3 className="mt-0.5 text-base font-bold leading-snug">
            <Link href={href} className="text-[var(--foreground)] no-underline hover:text-[var(--primary)]">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
            {post.excerpt}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {post.readingTime} min · {post.date}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded bg-white px-2 py-0.5 text-xs font-bold text-[var(--primary)]">
          {cat.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug">
          <Link href={href} className="text-[var(--foreground)] no-underline hover:text-[var(--primary)]">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-4">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
          <span>{post.readingTime} min read</span>
          <Link href={href} className="font-bold text-[var(--primary)] no-underline">
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
