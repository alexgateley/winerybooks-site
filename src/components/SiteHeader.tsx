import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { NAV } from "@/content/copy";
import { APP_SIGN_IN_URL, DEMO_URL } from "@/lib/site";

const navLinkClass = "rounded-md font-medium text-ink-2 transition-colors hover:text-ink";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <div className="container-page flex h-14 items-center justify-between gap-4 lg:h-[4.5rem] xl:grid xl:h-[5.25rem] xl:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Winery Books, by Rhea: home" className="justify-self-start rounded-md">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {NAV.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`${navLinkClass} text-[1rem] xl:text-[1.0625rem]`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 justify-self-end sm:gap-6">
          <a href={APP_SIGN_IN_URL} className={`${navLinkClass} hidden text-[0.9375rem] sm:inline lg:text-base`}>
            Sign in
          </a>
          <a href={DEMO_URL} className={`${navLinkClass} hidden text-[0.9375rem] sm:inline lg:text-base`}>
            See the demo
          </a>
          <Link
            href="/#waitlist"
            className="btn-primary h-10 px-4 text-[0.9375rem] sm:h-11 sm:px-5 lg:h-12 lg:px-6 lg:text-base"
          >
            Join the waitlist
          </Link>
        </div>
      </div>

      {/* Below lg: the same links as a compact second row (no JS menu needed); Sign in and the demo join it on phones. */}
      <nav aria-label="Primary" className="border-t border-line/70 lg:hidden">
        <ul className="container-page flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-1.5 text-sm sm:gap-x-8">
          {NAV.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={`${navLinkClass} inline-flex min-h-8 items-center px-0.5`}>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="sm:hidden">
            <a href={APP_SIGN_IN_URL} className={`${navLinkClass} inline-flex min-h-8 items-center px-0.5`}>
              Sign in
            </a>
          </li>
          <li className="sm:hidden">
            <a href={DEMO_URL} className={`${navLinkClass} inline-flex min-h-8 items-center px-0.5`}>
              See the demo
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
