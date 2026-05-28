export type PostSource = {
  title: string;
  url: string;
  outlet: string;
};

export type SocialQuote = {
  paraphrase: string;
  url: string;
  attribution: string;
};

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
  sources?: PostSource[];
  socialQuotes?: SocialQuote[];
  content: string;
};

export type AffiliateProgram = {
  id: string;
  name: string;
  category: string;
  description: string;
  cta: string;
  url: string;
  affiliateSignupUrl?: string;
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
  checkoutUrl?: string;
};

export type DigitalProduct = {
  slug: string;
  name: string;
  type: "template" | "course" | "service";
  price: number;
  headline: string;
  description: string;
  delivery: string;
  checkoutUrl?: string;
  stripePriceId?: string;
};
