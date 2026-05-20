import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DiscoveryCallBanner } from "@/components/DiscoveryCallBanner";
import { StickyBookBar } from "@/components/StickyBookBar";
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

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Online Therapy & Counselling in India | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Online therapy & counselling by Aishani Paul — RCI-licensed clinical psychologist. Individual, couples, adolescent & family therapy across India and for NRIs abroad. Book a free discovery call.",
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
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  category: "Health",
  creator: siteConfig.author,
  publisher: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    languages: { "en-IN": siteConfig.url, en: siteConfig.url },
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
    siteName: siteConfig.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Online Therapy & Counselling`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
  other: {
    "theme-color": "#6B7C5E",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "google-site-verification":
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DiscoveryCallBanner />
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyBookBar />
      </body>
    </html>
  );
}
