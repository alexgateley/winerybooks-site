import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { WaitlistForm } from "@/components/WaitlistForm";
import { HOME, WAITLIST_CTA, type Bullet, type PageMeta } from "@/content/copy";
import { DEMO_URL } from "@/lib/site";

export const inlineLink =
  "font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink";

/** Text with optional bold leads, as the copy writes "**Lead**: text". */
export function Segments({ segments }: { segments: Bullet[] }) {
  return (
    <>
      {segments.map((segment, i) => (
        <span key={i}>
          {segment.lead && <strong className="font-semibold text-ink">{segment.lead}</strong>}
          {segment.text}
        </span>
      ))}
    </>
  );
}

/** A checked list: one item per bullet of the copy. */
export function Bullets({ lines }: { lines: Bullet[][] }) {
  return (
    <ul role="list" className="space-y-3.5">
      {lines.map((line, i) => (
        <li key={i} className="flex items-start gap-3 text-pretty text-base leading-[1.6] text-ink-2 sm:text-[1.0625rem]">
          <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-sage-wash text-sage-ink">
            <Icon name="check" className="size-3" strokeWidth={2.6} />
          </span>
          <span className="min-w-0">
            <Segments segments={line} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** One bullet per item, for lists whose items have a single segment. */
export const single = (bullets: Bullet[]) => bullets.map((bullet) => [bullet]);

/** An outer card with an icon tile and a title. */
export function SectionCard({
  id,
  icon,
  title,
  children,
  className = "",
}: {
  id: string;
  icon: IconName;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article aria-labelledby={`${id}-title`} id={id} className={`card min-w-0 p-6 sm:p-9 ${className}`}>
      <span className="icon-tile size-12">
        <Icon name={icon} className="size-6" strokeWidth={1.5} />
      </span>
      <h2 id={`${id}-title`} className="mt-6 text-balance text-[1.5rem] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      <div className="mt-5 border-t border-line pt-6">{children}</div>
    </article>
  );
}

function Breadcrumbs({ page }: { page: PageMeta }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-[0.9375rem] text-subtle">
      <ol role="list" className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="rounded-md hover:text-ink">
            Home
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <Icon name="chevronRight" className="size-3.5" strokeWidth={2} />
          <span aria-current="page" className="text-ink-2">
            {page.crumb}
          </span>
        </li>
      </ol>
    </nav>
  );
}

/** The top of an inner page: breadcrumbs, the one H1, the lede and the two buttons. */
export function PageIntro({ page, h1, lede }: { page: PageMeta; h1: string; lede: string }) {
  return (
    <section aria-labelledby="page-title" className="container-page pb-14 pt-10 sm:pt-14 lg:pb-16">
      <BreadcrumbJsonLd trail={[{ name: page.crumb, path: page.path }]} />
      <div className="max-w-[50rem]">
        <Breadcrumbs page={page} />
        <h1
          id="page-title"
          className="text-balance text-[clamp(2.125rem,1.5rem+2.8vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-ink"
        >
          {h1}
        </h1>
        <p className="lede mt-6 max-w-[42rem]">{lede}</p>
        <CtaButtons className="mt-8" />
      </div>
    </section>
  );
}

export function CtaButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${className}`}>
      <a href="#waitlist" className="btn-primary h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-[1.0625rem]">
        {HOME.primaryButton}
        <Icon name="arrowRight" className="btn-arrow size-5" />
      </a>
      <a href={DEMO_URL} className={`${inlineLink} text-[1.0625rem]`}>
        {HOME.secondaryButton}
      </a>
    </div>
  );
}

/** The CTA block every page ends with: the copy's heading and body beside the waitlist form. */
export function Waitlist() {
  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="py-20 lg:py-28">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-5 py-12 text-white sm:px-10 sm:py-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,27rem)] lg:items-center lg:gap-12 lg:p-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] xl:gap-16 xl:p-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_0%_0%,rgb(127_152_134/0.28),transparent_70%),radial-gradient(40%_50%_at_100%_100%,rgb(255_255_255/0.06),transparent_70%)]"
          />
          <div>
            <p className="eyebrow text-white/70">Pilot waitlist</p>
            <h2 id="waitlist-title" className="h2 mt-5 text-white">
              {WAITLIST_CTA.heading}
            </h2>
            <p className="lede mt-5 max-w-[32rem] text-white/75">{WAITLIST_CTA.body}</p>
          </div>
          <div className="card mt-10 p-5 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-8 lg:mt-0">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The band that holds an inner page's cards. */
export function Band({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <section aria-label={label} className="border-y border-line/80 bg-paper-2 py-14 lg:py-20">
      <div className={`container-page grid gap-6 ${className}`}>{children}</div>
    </section>
  );
}
