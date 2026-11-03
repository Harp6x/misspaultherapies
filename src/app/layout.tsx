import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteConfig } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { DiscoveryCallBanner } from "@/components/DiscoveryCallBanner";
import { StickyBookBar } from "@/components/StickyBookBar";
import { GlobalKitEmbed } from "@/components/GlobalKitEmbed";
import { WebMcpProvider } from "@/components/WebMcpProvider";
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
      types: {
        "text/plain": `${config.url}/llms.txt`,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/logo.png", sizes: "180x180", type: "image/png" },
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-Y8Q3KJWNHJ";
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1814127506150384";
  const { formType, uid, scriptUrl } = config.newsletter;
  const showGlobalKit =
    formType === "modal" || formType === "slide-in" || formType === "sticky-bar";

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {metaPixelId && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <DiscoveryCallBanner config={config} />
        <Header config={config} pageVisibility={config.pageVisibility} />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer config={config} pageVisibility={config.pageVisibility} />
        <WhatsAppButton config={config} />
        <StickyBookBar config={config} />
        <WebMcpProvider />
        {showGlobalKit && <GlobalKitEmbed uid={uid} src={scriptUrl} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
