import { AffiliateCard } from "@/components/AffiliateCard";
import { affiliateDisclosure, getAffiliatePrograms } from "@/lib/affiliates";

export const metadata = { title: "Deals & Recommendations" };

export default function DealsPage() {
  const programs = getAffiliatePrograms();

  return (
    <div>
      <h1 className="text-3xl font-bold">Deals & tools we recommend</h1>
      <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl">{affiliateDisclosure}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <AffiliateCard key={p.id} program={p} />
        ))}
      </div>
      <p className="mt-10 text-sm text-[var(--muted)]">
        Replace URLs in <code>config/affiliates.json</code> with your real affiliate links from
        networks like Impact, CJ, ShareASale, or direct programs.
      </p>
    </div>
  );
}
