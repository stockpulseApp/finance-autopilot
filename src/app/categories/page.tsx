import Link from "next/link";
import { CategoryTile } from "@/components/marketplace/CategoryTile";
import { GuideOfferCard } from "@/components/marketplace/GuideOfferCard";
import { CATEGORY_META } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import site from "../../../config/site.json";

export const metadata = { title: "Browse Money Goals" };

export default function CategoriesPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <div className="rounded-2xl bg-[var(--primary)] px-6 py-10 text-white">
        <h1 className="text-3xl font-extrabold">Where do you want to go financially?</h1>
        <p className="mt-2 max-w-xl text-blue-100">
          Pick a destination — each topic has free guides and partner deals to compare.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.categories.map((slug) => (
          <CategoryTile
            key={slug}
            slug={slug}
            label={CATEGORY_META[slug]?.label ?? slug}
            dealCount={`${posts.filter((p) => p.category === slug).length} guides`}
          />
        ))}
      </div>

      {site.categories.map((cat) => {
        const catPosts = posts.filter((p) => p.category === cat);
        if (catPosts.length === 0) return null;
        return (
          <section key={cat} className="rounded-2xl border border-[var(--border)] bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold">
                {CATEGORY_META[cat]?.label ?? cat}
              </h2>
              <Link href={`/categories/${cat}`} className="text-sm font-bold text-[var(--primary)] no-underline">
                View all →
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {catPosts.slice(0, 4).map((p) => (
                <GuideOfferCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
