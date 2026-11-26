# NYC Painting Pros — nycpaintingpros.com

SEO-first marketing site for an NYC painting company. Built with **Next.js 16
(App Router) + React 19 + Tailwind v4 + TypeScript**. Every page is prerendered
to static HTML for top Core Web Vitals.

## Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (prerenders all routes)
npm start       # serve the production build
```

## What's inside

- **Pages**: home, `/services` (+ 6 service detail pages), `/areas` (+ 5 borough
  pages), `/about`, `/guarantee`, `/contact`, custom 404.
- **Money pages**: `/painting` hub + 15 high-intent landing pages at
  `/painting/[slug]` (data in `src/lib/money-pages.ts`). Each has unique copy, a
  cost-range table, multiple content sections, FAQs (+ schema), and internal
  links — built deep on purpose to avoid thin/doorway-page penalties. Cost ranges
  are NYC orientation estimates with "quoted individually" caveats; review them
  against your real pricing before launch.
- **SEO**: per-page `<title>`/description/canonical, OpenGraph + Twitter, dynamic
  `sitemap.xml`, `robots.txt`, PWA `manifest.webmanifest`, generated social
  share image (`opengraph-image`), SVG favicon, theme-color.
- **Structured data (JSON-LD)**: `LocalBusiness`/`HousePainter`, `WebSite`,
  per-service `Service`, `FAQPage`, and `BreadcrumbList` — all rich-result ready.
- **Design system**: navy ink / warm cream / amber accent, Fraunces display +
  Inter body, in `src/app/globals.css`.
- **Components**: sticky header w/ click-to-call, before/after slider, FAQ
  accordion, estimate form, guarantees grid, reusable CTA.

## 🧭 Honesty by design — no fake social proof

This site intentionally ships with **no invented ratings, review counts, project
counts, or testimonials**, and **no `aggregateRating`/`review` schema**. Fake
review markup violates Google's policies and risks a manual penalty. Trust is
built instead on real, owner-controlled promises (the `guarantees` in
`src/lib/site.ts`) and credentials. When you have genuine, public reviews, add a
verified reviews widget and re-introduce review schema that reflects them.

## ⚙️ Before you launch — replace the placeholders

All business content lives in one file: **`src/lib/site.ts`**.

1. **Phone / email / address** (`site.phone`, `phoneHref`, `email`, `address`,
   `geo`) — must match your Google Business Profile exactly (NAP consistency).
2. **`guarantees`** — confirm every promise is true for your business. You must
   genuinely be licensed/insured/EPA Lead-Safe before claiming it.
3. **Social links** in `site.social` — paste real profile URLs, or leave blank
   (`""`) and they're omitted from the page and schema automatically.
4. **Estimate form delivery** — the form already POSTs to a real endpoint
   (`/api/estimate`). To receive leads by email, set the env vars below (see
   "Estimate form" section). Until then, leads are validated and logged
   server-side so none are lost.
5. **Before/after** — `src/components/BeforeAfter.tsx` uses stylized panels;
   drop in real project photos (`<img>`) when available.
6. Point `site.url` / `domain` at the live domain before building for prod.

## Estimate form (`/api/estimate`)

The estimate form is wired to a Next.js Route Handler that validates input,
blocks bots with a honeypot, and emails the lead to your inbox via
[Resend](https://resend.com) (called over its REST API — no SDK dependency).

Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=re_xxxxxxxx          # free key from resend.com
ESTIMATE_TO_EMAIL=                 # optional comma-separated extra recipients
ESTIMATE_FROM_EMAIL=estimates@nycpaintingpros.com  # a Resend-verified sender
```

Every estimate notification goes to `hello@nycpaintingpros.com` and
`abielsoares@nycpaintingpros.com`. `ESTIMATE_TO_EMAIL` adds extra recipients;
duplicate and blank addresses are removed.

After a new request is saved, the customer gets a separate thank-you email
from `hello@nycpaintingpros.com`. Replies go to that inbox. The Resend key must
allow sending from the verified `nycpaintingpros.com` domain.

For a quick test you can use `onboarding@resend.dev` as the sender. For
production, verify your domain in Resend and use an address on it. On Vercel,
add the same three variables in **Project → Settings → Environment Variables**.

### Lead dashboard email and quote approval

Set `LEAD_REPLY_DOMAIN` to a dedicated Resend receiving subdomain (a Resend-managed
`.resend.app` domain also works), leaving the main mailbox routing in place.
Point an `email.received` webhook at `/api/lead-mail/inbound` and store its
signing secret in `LEAD_RESEND_WEBHOOK_SECRET`. Set `CRON_SECRET` for the daily
15:00 UTC job. `RESEND_API_KEY` sends from the verified business domain.
Use `RESEND_RECEIVING_API_KEY` when the sending key cannot read received and
sent messages. Dashboard emails originate from `hello@nycpaintingpros.com` and
each lead has a private reply address on the receiving domain.

