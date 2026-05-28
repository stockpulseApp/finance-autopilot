import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import site from "../../../config/site.json";

export const metadata = { title: "Topics" };

export default function CategoriesPage() {
  const posts = getAllPosts();
  const byCategory = site.categories.map((cat) => ({
    cat,
    posts: posts.filter((p) => p.category === cat),
  }));

  return (
    <div className="space-y-14">
      <div>
        <h1 className="text-3xl font-bold">Browse by topic</h1>
        <p className="mt-2 text-[var(--muted)]">
          Personal finance, investing, real estate, credit, taxes, and more.
        </p>
      </div>
      {byCategory.map(({ cat, posts: catPosts }) => (
        <section key={cat}>
          <h2 className="text-xl font-bold capitalize">{cat.replace(/-/g, " ")}</h2>
          {catPosts.length === 0 ? (
            <p className="mt-2 text-sm text-[var(--muted)]">Articles coming soon.</p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {catPosts.slice(0, 4).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          )}
          <Link href={`/categories/${cat}`} className="mt-2 inline-block text-sm">
            View all →
          </Link>
        </section>
      ))}
    </div>
  );
}
