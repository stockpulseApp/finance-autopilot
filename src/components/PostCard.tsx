import { ArticleCard } from "@/components/editorial/ArticleCard";
import type { EnrichedPost } from "@/lib/posts";

export function PostCard({
  post,
  variant = "default",
}: {
  post: EnrichedPost;
  variant?: "default" | "compact" | "horizontal";
}) {
  return <ArticleCard post={post} variant={variant} />;
}
