import affiliatesConfig from "../../config/affiliates.json";
import type { AffiliateProgram } from "./types";

export const affiliateDisclosure: string = affiliatesConfig.disclosure;

export function getAffiliatePrograms(): AffiliateProgram[] {
  return affiliatesConfig.programs as AffiliateProgram[];
}

export function getFeaturedAffiliates(): AffiliateProgram[] {
  return getAffiliatePrograms().filter((p) => p.featured);
}

export function getAffiliatesByCategory(category: string): AffiliateProgram[] {
  return getAffiliatePrograms().filter((p) => p.category === category);
}

export function getAffiliatesByIds(ids: string[]): AffiliateProgram[] {
  const set = new Set(ids);
  return getAffiliatePrograms().filter((p) => set.has(p.id));
}

export function withAffiliateParams(url: string, source: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "finance-autopilot");
    u.searchParams.set("utm_medium", "affiliate");
    u.searchParams.set("utm_campaign", source);
    return u.toString();
  } catch {
    return url;
  }
}
