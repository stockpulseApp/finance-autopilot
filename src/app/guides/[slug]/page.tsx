import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/MarkdownContent";
import { GuideUpgrade } from "@/components/editorial/GuideUpgrade";
import { getCategoryImage } from "@/lib/marketplace-images";
import { getCategoryMeta } from "@/lib/categories";
import { getGuideBySlug } from "@/lib/guides";
import { getGuidePage, getGuidePageSlugs } from "@/lib/guide-pages";

export async function generateStaticParams() {
  return getGuidePageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function GuideReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getGuidePage(slug);
  const catalog = getGuideBySlug(slug);
  if (!page || !catalog) notFound();

  const cat = getCategoryMeta(page.category);
  const image = getCategoryImage(page.category);
  const isFree = page.type === "free";

  return (
    <article className="space-y-10">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-48 md:h-64">
          <Image src={image} alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Link
            href="/guides"
            className="text-xs font-bold text-white/80 no-underline hover:text-white"
          >
            ← All guides
          </Link>
          <span
            className={`ml-3 rounded px-2 py-0.5 text-xs font-bold ${
              isFree ? "bg-[#e6f4ea] text-[var(--success)]" : "badge-hot"
            }`}
          >
            {isFree ? "Free guide" : `$${page.price}`}
          </span>
          <h1 className="mt-3 max-w-4xl text-2xl font-extrabold text-white md:text-4xl">
            {page.title}
          </h1>
          <p className="mt-2 text-sm text-white/90">
            {page.pages} pages · {cat.label}
            {page.isPreview ? " · Preview" : ""}
          </p>
        </div>
      </div>

      <p className="max-w-3xl text-lg text-[var(--muted)]">{page.description}</p>

      {page.content ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-10 lg:p-12">
          <MarkdownContent content={page.content} />
          <GuideUpgrade guide={page} checkoutUrl={catalog.checkoutUrl} />
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">Full guide content is being published. Check back soon.</p>
          <Link href="/guides" className="btn-outline mt-4 inline-block no-underline">
            Browse guides
          </Link>
        </div>
      )}
    </article>
  );
}