Set `LEAD_AI_MODEL` to an OpenAI model that supports images and structured
output, such as `gpt-6.2-sol`. Store the OpenAI project key in the Vercel project’s
Production secrets as `LEAD_OPENAI_API_KEY`. Lead email uses OpenAI’s Responses
API directly. The public chat assistant uses its own Vercel AI Gateway setup.
After testing a round-trip with a controlled address, set `LEAD_AI_ENABLED=true`.
New website leads then receive one first reply in place of the basic thank-you.
AI drafts the body of each first reply and quote follow-up from the project
details. The app adds the signature, checks the copy and controls estimate
eligibility and pricing. The first reply can ask a question that affects the
estimate, offer a walkthrough, or share the published planning range for a
matching small NYC job. The app inserts the range and keeps formal PDF quotes
on the separate eligibility path. Website inquiries receive a basic acknowledgment if
the AI draft is unavailable or invalid. Automated lead emails are signed by
Abiel Soares.

The lead list shows its stage, owner, suggested or saved next action, and any
due date. Use **Next action and job costs** on the intake to record collections,
crew costs, materials and other direct costs. Leave unknown amounts blank;
record zero only when the actual amount is zero. Reuse the same property or
account name for related jobs. Once two leads for an account are marked Won,
the dashboard shows the repeat account and its recorded collections.
The form confirms receipt immediately. First replies and automatic estimates
are scheduled 10–15 minutes after receipt with Vercel Workflow. The database
also stores the earliest send time, and the daily job can recover queued mail.

To bring direct email leads into the dashboard, set `LEAD_INTAKE_ADDRESS`
to a private receiving alias on `LEAD_REPLY_DOMAIN`. Forward a copy of inbound
mail to `hello@nycpaintingpros.com` to that alias while keeping delivery to the
existing mailbox. The signed Resend webhook verifies the forwarding destination.
It filters bulk messages, auto-replies, and unrelated mail before creating a
lead. The model can hold ambiguous inquiries for the team. Replies to dashboard
messages continue to use their individual lead reply addresses.

Lead AI reviews up to three normalized JPEG equivalents from website or email
inquiries. The model uses photos to flag scope or condition exceptions and ask
better questions. Measurements and package eligibility still come from customer
confirmation and the configured rules. Unavailable or unsupported emailed
photos prevent automatic quotes. The optional `LEAD_RESEND_ATTACHMENT_HOST`
is for the exact signed URL hostname returned by Resend if it differs from
`cdn.resend.app`.

In a lead’s **Customer email and quote** panel, save the scope, total, and any
conditions, then review and approve the saved version. Provider acceptance
moves the lead to Quoted. One check-in can go out after two New York weekdays
if the quote was delivered, receiving is reachable, and there is no reply or
team email since the quote. The owner can pause automatic email for conversations
handled elsewhere and marks the lead Won after signature. Staff can read plain
text replies in the lead history and access inbound attachments in Resend.

### Automatic PDF estimates

Both team-sent and automatic estimates attach a PDF. The lead’s email history
includes the actual attachment after Resend accepts it.

`LEAD_AUTO_QUOTE_ENABLED=true` turns on the small-room walls-only package when
lead AI and email are configured. The estimate form collects dimensions and
condition, paint, and access confirmation. The package covers one room of up
to 120 square feet of floor area, a ceiling up to 9 feet high, and up to
400 gross square feet of wall area. The AI reviews the supplied notes for
exceptions. The server calculates the price and sends the estimate once.
Other scopes stay with the normal inquiry workflow.

The initial `LEAD_AUTO_QUOTE_MARKET_CENTS` is 54,750 cents, the midpoint of
[ASAP Repair’s published NYC labor range](https://asap.repair/blog/interior-painting-cost-nyc/)
for a small room with sound walls and a similar-color repaint, reviewed
November 26, 2026. The app multiplies that benchmark by 0.90, yielding
$492.75 before applicable tax. This is a comparable advertised price and
a starting offer. Update the benchmark when comparable pricing is refreshed.
The PDF confirms scope and scheduling before booking.

Prefer a no-code option? You can instead point the form at Formspree/Web3Forms
by swapping the `fetch` URL in `src/components/EstimateForm.tsx`.

## Deploy

Zero-config on **Vercel** (or any Node host). Push to a Git repo and import, or
`vercel --prod`. Set the production domain to `nycpaintingpros.com`, and add the
estimate-form env vars in your hosting dashboard.

## Post-launch SEO checklist

- Create/claim **Google Business Profile**, add photos, match NAP to this site.
- Submit `sitemap.xml` in **Google Search Console**.
- Build local citations (Yelp, Angi, BBB, HomeAdvisor) with identical NAP.
- Gather real Google reviews continuously — it's the #1 local ranking lever.
