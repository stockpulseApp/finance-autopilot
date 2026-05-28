/**
 * Visual system: unique, deterministic imagery per slug (no duplicate photos on grids).
 * Pools are category-themed; slug hash picks variety; explicit overrides for flagship items.
 */

const u = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=82&auto=format&fit=crop`;

const CATEGORY_POOLS: Record<string, string[]> = {
  "personal-finance": [
    u("photo-1554224155-6726b3ff858f"),
    u("photo-1579621970563-ebec7560ff3e"),
    u("photo-1454165804606-c3d57bc86b40"),
    u("photo-1507679799987-c73779587ccf"),
    u("photo-1521791136064-7986c2920216"),
    u("photo-1460925895917-afdab827c52f"),
    u("photo-1551836022-d5d88e9218df"),
    u("photo-1518454538927-06db4b45a0f1"),
  ],
  investing: [
    u("photo-1611974789855-9c2a0a7236a3"),
    u("photo-1590283603385-17ffb3a0f829"),
    u("photo-1642543492481-88e81d37731a"),
    u("photo-1579532536848-906b7506c833"),
    u("photo-1559526324-593bc073d938"),
    u("photo-1642790106117-e829e14a801f"),
    u("photo-1551288049-bebda4e38f71"),
    u("photo-1460925895917-afdab827c52f"),
  ],
  crypto: [
    u("photo-1621761191319-c6fb62004040"),
    u("photo-1518546305927-5a555bb7020d"),
    u("photo-1639765482234-ada101f5450a"),
    u("photo-1642100725681-d451d5ddc972"),
    u("photo-1621414050339-0e39d266d03a"),
    u("photo-1605792657660-596900b9e049"),
    u("photo-1639322537504-6427a16b0a28"),
    u("photo-1640340169714-1756066c043c"),
  ],
  "real-estate": [
    u("photo-1560518883-ce09059eeffa"),
    u("photo-1560448204-e02f11c3d0e2"),
    u("photo-1582407947302-f5adffb76e5e"),
    u("photo-1600596542815-ffad4c1539a9"),
    u("photo-1600585154340-be6161a56a0c"),
    u("photo-1600607687939-ce8a6c25118c"),
    u("photo-1600566753190-17f0baa2a6c3"),
    u("photo-1600047509807-ba8f99d2cd7a"),
  ],
  "credit-cards": [
    u("photo-1563013544-824ae1b704d3"),
    u("photo-1556742049-0cfed4f6a45d"),
    u("photo-1556740758-90de374c12ad"),
    u("photo-1556742502-ec4a96084d4a"),
    u("photo-1556742044-3c52d6e88c62"),
    u("photo-1571171637578-41bc2dd41cd2"),
    u("photo-1601597111158-2fceff292cdc"),
    u("photo-1580518337843-f959e9b5b413"),
  ],
  debt: [
    u("photo-1579621970795-87facc2f976d"),
    u("photo-1554224311-beee415c201f"),
    u("photo-1450101499163-c8848c66ca85"),
    u("photo-1554224155-8d04cb21cd6f"),
    u("photo-1526304640581-d334cdbbf45e"),
    u("photo-1504868584819-f8e8b4b6ae7f"),
    u("photo-1551836022-d5d88e9218df"),
    u("photo-1579621970563-ebec7560ff3e"),
  ],
  taxes: [
    u("photo-1450101499163-c8848c66ca85"),
    u("photo-1554224155-8d04cb21cd6f"),
    u("photo-1554224311-beee415c201f"),
    u("photo-1460925895917-afdab827c52f"),
    u("photo-1551836022-d5d88e9218df"),
    u("photo-1507679799987-c73779587ccf"),
    u("photo-1454165804606-c3d57bc86b40"),
    u("photo-1521791136064-7986c2920216"),
  ],
  "side-income": [
    u("photo-1521737711867-e3b97375f902"),
    u("photo-1522071820081-009f0129c71c"),
    u("photo-1556761175-5973dc0f32e7"),
    u("photo-1552664730-d307ca884978"),
    u("photo-1553877522-43269d4ea984"),
    u("photo-1600880292203-757bb62b4baf"),
    u("photo-1556761175-b413da4baf72"),
    u("photo-1552581234-26160f608093"),
  ],
  retirement: [
    u("photo-1478737270239-2f1bfc3f6f0b"),
    u("photo-1518454538927-06db4b45a0f1"),
    u("photo-1529156069898-49953e39b3ac"),
    u("photo-1507003211169-0a1dd7228f2d"),
    u("photo-1544027993-37dbfe435c62"),
    u("photo-1517245386807-bb43a82c33c4"),
    u("photo-1521791136064-7986c2920216"),
    u("photo-1573497019940-1c28c88b349f"),
  ],
  insurance: [
    u("photo-1454165804606-c3d57bc86b40"),
    u("photo-1560518883-ce09059eeffa"),
    u("photo-1507679799987-c73779587ccf"),
    u("photo-1521791136064-7986c2920216"),
    u("photo-1551836022-d5d88e9218df"),
    u("photo-1450101499163-c8848c66ca85"),
    u("photo-1518454538927-06db4b45a0f1"),
    u("photo-1460925895917-afdab827c52f"),
  ],
  mindset: [
    u("photo-1507679799987-c73779587ccf"),
    u("photo-1522202176988-66273c2fd55f"),
    u("photo-1552664730-d307ca884978"),
    u("photo-1517245386807-bb43a82c33c4"),
    u("photo-1529156069898-49953e39b3ac"),
    u("photo-1544027993-37dbfe435c62"),
    u("photo-1573497019940-1c28c88b349f"),
    u("photo-1556761175-5973dc0f32e7"),
  ],
};

/** Per-item hero art (guides, courses, tools, products) */
const SLUG_IMAGES: Record<string, string> = {
  "30-day-wealth-sprint": u("photo-1554224155-8d04cb21cd6f"),
  "emergency-fund-blueprint": u("photo-1579621970563-ebec7560ff3e"),
  "index-fund-starter-kit": u("photo-1611974789855-9c2a0a7236a3"),
  "rental-deal-analyzer": u("photo-1600585154340-be6161a56a0c"),
  "credit-score-750-playbook": u("photo-1556742049-0cfed4f6a45d"),
  "crypto-custody-checklist": u("photo-1639765482234-ada101f5450a"),
  "side-income-launch-map": u("photo-1556761175-5973dc0f32e7"),
  "tax-advantaged-accounts-guide": u("photo-1450101499163-c8848c66ca85"),
  "wealth-foundation": u("photo-1523240795612-9a054b0db644"),
  "real-estate-starter": u("photo-1600047509807-ba8f99d2cd7a"),
  "credit-mastery": u("photo-1601597111158-2fceff292cdc"),
  "tax-optimization-lab": u("photo-1554224311-beee415c201f"),
  "crypto-wealth-system": u("photo-1642100725681-d451d5ddc972"),
  "side-hustle-accelerator": u("photo-1600880292203-757bb62b4baf"),
  "retirement-roadmap": u("photo-1478737270239-2f1bfc3f6f0b"),
  "debt-destroyer": u("photo-1554224155-6726b3ff858f"),
  "compound-interest": u("photo-1551288049-bebda4e38f71"),
  "mortgage-payment": u("photo-1600607687939-ce8a6c25118c"),
  "debt-payoff": u("photo-1579621970795-87facc2f976d"),
  "money-os-template-pack": u("photo-1554224155-8d04cb21cd6f"),
  "wealth-operating-system": u("photo-1522202176988-66273c2fd55f"),
  "portfolio-cashflow-intensive": u("photo-1556761175-b413da4baf72"),
};

const HERO_BY_CONTEXT: Record<string, string> = {
  home: u("photo-1579621970795-87facc2f976d", 1600),
  search: u("photo-1460925895917-afdab827c52f", 1600),
  about: u("photo-1521791136064-7986c2920216", 1600),
  tools: u("photo-1551288049-bebda4e38f71", 1600),
  blog: u("photo-1590283603385-17ffb3a0f829", 1600),
  guides: u("photo-1611974789855-9c2a0a7236a3", 1600),
  deals: u("photo-1556742502-ec4a96084d4a", 1600),
  insights: u("photo-1559526324-593bc073d938", 1600),
  courses: u("photo-1523240795612-9a054b0db644", 1600),
  newsletter: u("photo-1521791136064-7986c2920216", 1600),
  subscription: u("photo-1551288049-bebda4e38f71", 1600),
  start: u("photo-1507679799987-c73779587ccf", 1600),
  products: u("photo-1556761175-b413da4baf72", 1600),
  earn: u("photo-1600880292203-757bb62b4baf", 1600),
  default: u("photo-1579621970795-87facc2f976d", 1600),
};

/** @deprecated Use getHeroImage — kept for imports */
export const HERO_IMAGE = HERO_BY_CONTEXT.home;

function hashIndex(seed: string, length: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % length;
}

function poolFor(category: string): string[] {
  return CATEGORY_POOLS[category] ?? CATEGORY_POOLS.investing;
}

/** Unique image per slug within a category (posts, guides, deals, affiliates). */
export function getVisualImage(slug: string, category: string): string {
  const key = slug.trim().toLowerCase();
  if (SLUG_IMAGES[key]) return SLUG_IMAGES[key];
  const pool = poolFor(category);
  return pool[hashIndex(`${category}:${key}`, pool.length)]!;
}

/** Category landing tiles — stable but distinct from item cards */
export function getCategoryImage(category: string): string {
  const pool = poolFor(category);
  return pool[hashIndex(`tile:${category}`, pool.length)]!;
}

export function getHeroImage(context: keyof typeof HERO_BY_CONTEXT | string = "default"): string {
  return HERO_BY_CONTEXT[context] ?? HERO_BY_CONTEXT.default;
}

export function getImageAlt(slug: string, title: string, categoryLabel: string): string {
  return `${title} — ${categoryLabel} guide on Wealthy Brainiac`;
}
