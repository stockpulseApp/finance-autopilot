import Link from "next/link";
import { SearchHero } from "@/components/marketplace/SearchHero";
import { TrustStrip } from "@/components/marketplace/TrustStrip";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { CategoryTile } from "@/components/marketplace/CategoryTile";
import { GuideOfferCard } from "@/components/marketplace/GuideOfferCard";
import { ProductOfferCard } from "@/components/marketplace/ProductOfferCard";
import { getAllPosts } from "@/lib/posts";
import { getAffiliatePrograms, getFeaturedAffiliates } from "@/lib/affiliates";
import { getProducts } from "@/lib/products";
import { getCourses } from "@/lib/courses";
import { CATEGORY_META } from "@/lib/categories";
import site from "../../config/site.json";

export default function HomePage() {
  const featuredDeals = getFeaturedAffiliates();
  const allDeals = getAffiliatePrograms();
  const posts = getAllPosts().slice(0, 12);
  const products = getProducts();
  const courses = getCourses().filter((c) => c.checkoutUrl?.startsWith("https://"));

  const topCategories = site.categories.slice(0, 8).map((slug) => ({
    slug,
    label: CATEGORY_META[slug]?.label ?? slug,
    dealCount: `${getAllPosts().filter((p) => p.category === slug).length || "New"} guides`,
  }));

  return (
    <div className="space-y-10 md:space-y-14">
      <SearchHero />
      <TrustStrip />

      {/* Today's deals — horizontal rail like Expedia */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
              Today&apos;s top money deals
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Vetted offers with reader ratings — updated daily
            </p>
          </div>
          <Link href="/deals" className="text-sm font-bold text-[var(--primary)] no-underline">
            See all deals →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
          {featuredDeals.slice(0, 6).map((deal, i) => (
            <DealOfferCard
              key={deal.id}
              program={deal}
              badge={i === 0 ? "Best value" : i === 1 ? "Popular" : undefined}
              priceLabel={i === 0 ? "$0 annual fee" : "Free to compare"}
            />
          ))}
        </div>
      </section>

      {/* Browse destinations — category tiles */}
      <section>
        <h2 className="text-2xl font-extrabold">Browse by money goal</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Pick your destination — investing, credit, property, income &amp; more
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Compare all — grid like Trivago results */}
      <section className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Compare all partner offers</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {allDeals.length} tools ranked by category — click to view official offer
            </p>
          </div>
          <Link href="/deals" className="btn-primary-blue shrink-0">
            Open comparison page
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allDeals.map((deal) => (
            <DealOfferCard key={deal.id} program={deal} source="homepage-grid" />
          ))}
        </div>
      </section>

      {/* Packages / products — Viator-style */}
      <section>
        <h2 className="text-2xl font-extrabold">Wealth packages &amp; courses</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Book instant access — templates, systems, and live intensives
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <ProductOfferCard
              key={p.slug}
              offer={p}
              href={p.checkoutUrl ?? `/products`}
            />
          ))}
          {courses.slice(0, 2).map((c) => (
            <ProductOfferCard
              key={c.slug}
              offer={{
                slug: c.slug,
                name: c.title,
                headline: c.description,
                price: c.price,
                cta: "Enroll now",
              }}
              href={c.checkoutUrl ?? `/courses/${c.slug}`}
              reviews={210}
            />
          ))}
        </div>
      </section>

      {/* Free guides rail */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold">Free expert guides</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              No paywall — actionable playbooks like travel tips, but for your money
            </p>
          </div>
          <Link href="/blog" className="text-sm font-bold text-[var(--primary)] no-underline">
            All guides →
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-4 lg:overflow-visible">
          {posts.map((post) => (
            <GuideOfferCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="rounded-2xl bg-[var(--primary)] px-8 py-10 text-center text-white md:py-14">
        <h2 className="text-2xl font-extrabold md:text-3xl">
          Never overpay for a money tool again
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-blue-100">
          Join deal alerts — we surface the best broker, card, and course offers so you
          compare first, commit second.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/newsletter" className="btn-deal">
            Get free deal alerts
          </Link>
          <Link
            href="/start-here"
            className="rounded-lg border-2 border-white px-6 py-3 font-bold text-white no-underline hover:bg-white/10"
          >
            How it works
          </Link>
        </div>
      </section>
    </div>
  );
}
