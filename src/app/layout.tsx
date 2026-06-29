import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteConfig } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DiscoveryCallBanner } from "@/components/DiscoveryCallBanner";
import { StickyBookBar } from "@/components/StickyBookBar";
import { GlobalKitEmbed } from "@/components/GlobalKitEmbed";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const defaultTitle = `${config.name} - Online Therapy & Counselling in India | ${config.tagline}`;
  const ogImage = config.seo.ogImageUrl ?? config.ogImage;

  return {
    title: {
      default: config.seo.metaTitle ?? defaultTitle,
      template: `%s | ${config.name}`,
    },
    description: config.seo.metaDescription ?? config.description,
    keywords: [
      "online therapy India",
      "clinical psychologist India",
      "online counselling India",
      "therapist near me",
      "couples therapy online",
      "anxiety therapist India",
      "depression therapy online",
      "NRI therapist",
      "adolescent therapy India",
      "family therapy online",
      "mental health India",
      "psychologist online India",
      "Ms Paul Therapies",
      "Aishani Paul therapist",
      "CBT therapy India",
      "therapy for Indians abroad",
      "online psychologist Kolkata",
      "best therapist India online",
      "therapy for anxiety depression India",
      "mental health counselling NRI",
      "RCI licensed psychologist",
    ],
    metadataBase: new URL(config.url),
    applicationName: config.name,
    category: "Health",
    creator: config.author,
    publisher: config.name,
    alternates: {
      canonical: config.url,
      languages: { "en-IN": config.url, en: config.url },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: config.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${config.name} - Online Therapy & Counselling`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: config.twitterHandle,
      site: config.twitterHandle,
      images: [ogImage],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    },
    other: {
      "theme-color": "#6B7C5E",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    },
    ...(config.seo.noIndex && { robots: { index: false, follow: false } }),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const { formType, uid, scriptUrl } = config.newsletter;
  const showGlobalKit =
    formType === "modal" || formType === "slide-in" || formType === "sticky-bar";

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <DiscoveryCallBanner config={config} />
        <Header config={config} pageVisibility={config.pageVisibility} />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer config={config} pageVisibility={config.pageVisibility} />
        <WhatsAppButton config={config} />
        <StickyBookBar config={config} />
        {showGlobalKit && <GlobalKitEmbed uid={uid} src={scriptUrl} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
