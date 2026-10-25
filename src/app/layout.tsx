import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PAGES } from "@/content/copy";
import { OPEN_GRAPH_BASE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font; no request goes to Google from a visitor's browser.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: PAGES.home.title, template: `%s | ${SITE_NAME}` },
  description: PAGES.home.description,
  applicationName: SITE_NAME,
  openGraph: { ...OPEN_GRAPH_BASE, title: PAGES.home.title, description: PAGES.home.description, url: "/" },
  twitter: { card: "summary_large_image", title: PAGES.home.title, description: PAGES.home.description },
  formatDetection: { telephone: false, email: false, address: false },
};

// Light only, as rheafi.com.
export const viewport: Viewport = {
  themeColor: "#f5f2ed",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${interTight.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-paper text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
