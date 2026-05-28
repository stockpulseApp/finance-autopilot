import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { CategoryCtaRibbon } from "@/components/CategoryCtaRibbon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CATEGORY_META } from "@/lib/categories";
import { getAllPosts } from "@/lib/posts";
import site from "../../../config/site.json";

export const metadata = { title: "Topics" };

export default function CategoriesPage() {
  const posts = getAllPosts();
  const byCategory = site.categories.map((cat) => ({
    cat,
    meta: CATEGORY_META[cat],
    posts: posts.filter((p) => p.category === cat),
  }));

  return (
    <div className="space-y-16">
      <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-violet-950/20 p-8 md:p-12">
        <SectionHeading
          eyebrow="Topic library"
          title="Browse by wealth pillar"
          description="Every category is a complete playbook library — investing, property, credit, crypto, taxes, income, and more."
        />
      </div>

      {byCategory.map(({ cat, meta, posts: catPosts }) => (
        <section key={cat} id={cat}>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                {meta?.label ?? cat.replace(/-/g, " ")}
              </h2>
              {meta?.description && (
                <p className="mt-2 max-w-xl text-[var(--muted)]">{meta.description}</p>
              )}
            </div>
            <Link
              href={`/categories/${cat}`}
              className="text-sm font-semibold text-[var(--accent)] no-underline"
            >
              View all →
            </Link>
          </div>
          <CategoryCtaRibbon category={cat} />
          {catPosts.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
              Guides publishing soon — check back or run the content pipeline.
            </p>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {catPosts.slice(0, 4).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
