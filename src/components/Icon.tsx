import type { ReactNode } from "react";

/** Outlined 24px line icons, drawn for this site. Decorative by default. */
const paths = {
  bolt: <path d="M13.2 2.75 4.75 13.6h6.6l-.95 7.65 8.85-11.1h-6.75l.7-7.4Z" />,
  document: (
    <>
      <path d="M14.25 2.75H7a2 2 0 0 0-2 2v14.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5l-4.75-4.75Z" />
      <path d="M14 2.75V7.75h5M8.75 12.5h6.5M8.75 16.25h6.5M8.75 8.75h2.5" />
    </>
  ),
  bars: (
    <>
      <rect x="4" y="13" width="4" height="7.25" rx="1" />
      <rect x="10" y="8.5" width="4" height="11.75" rx="1" />
      <rect x="16" y="4" width="4" height="16.25" rx="1" />
    </>
  ),
  lock: (
    <>
      <rect x="4.75" y="10.75" width="14.5" height="10.5" rx="2.25" />
      <path d="M8.25 10.75V7.5a3.75 3.75 0 0 1 7.5 0v3.25M12 15.25v1.75" />
    </>
  ),
  arrowRight: <path d="M4.75 12h14.5M13.5 6.25 19.25 12l-5.75 5.75" />,
  check: <path d="m5.25 12.75 4.25 4.25 9.25-10" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M6.5 12h11" />,
  /** Half-filled circle: "partly" or "it depends". */
  partial: (
    <>
      <circle cx="12" cy="12" r="7.25" />
      <path d="M12 4.75a7.25 7.25 0 0 0 0 14.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5 5.4 4.75h13.2L20 9.5" />
      <path d="M4 9.5a2.67 2.67 0 0 0 5.33 0 2.67 2.67 0 0 0 5.34 0 2.67 2.67 0 0 0 5.33 0" />
      <path d="M5.25 11.75v8.5h13.5v-8.5M10 20.25v-4.5h4v4.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.75 8.25 4.5L12 12.75l-8.25-4.5L12 3.75Z" />
      <path d="m3.75 12.25 8.25 4.5 8.25-4.5M3.75 16 12 20.5l8.25-4.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.25" r="3.25" />
      <path d="M3.5 19.5c.6-3 2.85-4.75 5.5-4.75s4.9 1.75 5.5 4.75" />
      <path d="M15.5 5.25a3.25 3.25 0 0 1 0 6M17.25 14.9c1.75.55 2.9 2.05 3.25 4.6" />
    </>
  ),
  report: (
    <>
      <rect x="4" y="3.75" width="16" height="16.5" rx="2.25" />
      <path d="M8 16v-3M12 16V9.5M16 16v-5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 5.75v5.5c0 4.4 2.9 8.1 7 9.75 4.1-1.65 7-5.35 7-9.75v-5.5L12 3Z" />
      <path d="m9.25 12.25 2 2 3.75-4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.75 12S6 5.75 12 5.75 21.25 12 21.25 12 18 18.25 12 18.25 2.75 12 2.75 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </>
  ),
  ledger: (
    <>
      <path d="M5.5 4.75A1.75 1.75 0 0 1 7.25 3h11.25v15H7.25a1.75 1.75 0 0 0-1.75 1.75V4.75Z" />
      <path d="M5.5 19.75A1.75 1.75 0 0 0 7.25 21.5h11.25V18M9.5 7.5h5M9.5 11h5" />
    </>
  ),
  download: <path d="M12 3.75v11M7.25 10.25 12 15l4.75-4.75M4.75 19.75h14.5" />,
  idOff: (
    <>
      <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.25" />
      <path d="M7.25 9.75h4M7.25 13.25h2.5M3.5 3.5l17 17" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  bank: (
    <>
      <path d="M3.75 9 12 4.25 20.25 9H3.75ZM5.5 9v8M10 9v8M14 9v8M18.5 9v8M3.75 19.75h16.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.25" width="16" height="15" rx="2.25" />
      <path d="M8 3.25v4M16 3.25v4M4 10.25h16" />
    </>
  ),
  chevronDown: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  chevronRight: <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />,
  arrowUp: <path d="M12 19V5.5M6.5 11 12 5.5 17.5 11" />,
  arrowDown: <path d="M12 5v13.5M6.5 13l5.5 5.5 5.5-5.5" />,
  mail: (
    <>
      <rect x="3.5" y="5.25" width="17" height="13.5" rx="2.25" />
      <path d="m4.25 6.5 7.75 6 7.75-6" />
    </>
  ),
  /** A wine glass. */
  glass: <path d="M7.75 3.25h8.5l-.6 5.6a3.65 3.65 0 0 1-7.3 0l-.6-5.6ZM12 12.5v8.25M8.5 20.75h7M7.95 6.25h8.1" />,
  /** A shipping box. */
  box: (
    <>
      <path d="M3.75 7.5 12 3.25l8.25 4.25v9L12 20.75 3.75 16.5v-9Z" />
      <path d="M3.75 7.5 12 11.75l8.25-4.25M12 11.75v9M7.9 5.4l8.2 4.2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.75" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M16.95 7.05h.01" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
