import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { getAffiliatePrograms } from "@/lib/affiliates";

export const metadata = {
  title: "Launch setup — finish earning",
  description: "One-page checklist with links to Stripe, email, affiliates, and analytics.",
  robots: { index: false, follow: false },
};

type SetupLink = {
  label: string;
  href: string;
  note?: string;
  priority?: boolean;
};

const CORE: SetupLink[] = [
  {
    label: "Stripe — rotate API key (security)",
    href: "https://dashboard.stripe.com/apikeys",
    note: "Roll the exposed live key, then run npm run push:vercel-env locally.",
    priority: true,
  },
  {
    label: "Stripe — webhooks",
    href: "https://dashboard.stripe.com/webhooks",
    note: "Confirm endpoint: https://www.dunriteglobal.com/api/stripe/webhook",
    priority: true,
  },
  {
    label: "Stripe — Payment Links",
    href: "https://dashboard.stripe.com/payment-links",
    note: "All guides, courses, products, and subscriptions are live.",
  },
  {
    label: "Vercel — Environment variables",
    href: "https://vercel.com/stock-pulse1/wealthy-brainiac/settings/environment-variables",
    note: "After rotating Stripe key, update STRIPE_SECRET_KEY here.",
    priority: true,
  },
  {
    label: "ConvertKit — sign up & create form",
    href: "https://app.convertkit.com/users/signup",
    note: "Then: Settings → Advanced → API → copy key + form ID into Vercel.",
    priority: true,
  },
  {
    label: "Google Search Console",
    href: "https://search.google.com/search-console",
    note: "Add property dunriteglobal.com and submit sitemap.xml",
  },
  {
    label: "Google Analytics",
    href: "https://analytics.google.com/",
    note: "Create GA4 property → add NEXT_PUBLIC_GA_MEASUREMENT_ID to Vercel.",
  },
];

const AFFILIATE_NETWORKS: SetupLink[] = [
  {
    label: "Amazon Associates",
    href: "https://affiliate-program.amazon.com/",
    priority: true,
  },
  {
    label: "Impact.com (finance partners)",
    href: "https://impact.com/partners/",
    priority: true,
  },
  {
    label: "CJ Affiliate",
    href: "https://signup.cj.com/member/signup/publisher/",
  },
  {
    label: "ShareASale",
    href: "https://account.shareasale.com/shareasale/signup.cfm",
  },
  {
    label: "CardRatings (credit cards)",
    href: "https://www.cardratings.com/affiliate-center/",
    priority: true,
  },
];

function LinkGrid({ items }: { items: SetupLink[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item.href}
          className={`rounded-xl border p-4 ${
            item.priority
              ? "border-[var(--primary)] bg-[var(--primary-light)]"
              : "border-[var(--border)] bg-white"
          }`}
        >
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--primary)] no-underline hover:underline"
          >
            {item.label} →
          </a>
          {item.note && <p className="mt-1 text-sm text-[var(--muted)]">{item.note}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function SetupPage() {
  const featured = getAffiliatePrograms().filter((p) => p.featured).slice(0, 12);

  return (
    <div className="space-y-12">
      <PageHero
        title="Launch setup hub"
        subtitle="Open each link, complete signup, then paste keys or tracking URLs. Stripe and checkout are already live on the site."
        category="side-income"
        heroContext="earn"
      />

      <div className="marketplace-card border-[var(--success)] bg-[#e6f4ea] p-6">
        <h2 className="text-lg font-extrabold text-[var(--success)]">Already automated for you</h2>
        <ul className="mt-3 space-y-1 text-sm text-[var(--muted)]">
          <li>✓ Stripe checkout — 23 live Payment Links</li>
          <li>✓ Stripe webhook → dunriteglobal.com</li>
          <li>✓ Vercel production env (Stripe, Anthropic, Tavily)</li>
          <li>✓ Daily blog bot (GitHub Actions)</li>
          <li>✓ 75 posts, 8 guides, Money Pulse</li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">
          Finish the links below (requires your login) to earn affiliate + email commissions.
        </p>
      </div>

      <div className="marketplace-card p-6">
        <h2 className="text-lg font-extrabold">Your site (test these)</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/deals" className="btn-primary-blue no-underline">
            Deals page
          </Link>
          <Link href="/guides/index-fund-starter-kit" className="btn-outline no-underline">
            Test $27 guide checkout
          </Link>
          <Link href="/subscription" className="btn-outline no-underline">
            Test Pro subscription
          </Link>
          <Link href="/earn" className="btn-outline no-underline">
            All affiliate programs
          </Link>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-extrabold">1. Core accounts (do first)</h2>
        <LinkGrid items={CORE} />
      </section>

      <section>
        <h2 className="text-xl font-extrabold">2. Affiliate networks (apply here)</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          After approval, paste tracking URLs into{" "}
          <code className="rounded bg-[var(--surface)] px-1">config/affiliate-overrides.json</code>{" "}
          using program ids from{" "}
          <Link href="/earn" className="text-[var(--primary)]">
            /earn
          </Link>
          .
        </p>
        <LinkGrid items={AFFILIATE_NETWORKS} />
      </section>

      <section>
        <h2 className="text-xl font-extrabold">3. Featured programs (high commission)</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {featured.map((p) => (
            <li key={p.id} className="rounded-lg border border-[var(--border)] bg-white p-3 text-sm">
              <span className="font-mono text-xs text-[var(--muted)]">{p.id}</span>
              <p className="font-semibold">{p.name}</p>
              {p.affiliateSignupUrl ? (
                <a
                  href={p.affiliateSignupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--primary)]"
                >
                  Join program →
                </a>
              ) : (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)]">
                  Official site →
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 text-sm">
        <h2 className="font-extrabold">When you have keys / links</h2>
        <p className="mt-2 text-[var(--muted)]">
          Tell your Cursor agent: &quot;paste my ConvertKit keys&quot; or &quot;add affiliate override for
          fidelity-brokerage: [url]&quot; — do not paste Stripe secret keys in chat.
        </p>
        <p className="mt-2">
          Full doc:{" "}
          <a
            href="https://github.com/stockpulseApp/finance-autopilot/blob/main/LAUNCH.md"
            className="text-[var(--primary)]"
          >
            LAUNCH.md on GitHub
          </a>
        </p>
      </section>
    </div>
  );
}
