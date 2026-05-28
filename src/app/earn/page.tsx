import Link from "next/link";
import { PageHero } from "@/components/marketplace/PageHero";
import { getAffiliatePrograms } from "@/lib/affiliates";

export const metadata = {
  title: "Affiliate program setup",
  description:
    "Join partner programs and paste your tracking links so Dunrite Global pays you on every click.",
};

export default function EarnPage() {
  const programs = getAffiliatePrograms();
  const byCategory = programs.reduce<Record<string, typeof programs>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      <PageHero
        title="Monetization setup"
        subtitle="Every deal on this site should earn you money. Join these partner programs, then paste your tracking URLs into config/affiliate-overrides.json."
        category="side-income"
        heroContext="earn"
      />

      <div className="marketplace-card space-y-4 p-6 text-sm text-[var(--muted)]">
        <h2 className="text-lg font-bold text-[var(--foreground)]">How it works</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Apply to each program below (credit cards, brokers, insurance, etc.).</li>
          <li>
            When approved, copy your personal tracking link into{" "}
            <code className="rounded bg-[var(--surface)] px-1">config/affiliate-overrides.json</code>{" "}
            using the program <code className="rounded bg-[var(--surface)] px-1">id</code> as the key.
          </li>
          <li>Deploy — visitor clicks use your link automatically via <code>/go/…</code> redirects.</li>
        </ol>
        <p>
          Until overrides are set, buttons send visitors to official product pages (not example.com) so
          the site works and builds trust while you get approved.
        </p>
        <Link href="/deals" className="btn-primary-blue inline-flex">
          Browse live deals
        </Link>
      </div>

      {Object.entries(byCategory).map(([category, items]) => (
        <section key={category}>
          <h2 className="text-xl font-extrabold capitalize">{category.replace(/-/g, " ")}</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-[var(--surface)]">
                <tr>
                  <th className="p-3 font-semibold">Program ID</th>
                  <th className="p-3 font-semibold">Offer</th>
                  <th className="p-3 font-semibold">Apply to earn</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="p-3 font-mono text-xs">{p.id}</td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">
                      {p.affiliateSignupUrl ? (
                        <a
                          href={p.affiliateSignupUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--primary)]"
                        >
                          Join program →
                        </a>
                      ) : (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--muted)]"
                        >
                          Official site →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
