import { getProducts } from "@/lib/products";

export function StickyOfferBar() {
  const products = getProducts();
  const featured =
    products.find((p) => p.checkoutUrl?.startsWith("https://buy.stripe.com/")) ??
    products[0];

  if (!featured) return null;

  const href = featured.checkoutUrl ?? "/products";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--card)]/95 p-3 md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--muted)]">Featured offer</p>
          <p className="text-sm font-semibold">{featured.name}</p>
        </div>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black no-underline"
        >
          Buy now
        </a>
      </div>
    </div>
  );
}
