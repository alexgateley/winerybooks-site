/**
 * Every word the pages show, from the winerybooks.com copy (October 25, 2026), word for word. Prices in this text are
 * checked against src/lib/pricing.ts by tests/pricing.test.mjs, which `npm run build` runs first: a figure here that
 * pricing.ts doesn't back fails the build. The pricing table itself is drawn from pricing.ts.
 *
 * Plain strings only (no imports, no JSX), so the test can read this file with Node directly.
 */

export type Bullet = { lead?: string; text: string };
export type PageMeta = { path: string; title: string; description: string; crumb: string };

export const PAGES = {
  home: {
    path: "/",
    crumb: "Home",
    title: "Winery Books: tasting room books, daily",
    description:
      "Rhea keeps a winery’s tasting room, club and event sales in balanced daily books, with labor % by room. Excise and vintage costs stay with your CPA.",
  },
  tastingRoom: {
    path: "/tasting-room/",
    crumb: "Tasting room",
    title: "Tasting room books and staffing",
    description:
      "Each tasting room’s day booked by morning: flights, bottles, club pickups and deposits. Labor % daily and the week you’re posting, from your own history.",
  },
  wineClub: {
    path: "/wine-club/",
    crumb: "Wine club",
    title: "Wine club sales in the books",
    description:
      "Club shipments, pickups and release weekends booked as sales the day they are charged, matched to deposits. Plain about prepayments.",
  },
  connect: {
    path: "/connect/",
    crumb: "Connect",
    title: "What connects to Winery Books",
    description:
      "Square, Clover, Toast, Shopify POS and 7shifts connect directly. Commerce7 and WineDirect by report upload today; a direct connection is planned.",
  },
  pricing: {
    path: "/pricing/",
    crumb: "Pricing",
    title: "Winery Books pricing",
    description:
      "$149 per tasting room a month, billed annually. 7-day free trial, 60-day money-back guarantee. QuickBooks optional at the same price.",
  },
  about: {
    path: "/about/",
    crumb: "About",
    title: "About Winery Books and Rhea",
    description:
      "Winery Books is Rhea, automated books, labor and per-location profit, for owner-run wineries. Operated by Grip Theory LLC, California.",
  },
} satisfies Record<string, PageMeta>;

/** The header and footer links, in the copy's order. */
export const NAV = [PAGES.tastingRoom, PAGES.wineClub, PAGES.connect, PAGES.pricing, PAGES.about].map((page) => ({
  href: page.path,
  label: page.crumb,
}));

/* ------------------------------------------------------------------ */
/* On every page                                                      */
/* ------------------------------------------------------------------ */

export const WAITLIST_CTA = {
  heading: "Join the pilot waitlist.",
  body: "Tell us about your tasting room and your POS and we’ll set up a short call. Pilots are open for groups of 4 or more locations; one to three can start once self-serve sign-up opens.",
};

export const FOOTER_LINE = "Winery Books is Rhea for wineries, operated by Grip Theory LLC, California.";

/* ------------------------------------------------------------------ */
/* Home                                                               */
/* ------------------------------------------------------------------ */

