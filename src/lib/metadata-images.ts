import { absoluteImageUrl, resolveVisualImage } from "./marketplace-images";

export function postOpenGraphImages(post: {
  slug: string;
  category: string;
  coverImage?: string;
}) {
  const url = absoluteImageUrl(
    resolveVisualImage({
      slug: post.slug,
      category: post.category,
      coverImage: post.coverImage,
    }),
  );
  return [{ url, width: 1200, height: 630, alt: post.slug }];
}

export function guideOpenGraphImages(guide: {
  slug: string;
  category: string;
  title: string;
}) {
  const url = absoluteImageUrl(resolveVisualImage({ slug: guide.slug, category: guide.category }));
  return [{ url, width: 1200, height: 630, alt: guide.title }];
}
