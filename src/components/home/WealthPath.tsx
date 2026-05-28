import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    phase: "Foundation",
    title: "Stabilize cash flow",
    detail:
      "Emergency fund targets, zero-based budgeting, and expense audits that free $500–$2,000/month without lifestyle collapse.",
  },
  {
    phase: "Defense",
    title: "Eliminate wealth leaks",
    detail:
      "Avalanche debt payoff, credit score optimization, and insurance review so bad debt stops compounding against you.",
  },
  {
    phase: "Offense",
    title: "Build your investment engine",
    detail:
      "Automated index portfolios, tax-advantaged accounts, and asset allocation rules you can set once and run for decades.",
  },
  {
    phase: "Expansion",
    title: "Add cash-flow assets",
    detail:
      "Side income, house hacking, and digital products — structured plays that compound with your W-2 or business income.",
  },
  {
    phase: "Scale",
    title: "Tax & leverage mastery",
    detail:
      "Advanced credit strategies, entity structure basics, and risk frameworks for scaling without blowing up.",
  },
];

export function WealthPath() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--card-elevated)] p-8 md:p-12">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="The roadmap"
            title="Your 5-phase wealth operating system"
            description="Most people random-walk their finances. We give you a sequenced path — each phase unlocks the next."
          />
          <Link href="/start-here" className="btn-primary mt-8">
            Get the full roadmap
          </Link>
        </div>
        <ol className="relative space-y-0">
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[19px] top-10 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-emerald-500/50 to-transparent"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15 text-sm font-bold text-emerald-300">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                  {step.phase}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
