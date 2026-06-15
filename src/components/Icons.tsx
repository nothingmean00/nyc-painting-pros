import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const Icon = {
  roller: (p: P) => (
    <svg {...base(p)}>
      <rect x="4" y="4" width="13" height="6" rx="1" />
      <path d="M17 7h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-7" />
      <path d="M12 12v3a1 1 0 0 1-1 1H9" />
      <rect x="7" y="16" width="4" height="5" rx="1" />
    </svg>
  ),
  house: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </svg>
  ),
  building: (p: P) => (
    <svg {...base(p)}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  ),
  cabinet: (p: P) => (
    <svg {...base(p)}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M12 3v18M8 7v2M16 7v2" />
    </svg>
  ),
  wall: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 6h18M3 12h18M3 18h18" />
      <path d="M8 6v6M16 6v6M12 12v6" />
    </svg>
  ),
  patch: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 7c3-3 6 3 9 0s6-3 7-1" />
      <path d="M4 13c3-3 6 3 9 0s6-3 7-1" />
      <path d="M4 19c3-3 6 3 9 0s6-3 7-1" />
    </svg>
  ),
  star: (p: P) => (
    <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base(p)}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  ),
  phone: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 4h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  ),
  arrow: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  pin: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  clock: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  leaf: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14a8 8 0 0 1-1-1z" />
      <path d="M9 15c2-3 5-5 8-6" />
    </svg>
  ),
  medal: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13-2 8 5-3 5 3-2-8" />
    </svg>
  ),
  quote: (p: P) => (
    <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
      <path d="M7 7H4v7h7V7H8.5C8.5 5 9.5 4 11 4V2C8 2 7 4.5 7 7zm10 0h-3v7h7V7h-2.5C18.5 5 19.5 4 21 4V2c-3 0-4 2.5-4 5z" />
    </svg>
  ),
} as const;

export type IconName = keyof typeof Icon;
