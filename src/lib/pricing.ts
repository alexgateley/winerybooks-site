/**
 * Rhea's published prices (decided October 17, 2026: one plan whose price per
 * store steps down as stores are added) and the list prices the Pricing page
 * compares them with. Every number on /pricing, and the pricing answer in the
 * home page FAQ, comes from this file, so a price changes in one place and the
 * bars, the arithmetic and the tables stay in step.
 *
 * Comparison rules (public, comparative advertising):
 * - Named products use only prices from the vendor's own page, or a capture of
 *   that page, each listed in COMPARISON_SOURCES with its date.
 * - Bookkeepers have no list price, so they use a typical market range, labeled
 *   with its source.
 * - Where a vendor offers yearly billing, its monthly equivalent is used, as
 *   Rhea's prices are the billed-annually ones.
 * - Ranges stay ranges. No savings figures.
 */

/**
 * One plan, every feature at every size. Each store is priced in its band, like
 * tax brackets: a 5-store group pays the 1–3 price for three stores and the
 * 4–10 price for two. So the price per store falls as stores are added, and
 * adding a store never raises what the others cost. Billed annually, a month.
 */
export const PRICE_BANDS = [
  { from: 1, to: 3, annual: 149 },
  { from: 4, to: 10, annual: 139 },
  { from: 11, to: 20, annual: 129 },
  { from: 21, to: 30, annual: 119 },
] as const;

/** Above this many stores, the price is quoted. */
export const MAX_LISTED_STORES = 30;

/** Billed monthly instead of annually: this much more per store, in every band. */
export const MONTHLY_EXTRA = 20;

export const PLAN = {
  filesPerStore: 40,
  /** Extra unfamiliar files Rhea reads per store in the first `onboardingDays`, for historic files. */
  onboardingPackPerStore: 50,
  onboardingDays: 60,
  /** The free trial, at every size, no payment method needed (the founder's decision of October 19, 2026). */
  trialDays: 7,
  /** Money-back guarantee (the founder's decision of October 19, 2026): at every size, a full refund of the subscription within this many days of the first payment. The guided setup fee is not refunded. */
  guaranteeDays: 60,
  /** Optional guided setup (the founder's decision of October 19, 2026: optional for every account, never refunded): a flat amount plus an amount per store, for 1 to 30 stores. */
  setupFee: { base: 199, perStore: 49 },
  /** From this many stores: a named contact and annual invoices by bank transfer. (The paid pilot was retired on October 19, 2026.) */
  groupFrom: 4,
} as const;

export const TOP_UP_PACK = { files: 100, price: 25 } as const;

const dollars = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Whole dollars: 1500 -> "$1,500". */
export function usd(amount: number): string {
  return `$${dollars.format(amount)}`;
}

/** How many of `stores` fall in each band, with that band's price. */
export function priceBreakdown(stores: number): { count: number; annual: number }[] {
  if (stores > MAX_LISTED_STORES) throw new Error(`Over ${MAX_LISTED_STORES} stores is quoted`);
  return PRICE_BANDS.map((band) => ({
    count: Math.max(0, Math.min(stores, band.to) - band.from + 1),
    annual: band.annual,
  })).filter((part) => part.count > 0);
}

/** The bill a month for `stores`, billed annually. */
export function monthlyBill(stores: number): number {
  return priceBreakdown(stores).reduce((sum, part) => sum + part.count * part.annual, 0);
}

/** "3 × $149 + 2 × $139 = $725" (or "1 store × $149" for one store). */
export function billArithmetic(stores: number): string {
  const parts = priceBreakdown(stores);
  if (stores === 1) return `1 store × ${usd(parts[0].annual)}`;
  const terms = parts.map((part) => `${part.count} × ${usd(part.annual)}`).join(" + ");
  return `${terms} = ${usd(monthlyBill(stores))}`;
}

/** The lowest listed price per store. */
export const LOWEST_PER_STORE = PRICE_BANDS[PRICE_BANDS.length - 1].annual;
/** The price per store for the first stores. */
export const FIRST_STORES_PRICE = PRICE_BANDS[0].annual;

