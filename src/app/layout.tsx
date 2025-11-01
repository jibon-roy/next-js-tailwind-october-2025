import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ReduxStoreProvider from "@/src/redux/ReduxStoreProvider";

export const metadata: Metadata = {
  // Basic Info
  title: {
    default: "NextJS Starter Pack | Minimal, production-ready starter",
    template: "%s | NextJS Starter Pack",
  },
  description:
    "NextJS Starter Pack — A minimal, production-ready Next.js 16 starter with TypeScript and sensible defaults. Use this as the base for your next app.",

  // Canonical & International URLs
  alternates: {
    canonical: "https://example.com",
    languages: {
      "en-US": "https://example.com/en",
      "bn-BD": "https://example.com/bn",
    },
  },

  // Application Data
  applicationName: "NextJS Starter Pack",
  generator: "Next.js 16",
  referrer: "origin-when-cross-origin",
  keywords: [
    "NextJS",
    "starter",
    "typescript",
    "template",
    "nextjs",
    "starter pack",
  ],
  authors: [
    { name: "Example Team", url: "https://example.com/about" },
    { name: "Open Source" },
  ],
  creator: "Example Team",
  publisher: "Example Publisher",
  category: "Developer Tools / Starter",
  classification: "Software",

  // Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title: "NextJS Starter Pack | Minimal Next.js Starter",
    description:
      "A minimal, production-ready Next.js 16 starter with TypeScript and conventions you can rely on.",
    url: "https://example.com",
    siteName: "NextJS Starter Pack",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icons/1200x630.png",
        width: 1200,
        height: 630,
        alt: "NextJS Starter Pack OG Image",
      },
    ],
  },

  // Twitter Meta (for social sharing)
  twitter: {
    card: "summary_large_image",
    title: "NextJS Starter Pack | Minimal, production-ready starter",
    description:
      "Start your Next.js app with a sensible starter: TypeScript, defaults, and a tidy structure.",
    creator: "@example",
    site: "@example",
    images: ["https://example.com/og-image.jpg"],
  },

  // Robots (for search engines)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Viewport & Display
  // Manifest
  manifest: "/site.webmanifest",

  // Icons (all formats + Apple)
  icons: {
    icon: [
      { url: "/icon/192x192.png", sizes: "any" },
      { url: "/icon/192x192.png", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon/180x180.png", sizes: "180x180" },
      { url: "/icon/192x192.png", sizes: "192x192" },
    ],
    shortcut: ["/icon/favicon.ico"],
  },

  // Apple Web App Config
  appleWebApp: {
    capable: true,
    title: "NextJS Starter Pack",
    statusBarStyle: "black-translucent",
  },

  // Verification (for Search Console, Pinterest, etc.)
  verification: {
    google: "EXAMPLE_GOOGLE_VERIFICATION",
    yandex: "EXAMPLE_YANDEX_VERIFICATION",
    yahoo: "EXAMPLE_YAHOO_VERIFICATION",
    other: {
      me: ["https://example.com", "https://twitter.com/example"],
    },
  },

  // Format Detection (for mobile UX)
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Other Optional Meta (if using iTunes / apps)
  itunes: {
    appId: "1234567890",
    appArgument: "https://example.com",
  },

  // Metadata versioning and experimental fields (optional)
  metadataBase: new URL("https://example.com"),
  archives: ["https://example.com/blog"],
  assets: ["https://example.com/assets"],
};

// Separate viewport export — Next.js recommends moving viewport, themeColor and colorScheme
// out of the main `metadata` export and into the `viewport` export.
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`antialiased`}>
        <ReduxStoreProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="bg-white dark:bg-black">{children}</div>
          </ThemeProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
