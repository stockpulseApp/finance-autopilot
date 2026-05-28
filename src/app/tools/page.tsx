import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/marketplace/PageHero";
import { getVisualImage } from "@/lib/marketplace-images";

const tools = [
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    description: "See how monthly contributions grow over time.",
    category: "investing",
  },
  {
    slug: "mortgage-payment",
    title: "Mortgage Payment Estimator",
    description: "Estimate principal, interest, taxes, and insurance.",
    category: "real-estate",
  },
  {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator",
    description: "Compare avalanche vs snowball payoff timelines.",
    category: "debt",
  },
];

export const metadata = { title: "Free Tools" };

export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="Free money tools"
        subtitle="High-intent calculators that help you plan — and point you to the best deals and guides."
        category="personal-finance"
        heroContext="tools"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="group overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm no-underline hover:shadow-md"
          >
            <div className="relative h-40 w-full">
              <Image
                src={getVisualImage(t.slug, t.category)}
                alt=""
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-[var(--foreground)]">{t.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{t.description}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[var(--primary)]">
                Open tool →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
