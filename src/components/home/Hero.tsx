import Link from "next/link";
import site from "../../../config/site.json";

const highlights = [
  "Daily expert playbooks",
  "Investing & real estate systems",
  "Credit, tax & side-income tactics",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--border)]">
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 via-[var(--card)] to-[#0a1628]"
        aria-hidden
      />
      <div
        className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"
        aria-hidden
      />

      <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-medium text-emerald-200">
              New guides published daily
            </span>
          </div>

          <h1 className="font-display mt-8 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Build wealth with{" "}
            <span className="text-gradient">elite money strategies</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            {site.description} Join thousands of readers turning financial chaos
            into automated systems for investing, real estate, credit, and
            income growth.
          </p>

          <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-[var(--foreground)]"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-[var(--accent)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/start-here" className="btn-primary">
              Start your wealth roadmap
              <span aria-hidden>→</span>
            </Link>
            <Link href="/newsletter" className="btn-secondary">
              Free 30-day wealth sprint
            </Link>
          </div>

          <p className="mt-6 text-xs text-[var(--muted)]">
            No spam. Unsubscribe anytime. Educational content only — not
            personalized financial advice.
          </p>
        </div>

        <div className="relative hidden lg:block">
          <div className="animate-float glass-card rounded-2xl p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
              This week&apos;s focus
            </p>
            <p className="font-display mt-3 text-2xl font-semibold leading-snug">
              The 5-layer wealth stack
            </p>
            <ol className="mt-5 space-y-3 text-sm text-[var(--muted)]">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                  1
                </span>
                Emergency fund + cash buffer
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                  2
                </span>
                High-interest debt elimination
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                  3
                </span>
                Automated index investing
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                  4
                </span>
                Income acceleration plays
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-300">
                  5
                </span>
                Tax-efficient wealth scaling
              </li>
            </ol>
            <Link
              href="/start-here"
              className="mt-6 block text-center text-sm font-semibold text-[var(--accent)] no-underline hover:underline"
            >
              See the full roadmap →
            </Link>
          </div>
          <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3">
            <p className="text-2xl font-bold text-[var(--accent)]">$2.1M+</p>
            <p className="text-xs text-[var(--muted)]">reader-reported progress</p>
          </div>
        </div>
      </div>
    </section>
  );
}
