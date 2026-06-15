// ===========================================================================
// Central business data — single source of truth for content + SEO schema.
// 👉 Update the NAP (name/address/phone) + social links with the real values.
// ===========================================================================

export const site = {
  name: "NYC Painting Pros",
  legalName: "NYC Painting Pros LLC",
  domain: "nycpaintingpros.com",
  url: "https://nycpaintingpros.com",
  tagline: "New York's most trusted painters.",
  description:
    "NYC Painting Pros delivers flawless interior, exterior, and commercial painting across all five boroughs. Licensed, insured, EPA Lead-Safe certified — backed by a written workmanship warranty.",
  // --- NAP (keep identical everywhere: site, Google Business Profile, citations) ---
  phone: "(212) 814-7500",
  phoneHref: "tel:+12128147500",
  email: "hello@nycpaintingpros.com",
  address: {
    street: "121 Varick St, Suite 400",
    city: "New York",
    region: "NY",
    postalCode: "10013",
    country: "US",
  },
  geo: { lat: 40.7257, lng: -74.0055 },
  hours: "Mon–Sat 7:00am–7:00pm",
  // --- Owner-controlled policies (these are promises you set, not invented metrics) ---
  warrantyYears: 3,
  // 👉 Once you have a real, public Google Business Profile review rating, you can
  //    add a verified reviews widget. Do NOT hard-code ratings/counts here — fake
  //    review markup violates Google policy and risks a manual penalty.
  // 👉 Paste your REAL profile URLs here. Leave blank ("") and they're omitted
  //    from the site + schema — never point these at generic homepages.
  social: {
    google: "",
    instagram: "",
    facebook: "",
    yelp: "",
  },
} as const;

