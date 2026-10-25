import type { MetadataRoute } from "next";
import { PAGES } from "@/content/copy";
import { SITE_URL } from "@/lib/site";

// The site is a static export: this file is run once at build time and written to out/sitemap.xml.
export const dynamic = "force-static";

const LAST_MODIFIED = "2026-10-25";

export default function sitemap(): MetadataRoute.Sitemap {
  // Every URL ends in a slash (trailingSlash in next.config.ts), the form the pages' canonical links use.
  return Object.values(PAGES).map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1.0 : page.path === "/pricing/" ? 0.8 : 0.7,
  }));
}
