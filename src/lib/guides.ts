import guides from "../../config/guides.json";

export type Guide = {
  slug: string;
  title: string;
  type: "free" | "paid";
  price: number;
  pages: number;
  description: string;
  downloadUrl?: string;
  checkoutUrl?: string;
  category: string;
};

export function getGuides(): Guide[] {
  return guides.guides as Guide[];
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getGuides().find((g) => g.slug === slug);
}
