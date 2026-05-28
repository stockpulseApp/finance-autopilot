import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { CATEGORY_META } from "@/lib/categories";
import { getAffiliatePrograms } from "@/lib/affiliates";
import { getPostsByCategory } from "@/lib/posts";
import site from "../../../../config/site.json";

export async function generateStaticParams() {
  return site.categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  return {
    title: meta?.label ?? category,
    description: meta?.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!site.categories.includes(category)) notFound();

  const meta = CATEGORY_META[category];
  const posts = getPostsByCategory(category);
  const deals = getAffiliatePrograms().filter((p) => p.category === category);

  return (
    <div className="space-y-10">
      <PageHero
        title={meta?.label ?? category}
        subtitle={meta?.description ?? ""}
        category={category}
      >
        <p className="text-sm text-blue-100">
          {posts.length} guides in this topic
          {deals.length > 0 ? ` · ${deals.length} tools to compare when ready` : ""}
        </p>
      </PageHero>

      <section>
        <h2 className="text-xl font-extrabold">Guides &amp; strategies</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Read the full articles first — each one explains the why and the how.
        </p>
        {posts.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-[var(--muted)]">
            New guides in this topic publish daily.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {posts.map((p) => (
              <ArticleCard key={p.slug} post={p} variant="horizontal" />
            ))}
          </div>
        )}
      </section>

      {deals.length > 0 && (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--primary-light)] p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-[var(--primary)]">
            Tools to compare
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Once you know what you need, these are popular options readers compare.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((d) => (
              <DealOfferCard key={d.id} program={d} source={`category-${category}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
