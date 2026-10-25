import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Mark } from "@/components/Logo";

// Next adds <meta name="robots" content="noindex"> to the 404 page itself.
export const metadata: Metadata = {
  title: { absolute: "Page not found | Winery Books" },
};

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex flex-1 items-center overflow-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_35%,rgb(255_255_255/0.8),transparent_70%)]"
      />
      <div className="container-page py-24 sm:py-32">
        <div className="mx-auto flex max-w-[40rem] flex-col items-center text-center">
          <Mark className="size-14 rounded-[0.9rem] shadow-[0_12px_30px_-16px_rgb(14_17_22/0.5)]" />
          <p className="eyebrow mt-10">404</p>
          <h1 className="mt-5 text-balance text-[clamp(2.5rem,1.7rem+3.4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">
            This page isn’t on the books.
          </h1>
          <p className="lede mt-6 max-w-[32rem]">
            The page you’re looking for doesn’t exist or has moved. Let’s get you back to somewhere useful.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <Link href="/" className="btn-primary h-13 px-7 text-base">
              Back to home
              <Icon name="arrowRight" className="btn-arrow size-5" />
            </Link>
            <Link
              href="/#waitlist"
              className="rounded-md text-base font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              Join the pilot waitlist
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
