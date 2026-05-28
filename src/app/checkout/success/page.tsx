import Link from "next/link";
import { RevenueCtaPanel } from "@/components/RevenueCtaPanel";
import { getGuideBySlug } from "@/lib/guides";
import { getSubscriptionPlans } from "@/lib/subscription";
import site from "../../../../config/site.json";

export const metadata = { title: "Purchase Successful" };

type Upsell = {
  title: string;
  href: string;
  cta: string;
  primary?: { href: string; label: string };
};

function getUpsell(searchParams: Record<string, string | string[] | undefined>): Upsell {
  const guideSlug = typeof searchParams.guide === "string" ? searchParams.guide : "";
  const planId = typeof searchParams.plan === "string" ? searchParams.plan : "";
  const course = typeof searchParams.course === "string" ? searchParams.course : "";
  const product = typeof searchParams.product === "string" ? searchParams.product : "";
  const key = course || product;

  if (guideSlug) {
    const guide = getGuideBySlug(guideSlug);
    return {
      title: guide ? `Your guide: ${guide.title}` : "Your guide is ready",
      href: `/guides/${guideSlug}?purchased=1`,
      cta: "Open guide now",
      primary: {
        href: `/guides/${guideSlug}?purchased=1`,
        label: guide ? `Read ${guide.title}` : "Open your guide",
      },
    };
  }

  if (planId) {
    const plan = getSubscriptionPlans().find((p) => p.id === planId);
    return {
      title: plan ? `Welcome to ${plan.name}` : "Welcome to Wealthy Brainiac Pro",
      href: "/insights",
      cta: "Open Money Pulse",
      primary: { href: "/insights", label: "See today's Money Pulse" },
    };
  }

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
  const supportEmail =
    (site as { supportEmail?: string }).supportEmail ?? "support@wealthybrainiac.com";

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <p className="text-sm uppercase tracking-wide text-[var(--accent)]">Payment complete</p>
        <h1 className="mt-2 text-3xl font-bold">You are in.</h1>
        <p className="mt-4 text-[var(--muted)]">
          Thank you for your purchase. Bookmark the link below — that is your access. If anything
          looks wrong, email{" "}
          <a href={`mailto:${supportEmail}`} className="text-[var(--accent)]">
            {supportEmail}
          </a>
          .
        </p>
        <div className="mt-6 rounded-lg border border-[var(--border)] bg-[#0f1520] p-4">
          <p className="text-sm font-semibold">{upsell.title}</p>
          <Link href={upsell.href} className="mt-2 inline-block text-sm text-[var(--accent)]">
            {upsell.cta} {"->"}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          {upsell.primary ? (
            <Link
              href={upsell.primary.href}
              className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
            >
              {upsell.primary.label}
            </Link>
          ) : (
            <Link
              href="/start-here"
              className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
            >
              Continue with roadmap
            </Link>
          )}
          <Link
            href="/guides"
            className="rounded-lg border border-[var(--border)] px-5 py-3 font-semibold no-underline text-[var(--foreground)]"
          >
            Browse guides
          </Link>
        </div>
      </div>

      <RevenueCtaPanel
        title="Upgrade your momentum"
        subtitle="Most successful buyers stack one guide + one course for faster execution."
      />
    </div>
  );
}
