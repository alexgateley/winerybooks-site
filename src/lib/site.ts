/** winerybooks.com: one brand, one site. Rhea's app, demo and contact details are shared with rheafi.com. */
export const SITE_URL = "https://winerybooks.com";
export const SITE_DOMAIN = "winerybooks.com";
export const SITE_NAME = "Winery Books";

/** Where customers sign in to the app (production). */
export const APP_SIGN_IN_URL = "https://app.rheafi.com/sign-in";
/** The demo company (sample data). */
export const DEMO_URL = "https://demo.rheafi.com/demo";

/** Rhea's own site, and its privacy notice and terms (winerybooks.com has no legal pages of its own). */
export const RHEA_URL = "https://rheafi.com/";
export const PRIVACY_URL = "https://rheafi.com/privacy/";
export const TERMS_URL = "https://rheafi.com/terms/";

export const CONTACT_EMAIL = "sales@rheafi.com";
export const CONTACT_PHONE = "(707) 394-5086";
export const CONTACT_PHONE_TEL = "+17073945086";
export const INSTAGRAM_URL = "https://www.instagram.com/runonrhea/";

export const LEGAL_ENTITY = "Grip Theory LLC";
export const COPYRIGHT_YEAR = 2026;

/**
 * Open Graph fields every page shares. A page that sets `openGraph` replaces the layout's object entirely (metadata
 * merges shallowly), so spread this in. The image is src/app/opengraph-image.png (file-based metadata).
 */
export const OPEN_GRAPH_BASE = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
} as const;
