// `npm test` (and the first step of `npm run build`): every price in the copy (src/content/copy.ts) must match
// src/lib/pricing.ts, the file copied unchanged from rheafi.com. Reads both TypeScript files with Node's type
// stripping (Node 22.18+), so it needs no build and no dependencies.
import assert from "node:assert/strict";
import { test } from "node:test";
import * as copy from "../src/content/copy.ts";
import {
  BOOKKEEPING,
  MAX_LISTED_STORES,
  MONTHLY_EXTRA,
  PLAN,
  PRICE_BANDS,
  TOP_UP_PACK,
  monthlyBill,
} from "../src/lib/pricing.ts";

/** Figures in the copy that are another vendor's list price, not Rhea's. Each is dated in the copy itself. */
const OTHER_VENDORS = new Map([[249, "vinSUITE's starting price, read October 2026"]]);

function strings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => strings(item, out));
  return out;
}

const ALL = strings(copy);
const TEXT = ALL.join("\n");
const dollars = (text) => [...text.matchAll(/\$(\d[\d,]*)/g)].map((m) => Number(m[1].replace(/,/g, "")));

test("every dollar figure in the copy comes from pricing.ts (or is a dated vendor price)", () => {
  const allowed = new Set([
    ...PRICE_BANDS.flatMap((band) => [band.annual, band.annual + MONTHLY_EXTRA]),
    MONTHLY_EXTRA,
    PLAN.setupFee.base,
    PLAN.setupFee.perStore,
    TOP_UP_PACK.price,
    BOOKKEEPING.perLocationLow,
    BOOKKEEPING.perStoreHigh,
    ...Array.from({ length: MAX_LISTED_STORES }, (_, i) => monthlyBill(i + 1)),
    ...OTHER_VENDORS.keys(),
  ]);
  const found = dollars(TEXT);
  assert.ok(found.length > 10, "the copy should name its prices");
  for (const amount of found) assert.ok(allowed.has(amount), `$${amount} is in the copy but not in pricing.ts`);
});

test("the first locations' price is the first band, annual and monthly", () => {
  const first = PRICE_BANDS[0].annual;
  assert.equal(copy.PRICING.headline.amount, `$${first}`);
  assert.match(copy.PRICING.headline.text, new RegExp(`Billed monthly, \\$${MONTHLY_EXTRA} more per location\\.`));
  assert.match(copy.PAGES.pricing.description, new RegExp(`^\\$${first} per tasting room a month, billed annually\\.`));
  const faq = Object.fromEntries(copy.HOME.faqs.map((f) => [f.q, f.a]));
  assert.match(faq["Is one tasting room enough?"], new RegExp(`one location, \\$${monthlyBill(1)} a month billed annually`));
  assert.match(faq["What does it cost?"], new RegExp(`^\\$${first} per tasting room a month for one to three, billed annually`));
});

test("the copy's table is pricing.ts's bands", () => {
  assert.equal(copy.PRICING.table.length, PRICE_BANDS.length);
  PRICE_BANDS.forEach((band, i) => {
    const row = copy.PRICING.table[i];
    assert.equal(row.locations, `${band.from} to ${band.to}`);
    assert.equal(row.annually, `$${band.annual}`);
    assert.equal(row.monthly, `$${band.annual + MONTHLY_EXTRA}`);
  });
  assert.equal(copy.PRICING.overMax.locations, `Over ${MAX_LISTED_STORES}`);
});

test("the worked example is monthlyBill(2)", () => {
  assert.match(copy.PRICING.location.body, new RegExp(`2 × \\$${PRICE_BANDS[0].annual} = \\$${monthlyBill(2)}`));
});

test("trial, guarantee, setup fee, file allowance and the group threshold match PLAN", () => {
  const { trialDays, guaranteeDays, setupFee, filesPerStore, onboardingPackPerStore, onboardingDays, groupFrom } = PLAN;
  for (const text of [copy.PAGES.pricing.description, copy.PRICING.terms.body, copy.HOME.faqs[6].a]) {
    assert.match(text, new RegExp(`${trialDays}-day free trial`));
    assert.match(text, new RegExp(`${guaranteeDays}-day money-back guarantee`));
  }
  for (const text of [copy.PRICING.terms.body, copy.HOME.faqs[6].a]) {
    assert.match(text, new RegExp(`\\$${setupFee.base} plus \\$${setupFee.perStore} a location`));
  }
  const terms = copy.PRICING.terms.body;
  assert.match(terms, new RegExp(`From ${groupFrom} locations, a named contact`));
  assert.match(terms, new RegExp(`${filesPerStore} unfamiliar files read per location a month`));
  assert.match(terms, new RegExp(`plus ${onboardingPackPerStore} per location in the first ${onboardingDays} days`));
  assert.match(terms, new RegExp(`packs of ${TOP_UP_PACK.files} for \\$${TOP_UP_PACK.price}`));
  assert.match(copy.WAITLIST_CTA.body, new RegExp(`groups of ${groupFrom} or more locations`));
  // "one to three" in words, in the waitlist block and the FAQ: the first band, below the group threshold.
  assert.match(copy.WAITLIST_CTA.body, /one to three can start/);
  assert.equal(PRICE_BANDS[0].to, 3);
  assert.equal(groupFrom - 1, 3);
});

test("the bookkeeper range is pricing.ts's", () => {
  assert.match(
    copy.PRICING.compared.body,
    new RegExp(`\\$${BOOKKEEPING.perLocationLow} to \\$${BOOKKEEPING.perStoreHigh} a month plus QuickBooks`),
  );
});
