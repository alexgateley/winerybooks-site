import type { Metadata } from "next";
import { Band, PageIntro, SectionCard, Waitlist } from "@/components/ContentPage";
import { PAGES, PRICING } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";
import { MAX_LISTED_STORES, MONTHLY_EXTRA, PRICE_BANDS, usd } from "@/lib/pricing";

export const metadata: Metadata = pageMetadata(PAGES.pricing);

const bodyClass = "text-pretty text-base leading-[1.65] text-ink-2 sm:text-[1.0625rem]";

/** The bands, drawn from src/lib/pricing.ts (tests/pricing.test.mjs checks the copy's table against the same file). */
function PriceTable() {
  return (
    <div className="card p-6 sm:p-9">
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-[3.5rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[4.5rem]">
          {usd(PRICE_BANDS[0].annual)}
        </span>
        <span className="text-pretty text-base text-muted sm:text-[1.0625rem]">{PRICING.headline.text}</span>
      </p>
      <table className="mt-8 w-full border-collapse text-left text-base">
        <caption className="sr-only">Price per location a month, by band</caption>
        <thead>
          <tr className="border-b border-line text-[0.9375rem] text-subtle">
            <th scope="col" className="py-3 pr-4 font-medium">
              Locations
            </th>
            <th scope="col" className="py-3 pr-4 text-right font-medium">
              Annually
            </th>
            <th scope="col" className="py-3 text-right font-medium">
              Monthly
            </th>
          </tr>
        </thead>
        <tbody>
          {PRICE_BANDS.map((band) => (
            <tr key={band.from} className="border-b border-line">
              <th scope="row" className="py-3 pr-4 font-medium text-ink">
                {band.from} to {band.to}
              </th>
              <td className="py-3 pr-4 text-right font-semibold tabular-nums text-ink">{usd(band.annual)}</td>
              <td className="py-3 text-right tabular-nums text-muted">{usd(band.annual + MONTHLY_EXTRA)}</td>
            </tr>
          ))}
          <tr>
            <th scope="row" className="py-3 pr-4 font-medium text-ink">
              Over {MAX_LISTED_STORES}
            </th>
            <td colSpan={2} className="py-3 text-right text-muted">
              {PRICING.overMax.text}
            </td>
          </tr>
        </tbody>
      </table>
      <p className="mt-6 text-pretty text-[0.9375rem] leading-relaxed text-muted">{PRICING.brackets}</p>
    </div>
  );
}

export default function PricingPage() {
  const { location, terms, compared } = PRICING;
  return (
    <main id="main" className="flex-1">
      <PageIntro page={PAGES.pricing} h1={PRICING.h1} lede={PRICING.lede} />
      <Band label="Prices and terms" className="lg:grid-cols-2">
        <div className="lg:row-span-2">
          <PriceTable />
        </div>
        <SectionCard id="location" icon="store" title={location.title}>
          <p className={bodyClass}>{location.body}</p>
        </SectionCard>
        <SectionCard id="terms" icon="document" title={terms.title}>
          <p className={bodyClass}>{terms.body}</p>
        </SectionCard>
        <SectionCard id="compared" icon="bars" title={compared.title} className="lg:col-span-2">
          <p className={`${bodyClass} max-w-[52rem]`}>{compared.body}</p>
        </SectionCard>
      </Band>
      <Waitlist />
    </main>
  );
}