/** Axis label: 1500 -> "$1.5K", 400 -> "$400". */
export function usdCompact(amount: number): string {
  return amount >= 1000 ? `$${amount / 1000}K` : usd(amount);
}

/* ------------------------------------------------------------------------ */
/* List prices used in the comparison (as of October 2026).                 */
/* ------------------------------------------------------------------------ */

/** QuickBooks Online list prices, a month for each company file [1]. */
const QBO = { simpleStart: 38, essentials: 85, plus: 140 } as const;

/**
 * A bookkeeper, a month for each store, a typical market range [2]: a local
 * bookkeeper from about $300 for one location, franchise specialists from about
 * $400 for each unit, and $500 an entity quoted as the market rate. Franchise
 * owners told Rhea they pay $400–$500 a store, which this range matches.
 */
export const BOOKKEEPING = {
  perLocationLow: 300,
  perEntityLow: 400,
  perStoreHigh: 500,
} as const;

/** MarginEdge: $350 per location a month, 10% off billed annually [3]. */
const MARGINEDGE = { monthly: 350, annual: 350 - 350 / 10 } as const;

/** Restaurant365 Essential: "$469–$499 per location/month" [4]. */
const R365_ESSENTIAL = { low: 469, high: 499 } as const;

/**
 * Bookkeep, a POS-to-QuickBooks sync, per entity (one chart of accounts) a
 * month [5]. Lite is month to month only; annual plans get 2 months free.
 */
const BOOKKEEP = { lite: 19, starter: 49, pro: 199 } as const;
const BOOKKEEP_STARTER = Math.round((BOOKKEEP.starter * 10) / 12); // 41
const BOOKKEEP_PRO = Math.round((BOOKKEEP.pro * 10) / 12); // 166

/** Fathom Gold: one report across up to 25 companies, a month [6]. */
const FATHOM_GOLD = 540;

/** Salon software's own QuickBooks syncs, a month [7]. */
const SALON_SYNC = { vagaro: 10, boulevardPerLocation: 45 } as const;

/* ------------------------------------------------------------------------ */
/* The three scenarios.                                                     */
/* ------------------------------------------------------------------------ */

export type OptionId = "rhea" | "books" | "sync" | "suite";

export const OPTION_LABELS: Record<OptionId, string> = {
  rhea: "Rhea",
  books: "QuickBooks + a bookkeeper",
  sync: "QuickBooks + a POS sync tool",
  suite: "Restaurant back-office suite",
};

export type CostOption = {
  id: OptionId;
  label: string;
  /** Monthly cost; `high` equals `low` for a single price. */
  low: number;
  high: number;
  /** A one-time cost, shown beside the bar, never inside it. */
  oneTime?: string;
  /** The arithmetic behind the bar, in one sentence. */
  math: string;
  /** Numbers in COMPARISON_SOURCES. */
  sources: number[];
};

export type Scenario = {
  id: string;
  title: string;
  assumption: string;
  axisMax: number;
  axisStep: number;
  options: CostOption[];
};

/** The optional one-time setup fee for this many stores: $199 + $49 a store. */
export function setupFeeFor(stores: number): number {
  return PLAN.setupFee.base + PLAN.setupFee.perStore * stores;
}

const singleBooksLow = QBO.simpleStart + BOOKKEEPING.perLocationLow;
const singleBooksHigh = QBO.essentials + BOOKKEEPING.perStoreHigh;

const singleSyncLow = QBO.simpleStart + SALON_SYNC.vagaro;
const singleSyncHigh = QBO.essentials + SALON_SYNC.boulevardPerLocation;

const CHAIN = 5;
const GROUP = 15;

const chainBooksLow = QBO.plus + CHAIN * BOOKKEEPING.perLocationLow;
const chainBooksHigh = QBO.plus + CHAIN * BOOKKEEPING.perStoreHigh;

const groupBooksLow = GROUP * (QBO.essentials + BOOKKEEPING.perEntityLow);
const groupBooksHigh = GROUP * (QBO.plus + BOOKKEEPING.perStoreHigh);

