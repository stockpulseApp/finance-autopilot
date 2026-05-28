import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { WealthPath } from "@/components/home/WealthPath";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { getEnrichedPosts } from "@/lib/posts";

export const metadata = { title: "Start Here — Your Wealth Roadmap" };

const quickWins = [
  {
    title: "Read your first guide",
    detail: "Pick budgeting or investing — 10 minutes, one clear action for this week.",
    href: "/blog",
  },
  {
    title: "Pick your topic",
    detail: "Deep libraries on credit, property, taxes, side income, and retirement.",
    href: "/categories",
  },
  {
    title: "Automate one habit",
    detail: "Set a single transfer or bill-pay rule after you read — not before.",
    href: "/categories/personal-finance",
  },
];

export default function StartHerePage() {
  const starters = getEnrichedPosts().slice(0, 3);

  return (
    <div className="space-y-12">
      <PageHero
        title="Start here: learn first, tools second"
        subtitle="Dunrite Global is a free money school. Read the guides, build the skill, then compare brokers and apps when you know what you need."
        category="personal-finance"
        heroContext="start"
      >
        <Link href="/blog" className="btn-deal">
          Read your first guide
        </Link>
      </PageHero>

      <WealthPath />

      <section>
        <h2 className="text-xl font-extrabold">Your first three steps</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {quickWins.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className="marketplace-card block p-6 no-underline hover:no-underline"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-bold text-[var(--primary)]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
              <span className="mt-4 inline-block text-sm font-bold text-[var(--primary)]">
                Go →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-extrabold">Popular starting guides</h2>
        <div className="mt-6 space-y-4">
          {starters.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="horizontal" />
          ))}
        </div>
        <Link href="/blog" className="btn-primary-blue mt-6 inline-flex">
          Browse all guides
        </Link>
      </section>
    </div>
  );
}
