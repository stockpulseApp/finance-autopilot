import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold">All articles</h1>
      <p className="mt-2 text-[var(--muted)]">
        New finance, investing, and real estate guides — published daily on autopilot.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="mt-8 text-[var(--muted)]">
          No posts yet. Run <code className="text-[var(--accent)]">npm run generate:post</code> after
          setting ANTHROPIC_API_KEY.
        </p>
      )}
    </div>
  );
}