const chainSyncLow = QBO.plus + BOOKKEEP_STARTER;
const chainSyncHigh = QBO.plus + BOOKKEEP_PRO;

const groupSyncLow = GROUP * (QBO.essentials + BOOKKEEP_STARTER) + FATHOM_GOLD;
const groupSyncHigh = GROUP * (QBO.plus + BOOKKEEP_PRO) + FATHOM_GOLD;

export const SCENARIOS: Scenario[] = [
  {
    id: "single",
    title: "One coffee shop or salon",
    assumption: "One location, one company.",
    axisMax: 600,
    axisStep: 200,
    options: [
      {
        id: "rhea",
        label: OPTION_LABELS.rhea,
        low: monthlyBill(1),
        high: monthlyBill(1),
        oneTime: `Guided setup, if you want it: ${usd(setupFeeFor(1))} (${usd(PLAN.setupFee.base)} + ${usd(PLAN.setupFee.perStore)} a store), paid once you subscribe`,
        math: `${billArithmetic(1)}, billed annually.`,
        sources: [],
      },
      {
        id: "books",
        label: OPTION_LABELS.books,
        low: singleBooksLow,
        high: singleBooksHigh,
        math: `QuickBooks Online Simple Start (${usd(QBO.simpleStart)}) or Essentials (${usd(QBO.essentials)}), plus a bookkeeper at ${usd(BOOKKEEPING.perLocationLow)}–${usd(BOOKKEEPING.perStoreHigh)} a month: ${usd(QBO.simpleStart)} + ${usd(BOOKKEEPING.perLocationLow)} = ${usd(singleBooksLow)} to ${usd(QBO.essentials)} + ${usd(BOOKKEEPING.perStoreHigh)} = ${usd(singleBooksHigh)}.`,
        sources: [1, 2],
      },
      {
        id: "sync",
        label: OPTION_LABELS.sync,
        low: singleSyncLow,
        high: singleSyncHigh,
        math: `QuickBooks Online Simple Start (${usd(QBO.simpleStart)}) or Essentials (${usd(QBO.essentials)}), plus a sync that posts each day’s sales for ${usd(SALON_SYNC.vagaro)}–${usd(SALON_SYNC.boulevardPerLocation)}: Vagaro’s QuickBooks sync for salons is ${usd(SALON_SYNC.vagaro)}, Bookkeep (Square, Clover, Toast and others) ${usd(BOOKKEEP.lite)}–${usd(BOOKKEEP_STARTER)}, and Boulevard’s sync ${usd(SALON_SYNC.boulevardPerLocation)} per location. ${usd(QBO.simpleStart)} + ${usd(SALON_SYNC.vagaro)} = ${usd(singleSyncLow)} to ${usd(QBO.essentials)} + ${usd(SALON_SYNC.boulevardPerLocation)} = ${usd(singleSyncHigh)}.`,
        sources: [1, 5, 7],
      },
    ],
  },
  {
    id: "chain",
    title: "A 5-location chain",
    assumption: "Five locations in one company, such as a café or restaurant chain.",
    axisMax: 3000,
    axisStep: 1000,
    options: [
      {
        id: "rhea",
        label: OPTION_LABELS.rhea,
        low: monthlyBill(CHAIN),
        high: monthlyBill(CHAIN),
        oneTime: `Guided setup, if you want it: ${usd(setupFeeFor(CHAIN))} (${usd(PLAN.setupFee.base)} + ${CHAIN} × ${usd(PLAN.setupFee.perStore)})`,
        math: `${CHAIN} stores: ${billArithmetic(CHAIN)}, billed annually.`,
        sources: [],
      },
      {
        id: "books",
        label: OPTION_LABELS.books,
        low: chainBooksLow,
        high: chainBooksHigh,
        math: `One company on QuickBooks Online Plus (${usd(QBO.plus)}, which tracks locations), plus ${usd(BOOKKEEPING.perLocationLow)}–${usd(BOOKKEEPING.perStoreHigh)} of bookkeeping for each of the ${CHAIN} locations: ${usd(QBO.plus)} + ${CHAIN} × ${usd(BOOKKEEPING.perLocationLow)} = ${usd(chainBooksLow)} to ${usd(QBO.plus)} + ${CHAIN} × ${usd(BOOKKEEPING.perStoreHigh)} = ${usd(chainBooksHigh)}.`,
        sources: [1, 2],
      },
      {
        id: "sync",
        label: OPTION_LABELS.sync,
        low: chainSyncLow,
        high: chainSyncHigh,
        math: `One company on QuickBooks Online Plus (${usd(QBO.plus)}), plus one Bookkeep subscription, since locations booked to one chart of accounts share it: Starter, about ${usd(BOOKKEEP_STARTER)}, to Pro, about ${usd(BOOKKEEP_PRO)}, which splits sales across up to 5 channels (both billed annually): ${usd(QBO.plus)} + ${usd(BOOKKEEP_STARTER)} = ${usd(chainSyncLow)} to ${usd(QBO.plus)} + ${usd(BOOKKEEP_PRO)} = ${usd(chainSyncHigh)}.`,
        sources: [1, 5],
      },
      {
        id: "suite",
        label: OPTION_LABELS.suite,
        low: CHAIN * MARGINEDGE.annual,
        high: CHAIN * R365_ESSENTIAL.high,
        math: `${CHAIN} locations × ${usd(MARGINEDGE.annual)} (MarginEdge: ${usd(MARGINEDGE.monthly)} less 10% billed annually) = ${usd(CHAIN * MARGINEDGE.annual)}, to ${CHAIN} × ${usd(R365_ESSENTIAL.high)} (the top of Restaurant365 Essential’s ${usd(R365_ESSENTIAL.low)}–${usd(R365_ESSENTIAL.high)}) = ${usd(CHAIN * R365_ESSENTIAL.high)}. MarginEdge runs alongside your accounting software, which costs extra.`,
        sources: [3, 4],
      },
    ],
  },
  {
    id: "group",
    title: "A 15-location franchise group",
    assumption: "Fifteen stores, each its own LLC with its own books.",
    axisMax: 10000,
    axisStep: 2000,
    options: [
      {
        id: "rhea",
        label: OPTION_LABELS.rhea,
        low: monthlyBill(GROUP),
        high: monthlyBill(GROUP),
        oneTime: `${usd(setupFeeFor(GROUP))} setup (${usd(PLAN.setupFee.base)} + ${GROUP} × ${usd(PLAN.setupFee.perStore)})`,
        math: `${GROUP} stores: ${billArithmetic(GROUP)}, billed annually.`,
        sources: [],
      },
      {
        id: "books",
        label: OPTION_LABELS.books,
        low: groupBooksLow,
        high: groupBooksHigh,
        math: `${GROUP} companies on QuickBooks Online Essentials (${usd(QBO.essentials)}) or Plus (${usd(QBO.plus)}), plus ${usd(BOOKKEEPING.perEntityLow)}–${usd(BOOKKEEPING.perStoreHigh)} of bookkeeping for each LLC: ${GROUP} × (${usd(QBO.essentials)} + ${usd(BOOKKEEPING.perEntityLow)}) = ${usd(groupBooksLow)} to ${GROUP} × (${usd(QBO.plus)} + ${usd(BOOKKEEPING.perStoreHigh)}) = ${usd(groupBooksHigh)}.`,
        sources: [1, 2],
      },
      {
        id: "sync",
        label: OPTION_LABELS.sync,
        low: groupSyncLow,
        high: groupSyncHigh,
        math: `${GROUP} companies on QuickBooks Online Essentials (${usd(QBO.essentials)}) or Plus (${usd(QBO.plus)}), each with Bookkeep Starter (about ${usd(BOOKKEEP_STARTER)}) or Pro (about ${usd(BOOKKEEP_PRO)}), billed annually, plus Fathom Gold (${usd(FATHOM_GOLD)} for up to 25 companies) for one P&L across the LLCs: ${GROUP} × (${usd(QBO.essentials)} + ${usd(BOOKKEEP_STARTER)}) + ${usd(FATHOM_GOLD)} = ${usd(groupSyncLow)} to ${GROUP} × (${usd(QBO.plus)} + ${usd(BOOKKEEP_PRO)}) + ${usd(FATHOM_GOLD)} = ${usd(groupSyncHigh)}.`,
        sources: [1, 5, 6],
      },
      {
        id: "suite",
        label: OPTION_LABELS.suite,
        low: GROUP * MARGINEDGE.annual,
        high: GROUP * R365_ESSENTIAL.high,
        math: `${GROUP} locations × ${usd(MARGINEDGE.annual)} (MarginEdge, billed annually) = ${usd(GROUP * MARGINEDGE.annual)}, to ${GROUP} × ${usd(R365_ESSENTIAL.high)} (Restaurant365 Essential) = ${usd(GROUP * R365_ESSENTIAL.high)}. MarginEdge runs alongside your accounting software, which costs extra.`,
        sources: [3, 4],
      },
    ],
  },
];

