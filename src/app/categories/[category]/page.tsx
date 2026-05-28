import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { GuideOfferCard } from "@/components/marketplace/GuideOfferCard";
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
          {posts.length} guides · {deals.length} partner deals
        </p>
      </PageHero>

      {deals.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold">Top deals in this category</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.map((d) => (
              <DealOfferCard key={d.id} program={d} source={`category-${category}`} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Guides</h2>
          <Link href="/blog" className="text-sm font-bold text-[var(--primary)] no-underline">
            All guides →
          </Link>
        </div>
        {posts.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-[var(--muted)]">
            New guides publishing daily via our automation pipeline.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((p) => (
              <GuideOfferCard key={p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
