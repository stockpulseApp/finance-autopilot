import Link from "next/link";
import { EditorialHero } from "@/components/editorial/EditorialHero";
import { FeaturedStory } from "@/components/editorial/FeaturedStory";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { WhyVisit } from "@/components/editorial/WhyVisit";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { CategoryTile } from "@/components/marketplace/CategoryTile";
import { getEnrichedPosts } from "@/lib/posts";
import { getFeaturedAffiliates } from "@/lib/affiliates";
import { CATEGORY_META } from "@/lib/categories";
import site from "../../config/site.json";

export default function HomePage() {
  const posts = getEnrichedPosts();
  const featured = posts[0];
  const latest = posts.slice(1, 7);
  const deepDives = posts.slice(7, 13);
  const featuredDeals = getFeaturedAffiliates().slice(0, 3);

  const topCategories = site.categories.slice(0, 6).map((slug) => {
    const count = posts.filter((p) => p.category === slug).length;
    return {
      slug,
      label: CATEGORY_META[slug]?.label ?? slug,
      dealCount: `${count} in-depth guides`,
    };
  });

  return (
    <div className="space-y-12 md:space-y-16">
      <EditorialHero />

      {featured && <FeaturedStory post={featured} />}

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Latest guides</h2>
            <p className="mt-1 text-[var(--muted)]">
              {posts.length}+ articles — new lessons published daily
            </p>
          </div>
          <Link href="/blog" className="shrink-0 text-sm font-bold text-[var(--primary)] no-underline">
            All guides →
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {latest.slice(0, 2).map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="mt-4 space-y-0 rounded-xl border border-[var(--border)] bg-white px-5 md:px-6">
          {latest.slice(2).map((post) => (
            <ArticleCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      </section>

      <WhyVisit />

      <section>
        <h2 className="text-2xl font-extrabold">Explore by topic</h2>
        <p className="mt-1 max-w-2xl text-[var(--muted)]">
          Each topic has full guides with examples, checklists, and frameworks — not just
          product links.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCategories.map((cat) => (
            <CategoryTile
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              dealCount={cat.dealCount}
            />
          ))}
        </div>
      </section>

      {deepDives.length > 0 && (
        <section>
          <h2 className="text-2xl font-extrabold">More to read this week</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deepDives.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--primary-light)] p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[var(--primary)]">
              When you&apos;re ready: compare tools
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              After you understand the strategy, see vetted brokers, cards, and apps —
              with transparent disclosures.
            </p>
          </div>
          <Link href="/deals" className="btn-primary-blue shrink-0">
            Browse partner deals
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featuredDeals.map((deal) => (
            <DealOfferCard key={deal.id} program={deal} source="homepage-deals" />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-[var(--primary)] px-8 py-10 text-center text-white md:py-14">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Get smarter about money every week
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-blue-100">
          Join readers who get new guides, deal roundups, and the 30-day wealth sprint
          checklist — free.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/newsletter" className="btn-deal">
            Free newsletter
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border-2 border-white px-6 py-3 font-bold text-white no-underline hover:bg-white/10"
          >
            Browse all {posts.length} guides
          </Link>
        </div>
      </section>
    </div>
  );
}
