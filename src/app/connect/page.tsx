import type { Metadata } from "next";
import { Band, Bullets, PageIntro, SectionCard, Waitlist, single } from "@/components/ContentPage";
import { CONNECT, PAGES } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(PAGES.connect);

const bodyClass = "text-pretty text-base leading-[1.65] text-ink-2 sm:text-[1.0625rem]";

export default function ConnectPage() {
  const { direct, upload, reservations, money } = CONNECT;
  return (
    <main id="main" className="flex-1">
      <PageIntro page={PAGES.connect} h1={CONNECT.h1} lede={CONNECT.lede} />
      <Band label="Connections" className="lg:grid-cols-2">
        <SectionCard id="direct" icon="bolt" title={direct.title}>
          <Bullets lines={single(direct.bullets)} />
        </SectionCard>
        <SectionCard id="upload" icon="document" title={upload.title}>
          <div className="space-y-4">
            {upload.body.map((paragraph) => (
              <p key={paragraph} className={bodyClass}>
                {paragraph}
              </p>
            ))}
          </div>
        </SectionCard>
        <SectionCard id="reservations" icon="calendar" title={reservations.title}>
          <p className={bodyClass}>{reservations.body}</p>
        </SectionCard>
        <SectionCard id="money" icon="bank" title={money.title}>
          <Bullets lines={single(money.bullets)} />
        </SectionCard>
      </Band>
      <Waitlist />
    </main>
  );
}
