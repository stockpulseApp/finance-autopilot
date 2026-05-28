import Link from "next/link";

export const metadata = { title: "Checkout Canceled" };

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
      <p className="text-sm uppercase tracking-wide text-[var(--muted)]">Checkout canceled</p>
      <h1 className="mt-2 text-3xl font-bold">No worries.</h1>
      <p className="mt-4 text-[var(--muted)]">
        Your card was not charged. You can return any time and continue when ready.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/products"
          className="rounded-lg bg-[var(--accent)] px-5 py-3 font-semibold text-black no-underline"
        >
          Back to products
        </Link>
        <Link href="/newsletter" className="text-sm text-[var(--muted)]">
          Get free wealth emails instead
        </Link>
      </div>
    </div>
  );
}
