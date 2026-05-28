import Link from "next/link";
import Image from "next/image";
import ctaMap from "../../../config/guide-cta-map.json";
import { getGuides } from "@/lib/guides";
import { getCategoryMeta } from "@/lib/categories";
import { getImageAlt, resolveVisualImage } from "@/lib/marketplace-images";

export function RelatedGuides({ category }: { category: string }) {
  const cta = (ctaMap as Record<string, { freeSlug: string; paidSlug: string; paidTitle: string; paidPrice: number }>)[
    category
  ];
  if (!cta) return null;

  const guides = getGuides();
  const free = guides.find((g) => g.slug === cta.freeSlug);
  const paid = guides.find((g) => g.slug === cta.paidSlug);
  if (!free && !paid) return null;

  const items = [free, paid].filter(Boolean);

  return (
    <aside className="rounded-xl border border-[var(--border)] bg-white p-5 lg:sticky lg:top-24">
      <h2 className="text-sm font-bold uppercase text-[var(--muted)]">Go deeper</h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Free playbook plus premium worksheets for this topic.
      </p>
      <ul className="mt-4 space-y-4">
        {items.map((g) => {
          if (!g) return null;
          const cat = getCategoryMeta(g.category);
          const image = resolveVisualImage({ slug: g.slug, category: g.category });
          return (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="group flex gap-3 no-underline"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={getImageAlt(g.slug, g.title, cat.label)}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--primary)]">
                    {g.type === "free" ? "Free guide" : `$${g.price}`}
                  </p>
                  <p className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                    {g.title}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/guides" className="mt-4 block text-sm font-bold text-[var(--primary)] no-underline">
        All guides →
      </Link>
    </aside>
  );
}
