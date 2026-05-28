import affiliatesConfig from "../../config/affiliates.json";
import overridesConfig from "../../config/affiliate-overrides.json";
import type { AffiliateProgram } from "./types";
import { isBrokenLink } from "./checkout";

export const affiliateDisclosure: string = affiliatesConfig.disclosure;

const overrides = overridesConfig.overrides as Record<string, string>;

export function getAffiliatePrograms(): AffiliateProgram[] {
  return affiliatesConfig.programs as AffiliateProgram[];
}

function amazonTagUrl(tag: string, source: string): string {
  const base = `https://www.amazon.com/?tag=${encodeURIComponent(tag)}`;
  return withAffiliateParams(base, source);
}

/** Outbound URL for visitors — override > env tag > destination > never example.com */
export function getAffiliateOutboundUrl(
  program: AffiliateProgram,
  source = "site",
): string {
  const override = overrides[program.id]?.trim();
  if (override && !isBrokenLink(override)) {
    return withAffiliateParams(override, source);
  }

  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim();
  if (program.id === "amazon-associates" && amazonTag) {
    return amazonTagUrl(amazonTag, source);
  }

  const base = isBrokenLink(program.url)
    ? program.affiliateSignupUrl ?? program.url
    : program.url;

  return withAffiliateParams(base, source);
}

/** Short internal link that redirects with tracking (use in UI) */
export function getAffiliateGoPath(programId: string, source = "site"): string {
  const q = new URLSearchParams({ source });
  return `/go/${programId}?${q.toString()}`;
}

export function getFeaturedAffiliates(): AffiliateProgram[] {
  const all = getAffiliatePrograms();
  const featured = all.filter((p) => p.featured);
  if (featured.length >= 6) return featured;
  const rest = all.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, 12);
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
    u.searchParams.set("utm_source", "dunriteglobal");
    u.searchParams.set("utm_medium", "affiliate");
    u.searchParams.set("utm_campaign", source);
    return u.toString();
  } catch {
    return url;
  }
}

export function getAffiliateProgramById(id: string): AffiliateProgram | undefined {
  return getAffiliatePrograms().find((p) => p.id === id);
}
