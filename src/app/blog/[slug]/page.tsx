import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { GuideOfferCard } from "@/components/marketplace/GuideOfferCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getCategoryImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
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

  const cat = getCategoryMeta(post.category);
  const image = getCategoryImage(post.category);
  const relatedAffiliates = post.affiliateIds?.length
    ? getAffiliatesByIds(post.affiliateIds)
    : [];
  const morePosts = getAllPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-56 md:h-72">
          <Image src={image} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <span className="rounded bg-white/90 px-2 py-0.5 text-xs font-bold text-[var(--primary)]">
            {cat.label}
          </span>
          <h1 className="mt-3 max-w-4xl text-2xl font-extrabold text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-white/80">
            {post.date} · {post.author}
          </p>
        </div>
      </div>

      <p className="max-w-3xl text-lg text-[var(--muted)]">{post.description}</p>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-white p-6 md:p-10">
          <MarkdownContent content={post.content} />
        </div>

        <aside className="space-y-6">
          <div className="marketplace-card p-5">
            <h2 className="font-bold">Wealth Brainiac Pro</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Daily AI guides + deal alerts on autopilot.
            </p>
            <Link href="/subscription" className="btn-deal mt-4 block text-center">
              Subscribe
            </Link>
          </div>

          {relatedAffiliates.length > 0 && (
            <div>
              <h2 className="font-bold">Compare deals</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">{affiliateDisclosure}</p>
              <div className="mt-4 space-y-4">
                {relatedAffiliates.map((p) => (
                  <DealOfferCard key={p.id} program={p} source={`post-${slug}`} />
                ))}
              </div>
            </div>
          )}

          <div className="marketplace-card p-5">
            <h2 className="font-bold">Free deal alerts</h2>
            <NewsletterForm compact />
          </div>
        </aside>
      </div>

      {morePosts.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold">More in {cat.label}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {morePosts.map((p) => (
              <GuideOfferCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
