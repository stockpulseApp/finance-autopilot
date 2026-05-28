import Link from "next/link";
import { isValidStripePaymentLink, resolvePurchaseHref } from "@/lib/checkout";
import type { GuidePage } from "@/lib/guide-pages";

export function GuideUpgrade({
  guide,
  checkoutUrl,
}: {
  guide: GuidePage;
  checkoutUrl?: string;
}) {
  if (guide.type === "free" && guide.paidUpgrade) {
    return (
      <aside className="mt-12 rounded-2xl border-2 border-[var(--primary)] bg-[var(--primary-light)] p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--primary)]">
          Ready for the next step
        </p>
        <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
          {guide.paidUpgrade.title}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This free guide gets you moving. The paid kit adds worksheets, comparison tables, and
          step-by-step checklists you can use before every decision.
        </p>
        <Link
          href={`/guides/${guide.paidUpgrade.slug}`}
          className="btn-deal mt-4 inline-block no-underline"
        >
          See {guide.paidUpgrade.title} — ${guide.paidUpgrade.price}
        </Link>
      </aside>
    );
  }

  if (guide.type === "paid" && guide.isPreview) {
    const href = resolvePurchaseHref({
      checkoutUrl,
      slug: guide.slug,
      kind: "guide",
    });
    const external = isValidStripePaymentLink(checkoutUrl);

    return (
      <aside
        id="purchase"
        className="mt-12 rounded-2xl border-2 border-[var(--accent)] bg-[#fff8f0] p-6 md:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent)]">
          Full guide
        </p>
        <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
          Unlock all {guide.pages} pages — ${guide.price}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Broker matrices, allocation templates, tax-location primer, and printable checklists.
        </p>
        {external && checkoutUrl ? (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-deal mt-4 inline-block"
          >
            Purchase — ${guide.price}
          </a>
        ) : (
          <Link href={href} className="btn-deal mt-4 inline-block no-underline">
            Join waitlist for launch
          </Link>
        )}
      </aside>
    );
  }

  return null;
}
