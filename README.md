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
2. **`warrantyYears`** — set it to the warranty you actually offer (or remove the
   warranty messaging if you don't offer one).
3. **`guarantees`** — confirm every promise is true for your business. You must
   genuinely be licensed/insured/EPA Lead-Safe before claiming it.
4. **Social links** in `site.social` — paste real profile URLs, or leave blank
   (`""`) and they're omitted from the page and schema automatically.
5. **Estimate form delivery** — the form already POSTs to a real endpoint
   (`/api/estimate`). To receive leads by email, set the env vars below (see
   "Estimate form" section). Until then, leads are validated and logged
   server-side so none are lost.
6. **Before/after** — `src/components/BeforeAfter.tsx` uses stylized panels;
   drop in real project photos (`<img>`) when available.
7. Point `site.url` / `domain` at the live domain before building for prod.

## Estimate form (`/api/estimate`)

The estimate form is wired to a Next.js Route Handler that validates input,
blocks bots with a honeypot, and emails the lead to your inbox via
[Resend](https://resend.com) (called over its REST API — no SDK dependency).

Copy `.env.example` to `.env.local` and set:

```bash
RESEND_API_KEY=re_xxxxxxxx          # free key from resend.com
ESTIMATE_TO_EMAIL=hello@nycpaintingpros.com   # where leads are delivered
ESTIMATE_FROM_EMAIL=estimates@nycpaintingpros.com  # a Resend-verified sender
```

For a quick test you can use `onboarding@resend.dev` as the sender. For
production, verify your domain in Resend and use an address on it. On Vercel,
add the same three variables in **Project → Settings → Environment Variables**.

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
