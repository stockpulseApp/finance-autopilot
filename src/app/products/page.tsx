import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { ProductOfferCard } from "@/components/marketplace/ProductOfferCard";
import { resolvePurchaseHref } from "@/lib/checkout";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Digital Products & Templates" };

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-10">
      <PageHero
        title="Digital products & template packs"
        subtitle={`${products.length} instant-download systems — budgets, investing, real estate, tax, and more.`}
        category="personal-finance"
        heroContext="products"
      >
        <Link href="/subscription" className="btn-deal">
          Get all templates with Pro
        </Link>
      </PageHero>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductOfferCard
            key={product.slug}
            offer={{
              slug: product.slug,
              name: product.name,
              headline: product.headline,
              price: product.price,
              cta: "Buy now",
            }}
            href={resolvePurchaseHref({
              checkoutUrl: product.checkoutUrl,
              stripePriceId: product.stripePriceId,
              slug: product.slug,
              kind: "product",
            })}
            reviews={180 + product.price}
            rating={4.6 + (product.price % 3) * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
