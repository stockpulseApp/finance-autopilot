import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { AffiliateCard } from "@/components/AffiliateCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedAffiliates } from "@/lib/affiliates";
import { getCourses } from "@/lib/courses";
import { getProducts } from "@/lib/products";
import site from "../../config/site.json";

export default function HomePage() {
  const posts = getFeaturedPosts(6);
  const deals = getFeaturedAffiliates().slice(0, 3);
  const courses = getCourses().slice(0, 2);
  const products = getProducts().slice(0, 2);

  return (
    <div className="space-y-16">
      <section className="text-center max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]">The Wealth Operating System</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">{site.tagline}</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{site.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/start-here"
            className="rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black no-underline"
          >
            Start the roadmap
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-[var(--border)] px-6 py-3 font-semibold no-underline text-[var(--foreground)]"
          >
            Explore products
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Latest money playbooks</h2>
          <Link href="/blog" className="text-sm">View all {"->"}</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10">
        <h2 className="text-2xl font-bold">Get the 30-Day Wealth Sprint</h2>
        <p className="mt-2 text-[var(--muted)] max-w-xl">
          A daily action plan to optimize spending, increase cash flow, and start investing hard.
        </p>
        <div className="mt-6 max-w-md">
          <NewsletterForm />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Top monetization offers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.slug} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs uppercase text-[var(--muted)]">{product.type}</p>
              <h3 className="mt-2 text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{product.headline}</p>
              <p className="mt-4 text-2xl font-bold">${product.price}</p>
              <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-medium">
                Buy now {"->"}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Top picks (affiliate)</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {deals.map((d) => (
            <AffiliateCard key={d.id} program={d} source="homepage" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Courses</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((c) => (
            <div key={c.slug} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-xs text-[var(--muted)]">{c.level} - {c.modules} modules</p>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{c.description}</p>
              <p className="mt-4 text-2xl font-bold">${c.price}</p>
              <Link href={`/courses/${c.slug}`} className="mt-4 inline-block text-sm font-medium">
                View course {"->"}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
