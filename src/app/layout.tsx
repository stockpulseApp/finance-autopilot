import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyOfferBar } from "@/components/StickyOfferBar";
import { StructuredData } from "@/components/StructuredData";
import site from "../../config/site.json";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <StructuredData />
        <Header />
        <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 pb-28 lg:px-6 md:pb-12">
          {children}
        </main>
        <StickyOfferBar />
        <Footer />
      </body>
    </html>
  );
}
