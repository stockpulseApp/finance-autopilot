import Link from "next/link";
import { RevenueCtaPanel } from "@/components/RevenueCtaPanel";

export const metadata = { title: "Purchase Successful" };

function getUpsell(searchParams: Record<string, string | string[] | undefined>) {
  const course = typeof searchParams.course === "string" ? searchParams.course : "";
  const product = typeof searchParams.product === "string" ? searchParams.product : "";
  const key = course || product;

  if (key === "wealth-foundation" || key === "money-os-template-pack") {
    return {
      title: "Suggested next step: Wealth Operating System",
      href: "/thank-you/wealth-operating-system",
      cta: "Unlock full system",
    };
  }

  if (key === "real-estate-starter") {
    return {
      title: "Suggested next step: Portfolio & Cashflow Intensive",
      href: "/thank-you/portfolio-cashflow-intensive",
      cta: "Book intensive",
    };
  }

  if (key === "credit-mastery") {
    return {
      title: "Suggested next step: Money OS Template Pack",
      href: "/thank-you/money-os-template-pack",
      cta: "Get templates",
    };
  }

  return {
    title: "Suggested next step: Start your roadmap",
    href: "/start-here",
    cta: "Continue",
  };
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = await searchParams;
  const upsell = getUpsell(resolved);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <p className="text-sm uppercase tracking-wide text-[var(--accent)]">Payment complete</p>
        <h1 className="mt-2 text-3xl font-bold">You are in.</h1>
        <p className="mt-4 text-[var(--muted)]">
          Thank you for your purchase. Your onboarding and access instructions should arrive by
          email shortly. If not, check spam or contact support.
        </p>
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[#0f1520] p-4">
          <p className="text-sm font-semibold">{upsell.title}</p>
          <Link href={upsell.href} className="mt-2 inline-block text-sm text-[var(--accent)]">
            {upsell.cta} {"->"}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/start-here"
            className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
          >
            Continue with roadmap
          </Link>
          <Link
            href="/products"
            className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold no-underline text-[var(--foreground)]"
          >
            See other offers
          </Link>
        </div>
      </div>

      <RevenueCtaPanel
        title="Upgrade your momentum"
        subtitle="Most successful buyers stack one template + one course for faster execution."
      />
    </div>
  );
}
