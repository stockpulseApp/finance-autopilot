import Image from "next/image";
import { getHeroImage, getVisualImage } from "@/lib/marketplace-images";

export function PageHero({
  title,
  subtitle,
  image,
  category,
  heroContext,
  imageSeed,
  children,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  category?: string;
  /** Distinct section hero (home, tools, guides, deals, …) */
  heroContext?: string;
  /** Per-page slug for unique hero when category is set */
  imageSeed?: string;
  children?: React.ReactNode;
}) {
  const src =
    image ??
    (heroContext
      ? getHeroImage(heroContext)
      : imageSeed && category
        ? getVisualImage(imageSeed, category)
        : category
          ? getVisualImage(`page-${category}`, category)
          : getHeroImage("default"));

  return (
    <section className="relative overflow-hidden rounded-2xl bg-[var(--primary)] shadow-md">
      <div className="absolute inset-0">
        <Image src={src} alt="" fill className="object-cover opacity-40" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)]/95 via-[var(--primary)]/85 to-[var(--primary)]/70" />
      </div>
      <div className="relative px-6 py-10 md:px-10 md:py-14">
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg">{subtitle}</p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
