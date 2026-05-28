import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { CategoryCtaRibbon } from "@/components/CategoryCtaRibbon";
import { getPostsByCategory } from "@/lib/posts";
import site from "../../../../config/site.json";

export async function generateStaticParams() {
  return site.categories.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: category.replace(/-/g, " "),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!site.categories.includes(category)) notFound();

  const posts = getPostsByCategory(category);

  return (
    <div>
      <h1 className="text-3xl font-bold capitalize">{category.replace(/-/g, " ")}</h1>
      <CategoryCtaRibbon category={category} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
