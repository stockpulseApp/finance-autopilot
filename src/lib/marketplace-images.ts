/** Category & offer imagery (Unsplash) for marketplace-style cards */
export const CATEGORY_IMAGES: Record<string, string> = {
  "personal-finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  investing: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  crypto: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
  "real-estate": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  "credit-cards": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  debt: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  taxes: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  "side-income": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
  retirement: "https://images.unsplash.com/photo-1478737270239-2f1bfc3f6f0b?w=800&q=80",
  insurance: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  mindset: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
};

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1600&q=80";

export function getCategoryImage(category: string) {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.investing;
}