/* ------------------------------------------------------------------------ */
/* Sources, numbered as cited in the arithmetic.                            */
/* ------------------------------------------------------------------------ */

export type Source = {
  n: number;
  publisher: string;
  title: string;
  url: string;
  detail: string;
  extra?: { text: string; title: string; url: string };
};

export const COMPARISON_SOURCES: Source[] = [
  {
    n: 1,
    publisher: "Intuit",
    title: "QuickBooks Online pricing",
    url: "https://quickbooks.intuit.com/pricing/",
    detail:
      "List prices a month: Simple Start $38, Essentials $85, Plus $140. Checked October 17, 2026. Intuit’s offer of 50% off for the first 3 months isn’t used here.",
    extra: {
      text: "Each QuickBooks company, one per LLC, needs its own subscription:",
      title: "Toolradar, accounting software for franchises, September 23, 2026",
      url: "https://toolradar.com/guides/best-accounting-software-for-franchises",
    },
  },
  {
    n: 2,
    publisher: "Pilot",
    title: "Franchise bookkeeping cost",
    url: "https://pilot.com/blog/franchise-bookkeeping-cost",
    detail:
      "Published September 10, 2026. A local or independent bookkeeper charges about $300–$900 a month for a single location; firms that specialize in franchises about $400–$2,500 or more, with the cost growing roughly per unit, since each LLC is its own set of books. A typical market range, not any one firm’s price.",
    extra: {
      text: "A franchise lender puts the current market rate at $500 a month for each entity:",
      title: "Exponent Financial, bookkeeping for franchise operators, read October 17, 2026",
      url: "https://exponentfi.com/ai-bookkeeping",
    },
  },
  {
    n: 3,
    publisher: "MarginEdge",
    title: "Pricing",
    url: "https://www.marginedge.com/pricing/",
    detail: "$350 per location a month, 10% off with annual billing. Checked October 17, 2026.",
  },
  {
    n: 4,
    publisher: "Restaurant365",
    title: "Restaurant operations platform cost comparison",
    url: "https://www.restaurant365.com/blog/restaurant-operations-platform-cost-comparison-r365-vs-alternatives/",
    detail:
      "On Restaurant365’s own site, undated; read October 17, 2026. Essential plan $469–$499 per location a month. Restaurant365’s pricing page gives quotes only.",
  },
  {
    n: 5,
    publisher: "Bookkeep",
    title: "Pricing",
    url: "https://bookkeep.com/pricing",
    detail:
      "Per entity (one chart of accounts) a month: Lite $19, month to month only, up to $200,000 in yearly revenue and 1 sales channel; Starter $49; Pro $199, up to 5 segmented sales channels. Annual plans get 2 months free, about $41 and $166 a month. Checked October 17, 2026.",
  },
  {
    n: 6,
    publisher: "Toolradar",
    title: "Fathom pricing",
    url: "https://toolradar.com/tools/fathom-hq/pricing",
    detail:
      "Gold $540 a month for up to 25 companies. Verified by Toolradar from Fathom’s pricing page, September 2026; read October 17, 2026.",
  },
  {
    n: 7,
    publisher: "Toolradar",
    title: "Best accounting software for salons",
    url: "https://toolradar.com/guides/best-accounting-software-for-salons",
    detail:
      "September 24, 2026. Vagaro’s QuickBooks sync $10 a month, with a separate QuickBooks subscription; Boulevard’s $45 per location a month, on its Premier plan and up.",
  },
];

