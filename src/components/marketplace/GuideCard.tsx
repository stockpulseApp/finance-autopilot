import Image from "next/image";
import Link from "next/link";
import { getImageAlt, getVisualImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import type { Guide } from "@/lib/guides";
import { isValidStripePaymentLink, resolvePurchaseHref } from "@/lib/checkout";

export function GuideCard({ guide }: { guide: Guide }) {
  const cat = getCategoryMeta(guide.category);
  const image = getVisualImage(guide.slug, guide.category);
  const imageAlt = getImageAlt(guide.slug, guide.title, cat.label);
  const isFree = guide.type === "free";
  const paidHref = resolvePurchaseHref({
    checkoutUrl: guide.checkoutUrl,
    slug: guide.slug,
    kind: "guide",
  });
  const paidExternal = isValidStripePaymentLink(guide.checkoutUrl);

  return (
    <article className="marketplace-card group flex h-full flex-col">
      <div className="relative h-44 w-full">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="320px"
        />
        <span
          className={`absolute left-3 top-3 rounded px-2 py-0.5 text-xs font-bold ${
            isFree ? "bg-[#e6f4ea] text-[var(--success)]" : "badge-hot"
          }`}
        >
          {isFree ? "Free PDF" : `$${guide.price}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase text-[var(--muted)]">
          {guide.pages} pages · {guide.category.replace(/-/g, " ")}
        </p>
        <h3 className="mt-2 text-lg font-bold">{guide.title}</h3>
        <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{guide.description}</p>
        {isFree ? (
          <div className="mt-4 flex flex-col gap-2">
            <Link href={`/guides/${guide.slug}`} className="btn-deal text-center no-underline">
              Read free guide
            </Link>
            {guide.downloadUrl && guide.downloadUrl.startsWith("/lead-magnets") && (
              <a href={guide.downloadUrl} className="btn-outline text-center text-sm" download>
                Download checklist
              </a>
            )}
          </div>
        ) : paidExternal ? (
          <a
            href={paidHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deal mt-4 text-center"
          >
            Get guide — ${guide.price}
          </a>
        ) : (
          <div className="mt-4 flex flex-col gap-2">
            <Link href={`/guides/${guide.slug}`} className="btn-outline text-center no-underline">
              Read preview
            </Link>
            <Link href={paidHref} className="btn-deal text-center no-underline">
              {paidHref.includes("newsletter") ? "Join waitlist" : "Get guide"} — ${guide.price}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
