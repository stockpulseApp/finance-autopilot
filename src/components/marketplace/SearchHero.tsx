import Link from "next/link";
import Image from "next/image";
import { getHeroImage } from "@/lib/marketplace-images";
import site from "../../../config/site.json";

const quickGoals = [
  { label: "Investing", href: "/categories/investing" },
  { label: "Credit cards", href: "/categories/credit-cards" },
  { label: "Real estate", href: "/categories/real-estate" },
  { label: "Side income", href: "/categories/side-income" },
  { label: "Debt payoff", href: "/categories/debt" },
  { label: "Retirement", href: "/categories/retirement" },
];

export function SearchHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--primary)] shadow-lg">
      <div className="absolute inset-0 opacity-30">
        <Image src={getHeroImage("search")} alt="" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/95 to-[var(--primary)]/80" />

      <div className="relative px-6 py-10 md:px-12 md:py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
          Compare. Save. Build wealth.
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          Find the best money tools &amp; deals — in one place
        </h1>
        <p className="mt-3 max-w-xl text-base text-blue-100 md:text-lg">
          Like the top travel sites, we compare investing apps, cards, courses, and
          wealth programs so you pick the winner — not the hype.
        </p>

        {/* Search bar — travel-site pattern */}
        <div className="mt-8 max-w-3xl rounded-xl bg-white p-2 shadow-xl md:p-3">
          <form action="/deals" method="get" className="flex flex-col gap-2 md:flex-row md:items-center">
            <label className="flex-1 px-2">
              <span className="text-xs font-bold uppercase text-[var(--muted)]">
                I want to
              </span>
              <select
                name="category"
                defaultValue=""
                className="mt-1 w-full border-0 bg-transparent text-base font-semibold text-[var(--foreground)] focus:outline-none focus:ring-0"
              >
                <option value="">Compare all deals &amp; tools</option>
                <option value="investing">Start / grow investing</option>
                <option value="credit-cards">Optimize credit &amp; rewards</option>
                <option value="real-estate">Invest in real estate</option>
                <option value="personal-finance">Fix my budget</option>
                <option value="debt">Pay off debt faster</option>
              </select>
            </label>
            <div className="hidden h-10 w-px bg-[var(--border)] md:block" aria-hidden />
            <label className="flex-1 px-2">
              <span className="text-xs font-bold uppercase text-[var(--muted)]">
                Goal
              </span>
              <select
                className="mt-1 w-full border-0 bg-transparent text-base font-semibold text-[var(--foreground)] focus:outline-none"
                defaultValue="save"
              >
                <option value="save">Save the most money</option>
                <option value="earn">Earn more income</option>
                <option value="invest">Build long-term wealth</option>
              </select>
            </label>
            <button type="submit" className="btn-deal w-full px-8 py-4 text-base md:w-auto">
              Search deals
            </button>
          </form>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-blue-100">Popular:</span>
          {quickGoals.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium text-white no-underline backdrop-blur hover:bg-white/20"
            >
              {g.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