/* ------------------------------------------------------------------------ */
/* What each option includes.                                               */
/* ------------------------------------------------------------------------ */

/** `none` = a plain-words answer with no mark (yes/no questions where "no" is good). */
export type Mark = "yes" | "partly" | "no" | "none";
export type IncludedCell = { mark: Mark; text: string };

export const INCLUDED_ROWS: { feature: string; cells: Record<OptionId, IncludedCell> }[] = [
  {
    feature: "Daily balanced books from the register",
    cells: {
      rhea: { mark: "yes", text: "Yes, every store, every morning" },
      books: { mark: "partly", text: "When your bookkeeper posts them" },
      sync: { mark: "yes", text: "Daily sales entries, posted to QuickBooks" },
      suite: { mark: "partly", text: "Daily P&L; Restaurant365 also keeps the books" },
    },
  },
  {
    feature: "Deposit matching",
    cells: {
      rhea: { mark: "yes", text: "Yes, sales matched to bank deposits" },
      books: { mark: "yes", text: "Your bookkeeper reconciles the bank" },
      sync: { mark: "partly", text: "Varies by tool and plan" },
      suite: { mark: "partly", text: "Varies by product" },
    },
  },
  {
    feature: "Labor %",
    cells: {
      rhea: { mark: "yes", text: "Daily, by store, from the time clock" },
      books: { mark: "partly", text: "From payroll, once it’s posted" },
      sync: { mark: "no", text: "Not included" },
      suite: { mark: "partly", text: "Varies by product" },
    },
  },
  {
    feature: "Per-location P&L across LLCs",
    cells: {
      rhea: { mark: "yes", text: "Per store, and across all your LLCs" },
      books: { mark: "partly", text: "By location within one company, not across companies" },
      sync: { mark: "partly", text: "By location in QuickBooks; across LLCs with a reporting tool such as Fathom" },
      suite: { mark: "partly", text: "Per location; across LLCs varies" },
    },
  },
  {
    feature: "Month close",
    cells: {
      rhea: { mark: "yes", text: "Yes, checked against your bookkeeper’s books" },
      books: { mark: "yes", text: "Your bookkeeper closes the month" },
      sync: { mark: "no", text: "Not included; your bookkeeper closes the month" },
      suite: { mark: "partly", text: "In Restaurant365, which is a full ledger" },
    },
  },
  {
    feature: "Bill pay and inventory",
    cells: {
      rhea: { mark: "partly", text: "Bills, approvals and what you owe by LLC; no inventory" },
      books: { mark: "partly", text: "In some QuickBooks plans or add-ons" },
      sync: { mark: "partly", text: "In some QuickBooks plans or add-ons" },
      suite: { mark: "yes", text: "Included" },
    },
  },
  {
    feature: "QuickBooks required?",
    cells: {
      rhea: { mark: "none", text: "No. Optional, at the same price" },
      books: { mark: "none", text: "Yes" },
      sync: { mark: "none", text: "Yes, or another accounting system" },
      suite: { mark: "none", text: "Restaurant365 replaces it; MarginEdge works with it" },
    },
  },
  {
    feature: "Someone doing data entry",
    cells: {
      rhea: { mark: "none", text: "No, for daily sales, labor and deposits" },
      books: { mark: "none", text: "Yes, your bookkeeper" },
      sync: { mark: "none", text: "Less: daily sales post on their own" },
      suite: { mark: "none", text: "Less: POS sales come in on their own" },
    },
  },
];
