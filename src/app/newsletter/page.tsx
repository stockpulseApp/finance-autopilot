import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata = { title: "Deal Alerts & Newsletter" };

export default function NewsletterPage() {
  return (
    <div className="space-y-10">
      <PageHero
        title="Free deal alerts & wealth sprint"
        subtitle="Weekly partner deals, new guides, and instant access to our 30-day checklist — the same urgency as flash travel sales, for your wallet."
        category="personal-finance"
      />

      <div className="mx-auto max-w-lg rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <NewsletterForm />
      </div>

      <section className="rounded-2xl bg-[var(--primary-light)] p-8 text-center">
        <h2 className="text-xl font-extrabold text-[var(--primary)]">
          Want daily AI guides on autopilot?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
          Pro members get fresh research every day — powered by our autonomous publishing bot.
        </p>
        <Link href="/subscription" className="btn-deal mt-6 inline-flex">
          View Pro plans
        </Link>
      </section>
    </div>
  );
}
