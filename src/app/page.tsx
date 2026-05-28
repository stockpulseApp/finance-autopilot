import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { AffiliateCard } from "@/components/AffiliateCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { CategoryExplorer } from "@/components/home/CategoryExplorer";
import { WealthPath } from "@/components/home/WealthPath";
import { Testimonials } from "@/components/home/Testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedPosts } from "@/lib/posts";
import { getFeaturedAffiliates } from "@/lib/affiliates";
import { getCourses } from "@/lib/courses";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const posts = getFeaturedPosts(6);
  const [leadPost, ...restPosts] = posts;
  const deals = getFeaturedAffiliates().slice(0, 3);
  const courses = getCourses().slice(0, 3);
  const products = getProducts().slice(0, 2);

  return (
    <div className="space-y-20 md:space-y-28">
      <Hero />
      <StatsStrip />
      <CategoryExplorer />
      <WealthPath />

      <section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Latest intelligence"
            title="Money playbooks worth your time"
            description="In-depth guides on investing, property, credit, crypto, and cash flow — updated regularly so you always have a next move."
          />
          <Link
            href="/blog"
            className="btn-secondary shrink-0 self-start md:self-auto"
          >
            View all guides
          </Link>
        </div>

        {leadPost && (
          <div className="mt-10">
            <PostCard post={leadPost} featured />
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/50 via-[var(--card)] to-[var(--card)] p-8 md:p-12">
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="section-eyebrow text-amber-400">Limited cohort</p>
            <h2 className="font-display mt-3 text-3xl font-semibold md:text-4xl">
              June Wealth OS intake closes soon
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Get templates, implementation checklists, and the full operating
              system course — built for readers ready to execute, not just read.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary">
              Explore programs
            </Link>
            <Link href="/courses" className="btn-secondary">
              View courses
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-emerald-950/40 to-[var(--card)] p-8 md:p-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Free starter kit"
              title="The 30-Day Wealth Sprint"
              description="A daily action plan: optimize spending, kill bad debt, automate investing, and launch your first income stream. Plus instant access to our checklist PDF."
            />
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Programs"
          title="Tools that pay for themselves"
          description="Templates, courses, and systems designed to save or make you money within the first 30 days."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.slug}
              className="glass-card group rounded-2xl p-8 transition-transform hover:-translate-y-1"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                {product.type}
              </p>
              <h3 className="font-display mt-3 text-2xl font-semibold">{product.name}</h3>
              <p className="mt-3 text-[var(--muted)] leading-relaxed">{product.headline}</p>
              <p className="mt-6 font-display text-4xl font-semibold">
                ${product.price}
                <span className="text-base font-normal text-[var(--muted)]"> USD</span>
              </p>
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                Get instant access
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {courses.map((c) => (
            <div
              key={c.slug}
              className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                {c.level} · {c.modules} modules
              </p>
              <h3 className="font-display mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-3">
                {c.description}
              </p>
              <p className="mt-4 text-2xl font-bold text-[var(--accent)]">${c.price}</p>
              <Link
                href={`/courses/${c.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] no-underline"
              >
                View curriculum →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Partner picks"
          title="Vetted deals our readers use"
          description="We only recommend tools we would use ourselves. Some links are affiliate — see our disclosure."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {deals.map((d) => (
            <AffiliateCard key={d.id} program={d} source="homepage" />
          ))}
        </div>
        <p className="mt-6 text-center">
          <Link href="/deals" className="text-sm font-semibold no-underline">
            See all partner deals →
          </Link>
        </p>
      </section>
    </div>
  );
}
