import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { AffiliateCard } from "@/components/AffiliateCard";
import { AdSlot } from "@/components/AdSlot";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getAffiliatesByIds, affiliateDisclosure } from "@/lib/affiliates";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedAffiliates = post.affiliateIds?.length
    ? getAffiliatesByIds(post.affiliateIds)
    : [];

  return (
    <article className="max-w-3xl">
      <p className="text-sm text-[var(--muted)]">
        {post.category.replace(/-/g, " ")} · {post.date} · {post.author}
      </p>
      <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{post.description}</p>

      <AdSlot placement="article-top" />

      <div className="mt-10">
        <MarkdownContent content={post.content} />
      </div>

      <AdSlot placement="article-mid" />

      {relatedAffiliates.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Recommended</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">{affiliateDisclosure}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedAffiliates.map((p) => (
              <AffiliateCard key={p.id} program={p} source={`post-${slug}`} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-lg font-bold">Get the next guide in your inbox</h2>
        <div className="mt-4">
          <NewsletterForm compact />
        </div>
      </section>
    </article>
  );
}
