import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { WealthPath } from "@/components/home/WealthPath";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { getFeaturedAffiliates } from "@/lib/affiliates";

export const metadata = { title: "Start Here — Your Wealth Roadmap" };

const quickWins = [
  { title: "Audit your money in 60 minutes", detail: "Export 90 days of transactions, tag leaks, set a cancellation list." },
  { title: "Automate your survival number", detail: "Split direct deposit: bills → savings → spending." },
  { title: "Open your investing lane", detail: "Brokerage + IRA checklist and first automated buy." },
];

export default function StartHerePage() {
  const deals = getFeaturedAffiliates().slice(0, 3);

  return (
    <div className="space-y-12">
      <PageHero
        title="Start here: your wealth comparison journey"
        subtitle="Pick a roadmap, compare tools like you'd compare travel deals, then execute with templates or Pro automation."
        category="personal-finance"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/deals" className="btn-deal">
            Compare deals now
          </Link>
          <Link href="/subscription" className="rounded-lg border-2 border-white px-5 py-2 font-bold text-white no-underline">
            Go Pro — daily AI guides
          </Link>
        </div>
      </PageHero>

      <WealthPath />

      <section>
        <h2 className="text-xl font-extrabold">Quick wins — week one</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {quickWins.map((item, i) => (
            <div key={item.title} className="marketplace-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary-light)] text-sm font-bold text-[var(--primary)]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-extrabold">Recommended tools to compare</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {deals.map((d) => (
            <DealOfferCard key={d.id} program={d} source="start-here" />
          ))}
        </div>
      </section>
    </div>
  );
}
