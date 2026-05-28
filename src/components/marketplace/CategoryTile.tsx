import Image from "next/image";
import Link from "next/link";
import { getCategoryImage } from "@/lib/marketplace-images";

export function CategoryTile({
  slug,
  label,
  dealCount,
}: {
  slug: string;
  label: string;
  dealCount?: string;
}) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="marketplace-card group relative block h-52 overflow-hidden no-underline"
    >
      <Image
        src={getCategoryImage(slug)}
        alt=""
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold">{label}</h3>
        {dealCount && (
          <p className="mt-1 text-sm text-white/85">{dealCount}</p>
        )}
      </div>
    </Link>
  );
}
