import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyOfferBar } from "@/components/StickyOfferBar";
import site from "../../config/site.json";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? site.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 pb-24 md:pb-10">{children}</main>
        <StickyOfferBar />
        <Footer />
      </body>
    </html>
  );
}