export const services = [
  {
    slug: "interior-painting",
    name: "Interior Painting",
    short: "Walls, ceilings, trim & doors finished to a flawless, even sheen.",
    keyword: "interior painters NYC",
    icon: "roller",
    hero: "Interior painting that makes every room feel new",
    intro:
      "From a single accent wall to a full pre-sale repaint, our interior crews deliver clean lines, even coverage, and a dust-free job site you'd be happy to host guests in the same evening.",
    bullets: [
      "Premium low-VOC Benjamin Moore & Sherwin-Williams finishes",
      "Meticulous surface prep: patching, sanding, priming",
      "Crisp cut-ins and laser-straight trim lines",
      "Floors, furniture & fixtures fully masked and protected",
      "Same-day cleanup — we leave it spotless",
    ],
    faqs: [
      {
        q: "How long does it take to paint an apartment interior?",
        a: "A typical 1–2 bedroom NYC apartment takes 2–4 working days including prep, two finish coats, and cleanup. We confirm an exact timeline in your written estimate.",
      },
      {
        q: "Do I need to move out while you paint?",
        a: "No. We work room-by-room, seal off active zones with plastic, and use low-VOC paints so most clients stay in their home throughout the project.",
      },
    ],
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    short: "Weatherproof finishes for brownstones, facades, doors & trim.",
    keyword: "exterior painters NYC",
    icon: "house",
    hero: "Exterior painting built to beat New York weather",
    intro:
      "Brownstone cornices, stucco facades, fire escapes, and front doors — we prep, prime, and coat with weather-rated systems engineered for freeze-thaw winters and humid summers.",
    bullets: [
      "Power-washing and full scrape/sand prep",
      "Rust treatment for iron railings & fire escapes",
      "Elastomeric & 100% acrylic weatherproof systems",
      "Lead-safe practices on pre-1978 buildings (EPA RRP)",
      "Color matching for landmark & co-op board approval",
    ],
    faqs: [
      {
        q: "What's the best season for exterior painting in NYC?",
        a: "April through November offers ideal temperatures and humidity for proper curing. We monitor the forecast and only coat when conditions guarantee a lasting finish.",
      },
      {
        q: "Do you handle co-op and landmark approvals?",
        a: "Yes. We provide color drawdowns, product specs, and documentation your co-op board or the Landmarks Preservation Commission needs to approve the work.",
      },
    ],
  },
  {
    slug: "commercial-painting",
    name: "Commercial Painting",
    short: "Offices, retail, lobbies & multi-unit buildings — on schedule.",
    keyword: "commercial painting NYC",
    icon: "building",
    hero: "Commercial painting that respects your schedule",
    intro:
      "Retail storefronts, office build-outs, restaurant interiors, and multi-unit residential — we work nights and weekends to keep your business open and your tenants happy.",
    bullets: [
      "After-hours & weekend scheduling to avoid downtime",
      "Fully licensed, bonded & insured ($2M liability)",
      "Certificates of Insurance issued same day",
      "Durable, scrubbable commercial-grade coatings",
      "Single point of contact + written progress reporting",
    ],
    faqs: [
      {
        q: "Can you paint our office without disrupting business?",
        a: "Absolutely. We schedule around your hours — evenings, weekends, or phased by floor — and coordinate with building management on COIs and freight elevator access.",
      },
      {
        q: "Do you provide Certificates of Insurance?",
        a: "Yes, same day. We carry $2M general liability plus workers' comp and can name your building and management company as additional insured.",
      },
    ],
  },
  {
    slug: "cabinet-refinishing",
    name: "Cabinet Refinishing",
    short: "Factory-smooth, sprayed cabinet finishes for a fraction of replacement.",
    keyword: "cabinet refinishing NYC",
    icon: "cabinet",
    hero: "Kitchen cabinets that look factory-new",
    intro:
      "Skip the $30k replacement. We degrease, sand, prime, and spray your cabinets with a durable conversion finish that cures rock-hard and looks like it came from a showroom.",
    bullets: [
      "Doors removed and sprayed off-site for a dust-free finish",
      "Bonding primer for guaranteed adhesion on any surface",
      "Durable, scrubbable cabinet-grade lacquer or enamel",
      "Hundreds of color options + on-site sample boards",
      "1-week average turnaround for a standard kitchen",
    ],
    faqs: [
      {
        q: "How much does cabinet refinishing cost vs. replacement?",
        a: "Refinishing typically runs 30–50% of replacement cost while delivering a comparable finish. Most NYC kitchens fall between $3,500 and $7,500 depending on door count.",
      },
      {
        q: "Will the finish chip or peel?",
        a: "Not with our process. Proper degreasing, sanding, and a bonding primer under a catalyzed topcoat create a finish that resists chipping for years — backed by our warranty.",
      },
    ],
  },
  {
    slug: "wallpaper-removal",
    name: "Wallpaper Removal & Skim Coating",
    short: "Strip old paper and skim walls glass-smooth before painting.",
    keyword: "wallpaper removal NYC",
    icon: "wall",
    hero: "Wallpaper removal & flawless skim coating",
    intro:
      "Decades-old wallpaper and damaged plaster are no match for our crews. We strip, clean adhesive residue, and skim-coat to a Level 5 smooth surface ready for paint.",
    bullets: [
      "Safe steam & solvent removal that protects plaster",
      "Full adhesive residue removal — no ghosting",
      "Level 5 skim coating for a glass-smooth finish",
      "Plaster and drywall repair for pre-war apartments",
      "Primer-sealed and ready for your new color",
    ],
    faqs: [
      {
        q: "Can you fix the plaster damage left behind by old wallpaper?",
        a: "Yes. Pre-war plaster repair is one of our specialties. We patch, skim, and sand so the finished wall looks brand new — not just covered up.",
      },
    ],
  },
  {
    slug: "drywall-plaster-repair",
    name: "Drywall & Plaster Repair",
    short: "Cracks, holes & water damage repaired to invisible.",
    keyword: "drywall repair NYC",
    icon: "patch",
    hero: "Drywall & plaster repair, painted to invisible",
    intro:
      "Settling cracks, water stains, anchor holes, and crumbling pre-war plaster — we repair the substrate properly so the patch disappears completely under the finish coat.",
    bullets: [
      "Pre-war plaster and lath restoration",
      "Water-damage repair and stain-blocking primer",
      "Hairline crack stabilization that won't return",
      "Texture and skim matching for seamless blends",
      "Painted to a flawless, undetectable finish",
    ],
    faqs: [
      {
        q: "Will the repaired area be noticeable after painting?",
        a: "No. We feather, sand, and prime every repair, then paint corner-to-corner where needed so the patch blends invisibly into the surrounding wall.",
      },
    ],
  },
] as const;

export type Service = (typeof services)[number];

