import Link from "next/link";

export const metadata = {
  title: "Wealth Building Guide",
  description:
    "A step-by-step wealth building guide covering budgeting, debt, investing, and income growth.",
};

const steps = [
  {
    title: "1. Control cash flow",
    detail: "Build a budget system and automate savings every payday.",
  },
  {
    title: "2. Eliminate high-interest debt",
    detail: "Use an avalanche strategy to reduce interest drag quickly.",
  },
  {
    title: "3. Build your investment engine",
    detail: "Set recurring index fund contributions and optimize tax-advantaged accounts.",
  },
  {
    title: "4. Expand income sources",
    detail: "Add scalable side income and reinvest cash flow into wealth assets.",
  },
  {
    title: "5. Optimize and protect",
    detail: "Improve tax efficiency, insurance coverage, and risk controls.",
  },
];

export default function WealthBuildingGuidePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <h1 className="text-4xl font-bold">Wealth Building Guide</h1>
        <p className="mt-4 text-[var(--muted)]">
          Use this roadmap to move from financial chaos to predictable wealth growth.
        </p>
      </section>

      <section className="space-y-4">
        {steps.map((step) => (
          <div key={step.title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-xl font-semibold">{step.title}</h2>
            <p className="mt-2 text-[var(--muted)]">{step.detail}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-4">
        <Link
          href="/newsletter"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
        >
          Get free weekly plan
        </Link>
        <Link href="/products" className="text-sm text-[var(--muted)]">
          See premium systems {"->"}
        </Link>
      </section>
    </div>
  );
}
