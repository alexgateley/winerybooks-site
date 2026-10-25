import type { Metadata } from "next";
import { Band, Bullets, PageIntro, SectionCard, Waitlist, single } from "@/components/ContentPage";
import { PAGES, WINE_CLUB } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(PAGES.wineClub);

export default function WineClubPage() {
  const { booked, prepayments } = WINE_CLUB;
  return (
    <main id="main" className="flex-1">
      <PageIntro page={PAGES.wineClub} h1={WINE_CLUB.h1} lede={WINE_CLUB.lede} />
      <Band label="Wine club in the books" className="lg:grid-cols-2">
        <SectionCard id="booked" icon="box" title={booked.title}>
          <Bullets lines={single(booked.bullets)} />
        </SectionCard>
        <SectionCard id="prepayments" icon="ledger" title={prepayments.title}>
          <p className="text-pretty text-base leading-[1.65] text-ink-2 sm:text-[1.0625rem]">{prepayments.body}</p>
        </SectionCard>
      </Band>
      <Waitlist />
    </main>
  );
}
