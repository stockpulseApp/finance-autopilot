import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { AffiliateCard } from "@/components/AffiliateCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedAffiliates } from "@/lib/affiliates";
import { getCourses } from "@/lib/courses";
import site from "../../config/site.json";

export default function HomePage() {
  const posts = getFeaturedPosts(6);
  const deals = getFeaturedAffiliates().slice(0, 3);
  const courses = getCourses().slice(0, 2);

  return (
    <div className="space-y-16">
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-[var(--accent)]">Daily wealth education</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">{site.tagline}</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{site.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/blog"
            className="rounded-lg bg-[var(--accent)] px-6 py-3 font-semibold text-black no-underline"
          >
            Read today&apos;s guides
          </Link>
          <Link
            href="/courses"
            className="rounded-lg border border-[var(--border)] px-6 py-3 font-semibold no-underline text-[var(--foreground)]"
          >
            Explore courses
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold">Latest articles</h2>
          <Link href="/blog" className="text-sm">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10">
        <h2 className="text-2xl font-bold">Free Wealth Starter Kit</h2>
        <p className="mt-2 text-[var(--muted)] max-w-xl">
          Weekly tips on budgeting, investing, and credit — plus exclusive deal alerts.
        </p>
        <div className="mt-6 max-w-md">
          <NewsletterForm />
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
              <p className="text-xs text-[var(--muted)]">{c.level} · {c.modules} modules</p>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{c.description}</p>
              <p className="mt-4 text-2xl font-bold">${c.price}</p>
              <Link href={`/courses/${c.slug}`} className="mt-4 inline-block text-sm font-medium">
                View course →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
