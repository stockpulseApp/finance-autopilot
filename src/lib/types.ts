export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
  featured?: boolean;
  affiliateIds?: string[];
  content: string;
};

export type AffiliateProgram = {
  id: string;
  name: string;
  category: string;
  description: string;
  cta: string;
  url: string;
  featured?: boolean;
};

export type Course = {
  slug: string;
  title: string;
  price: number;
  currency: string;
  level: string;
  modules: number;
  description: string;
  outcomes: string[];
  stripePriceId: string;
};

export type DigitalProduct = {
  slug: string;
  name: string;
  type: "template" | "course" | "service";
  price: number;
  headline: string;
  description: string;
  delivery: string;
  checkoutUrl: string;
};
