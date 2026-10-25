/**
 * The winerybooks wordmark: the name set in the site's typeface (Inter Tight), lower case, with "by Rhea" small
 * beside it. Text, not a drawing, so it stays crisp and reads to screen readers as "winerybooks by Rhea".
 */
export function Wordmark({ size = "header" }: { size?: "header" | "footer" | "hero" }) {
  const name = {
    header: "text-[1.25rem] sm:text-[1.375rem] lg:text-[1.5rem]",
    footer: "text-[1.375rem]",
    hero: "text-[2rem]",
  }[size];
  return (
    <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap leading-none">
      <span className={`${name} font-semibold tracking-[-0.04em] text-ink`}>winerybooks</span>
      <span className="text-[0.75rem] font-medium tracking-[0.01em] text-subtle sm:text-[0.8125rem]">by Rhea</span>
    </span>
  );
}

/** The square mark: a lower-case w on ink, as in the favicon. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="15" fill="#0e1116" />
      <path d="M15 22l7.5 21L32 26l9.5 17L49 22" fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="miter" />
    </svg>
  );
}
