import Link from "next/link";

const tools = [
  {
    slug: "compound-interest",
    title: "Compound Interest Calculator",
    description: "See how monthly contributions grow over time."
  },
  {
    slug: "mortgage-payment",
    title: "Mortgage Payment Estimator",
    description: "Estimate principal, interest, taxes, and insurance."
  },
  {
    slug: "debt-payoff",
    title: "Debt Payoff Calculator",
    description: "Compare avalanche vs snowball payoff timelines."
  }
];

export const metadata = { title: "Free Tools" };

export default function ToolsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Free money tools</h1>
      <p className="mt-2 text-[var(--muted)]">
        High-intent calculators to grow SEO traffic, email signups, and affiliate conversions.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 no-underline hover:border-[var(--accent)]/50"
          >
            <h2 className="text-lg font-semibold text-[var(--foreground)]">{t.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
