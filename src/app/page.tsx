import type { Metadata } from "next";
import { CtaButtons, Waitlist } from "@/components/ContentPage";
import { Icon, type IconName } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { HOME, PAGES } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";
import { homeGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(PAGES.home);

/** One icon per feature claim, in the copy's order. */
const FEATURE_ICONS: IconName[] = ["ledger", "grid", "calendar", "clock", "bank", "document", "layers", "mail", "report", "download"];

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#f8f6f2_0%,#f5f2ed_42%,#efeae3_72%,#ebe5dc_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(55%_70%_at_82%_30%,rgb(255_255_255/0.75),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_45%_at_95%_95%,rgb(127_152_134/0.16),transparent_70%)]" />
      </div>
      <div className="container-page pb-16 pt-12 sm:pt-16 lg:pb-24 lg:pt-20">
        {/* At 1280 and up the heading sets in two balanced lines across the page. */}
        <div className="max-w-[76rem]">
          <p className="eyebrow leading-[1.5]">{HOME.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-6 text-balance text-[clamp(2.625rem,1.4rem+5.2vw,5.5rem)] font-semibold leading-[1.0] tracking-[-0.025em] text-ink"
          >
            {HOME.h1}
          </h1>
          <p className="lede mt-7 max-w-[42rem] sm:text-[1.25rem]">{HOME.lede}</p>
          <CtaButtons className="mt-9" />
          <ul role="list" className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] text-subtle">
            <li className="flex items-center gap-3">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-sage" />
              {HOME.trust}
            </li>
            <li>{HOME.size}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section aria-labelledby="features-title" className="border-y border-line/80 bg-paper-2 py-16 lg:py-24">
      <h2 id="features-title" className="sr-only">
        What Rhea does
      </h2>
      {/* Two columns from md: each item spans two subgrid rows (heading, body), so the
          bodies in a row start on one line whether a heading takes one line or two. */}
      <ul role="list" className="container-page grid gap-x-12 gap-y-10 md:grid-cols-2 lg:gap-y-14 xl:gap-x-20">
        {HOME.features.map((feature, i) => (
          <li
            key={feature.title}
            className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 sm:gap-x-5 md:row-span-2 md:grid-rows-subgrid"
          >
            <span className="icon-tile row-span-2 size-12 shrink-0 sm:size-14">
              <Icon name={FEATURE_ICONS[i]} className="size-6 sm:size-7" strokeWidth={1.5} />
            </span>
            <h3 className="self-start text-balance text-[1.1875rem] font-semibold leading-[1.3] tracking-[-0.015em] sm:text-[1.3125rem]">
              {feature.title}
            </h3>
            <p className="max-w-[34rem] text-pretty text-base leading-[1.6] text-ink-2 sm:text-[1.0625rem] xl:text-[1.125rem]">
              {feature.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CpaSplit() {
  return (
    <section aria-labelledby="cpa-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="card grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-12 lg:p-14">
          <span className="icon-tile size-14 sm:size-16">
            <Icon name="glass" className="size-7 sm:size-8" strokeWidth={1.4} />
          </span>
          <div className="max-w-[48rem]">
            <h2 id="cpa-title" className="h2">
              {HOME.cpa.heading}
            </h2>
            <p className="lede mt-6">{HOME.cpa.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="border-y border-line/80 bg-paper-2 py-20 lg:py-28">
      <div className="container-page">
        <h2 id="faq-title" className="h2 mx-auto max-w-[48rem] text-center">
          FAQ
        </h2>
        <div className="faq mx-auto mt-12 max-w-[48rem] divide-y divide-line border-y border-line">
          {HOME.faqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-md py-6 text-left text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink sm:text-[1.1875rem]">
                <span className="text-balance">{item.q}</span>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-2 group-hover:border-line-strong">
                  <Icon name="plus" className="faq-icon size-4" strokeWidth={1.9} />
                </span>
              </summary>
              <p className="-mt-1 max-w-[42rem] text-pretty pb-7 pr-4 text-base leading-[1.65] text-muted sm:pr-12 sm:text-[1.0625rem]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <JsonLd data={homeGraph()} />
      <Hero />
      <Features />
      <CpaSplit />
      <Faq />
      <Waitlist />
    </main>
  );
}
