import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";

const PRODUCT_IMAGES: Record<string, string> = {
  "money-os-template-pack":
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6f?w=800&q=80",
  "wealth-operating-system":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
  "portfolio-cashflow-intensive":
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
  "wealth-foundation":
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  "real-estate-starter":
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  "credit-mastery":
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
};

export type MarketplaceOffer = {
  slug: string;
  name: string;
  headline: string;
  price: number;
  wasPrice?: number;
  cta?: string;
};

export function ProductOfferCard({
  offer,
  href,
  reviews = 340,
  rating = 4.8,
}: {
  offer: MarketplaceOffer;
  href: string;
  reviews?: number;
  rating?: number;
}) {
  const image =
    PRODUCT_IMAGES[offer.slug] ??
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80";
  const isExternal = href.startsWith("http");
  const was = offer.wasPrice ?? Math.round(offer.price * 1.4);

  const cta = (
    <span className="btn-deal">{offer.cta ?? "Book now"}</span>
  );

  return (
    <article className="marketplace-card flex h-full flex-col">
      <div className="relative h-48 w-full">
        <Image src={image} alt="" fill className="object-cover" sizes="33vw" />
        <span className="badge-deal absolute right-3 top-3">Top rated</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <StarRating rating={rating} reviews={reviews} />
        <p className="mt-3 flex-1 text-sm text-[var(--muted)]">{offer.headline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <div>
            <p className="text-xs text-[var(--muted)] line-through">Was ${was}</p>
            <p className="text-2xl font-bold text-[var(--primary)]">
              ${offer.price}
              <span className="text-sm font-normal text-[var(--muted)]"> total</span>
            </p>
          </div>
          {isExternal ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="shrink-0">
              {cta}
            </a>
          ) : (
            <Link href={href} className="shrink-0 no-underline">
              {cta}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
