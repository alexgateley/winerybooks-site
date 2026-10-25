import type { Metadata } from "next";
import { PageIntro, Waitlist, inlineLink } from "@/components/ContentPage";
import { ABOUT, PAGES } from "@/content/copy";
import { pageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, RHEA_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata(PAGES.about);

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <PageIntro page={PAGES.about} h1={ABOUT.h1} lede={ABOUT.body} />
      <section aria-label="About Rhea" className="border-y border-line/80 bg-paper-2 py-14 lg:py-20">
        <div className="container-page">
          <div className="card max-w-[50rem] space-y-5 p-6 text-pretty text-base leading-[1.7] text-ink-2 sm:p-10 sm:text-[1.0625rem]">
            <p>
              {ABOUT.storyBefore}
              <a href={ABOUT.storyUrl} className={`${inlineLink} break-words`}>
                {ABOUT.storyUrl}
              </a>
              .
            </p>
            <p>
              {ABOUT.featuresBefore}
              <a href={ABOUT.featuresUrl} className={`${inlineLink} break-words`}>
                {ABOUT.featuresUrl}
              </a>
              .
            </p>
            <p>
              {ABOUT.operated}{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLink}>
                {CONTACT_EMAIL}
              </a>{" "}
              ·{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className={`${inlineLink} whitespace-nowrap`}>
                {CONTACT_PHONE}
              </a>
              .{" "}
              <a href={RHEA_URL} className={inlineLink}>
                {ABOUT.legal}
              </a>
            </p>
          </div>
        </div>
      </section>
      <Waitlist />
    </main>
  );
}
