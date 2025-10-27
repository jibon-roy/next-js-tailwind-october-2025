import type { Metadata } from "next";

/**
 * Helper to safely generate SEO metadata dynamically
 * Supports: static + dynamic pages
 * Includes OpenGraph, Twitter, JSON-LD structured data
 */

interface GenerateSEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "profile";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale?: string;
}

/**
 * Fallback constants for default site-wide values
 */
const DEFAULT_SEO = {
  title: "Example Site | Sample Next.js Starter",
  description:
    "A small example site demonstrating Next.js metadata, Open Graph, and structured data.",
  keywords: ["example", "next.js", "starter", "demo", "seo"],
  image: "https://example.com/og-image.jpg",
  url: "https://example.com",
  author: "Example Author",
  siteName: "Example Site",
  locale: "en_US",
};

/**
 * Generates metadata with complete SEO coverage and graceful fallbacks
 */
export async function siteMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  locale,
}: GenerateSEOProps): Promise<Metadata> {
  const seoTitle = title
    ? `${title} | ${DEFAULT_SEO.siteName}`
    : DEFAULT_SEO.title;

  const seoDescription = description ?? DEFAULT_SEO.description;
  const seoKeywords = keywords?.length ? keywords : DEFAULT_SEO.keywords;
  const seoImage = image ?? DEFAULT_SEO.image;
  const seoUrl = url ?? DEFAULT_SEO.url;
  const seoAuthor = author ?? DEFAULT_SEO.author;
  const seoLocale = locale ?? DEFAULT_SEO.locale;

  // Structured Data (JSON-LD for Google SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    headline: seoTitle,
    description: seoDescription,
    image: seoImage,
    author: {
      "@type": "Person",
      name: seoAuthor,
    },
    publisher: {
      "@type": "Organization",
      name: DEFAULT_SEO.siteName,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_SEO.image,
      },
    },
    url: seoUrl,
    inLanguage: seoLocale,
    datePublished: publishedTime ?? undefined,
    dateModified: modifiedTime ?? undefined,
  };

  //  Next.js Metadata object
  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: DEFAULT_SEO.siteName,
      locale: seoLocale,
      type: type === "product" ? "website" : type,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      authors: [seoAuthor],
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: "@example",
    },
    alternates: {
      canonical: seoUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      //  Add JSON-LD script directly for Google Structured Data
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };

  return metadata;
}
