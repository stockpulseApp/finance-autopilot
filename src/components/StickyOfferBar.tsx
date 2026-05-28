import { getProducts } from "@/lib/products";

export function StickyOfferBar() {
  const products = getProducts();
  const featured =
    products.find((p) => p.checkoutUrl?.startsWith("https://buy.stripe.com/")) ??
    products[0];

  if (!featured) return null;

  const href = featured.checkoutUrl ?? "/products";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-white p-3 shadow-lg md:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase text-[var(--cta)]">Deal ending soon</p>
          <p className="text-sm font-bold line-clamp-1">{featured.name}</p>
          <p className="text-xs font-bold text-[var(--primary)]">From ${featured.price}</p>
        </div>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="btn-deal shrink-0 text-xs"
        >
          Book now
        </a>
      </div>
    </div>
  );
}
