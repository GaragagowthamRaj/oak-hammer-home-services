import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Fraunces, Outfit } from "next/font/google";
import { copy, heroSlides } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { MobileCta } from "@/components/mobile-cta";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oakandhammer.example"),
  title: {
    default: copy.meta.title,
    template: `%s · ${copy.brand.name}`,
  },
  description: copy.meta.description,
  applicationName: copy.meta.title,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    locale: "en_US",
    type: "website",
    siteName: copy.meta.title,
    images: [{ url: heroSlides[0].src, width: 2000, height: 1333, alt: heroSlides[0].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f3efe7",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: copy.meta.title,
  description: copy.meta.description,
  inLanguage: "en",
  url: "https://oakandhammer.example",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          {copy.nav.skip}
        </a>
        <Header />
        <main id="content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <MobileCta />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
