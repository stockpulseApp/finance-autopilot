import { PageHero } from "@/components/marketplace/PageHero";
import { GuideCard } from "@/components/marketplace/GuideCard";
import { getGuides } from "@/lib/guides";

export const metadata = { title: "Guides & Playbooks" };

export default function GuidesPage() {
  const guides = getGuides();
  const free = guides.filter((g) => g.type === "free");
  const paid = guides.filter((g) => g.type === "paid");

  return (
    <div className="space-y-12">
      <PageHero
        title="Guides & downloadable playbooks"
        subtitle="Free checklists and premium PDF systems — the same deal-card experience as our partner offers."
        category="personal-finance"
      />

      <section>
        <h2 className="text-2xl font-extrabold">Free guides</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {free.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-extrabold">Premium guides</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Instant download after checkout
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {paid.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
