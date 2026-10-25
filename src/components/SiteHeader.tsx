import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { NAV } from "@/content/copy";
import { APP_SIGN_IN_URL, DEMO_URL } from "@/lib/site";

const navLinkClass = "whitespace-nowrap rounded-md font-medium text-ink-2 transition-colors hover:text-ink";

/*
 * From xl (1280) the top bar holds the logo, the five page links and the actions.
 * Below xl the five links move to a second row: one line that scrolls sideways if it
 * has to (never wraps), with Sign in and See the demo at its end on phones.
 */
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-[4.5rem] xl:h-[5.25rem]">
        <Link href="/" aria-label="Winery Books, by Rhea: home" className="shrink-0 rounded-md">
          <Wordmark />
        </Link>

        <div className="flex min-w-0 items-center">
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {NAV.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`${navLinkClass} text-[1.0625rem]`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="mx-8 hidden h-6 w-px bg-line-strong xl:block" />

          <div className="flex shrink-0 items-center gap-5 xl:gap-8">
            <a href={APP_SIGN_IN_URL} className={`${navLinkClass} hidden text-[0.9375rem] sm:inline lg:text-base xl:text-[1.0625rem]`}>
              Sign in
            </a>
            <a href={DEMO_URL} className={`${navLinkClass} hidden text-[0.9375rem] sm:inline lg:text-base xl:text-[1.0625rem]`}>
              See the demo
            </a>
            <Link
              href="/#waitlist"
              className="btn-primary h-10 shrink-0 whitespace-nowrap px-4 text-[0.9375rem] sm:h-11 sm:px-5 lg:h-12 lg:px-6 lg:text-base"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      <nav aria-label="Primary" className="border-t border-line/70 xl:hidden">
        <ul className="nav-scroll container-page flex h-10 items-center gap-6 overflow-x-auto whitespace-nowrap text-sm sm:gap-8 sm:text-[0.9375rem]">
          {NAV.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link href={link.href} className={`${navLinkClass} inline-flex min-h-8 items-center`}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="shrink-0 sm:hidden">
            <a href={APP_SIGN_IN_URL} className={`${navLinkClass} inline-flex min-h-8 items-center`}>
              Sign in
            </a>
          </li>
          <li className="shrink-0 pr-8 sm:hidden">
            <a href={DEMO_URL} className={`${navLinkClass} inline-flex min-h-8 items-center`}>
              See the demo
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
