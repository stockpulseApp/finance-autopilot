import Image from "next/image";
import Link from "next/link";
import { getCategoryImage } from "@/lib/marketplace-images";
import type { Guide } from "@/lib/guides";
import { isValidStripePaymentLink, resolvePurchaseHref } from "@/lib/checkout";

export function GuideCard({ guide }: { guide: Guide }) {
  const image = getCategoryImage(guide.category);
  const isFree = guide.type === "free";
  const paidHref = resolvePurchaseHref({
    checkoutUrl: guide.checkoutUrl,
    slug: guide.slug,
    kind: "guide",
  });
  const paidExternal = isValidStripePaymentLink(guide.checkoutUrl);

  return (
    <article className="marketplace-card flex h-full flex-col">
      <div className="relative h-44 w-full">
        <Image src={image} alt="" fill className="object-cover" sizes="320px" />
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
          <Link
            href={guide.downloadUrl ?? "/newsletter"}
            className="btn-outline mt-4 text-center"
          >
            Download free
          </Link>
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
          <Link href={paidHref} className="btn-deal mt-4 text-center no-underline">
            {paidHref.includes("newsletter") ? "Join waitlist" : "Get guide"} — ${guide.price}
          </Link>
        )}
      </div>
    </article>
  );
}
