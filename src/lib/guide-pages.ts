import fs from "fs";
import path from "path";
import matter from "gray-matter";
import catalog from "../../config/guides.json";
import ctaMap from "../../config/guide-cta-map.json";

const GUIDES_DIR = path.join(process.cwd(), "content", "guide-pages");

export type GuidePageMeta = {
  slug: string;
  title: string;
  type: "free" | "paid";
  price: number;
  pages: number;
  description: string;
  category: string;
  paidUpgrade?: { slug: string; title: string; price: number };
};

export type GuidePage = GuidePageMeta & {
  content: string;
  isPreview: boolean;
};

function catalogEntry(slug: string) {
  return catalog.guides.find((g) => g.slug === slug);
}

export function getGuidePageSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return catalog.guides.map((g) => g.slug);
  const fromDisk = fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
  const all = new Set([...catalog.guides.map((g) => g.slug), ...fromDisk]);
  return [...all];
}

export function getGuidePage(slug: string): GuidePage | null {
  const entry = catalogEntry(slug);
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    if (!entry) return null;
    return {
      slug,
      title: entry.title,
      type: entry.type as "free" | "paid",
      price: entry.price,
      pages: entry.pages,
      description: entry.description,
      category: entry.category,
      content: "",
      isPreview: entry.type === "paid",
    };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const category = String(data.category ?? entry?.category ?? "personal-finance");
  const cta = (ctaMap as Record<string, { paidSlug: string; paidTitle: string; paidPrice: number }>)[
    category
  ];

  return {
    slug,
    title: String(data.title ?? entry?.title ?? slug),
    type: (data.type as "free" | "paid") ?? entry?.type ?? "free",
    price: Number(data.price ?? entry?.price ?? 0),
    pages: Number(data.pages ?? entry?.pages ?? 0),
    description: String(data.description ?? entry?.description ?? ""),
    category,
    content,
    isPreview: Boolean(data.isPreview ?? entry?.type === "paid"),
    paidUpgrade:
      data.paidUpgradeSlug || cta
        ? {
            slug: String(data.paidUpgradeSlug ?? cta?.paidSlug),
            title: String(data.paidUpgradeTitle ?? cta?.paidTitle),
            price: Number(data.paidUpgradePrice ?? cta?.paidPrice),
          }
        : undefined,
  };
}
