import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getGuidePageSlugs } from "@/lib/guide-pages";
import site from "../../config/site.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
  const posts = getAllPosts();
  const guideSlugs = getGuidePageSlugs();

  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/insights`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/guides`, changeFrequency: "weekly", priority: 0.85 },
    ...guideSlugs.map((slug) => ({
      url: `${base}/guides/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/dunrite-global`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/wealth-building-guide`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/deals`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/courses`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/tools`, changeFrequency: "monthly", priority: 0.7 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
