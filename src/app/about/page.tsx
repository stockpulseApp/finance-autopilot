import Link from "next/link";
import site from "../../../config/site.json";
import { PageHero } from "@/components/marketplace/PageHero";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <PageHero
        title={`About ${site.name}`}
        subtitle="Daily money guides, partner deals, digital products, and tools — built to help you compare, decide, and act."
        heroContext="about"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--foreground)]">What we publish</h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            Personal finance, investing, real estate, credit, taxes, side income, retirement, and
            insurance — with transparent affiliate disclosures on every recommendation.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--foreground)]">How content is made</h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            Articles are researched with AI assistance, edited for clarity, and published on a
            daily schedule. Always verify rates, offers, and tax rules before making decisions.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/subscription"
          className="rounded-lg bg-[var(--cta)] px-6 py-3 font-semibold text-white no-underline hover:opacity-90"
        >
          Explore Pro membership
        </Link>
        <Link
          href="/start-here"
          className="rounded-lg border border-[var(--border)] bg-white px-6 py-3 font-semibold text-[var(--primary)] no-underline hover:bg-[var(--surface)]"
        >
          Start here
        </Link>
      </div>
    </div>
  );
}
