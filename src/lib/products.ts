import productsConfig from "../../config/products.json";
import type { DigitalProduct } from "./types";

export function getProducts(): DigitalProduct[] {
  return productsConfig.products as DigitalProduct[];
}

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return getProducts().find((p) => p.slug === slug);
}
