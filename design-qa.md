# NYC Painting Pros — option 1 header and call-click tracking

Date: November 16, 2026. Local preview: http://localhost:4176/. Private report: /admin/calls.

## Scope and visual truth

Use option 1’s header only; retain the completed option 2 page layouts, copy, original roller photograph and brand logo. Add explicit click-to-call actions and a private count/time report.

Header source: `C:/Users/malik/.codex/generated_images/01a1cbf7-61f2-7ef1-b00f-afb334e7df9c/exec-9ea9dade-fc3a-43bf-ad70-00c2bfbfaa3c.png` (1036 × 1518).

Evidence: `C:/Users/malik/Documents/Codex/2026-11-11/con-2/outputs/header-call-tracking-2026-11-16/`.

- `header-comparison.jpg`: source header above, implementation below, opened as one combined comparison.
- `header-final.jpg`: final production build at 1036 × 900 CSS pixels; captured 1021 × 887 pixels excluding the scrollbar. Device pixel ratio approximately 1. Comparison normalizes width to 1036 and crops the first 140 pixels of each header. The page body is outside this header comparison.
- `header-mobile-final.jpg`: final production build at 390 × 844.
- `calls-saved.jpg`: authenticated Chrome report showing one synthetic local event and its New York timestamp, page, button and destination.
- `calls-clean.jpg` / `calls-final.jpg`: report after removing that synthetic event.

The prior full-site QA report is archived as `../nyc-painting-pros-blue-research-2026-11-16/sitewide-redesign-qa.md` in the evidence output tree.

## Fidelity review

**Typography:** serif navigation matches the reference’s editorial treatment using the established DM Serif Display family; Inter remains the small information-bar and control font. The source provides no exact font metadata. Text remains selectable and readable.

**Spacing and layout:** slim blue information bar, logo at left, service navigation in the middle and estimate action at right. Explicit Call action occupies the utility bar on desktop and the primary header on mobile. Hours remain visible in the footer and are shown in the utility bar at wider widths to leave room for the requested Call action. Header height is slightly larger than the mock to retain practical control sizes. This is an intentional functional extension.

**Colors and focus:** the established ink blue and ivory tokens continue throughout. The utility bar has light text on ink blue; its keyboard focus outline is ivory so it stays visible on the dark background. Mobile Call has an ink outline and a minimum 44-pixel height.

**Assets:** original orange logo, roller hero image and other page imagery preserved. Phone glyph comes from the installed Lucide library. No substitute image, generated logo, SVG artwork or decorative assets were introduced.

**Content:** page body copy and hero remain unchanged. New labels describe calling and click reporting. The privacy page now explains the limited click data collected. The log does not capture a visitor’s telephone number, IP address or call audio.

## Functional evidence

- Call links use the confirmed public number `(929) 407-5635` (`tel:+19294075635`). Header, mobile header/menu, footer and contact links share the same tracking component.
- Rendering does not send an event. Explicit activation sends a keepalive request without cancelling or delaying the telephone link. A tracking failure does not block dialing.
- The endpoint validates origin, content type, a bounded body, event UUID, public pathname and placement. No query string is stored. Destination and timestamp are assigned by the server.
- PostgreSQL stores events durably with `ON CONFLICT (id) DO NOTHING`; retries do not inflate counts. The private report shows all-time, New York today and last-seven-days totals, plus the most recent 100 events with seconds and timezone.
- The local preview has an explicitly enabled separate file log, using exclusive file creation to deduplicate concurrent delivery. It is disabled whenever VERCEL is set; Vercel uses DATABASE_URL instead. Preview records and local session settings are ignored by Git.
- Verified the real local API → saved event → authenticated Chrome report boundary. First delivery returned 201, retry returned 200, one row appeared with a server timestamp, and the synthetic event was then removed. Repeated public page loads left the log at zero.
- Verified the optimized production build’s ingestion and deduplication path. Anonymous access to /admin/calls redirects to sign-in; GET on the ingestion endpoint returns 405.
- Five focused tracking tests and four existing estimate/photo tests passed. ESLint and production build, including TypeScript, passed. All 167 public sitemap URLs returned 200. `git diff --check` passed.
- Header widths 320, 390, 768, 1024 and 1440 were checked for overflow and clipped controls. Production mobile header passed at 320/390; the private report fits at 390 with a scrollable event table when populated. Mobile menu opens and closes with Escape and includes the Call link.

## Iteration history

- The first report preview exposed in-app-browser session-cookie limitations. Kept the existing strict admin authentication and verified the private report through Chrome’s normal login flow. No authentication protection was weakened.
- Added a contrasting focus indicator on the new dark utility bar before final capture.
- Final combined header comparison and mobile capture show no actionable P0/P1/P2 discrepancy. Exact generated-font differences and modest control-height differences are accepted within the existing design system.

## Verification limits

No telephone call was placed. The click handler was exercised in isolated tests; real HTTP ingestion and report rendering were then verified without launching a phone app. These are click counts, not unique callers or connected-call counts.

Vercel lists sensitive DATABASE_URL settings for the existing project. Those protected values cannot be downloaded for local verification, and the deployed database write path was not exercised because this change has not been published. Database behavior was covered by isolated storage tests. No deployment, production data mutation or external notification was performed.

## Checklist

- [x] Option 1 header adapted, existing body/hero preserved.
- [x] Explicit call actions and timestamped persistence implemented.
- [x] Private totals/history view and accurate privacy disclosure added.
- [x] Real preview persistence, duplicate handling and authenticated report verified.
- [x] Synthetic preview record removed; production and preview logs separate.
- [x] Build, lint, tests, responsive checks and combined design comparison passed.

final result: passed
