import type { Metadata } from "next";
import Link from "next/link";
import { Band, Bullets, PageIntro, SectionCard, Waitlist, inlineLink, single } from "@/components/ContentPage";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { PAGES, STAFFING } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";
import { faqPage } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata(PAGES.staffing);

const bodyClass = "text-pretty text-base leading-[1.65] text-ink-2 sm:text-[1.0625rem]";

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 lg:py-28">
      <div className="container-page">
        <h2 id="faq-title" className="h2 mx-auto max-w-[48rem] text-center">
          FAQ
        </h2>
        <div className="faq mx-auto mt-12 max-w-[48rem] divide-y divide-line border-y border-line">
          {STAFFING.faqs.map((item) => (
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

export default function StaffingPage() {
  const { saturday, how, example, morning, needs, isNot, pricing } = STAFFING;
  return (
    <main id="main" className="flex-1">
      <JsonLd data={faqPage(STAFFING.faqs)} />
      <PageIntro page={PAGES.staffing} h1={STAFFING.h1} lede={STAFFING.lede} />
      <Band label="Tasting room staffing" className="lg:grid-cols-2">
        <SectionCard id="saturday" icon="calendar" title={saturday.title}>
          <div className="space-y-4">
            {saturday.body.map((p) => (
              <p key={p} className={bodyClass}>
                {p}
              </p>
            ))}
          </div>
        </SectionCard>
        <SectionCard id="how" icon="bars" title={how.title}>
          <Bullets lines={how.bullets} />
        </SectionCard>
        <SectionCard id="example" icon="clock" title={example.title} className="lg:col-span-2">
          <div className="max-w-[56rem]">
            <p className={bodyClass}>{example.intro}</p>
            <div className="mt-6">
              <Bullets lines={example.lines} />
            </div>
            <p className="mt-8 border-t border-line pt-6 text-pretty text-base leading-[1.65] text-muted sm:text-[1.0625rem]">
              {example.closing}
            </p>
          </div>
        </SectionCard>
        <SectionCard id="morning" icon="mail" title={morning.title} className="lg:col-span-2">
          <div className="max-w-[56rem] space-y-4">
            {morning.body.map((p) => (
              <p key={p} className={bodyClass}>
                {p}
              </p>
            ))}
          </div>
        </SectionCard>
        <SectionCard id="needs" icon="check" title={needs.title}>
          <Bullets lines={single(needs.bullets)} />
        </SectionCard>
        <SectionCard id="is-not" icon="shield" title={isNot.title}>
          <Bullets lines={single(isNot.bullets)} />
        </SectionCard>
        <SectionCard id="cost" icon="ledger" title={pricing.title} className="lg:col-span-2">
          <p className={`${bodyClass} max-w-[56rem]`}>
            {pricing.body}{" "}
            <Link href="/pricing/" className={inlineLink}>
              {pricing.linkText}
            </Link>
            .
          </p>
        </SectionCard>
      </Band>
      <Faq />
      <Waitlist />
    </main>
  );
}
