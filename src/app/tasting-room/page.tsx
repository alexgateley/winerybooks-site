import type { Metadata } from "next";
import { Band, Bullets, PageIntro, SectionCard, Waitlist, single } from "@/components/ContentPage";
import { PAGES, TASTING_ROOM } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(PAGES.tastingRoom);

export default function TastingRoomPage() {
  const { books, labor, week } = TASTING_ROOM;
  return (
    <main id="main" className="flex-1">
      <PageIntro page={PAGES.tastingRoom} h1={TASTING_ROOM.h1} lede={TASTING_ROOM.lede} />
      <Band label="What Rhea books and labor" className="lg:grid-cols-2">
        <SectionCard id="books" icon="ledger" title={books.title}>
          <Bullets lines={single(books.bullets)} />
        </SectionCard>
        <SectionCard id="labor" icon="clock" title={labor.title}>
          <Bullets lines={single(labor.bullets)} />
        </SectionCard>
        <SectionCard id="week" icon="calendar" title={week.title} className="lg:col-span-2">
          <div className="max-w-[56rem]">
            <p className="text-pretty text-base leading-[1.6] text-muted sm:text-[1.0625rem]">{week.intro}</p>
            <div className="mt-6">
              <Bullets lines={week.lines} />
            </div>
            <p className="mt-8 border-t border-line pt-6 text-pretty text-base leading-[1.65] text-muted sm:text-[1.0625rem]">
              {week.closing}
            </p>
          </div>
        </SectionCard>
      </Band>
      <Waitlist />
    </main>
  );
}
