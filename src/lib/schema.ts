// JSON-LD structured data builders. Output is rendered via a native <script>
// tag (see components/JsonLd.tsx). Keeps Google/AI crawlers rich-result ready.

import { site, services, faqs } from "./site";

const ID = `${site.url}/#business`;

// LocalBusiness (HousePainter) — the anchor entity for local SEO.
export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["HousePainter", "LocalBusiness"],
    "@id": ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    priceRange: "$$",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    areaServed: [
      "Manhattan",
      "Brooklyn",
      "Queens",
      "The Bronx",
      "Staten Island",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "19:00",
    },
    // No aggregateRating/review here on purpose — review markup must reflect
    // genuine, verifiable reviews. Add it back once real reviews exist.
    sameAs: Object.values(site.social).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": ID },
  };
}

export function faqSchema(items: ReadonlyArray<{ q: string; a: string }> = faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(s: {
  name: string;
  short: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.short,
    serviceType: s.name,
    provider: { "@id": ID },
    areaServed: { "@type": "City", name: "New York" },
    url: `${site.url}/services/${s.slug}`,
  };
}

export function breadcrumbs(
  trail: ReadonlyArray<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path}`,
    })),
  };
}
