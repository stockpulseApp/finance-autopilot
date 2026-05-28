import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WealthPath } from "@/components/home/WealthPath";

export const metadata = { title: "Start Here — Your Wealth Roadmap" };

const quickWins = [
  {
    title: "Audit your money in 60 minutes",
    detail: "Export 90 days of transactions, tag leaks, and set a 48-hour cancellation list.",
  },
  {
    title: "Automate your survival number",
    detail: "Split direct deposit: bills → savings → guilt-free spending. No willpower required.",
  },
  {
    title: "Open your investing lane",
    detail: "Brokerage + IRA checklist, target allocation, and first automated buy order.",
  },
];

export default function StartHerePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-emerald-950/50 to-[var(--card)] p-8 md:p-14">
        <p className="section-eyebrow">Start here</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">
          Build your money machine in the right order
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Most people try to invest before they stabilize cash flow — then panic
          when markets dip. This roadmap sequences every move so each step funds
          the next.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/newsletter" className="btn-primary">
            Get the free 30-day sprint
          </Link>
          <Link href="/blog" className="btn-secondary">
            Read latest guides
          </Link>
        </div>
      </section>

      <WealthPath />

      <section>
        <SectionHeading
          eyebrow="First 7 days"
          title="Quick wins you can execute today"
          description="No theory — these are the highest-leverage actions new readers complete in week one."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quickWins.map((item, i) => (
            <div key={item.title} className="glass-card rounded-2xl p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-300">
                {i + 1}
              </span>
              <h3 className="font-display mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card rounded-3xl p-8 text-center md:p-12">
        <h2 className="font-display text-2xl font-semibold md:text-3xl">
          Ready for templates and courses?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
          Graduate from free guides to the Money OS pack and Wealth Operating
          System when you want done-for-you spreadsheets and video walkthroughs.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/products" className="btn-primary">
            Browse products
          </Link>
          <Link href="/courses" className="btn-secondary">
            View courses
          </Link>
        </div>
      </section>
    </div>
  );
}
