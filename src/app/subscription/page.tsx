import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { getSubscriptionMeta, getSubscriptionPlans } from "@/lib/subscription";

export const metadata = {
  title: "Wealth Brainiac Pro — Subscription",
  description:
    "Daily AI-powered money research, deal alerts, templates, and premium guides on autopilot.",
};

export default function SubscriptionPage() {
  const meta = getSubscriptionMeta();
  const plans = getSubscriptionPlans();

  return (
    <div className="space-y-12">
      <PageHero
        title={meta.name}
        subtitle={meta.tagline}
        category="investing"
      >
        <p className="text-sm text-blue-100">
          Automated daily blog publishing + member perks. Cancel anytime.
        </p>
      </PageHero>

      <section className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`marketplace-card flex flex-col p-6 ${
              plan.badge === "Most popular" ? "ring-2 ring-[var(--primary)]" : ""
            }`}
          >
            {plan.badge && (
              <span className="badge-hot mb-3 self-start">{plan.badge}</span>
            )}
            <h2 className="text-xl font-extrabold">{plan.name}</h2>
            <p className="mt-2">
              <span className="text-4xl font-extrabold text-[var(--primary)]">
                ${plan.price}
              </span>
              <span className="text-[var(--muted)]"> / {plan.interval}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2 text-sm text-[var(--muted)]">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-[var(--success)]">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-deal mt-6 w-full text-center"
            >
              Subscribe now
            </a>
            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              Replace checkout URL in config/subscription.json with your Stripe Payment Link
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-[var(--border)] bg-white p-8">
        <h2 className="text-xl font-extrabold">Free tier includes</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {meta.freeTierFeatures.map((f) => (
            <li key={f} className="flex gap-2 text-sm text-[var(--muted)]">
              <span className="text-[var(--primary)]">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Link href="/newsletter" className="btn-primary-blue mt-6 inline-flex">
          Start free — newsletter
        </Link>
      </section>

      <section className="rounded-2xl bg-[var(--primary-light)] p-6 text-sm text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Automation:</strong> Pro members
        receive content from our daily AI publishing pipeline (GitHub Actions + Anthropic).
        Set <code>ANTHROPIC_API_KEY</code> in repo secrets — see README.
      </section>
    </div>
  );
}
