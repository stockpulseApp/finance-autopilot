import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/courses";
import { getProductBySlug } from "@/lib/products";

const upsellByOffer: Record<string, { title: string; href: string }> = {
  "wealth-foundation": {
    title: "Upgrade: Wealth Operating System",
    href: "/products",
  },
  "real-estate-starter": {
    title: "Next step: Portfolio & Cashflow Intensive",
    href: "/products",
  },
  "credit-mastery": {
    title: "Next step: Money OS Template Pack",
    href: "/products",
  },
  "money-os-template-pack": {
    title: "Next step: Wealth Operating System",
    href: "/products",
  },
  "wealth-operating-system": {
    title: "Next step: Portfolio & Cashflow Intensive",
    href: "/products",
  },
};

export default async function OfferThankYouPage({
  params,
}: {
  params: Promise<{ offer: string }>;
}) {
  const { offer } = await params;
  const course = getCourseBySlug(offer);
  const product = getProductBySlug(offer);
  const label = course?.title ?? product?.name;
  if (!label) notFound();

  const upsell = upsellByOffer[offer] ?? {
    title: "See all premium offers",
    href: "/products",
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
      <p className="text-sm uppercase tracking-wide text-[var(--accent)]">Thank you</p>
      <h1 className="mt-2 text-3xl font-bold">{label}</h1>
      <p className="mt-4 text-[var(--muted)]">
        Your purchase is confirmed. Check your email for access details and next steps.
      </p>

      <div className="mt-6 rounded-lg border border-[var(--border)] bg-[#0f1520] p-4">
        <p className="text-sm font-semibold">{upsell.title}</p>
        <Link href={upsell.href} className="mt-2 inline-block text-sm text-[var(--accent)]">
          Continue {"->"}
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/start-here"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
        >
          Continue roadmap
        </Link>
        <Link href="/products" className="text-sm text-[var(--muted)]">
          Back to all offers
        </Link>
      </div>
    </div>
  );
}
