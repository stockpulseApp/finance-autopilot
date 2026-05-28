import { GuideOfferCard } from "@/components/marketplace/GuideOfferCard";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post; featured?: boolean }) {
  return <GuideOfferCard post={post} />;
}
