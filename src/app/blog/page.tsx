import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { TrustStrip } from "@/components/marketplace/TrustStrip";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Free Money Guides" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm md:p-10">
        <h1 className="text-3xl font-extrabold text-[var(--primary)]">Free expert guides</h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          In-depth playbooks on investing, property, credit, and income — read free, then
          compare tools on our deals page when you&apos;re ready to act.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/deals" className="btn-deal">
            Compare deals
          </Link>
          <Link href="/categories" className="btn-outline">
            Browse topics
          </Link>
        </div>
      </div>

      <TrustStrip />

      <p className="text-sm font-semibold text-[var(--muted)]">
        {posts.length} guides available
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--border)] bg-white p-8 text-center text-[var(--muted)]">
          No guides yet. Run npm run generate:post after setting ANTHROPIC_API_KEY.
        </p>
      )}
    </div>
  );
}