export const areas = [
  {
    slug: "manhattan",
    name: "Manhattan",
    blurb:
      "Pre-war co-ops, condo combinations, and high-floor apartments — we know Manhattan's buildings, COI requirements, and board rules inside out.",
    neighborhoods: [
      "Upper East Side",
      "Upper West Side",
      "Tribeca",
      "SoHo",
      "Chelsea",
      "Greenwich Village",
      "Harlem",
      "Financial District",
      "Murray Hill",
      "Hell's Kitchen",
    ],
  },
  {
    slug: "brooklyn",
    name: "Brooklyn",
    blurb:
      "From Park Slope brownstones to Williamsburg lofts, our Brooklyn crews handle historic detail and modern open-plan spaces with equal care.",
    neighborhoods: [
      "Park Slope",
      "Williamsburg",
      "Brooklyn Heights",
      "Bushwick",
      "DUMBO",
      "Fort Greene",
      "Bay Ridge",
      "Greenpoint",
      "Cobble Hill",
      "Bed-Stuy",
    ],
  },
  {
    slug: "queens",
    name: "Queens",
    blurb:
      "Single-family homes, co-ops, and storefronts across Queens — dependable scheduling and clean, lasting results in every neighborhood.",
    neighborhoods: [
      "Astoria",
      "Long Island City",
      "Forest Hills",
      "Flushing",
      "Jackson Heights",
      "Sunnyside",
      "Bayside",
      "Ridgewood",
      "Rego Park",
      "Jamaica",
    ],
  },
  {
    slug: "bronx",
    name: "The Bronx",
    blurb:
      "Multi-family buildings, apartments, and commercial spaces across the Bronx, painted on schedule and on budget.",
    neighborhoods: [
      "Riverdale",
      "Pelham Bay",
      "Throgs Neck",
      "Morris Park",
      "Fordham",
      "Country Club",
      "City Island",
      "Parkchester",
    ],
  },
  {
    slug: "staten-island",
    name: "Staten Island",
    blurb:
      "Single-family homes and businesses across Staten Island — full interior and exterior painting with neighborhood-level reliability.",
    neighborhoods: [
      "St. George",
      "Tottenville",
      "Great Kills",
      "New Dorp",
      "West Brighton",
      "Annadale",
      "Todt Hill",
      "Stapleton",
    ],
  },
] as const;

export type Area = (typeof areas)[number];

// Our promises — every one of these is something the business controls and can
// stand behind. No invented ratings, counts, or testimonials.
export const guarantees = [
  {
    icon: "shield",
    title: "Licensed, bonded & insured",
    text: "Fully licensed with $2M general liability plus workers' comp. We issue Certificates of Insurance same-day for any building that needs one.",
  },
  {
    icon: "medal",
    title: `${site.warrantyYears}-year workmanship warranty`,
    text: "Every project is backed in writing. If anything fails because of our work, we come back and make it right — no debate.",
  },
  {
    icon: "check",
    title: "Free, itemized estimates",
    text: "Clear, fixed pricing up front. No hidden fees, no day-of surprises, no pressure to sign.",
  },
  {
    icon: "leaf",
    title: "Premium, low-VOC finishes",
    text: "Benjamin Moore & Sherwin-Williams as standard, with low- and zero-VOC lines so your space is safe to use the same day.",
  },
  {
    icon: "clock",
    title: "On time, every time",
    text: "We arrive when we say we will, protect your floors and furniture, and clean up fully at the end of every day.",
  },
  {
    icon: "phone",
    title: "A real person to talk to",
    text: "A dedicated project manager on every job who answers the phone and keeps you posted from quote to final walkthrough.",
  },
] as const;

export type Guarantee = (typeof guarantees)[number];

export const faqs = [
  {
    q: "Are you licensed and insured?",
    a: "Yes. NYC Painting Pros is fully licensed, bonded, and carries $2M in general liability plus workers' compensation. We issue Certificates of Insurance the same day for any building that requires one.",
  },
  {
    q: "How much does painting cost in NYC?",
    a: "Most interior apartment projects range from $3–$9 per square foot depending on prep, ceiling height, and finish level. We give a clear, itemized written estimate up front — no hidden fees, no surprises.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Always. We provide a free, no-obligation written estimate, usually within 24 hours. For most projects we can quote from photos and a quick call, or schedule an on-site walkthrough.",
  },
  {
    q: "What kind of warranty do you provide?",
    a: `Every project is backed by our written ${site.warrantyYears}-year workmanship warranty. If anything fails due to our work, we make it right — no questions asked.`,
  },
  {
    q: "What paint brands do you use?",
    a: "We use premium Benjamin Moore and Sherwin-Williams products as standard, including low-VOC and zero-VOC lines for healthier indoor air. We're happy to match any brand or color you prefer.",
  },
  {
    q: "Do you work in pre-1978 buildings?",
    a: "Yes — and we're EPA Lead-Safe (RRP) certified to do it correctly. We follow all lead-safe work practices to protect your family and our crews in older NYC buildings.",
  },
] as const;

export const processSteps = [
  {
    title: "Free Consultation",
    text: "Call or book online. We learn your goals, timeline, and budget — then schedule a walkthrough or quote from photos.",
  },
  {
    title: "Detailed Written Estimate",
    text: "You get a clear, itemized quote within 24 hours. Fixed price, no hidden fees, no pressure.",
  },
  {
    title: "Prep & Protection",
    text: "We mask, cover, patch, sand, and prime. Proper prep is 80% of a flawless finish — and we never skip it.",
  },
  {
    title: "Flawless Application",
    text: "Skilled crews apply premium coatings with crisp lines and even coverage, keeping your space clean throughout.",
  },
  {
    title: "Walkthrough & Warranty",
    text: "We inspect together, touch up anything you flag, and back the whole job with our written warranty.",
  },
] as const;
