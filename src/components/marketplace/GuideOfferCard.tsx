import Image from "next/image";
import Link from "next/link";
import { getCategoryImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import { StarRating } from "./StarRating";
import type { Post } from "@/lib/types";

export function GuideOfferCard({ post }: { post: Post }) {
  const cat = getCategoryMeta(post.category);
  const image = getCategoryImage(post.category);

  return (
    <article className="marketplace-card flex h-full min-w-[300px] flex-col md:min-w-0">
      <div className="relative h-40 w-full">
        <Image src={image} alt="" fill className="object-cover" sizes="320px" />
        <span className="absolute left-3 top-3 rounded bg-white/95 px-2 py-0.5 text-xs font-bold text-[var(--primary)]">
          Free guide
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase text-[var(--muted)]">{cat.label}</p>
        <h3 className="mt-1 text-base font-bold leading-snug">
          <Link href={`/blog/${post.slug}`} className="text-[var(--foreground)] no-underline hover:text-[var(--primary)]">
            {post.title}
          </Link>
        </h3>
        <StarRating rating={4.7} reviews={89} />
        <p className="mt-2 flex-1 text-sm text-[var(--muted)] line-clamp-2">{post.description}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="btn-outline mt-4 w-full text-center"
        >
          Read guide — free
        </Link>
      </div>
    </article>
  );
}
