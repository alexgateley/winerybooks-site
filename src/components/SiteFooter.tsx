import Link from "next/link";
import { Wordmark } from "@/components/Logo";
import { FOOTER_LINE, NAV } from "@/content/copy";
import {
  APP_SIGN_IN_URL,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  COPYRIGHT_YEAR,
  DEMO_URL,
  LEGAL_ENTITY,
  PRIVACY_URL,
  RHEA_URL,
  TERMS_URL,
} from "@/lib/site";

const linkClass = "rounded-md text-ink-2 hover:text-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page py-14 lg:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label="Winery Books, by Rhea: home" className="inline-block rounded-md">
              <Wordmark size="footer" />
            </Link>
            <p className="mt-5 max-w-[22rem] text-pretty text-[0.9375rem] leading-relaxed text-muted">{FOOTER_LINE}</p>
          </div>

          <div className="grid gap-x-14 gap-y-8 sm:grid-cols-2">
            <nav aria-label="Footer">
              <ul className="space-y-3 text-[0.9375rem] font-medium">
                {NAV.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ul className="space-y-3 text-[0.9375rem] font-medium">
              <li>
                <Link href="/#waitlist" className={linkClass}>
                  Join the waitlist
                </Link>
              </li>
              <li>
                <a href={DEMO_URL} className={linkClass}>
                  See the demo
                </a>
              </li>
              <li>
                <a href={APP_SIGN_IN_URL} className={linkClass}>
                  Sign in
                </a>
              </li>
              <li>
                <a href={RHEA_URL} className={linkClass}>
                  Rhea, by {LEGAL_ENTITY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="rounded-md select-text hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="rounded-md select-text hover:text-ink">
                {CONTACT_PHONE}
              </a>
            </li>
            <li>
              <a href={PRIVACY_URL} className="rounded-md hover:text-ink">
                Privacy
              </a>
            </li>
            <li>
              <a href={TERMS_URL} className="rounded-md hover:text-ink">
                Terms
              </a>
            </li>
          </ul>
          <p>
            © {COPYRIGHT_YEAR} {LEGAL_ENTITY}
          </p>
        </div>
      </div>
    </footer>
  );
}
