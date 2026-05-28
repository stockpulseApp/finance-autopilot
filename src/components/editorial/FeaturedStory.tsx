import Image from "next/image";
import Link from "next/link";
import { getImageAlt, resolveVisualImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import type { Post } from "@/lib/types";

export function FeaturedStory({
  post,
}: {
  post: Post & { excerpt: string; readingTime: number };
}) {
  const cat = getCategoryMeta(post.category);
  const image = resolveVisualImage({
    slug: post.slug,
    category: post.category,
    coverImage: post.coverImage,
  });
  const imageAlt = getImageAlt(post.slug, post.title, cat.label);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-md">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[240px] lg:min-h-[420px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
            Featured guide · {cat.label}
          </p>
          <h2 className="mt-3 text-2xl font-extrabold leading-snug text-[var(--foreground)] md:text-3xl lg:text-4xl">
            <Link
              href={`/blog/${post.slug}`}
              className="text-[var(--foreground)] no-underline hover:text-[var(--primary)]"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {post.excerpt}
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {post.readingTime} min read · {post.date} · {post.author}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="btn-primary-blue mt-8 w-fit"
          >
            Read the full guide
          </Link>
        </div>
      </div>
    </section>
  );
}
