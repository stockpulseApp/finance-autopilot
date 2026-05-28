import Link from "next/link";
import { RevenueCtaPanel } from "@/components/RevenueCtaPanel";

export const metadata = { title: "Purchase Successful" };

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
        <p className="text-sm uppercase tracking-wide text-[var(--accent)]">Payment complete</p>
        <h1 className="mt-2 text-3xl font-bold">You are in.</h1>
        <p className="mt-4 text-[var(--muted)]">
          Thank you for your purchase. Your onboarding and access instructions should arrive by
          email shortly. If not, check spam or contact support.
        </p>
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
