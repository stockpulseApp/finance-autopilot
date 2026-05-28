import { getProducts } from "@/lib/products";

export function StickyOfferBar() {
  const products = getProducts();
  const featured =
    products.find((p) => p.checkoutUrl?.startsWith("https://buy.stripe.com/")) ??
    products[0];

  if (!featured) return null;

  const href = featured.checkoutUrl ?? "/products";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-500/30 bg-[var(--card)]/95 p-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
            Featured
          </p>
          <p className="text-sm font-semibold line-clamp-1">{featured.name}</p>
        </div>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="btn-primary shrink-0 px-4 py-2 text-xs"
        >
          Get access
        </a>
      </div>
    </div>
  );
}
