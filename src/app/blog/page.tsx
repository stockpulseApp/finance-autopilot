import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Guides & Playbooks" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-emerald-950/30 p-8 md:p-12">
        <SectionHeading
          eyebrow="Knowledge base"
          title="All wealth guides"
          description="Investing, real estate, credit, crypto, taxes, and income — in-depth playbooks published on autopilot and refined by our editorial team."
        />
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/start-here" className="btn-primary">
            New here? Start the roadmap
          </Link>
          <Link href="/categories" className="btn-secondary">
            Browse by topic
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center text-[var(--muted)]">
          No posts yet. Run{" "}
          <code className="rounded bg-black/40 px-2 py-1 text-[var(--accent)]">
            npm run generate:post
          </code>{" "}
          after setting ANTHROPIC_API_KEY.
        </p>
      )}
    </div>
  );
}