export const HOME = {
  eyebrow: "For owner-run wineries, mostly direct to consumer",
  /** The size the eyebrow used to carry, kept beside the pilot line. */
  size: "For wineries of 1,000 to 25,000 cases.",
  h1: "The tasting room’s books and staffing, daily.",
  lede: "Rhea turns each tasting room’s day into balanced books by morning: flights, bottles, club pickups, tips, card fees and deposits. Labor % from the time clock, and next week’s hours from your own history. Statements, bills and the month close too. QuickBooks optional. Your CPA keeps the winemaking costs, excise tax and vintage inventory.",
  primaryButton: "Join the pilot waitlist",
  secondaryButton: "See the demo",
  trust: "Rhea is in pilot.",
  features: [
    {
      title: "Every day booked by morning.",
      body: "Tasting fees, flights, by the glass, bottles, merchandise, club pickups and events become balanced entries for each room, matched to card deposits.",
    },
    {
      title: "Your words, your accounts.",
      body: "A new POS label such as “Reserve flight” waits for you to say where it goes. Nothing is guessed.",
    },
    {
      title: "The week you’re posting.",
      body: "For each room and day, what it usually sells with a likely range, why it moves (a holiday weekend, your release weekend, rain in the National Weather Service forecast), the hours that suggests, and how close Rhea’s estimates have been. An estimate from your own history.",
    },
    {
      title: "Labor % while you can still change the schedule.",
      body: "Each room’s labor % against your target every morning, and an overtime alert before the week ends.",
    },
    {
      title: "Statements tied out to the cent.",
      body: "Drop in an OFX, QFX, QBO or CSV statement. Rhea suggests a home for each merchant, you confirm, and the month is reconciled only when the books match the statement exactly.",
    },
    {
      title: "Bills by email or photo.",
      body: "You check what Rhea read, approve by your rules, pay by bank transfer. Payments are sent by Stripe.",
    },
    {
      title: "One winery, several LLCs.",
      body: "The estate room and the downtown shop each keep their own books; you see profit for each and for the whole.",
    },
    {
      title: "A morning email.",
      body: "Each room’s sales, labor % and over/short, and what needs a look, worst first.",
    },
    {
      title: "Month close and compare.",
      body: "Close each month; if a bookkeeper keeps QuickBooks, Rhea lines up against their books account by account.",
    },
    {
      title: "A year-end package for your CPA.",
      body: "Trial balance, P&L by month and room, rollforwards, open items, each number’s source. Prepared by Rhea from your books. Not a tax return and not tax advice.",
    },
  ],
  cpa: {
    heading: "Rhea does the tasting room. Your CPA does the winery.",
    body: "Vintage work in progress and cost per bottle, TTB excise tax and CBMA credits, Section 263A, and club prepayments held as deferred revenue belong to a CPA who knows wine. Rhea keeps the daily side complete so that work goes fast.",
  },
  faqs: [
    {
      q: "Do we need QuickBooks?",
      a: "No. Rhea keeps its own books for each tasting room, statements, bills and month close included. If you use QuickBooks Online, Rhea can also post each day’s entries into your company. Same price either way.",
    },
    {
      q: "What about our CPA?",
      a: "Keep them. Rhea is not tax software and files nothing. Your CPA keeps winemaking costs, excise tax and inventory, gets a year-end package from Rhea’s books, and has a free seat.",
    },
    {
      q: "We run Commerce7 or WineDirect. Does Rhea connect?",
      a: "Not directly today. Drop in the daily sales report it exports (CSV or Excel); once you confirm the layout, the next upload goes straight through. A direct connection is planned. Square, Clover, Toast and Shopify POS connect directly now.",
    },
    {
      q: "Does Rhea do excise tax or TTB reports?",
      a: "No. Those stay with your compliance person or CPA. Rhea books sales tax collected and the payments you make.",
    },
    {
      q: "Does Rhea replace our club software?",
      a: "No. It charges members, runs pickups and ships. Rhea books what it charged, the day it charged it, and matches the deposits.",
    },
    {
      q: "Is one tasting room enough?",
      a: "Yes: one location, $149 a month billed annually. Rhea is in pilot; one to three locations can start once self-serve sign-up opens. Join the waitlist.",
    },
    {
      q: "What does it cost?",
      a: "$149 per tasting room a month for one to three, billed annually, stepping down as you add. 7-day free trial, no payment method. 60-day money-back guarantee. Guided setup, if you want it, $199 plus $49 a location, once.",
    },
    {
      q: "What does Rhea never do?",
      a: "Change anything in your POS, club software or schedule. Guess where a sale or a statement line goes. Hold your money. Collect Social Security numbers or full bank or card numbers. Run payroll, track inventory, cost a vintage or file a return.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* /tasting-room/                                                     */
/* ------------------------------------------------------------------ */

export const TASTING_ROOM = {
  h1: "Every tasting room day, booked by morning. Next week, staffed from your own history.",
  lede: "Rhea reads your POS and time clock, books the day, and on the day you write the schedule says what each room usually sells and the hours that suggests.",
  books: {
    title: "What Rhea books",
    bullets: [
      {
        text: "Tasting fees, flights, by the glass, bottles, merchandise, club pickups and event tickets, each to the account you chose once; sales tax, tips, card fees and refunds on their own lines. Any register difference goes to Cash Over/Short, never dropped.",
      },
      {
        text: "Card sales matched to payouts and deposits. Gift cards sold sit in a liability line until redeemed. Member and trade comps show as discounts.",
      },
    ] as Bullet[],
  },
  labor: {
    title: "Labor",
    bullets: [
      {
        text: "Labor % per room against your target each morning, from Square, Clover, Toast, 7shifts or a time-punch report; overtime alerts before the week ends, daily overtime for California, Alaska and Nevada.",
      },
      {
        text: "Associates appear by display name and hours. No wage in an email, no Social Security number anywhere. Payroll, tips and commission are paid by your provider; Rhea books payroll as one summary line.",
      },
    ] as Bullet[],
  },
  week: {
    title: "The week you’re posting",
    intro:
      "On the day you write the schedule (Thursdays, seven days ahead, until you say otherwise), the Labor page shows the week it covers, one card per room, a row per day:",
    /** One bullet per line of the copy; a line can hold several bold leads. */
    lines: [
      [
        {
          lead: "Usually $X, likely $A to $B",
          text: ": what the room usually sells that weekday and the range its own ups and downs make likely, the last eight same weekdays as dots. Under five comparable days: rough estimate.",
        },
      ],
      [
        {
          lead: "What moved it",
          text: ": a holiday weekend, a release weekend or club pickup day you noted, an event from your calendar once you confirm it, the weather near the room from the National Weather Service’s seven-day forecast and NOAA’s history, each marked learned, rough estimate or Rhea’s assumption. Weather counts only where it has measurably helped at that room.",
        },
      ],
      [
        { lead: "Hours", text: ": what that suggests at your labor target and average wage, never below the fewest on shift you set. " },
        { lead: "If it’s busy", text: ": hours for a day busier than one in four. " },
        { lead: "Busiest", text: ": when the rush usually is and how many people at once." },
      ],
      [
        { lead: "Do first", text: ": the day whose hours differ most from your 7shifts schedule or last year, and why. " },
        { lead: "Since you posted", text: ": a day that moved three hours or more after the numbers were frozen." },
      ],
      [
        {
          lead: "Something coming up?",
          text: " Tell Rhea about a release weekend or a bus tour with one note: the kind and how much busier or slower. Rhea shows “with your note” beside its own number and learns from the day once it is past.",
        },
      ],
      [
        {
          lead: "How close Rhea was",
          text: ": Rhea freezes each day’s numbers on your schedule-writing day and checks them against what the room sold: “within 10% on 22 of the last 28 days.”",
        },
      ],
    ] as Bullet[][],
    closing:
      "The morning email carries the week’s lines on your schedule-writing day. Look back shows sales per labor hour by weekday, over- and under-staffed days, and what holidays and your own events do to each room. An estimate from your own history, never a promise. Only the weather is a forecast, the Weather Service’s. Rhea changes no schedule.",
  },
};

/* ------------------------------------------------------------------ */
/* /wine-club/                                                        */
/* ------------------------------------------------------------------ */

export const WINE_CLUB = {
  h1: "Club shipments and pickups, in the books the day they are charged.",
  lede: "Your club software charges members and ships. Rhea books what it charged and ties it to the deposits.",
  booked: {
    title: "What is booked",
    bullets: [
      {
        text: "A club run comes in from your POS connection or the club platform’s daily sales report, as sales by category on the charge date, shipping and sales tax on their own lines.",
      },
      {
        text: "Pickup and release weekends ring up as tasting room days: pickups, extra bottles, flights and event fees in one balanced entry.",
      },
      { text: "Refunds and member comps show as refunds and discounts. Club card deposits are matched to the bank." },
    ] as Bullet[],
  },
  prepayments: {
    title: "Prepayments, plainly.",
    body: "Rhea’s chart has a liability line for gift cards, not for prepaid club shipments. A club charge is booked as a sale the day it is charged. If your CPA holds prepaid shipments as deferred revenue until the wine ships, they adjust at year end; Rhea’s package shows club sales by month so it takes minutes.",
  },
};

/* ------------------------------------------------------------------ */
/* /connect/                                                          */
/* ------------------------------------------------------------------ */

export const CONNECT = {
  h1: "What connects, and how.",
  lede: "Connect once. Rhea only reads. It changes nothing in your POS, club software or bank.",
  direct: {
    title: "Direct today",
    bullets: [
      { lead: "Square", text: " (sales, time cards)." },
      { lead: "Clover", text: " (sales, time cards)." },
      { lead: "Toast", text: " (nightly export; guests’ columns dropped the moment a file is read)." },
      { lead: "Shopify POS", text: " (sales, payouts)." },
      { lead: "7shifts", text: " (time punches and the published schedule)." },
      { text: "The National Weather Service and NOAA for the plan’s weather, from the room’s ZIP code only." },
    ] as Bullet[],
  },
  upload: {
    title: "Commerce7 and WineDirect",
    body: [
      "By report upload today; a direct connection is planned. Export the daily sales report (CSV or Excel) and drop it on Import. Rhea works out the layout once, you confirm, and the next upload goes straight through.",
      "A PDF or photo of an end-of-day report is read too, each number marked “Read from your PDF or photo: check it against the report.”",
    ],
  },
  reservations: {
    title: "Reservations",
    body: "Not connected and not read. Tell the plan about a release weekend or a bus tour with one note.",
  },
  money: {
    title: "Banks, cards, bills, QuickBooks",
    bullets: [
      { text: "Statements as OFX, QFX, QBO or CSV; accounts saved as a nickname and last four digits." },
      { text: "Bills by email, PDF or photo; pay by bank transfer, sent by Stripe." },
      { text: "QuickBooks Online optional: each day’s entries posted to your company, one per LLC, never twice." },
      { text: "Never collected: Social Security numbers, full bank or card numbers, guests’ details." },
    ] as Bullet[],
  },
};

/* ------------------------------------------------------------------ */
/* /pricing/                                                          */
/* ------------------------------------------------------------------ */

export const PRICING = {
  h1: "One plan, priced per tasting room.",
  lede: "Every feature at every size, with or without QuickBooks.",
  headline: { amount: "$149", text: "per tasting room a month, billed annually. Billed monthly, $20 more per location." },
  /** The copy's table, kept to be checked against pricing.ts; the page draws its table from pricing.ts. */
  table: [
    { locations: "1 to 3", annually: "$149", monthly: "$169" },
    { locations: "4 to 10", annually: "$139", monthly: "$159" },
    { locations: "11 to 20", annually: "$129", monthly: "$149" },
    { locations: "21 to 30", annually: "$119", monthly: "$139" },
  ],
  overMax: { locations: "Over 30", text: "We’ll quote" },
  brackets: "Each location is priced in its band, like tax brackets, so adding one never raises what the others cost.",
  location: {
    title: "What counts as a location.",
    body: "Each tasting room, downtown shop or satellite room with its own register is one location, whether or not it shares an LLC with the estate: an estate room and a downtown shop are 2 × $149 = $298. Club orders rung through the same register belong to that room.",
  },
  terms: {
    title: "Terms",
    body: "7-day free trial, no payment method needed. 60-day money-back guarantee on the subscription; guided setup ($199 plus $49 a location, once, optional) is not refunded. From 4 locations, a named contact and annual invoices by bank transfer. Unlimited users, free seats for your bookkeeper and CPA. 40 unfamiliar files read per location a month, plus 50 per location in the first 60 days; packs of 100 for $25; connections and Rhea’s templates never count.",
  },
  compared: {
    title: "Compared.",
    body: "vinSUITE starts at $249 a month and keeps no books. A bookkeeper for one location typically runs $300 to $500 a month plus QuickBooks. Prices read October 2026; check with each vendor.",
  },
};

/* ------------------------------------------------------------------ */
/* /about/                                                            */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  h1: "Winery Books is Rhea, for wineries.",
  body: "Rhea is automated books, labor and per-location profit for multi-store owners: coffee shops, salons, franchise groups and now wineries. Same product, same app, same team.",
  storyBefore: "Rhea is built in memory of Kathy, a bookkeeper and a single mother of three: ",
  storyUrl: "https://rheafi.com/our-story/",
  featuresBefore: "Every feature is listed at ",
  featuresUrl: "https://rheafi.com/features/",
  operated: "Operated by Grip Theory LLC, California.",
  legal: "Privacy notice and terms at rheafi.com.",
};

/* ------------------------------------------------------------------ */
/* Structured data                                                    */
/* ------------------------------------------------------------------ */

export const SOFTWARE_DESCRIPTION =
  "Automated books, labor and per-location profit for wineries’ tasting rooms. QuickBooks optional.";
