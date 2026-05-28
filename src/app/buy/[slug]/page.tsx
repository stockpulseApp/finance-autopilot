import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { PageHero } from "@/components/marketplace/PageHero";

export async function generateStaticParams() {
  const { getProducts } = await import("@/lib/products");
  return getProducts()
    .filter((p) => p.stripePriceId && !p.stripePriceId.includes("REPLACE"))
    .map((p) => ({ slug: p.slug }));
}

export default async function BuyProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <PageHero
        title={product.name}
        subtitle={product.headline}
        category="personal-finance"
      />
      <div className="marketplace-card p-6">
        <p className="text-3xl font-extrabold text-[var(--primary)]">${product.price}</p>
        <p className="mt-2 text-[var(--muted)]">{product.description}</p>
        <form action="/api/product-checkout" method="POST" className="mt-6">
          <input type="hidden" name="productSlug" value={product.slug} />
          <button type="submit" className="btn-deal w-full">
            Continue to secure checkout
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-[var(--muted)]">
          Powered by Stripe · {product.delivery}
        </p>
      </div>
    </div>
  );
}
