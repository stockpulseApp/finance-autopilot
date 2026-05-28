import Link from "next/link";

export const metadata = { title: "Start Here" };

const roadmap = [
  {
    step: "1. Stabilize cash",
    detail: "Set up a bulletproof budget and emergency fund system."
  },
  {
    step: "2. Eliminate bad debt",
    detail: "Use avalanche strategy with automated extra payments."
  },
  {
    step: "3. Build investment engine",
    detail: "Automate index fund contributions and tax-advantaged accounts."
  },
  {
    step: "4. Add income streams",
    detail: "Launch side income and cash-flowing assets."
  },
  {
    step: "5. Scale wealth",
    detail: "Use systems for tax efficiency, credit leverage, and risk control."
  }
];

export default function StartHerePage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <section>
        <h1 className="text-4xl font-bold">Start Here: Build Your Money Machine</h1>
        <p className="mt-3 text-lg text-[var(--muted)]">
          Follow this roadmap to move from financial stress to automated wealth growth.
        </p>
      </section>

      <section className="grid gap-4">
        {roadmap.map((item) => (
          <div key={item.step} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="text-xl font-semibold">{item.step}</h2>
            <p className="mt-2 text-[var(--muted)]">{item.detail}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-4">
        <Link href="/newsletter" className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline">
          Get the free 30-day plan
        </Link>
        <Link href="/products" className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold no-underline text-[var(--foreground)]">
          Explore products
        </Link>
      </section>
    </div>
  );
}
