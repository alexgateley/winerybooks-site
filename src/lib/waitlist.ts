/**
 * Waitlist form configuration. The same Formspree form as rheafi.com (sales@rheafi.com); the `_subject` and the hidden
 * `site` field tell the two sites' requests apart.
 *
 * The form POSTs `application/x-www-form-urlencoded` data (with `Accept: application/json`) straight from the browser
 * to NEXT_PUBLIC_WAITLIST_URL. Any 2xx response counts as success; a 409 or an "already" message too. Without
 * JavaScript, the same fields go to the same URL as a normal form POST. The value is baked in at build time (the
 * Pages workflow sets it), and the build fails if it isn't an https:// URL. Empty: the form says signups open soon.
 */
export const WAITLIST_ENDPOINT: string = validateEndpoint(process.env.NEXT_PUBLIC_WAITLIST_URL?.trim() ?? "");

function validateEndpoint(value: string): string {
  if (!value) return "";
  const devLocal =
    process.env.NODE_ENV === "development" && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(value);
  if (!/^https:\/\/[^/\s]+\/\S*$/.test(value) && !devLocal) {
    throw new Error(`NEXT_PUBLIC_WAITLIST_URL must be a full https:// URL, such as https://formspree.io/f/<form-id>. Got: ${value}`);
  }
  return value;
}

/** The email's subject line in Formspree (the visitor's `email` becomes its reply-to). */
export const WAITLIST_SUBJECT = "Pilot request from winerybooks.com";
/** Sent in the hidden `site` field. */
export const WAITLIST_SITE = "winerybooks.com";

/** Field names sent to the provider. */
export const WAITLIST_FIELDS = {
  email: "email",
  name: "firstName",
  tastingRooms: "tastingRooms",
  cases: "casesPerYear",
  pos: "pos",
  subject: "_subject",
  site: "site",
} as const;

export const TASTING_ROOM_OPTIONS = ["1", "2", "3", "4 to 10", "11 or more"] as const;

export const CASES_OPTIONS = [
  "Under 1,000",
  "1,000 to 5,000",
  "5,000 to 10,000",
  "10,000 to 25,000",
  "Over 25,000",
] as const;

/** The copy's POS options. */
export const POS_OPTIONS = ["Square", "Clover", "Toast", "Shopify POS", "Commerce7", "WineDirect", "Other"] as const;

export const EMAIL_MAX_LENGTH = 254;
export const NAME_MAX_LENGTH = 60;
export const WAITLIST_TIMEOUT_MS = 15_000;
