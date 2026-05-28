import Link from "next/link";
import site from "../../../config/site.json";

export const metadata = {
  title: "Wealthy Brainiac",
  description:
    "Learn what Wealthy Brainiac is, how we help readers build wealth, and where to start.",
};

export default function WealthyBrainiacBrandPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <h1 className="text-4xl font-bold">What is Wealthy Brainiac?</h1>
        <p className="mt-4 text-[var(--muted)]">
          {site.name} is a finance education platform built for ambitious people who want practical
          systems for saving, investing, credit optimization, and long-term wealth growth.
        </p>
      </section>

      <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-2xl font-bold">How we help you grow wealth</h2>
        <ul className="mt-4 space-y-2 text-[var(--muted)]">
          <li>Daily finance playbooks with actionable steps</li>
          <li>Calculators and tools for high-intent money decisions</li>
          <li>Digital products and courses for execution speed</li>
          <li>Transparent affiliate recommendations and disclosures</li>
        </ul>
      </section>

      <section className="flex flex-wrap gap-4">
        <Link
          href="/start-here"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
        >
          Start here
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold no-underline text-[var(--foreground)]"
        >
          Read the blog
        </Link>
      </section>
    </div>
  );
}
