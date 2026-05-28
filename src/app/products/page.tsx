import Link from "next/link";
import { getProducts } from "@/lib/products";

export const metadata = { title: "Products" };

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="space-y-12">
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold">Digital Products</h1>
        <p className="mt-3 text-[var(--muted)]">
          Premium money systems, templates, and trainings designed to accelerate wealth building.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6"
          >
            <p className="text-xs uppercase text-[var(--muted)]">{product.type}</p>
            <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{product.headline}</p>
            <p className="mt-4 text-3xl font-bold">${product.price}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">Delivery: {product.delivery}</p>
            {product.checkoutUrl?.startsWith("https://buy.stripe.com/") ? (
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black no-underline"
              >
                Buy now
              </a>
            ) : product.type === "service" ? (
              <a
                href={product.checkoutUrl ?? "/newsletter"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black no-underline"
              >
                Book now
              </a>
            ) : (
              <form action="/api/product-checkout" method="POST" className="mt-5">
                <input type="hidden" name="productSlug" value={product.slug} />
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black"
                >
                  Buy now
                </button>
              </form>
            )}
          </article>
        ))}
      </section>

      <section>
        <Link href="/start-here" className="text-sm">
          New here? Start with the money machine roadmap {"->"}
        </Link>
      </section>
    </div>
  );
}
