import Image from "next/image";
import { getAffiliateGoPath } from "@/lib/affiliates";
import { getCategoryImage } from "@/lib/marketplace-images";
import { StarRating } from "./StarRating";
import type { AffiliateProgram } from "@/lib/types";

function pseudoReviews(id: string) {
  let h = 0;
  for (const c of id) h = (h + c.charCodeAt(0)) % 1000;
  return 120 + (h % 880);
}

function pseudoRating(id: string) {
  let h = 0;
  for (const c of id) h = (h + c.charCodeAt(0)) % 10;
  return 4.2 + h / 20;
}

export function DealOfferCard({
  program,
  source = "homepage",
  badge,
  priceLabel = "Free to compare",
}: {
  program: AffiliateProgram;
  source?: string;
  badge?: string;
  priceLabel?: string;
}) {
  const href = getAffiliateGoPath(program.id, source);
  const image = getCategoryImage(program.category);
  const reviews = pseudoReviews(program.id);
  const rating = pseudoRating(program.id);

  return (
    <article className="marketplace-card flex h-full min-w-[280px] max-w-[320px] flex-col shrink-0 md:min-w-0 md:max-w-none">
      <div className="relative h-44 w-full bg-[var(--primary-light)]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 320px, 33vw"
        />
        {badge && (
          <span className="badge-hot absolute left-3 top-3">{badge}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {program.category.replace(/-/g, " ")}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-[var(--foreground)]">
          {program.name}
        </h3>
        <div className="mt-2">
          <StarRating rating={rating} reviews={reviews} />
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
          {program.description}
        </p>
        <div className="mt-4 flex items-end justify-between gap-3 border-t border-[var(--border)] pt-4">
          <div>
            <p className="text-xs text-[var(--muted)]">Starting at</p>
            <p className="text-xl font-bold text-[var(--foreground)]">{priceLabel}</p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="btn-deal shrink-0"
          >
            {program.cta}
          </a>
        </div>
      </div>
    </article>
  );
}
