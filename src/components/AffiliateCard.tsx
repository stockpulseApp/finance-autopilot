import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import type { AffiliateProgram } from "@/lib/types";

export function AffiliateCard({
  program,
  source = "deals-page",
}: {
  program: AffiliateProgram;
  source?: string;
}) {
  return <DealOfferCard program={program} source={source} />;
}
