import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { DealOfferCard } from "@/components/marketplace/DealOfferCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getImageAlt, getVisualImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import { ArticleSources } from "@/components/editorial/ArticleSources";
import { getEnrichedPosts, getEnrichedPostBySlug } from "@/lib/posts";
import { getAffiliatesByIds, affiliateDisclosure } from "@/lib/affiliates";

export async function generateStaticParams() {
  return getEnrichedPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getEnrichedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getEnrichedPostBySlug(slug);
  if (!post) notFound();

  const cat = getCategoryMeta(post.category);
  const image = getVisualImage(post.slug, post.category);
  const imageAlt = getImageAlt(post.slug, post.title, cat.label);
  const relatedAffiliates = post.affiliateIds?.length
    ? getAffiliatesByIds(post.affiliateIds)
    : [];
  const morePosts = getEnrichedPosts()
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-56 md:h-80">
          <Image src={image} alt={imageAlt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Link
            href={`/categories/${post.category}`}
            className="rounded bg-white/90 px-2 py-0.5 text-xs font-bold text-[var(--primary)] no-underline"
          >
            {cat.label}
          </Link>
          <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-white/90">
            {post.readingTime} min read · {post.date} · {post.author}
          </p>
        </div>
      </div>

      <p className="max-w-3xl text-xl leading-relaxed text-[var(--foreground)] md:text-2xl md:leading-relaxed">
        {post.excerpt}
      </p>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-white p-6 md:p-10 lg:p-12">
          <MarkdownContent content={post.content} />
          <ArticleSources sources={post.sources} socialQuotes={post.socialQuotes} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-[var(--border)] bg-white p-5">
            <h2 className="text-sm font-bold uppercase text-[var(--muted)]">Keep learning</h2>
            <Link
              href={`/categories/${post.category}`}
              className="mt-2 block font-bold text-[var(--primary)] no-underline"
            >
              More {cat.label} guides →
            </Link>
            <Link href="/blog" className="mt-2 block text-sm text-[var(--muted)] no-underline hover:text-[var(--primary)]">
              All topics
            </Link>
          </div>

          {relatedAffiliates.length > 0 && (
            <div>
              <h2 className="font-bold">Related tools</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">{affiliateDisclosure}</p>
              <div className="mt-4 space-y-4">
                {relatedAffiliates.map((p) => (
                  <DealOfferCard key={p.id} program={p} source={`post-${slug}`} />
                ))}
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[var(--border)] bg-[var(--primary-light)] p-5">
            <h2 className="font-bold text-[var(--primary)]">Weekly digest</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">New guides in your inbox.</p>
            <div className="mt-3">
              <NewsletterForm compact />
            </div>
          </div>
        </aside>
      </div>

      {morePosts.length > 0 && (
        <section>
          <h2 className="text-xl font-extrabold">Continue reading · {cat.label}</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {morePosts.map((p) => (
              <ArticleCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
