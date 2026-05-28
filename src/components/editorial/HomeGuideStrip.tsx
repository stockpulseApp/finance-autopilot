import Link from "next/link";
import { getGuides } from "@/lib/guides";

const FEATURED_SLUGS = [
  "30-day-wealth-sprint",
  "emergency-fund-blueprint",
  "index-fund-starter-kit",
];

export function HomeGuideStrip() {
  const guides = getGuides().filter((g) => FEATURED_SLUGS.includes(g.slug));

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold">Free playbooks that sell themselves</h2>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">
            Full guides on-site — day-by-day plans, worksheets, and clear upgrades to premium
            kits. No fluff PDFs.
          </p>
        </div>
        <Link href="/guides" className="shrink-0 text-sm font-bold text-[var(--primary)] no-underline">
          All downloads →
        </Link>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug} className="rounded-xl border border-[var(--border)] p-5">
            <span
              className={`rounded px-2 py-0.5 text-xs font-bold ${
                g.type === "free" ? "bg-[#e6f4ea] text-[var(--success)]" : "badge-hot"
              }`}
            >
              {g.type === "free" ? "Free" : `$${g.price}`}
            </span>
            <h3 className="mt-2 font-bold">{g.title}</h3>
            <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{g.description}</p>
            <Link
              href={`/guides/${g.slug}`}
              className="mt-3 inline-block text-sm font-bold text-[var(--primary)] no-underline"
            >
              {g.type === "free" ? "Read free →" : "Read preview →"}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
