import Link from "next/link";
import { CATEGORY_META } from "@/lib/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import site from "../../../config/site.json";

export function CategoryExplorer() {
  const categories = site.categories
    .map((slug) => ({ slug, ...CATEGORY_META[slug] }))
    .filter((c) => c.label);

  return (
    <section>
      <SectionHeading
        eyebrow="Explore topics"
        title="Every corner of modern wealth-building"
        description="Deep guides across personal finance, markets, property, credit, taxes, and income — written for people who want results, not fluff."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className={`group glass-card rounded-2xl bg-gradient-to-br ${cat.accent} p-6 no-underline transition-transform hover:-translate-y-1`}
          >
            <h3 className="font-display text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-bright)]">
              {cat.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {cat.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
              Browse guides
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
