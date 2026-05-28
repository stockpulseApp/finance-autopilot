import Link from "next/link";
import { FeaturedStory } from "@/components/editorial/FeaturedStory";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { getEnrichedPosts } from "@/lib/posts";

export const metadata = {
  title: "Money Guides & Articles",
  description:
    "In-depth free guides on budgeting, investing, real estate, credit, taxes, and building wealth.",
};

export default function BlogPage() {
  const posts = getEnrichedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="space-y-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-[var(--foreground)] md:text-4xl">
          Money guides that teach you something
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
          Long-form articles with real examples, step-by-step frameworks, and honest
          context — not affiliate boxes disguised as content. Pick a topic, read for
          10–15 minutes, leave with a plan.
        </p>
      </div>

      {featured && <FeaturedStory post={featured} />}

      <p className="text-sm font-semibold text-[var(--muted)]">
        {posts.length} guides · sorted newest first
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {rest.map((post) => (
          <ArticleCard key={post.slug} post={post} variant="horizontal" />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-[var(--muted)]">
          Guides publishing daily. Check back soon.
        </p>
      )}
    </div>
  );
}
