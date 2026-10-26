import { HOME, SOFTWARE_DESCRIPTION } from "@/content/copy";
import { PLAN, PRICE_BANDS, usd } from "@/lib/pricing";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  INSTAGRAM_URL,
  LEGAL_ENTITY,
  RHEA_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/** Schema.org data, as the copy lays it out. Prices come from src/lib/pricing.ts; no ratings. */

export const ORGANIZATION_ID = `${SITE_URL}/#org`;
const PRICING_URL = `${SITE_URL}/pricing/`;
const UNIT = "per location a month, billed annually";

function bandOffer(band: (typeof PRICE_BANDS)[number]) {
  const price = String(band.annual);
  return {
    "@type": "Offer",
    name: `${band.from} to ${band.to} locations`,
    price,
    priceCurrency: "USD",
    priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "USD", unitText: UNIT },
    url: PRICING_URL,
  };
}

/** The home page's graph: the organization, the website, the product with its offers, and the FAQ the page shows. */
export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Rhea",
        legalName: LEGAL_ENTITY,
        alternateName: SITE_NAME,
        url: `${SITE_URL}/`,
        sameAs: [RHEA_URL, INSTAGRAM_URL],
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_TEL,
        address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" },
      },
      { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/`, publisher: { "@id": ORGANIZATION_ID } },
      {
        "@type": "SoftwareApplication",
        name: "Rhea",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://app.rheafi.com/",
        publisher: { "@id": ORGANIZATION_ID },
        description: SOFTWARE_DESCRIPTION,
        offers: [
          ...PRICE_BANDS.map(bandOffer),
          {
            "@type": "Offer",
            name: "Guided setup, optional, one time",
            price: String(PLAN.setupFee.base),
            priceCurrency: "USD",
            description: `Plus ${usd(PLAN.setupFee.perStore)} per location.`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: HOME.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}

export type Crumb = { name: string; path: string };

/** A BreadcrumbList for an inner page: Home, then the page. */
export function breadcrumbList(trail: Crumb[]) {
  const all: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** A FAQPage for an inner page that shows its questions. */
export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
