import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { TrustStrip } from "@/components/marketplace/TrustStrip";
import { affiliateDisclosure, getAffiliatePrograms } from "@/lib/affiliates";

export const metadata = { title: "Compare Money Deals" };

export default function DealsPage() {
  const programs = getAffiliatePrograms();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-[var(--primary)] px-6 py-10 text-white md:px-10">
        <h1 className="text-3xl font-extrabold md:text-4xl">Compare money deals</h1>
        <p className="mt-3 max-w-2xl text-blue-100">
          Side-by-side offers for cards, brokers, apps, and insurance — sorted so you
          find the best fit fast, like shopping flights on Expedia.
        </p>
        <p className="mt-4 text-xs text-blue-200">{affiliateDisclosure}</p>
      </div>

      <TrustStrip />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--muted)]">
          Showing <strong className="text-[var(--foreground)]">{programs.length}</strong>{" "}
          results
        </p>
        <select className="rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold">
          <option>Sort: Recommended</option>
          <option>Sort: Highest rated</option>
          <option>Sort: Free offers first</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p, i) => (
          <DealOfferCard
            key={p.id}
            program={p}
            source="deals-page"
            badge={i < 2 ? "Editor's pick" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
