import Link from "next/link";
import { getProducts } from "@/lib/products";

export function RevenueCtaPanel({
  title = "Next step to accelerate your wealth",
  subtitle = "Choose one high-leverage offer and implement it this week.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const featured = getProducts().slice(0, 2);

  return (
    <section className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {featured.map((product) => (
          <article key={product.slug} className="rounded-lg border border-[var(--border)] p-4">
            <p className="text-xs uppercase text-[var(--muted)]">{product.type}</p>
            <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{product.headline}</p>
            <p className="mt-3 text-2xl font-bold">${product.price}</p>
            <Link href="/products" className="mt-3 inline-block text-sm">
              Open offer {"->"}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
