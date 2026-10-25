import type { Metadata } from "next";
import type { PageMeta } from "@/content/copy";
import { OPEN_GRAPH_BASE } from "@/lib/site";

/** The share image (src/app/opengraph-image.png), listed again because a page's own `openGraph` replaces the layout's. */
const SHARE_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "winerybooks by Rhea: the tasting room’s books and staffing, daily.",
};

/** A page's metadata from the copy: its exact title (no template), description, canonical and share tags. */
export function pageMetadata(page: PageMeta): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: { ...OPEN_GRAPH_BASE, title: page.title, description: page.description, url: page.path, images: [SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: [SHARE_IMAGE] },
  };
}
