// ===========================================================================
// Central business data — single source of truth for content + SEO schema.
// Verify the NAP, credentials, and social links before each production launch.
// ===========================================================================

export const site = {
  name: "NYC Painting Pros",
  legalName: "NYC Painting Pros LLC",
  domain: "nycpaintingpros.com",
  url: "https://nycpaintingpros.com",
  tagline: "Detail-focused painting for NYC homes and businesses.",
  description:
    "NYC Painting Pros delivers careful painting, wall finishes, and turnover services across all five boroughs, with detailed estimates and a written workmanship warranty.",
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
    short: "Walls, ceilings, trim, and doors finished with clean lines and even coverage.",
    keyword: "interior painters NYC",
    icon: "roller",
    hero: "Interior painting that makes every room feel new",
    intro:
      "From a single accent wall to a full pre-sale repaint, our interior crews deliver clean lines, even coverage, and a dust-free job site you'd be happy to host guests in the same evening.",
    bullets: [
      "Premium low-VOC Benjamin Moore & Sherwin-Williams finishes",
      "Meticulous surface prep: patching, sanding, priming",
      "Careful cut-ins and clean trim lines",
      "Floors, furniture & fixtures fully masked and protected",
      "Daily cleanup and an organized handoff",
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
    short: "Smooth, sprayed cabinet finishes without a full kitchen replacement.",
    keyword: "cabinet refinishing NYC",
    icon: "cabinet",
    hero: "Kitchen cabinets that look factory-new",
    intro:
      "When the cabinet boxes and doors are sound, refinishing can update the kitchen without a full replacement. We degrease, sand, prime, and spray a durable cabinet-grade finish.",
    bullets: [
      "Doors removed and sprayed off-site for a dust-free finish",
      "Bonding primer selected for the existing surface",
      "Durable, scrubbable cabinet-grade lacquer or enamel",
      "Hundreds of color options + on-site sample boards",
      "Written sequencing and turnaround plan before work begins",
    ],
    faqs: [
      {
        q: "How much does cabinet refinishing cost vs. replacement?",
        a: "Refinishing usually avoids the demolition, new boxes, and installation involved in replacement. Pricing depends on door count, condition, profile, finish system, and whether hardware changes are included, so we quote each kitchen from photos or a walkthrough.",
      },
      {
        q: "Will the finish chip or peel?",
        a: "Cabinet finishes still need normal care, but proper degreasing, sanding, compatible primer, and a cabinet-grade topcoat create a substantially more durable result than wall paint brushed over an unprepared surface.",
      },
    ],
  },
  {
    slug: "wallpaper-removal",
    name: "Wallpaper Removal & Skim Coating",
    short: "Remove old paper, repair the surface, and prepare walls for paint or new coverings.",
    keyword: "wallpaper removal NYC",
    icon: "wall",
    hero: "Wallpaper removal with careful wall preparation",
    intro:
      "We remove wallpaper, clean residual adhesive, repair the underlying surface, and prepare it for paint or a new wallcovering. The scope is matched to what we find beneath the paper.",
    bullets: [
      "Safe steam & solvent removal that protects plaster",
      "Full adhesive residue removal — no ghosting",
      "Skim coating where the wall condition calls for it",
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
    slug: "wallpaper-installation",
    name: "Wallpaper Installation",
    short: "Measured, prepared, and aligned wallcoverings for apartments, homes, and commercial spaces.",
    keyword: "wallpaper installers NYC",
    icon: "wall",
    hero: "Wallpaper installation planned around the pattern",
    intro:
      "From a single powder room to a restaurant feature wall, we assess the surface, calculate usable material, map the pattern, and install residential and commercial wallcoverings with careful seams and clean edges.",
    bullets: [
      "Surface assessment, patching, sanding, and wallcovering primer",
      "Pattern layout planned around doors, corners, and focal walls",
      "Installation of paper, vinyl, grasscloth, and peel-and-stick products",
      "Coordination with designers, showrooms, and supplied materials",
      "Clear material overage guidance before installation day",
    ],
    faqs: [
      {
        q: "How much extra wallpaper should I order?",
        a: "The right overage depends on the repeat, roll width, wall dimensions, and number of corners and openings. We review the product specification and room measurements before you order so the quantity is based on the actual layout, not a generic percentage.",
      },
      {
        q: "Do walls need to be perfectly smooth before wallpaper is installed?",
        a: "They need to be sound, clean, and appropriately smooth for the selected material. Thin papers and reflective finishes reveal more surface texture than heavier coverings. We identify patching, skim coating, and primer needs during the estimate.",
      },
      {
        q: "Can you remove existing wallpaper and install new paper?",
        a: "Yes. We can combine removal, adhesive cleanup, wall repair, priming, and new installation into one written scope so the condition beneath the old paper is handled correctly.",
      },
    ],
  },
  {
    slug: "decorative-finishes",
    name: "Limewash & Decorative Finishes",
    short: "Limewash, Roman clay, Venetian plaster, and layered feature-wall finishes.",
    keyword: "decorative wall finishes NYC",
    icon: "roller",
    hero: "Decorative wall finishes with depth and movement",
    intro:
      "Limewash, Roman clay, and Venetian-style plaster behave differently from standard paint. We build the finish through approved samples, compatible primers, and layered application so the final movement suits the room and its light.",
    bullets: [
      "Limewash, mineral paint, Roman clay, and Venetian-style plaster",
      "Sample boards reviewed in the room's natural and evening light",
      "Substrate assessment and product-specific primer systems",
      "Feature walls, fireplaces, bedrooms, lobbies, and hospitality spaces",
      "Sheen, movement, color variation, and maintenance discussed up front",
    ],
    faqs: [
      {
        q: "What is the difference between limewash and Roman clay?",
        a: "Limewash is brushed in translucent mineral layers and typically has soft tonal variation. Roman clay is trowel-applied and creates a smoother, stone-like movement. The right choice depends on the substrate, room use, desired texture, and maintenance expectations.",
      },
      {
        q: "Can you match a finish from an inspiration photo?",
        a: "We can use the photo to define direction, then prepare physical samples with the proposed product and color. Hand-applied finishes vary with light, substrate, and application, so the approved sample becomes the practical standard for the project.",
      },
      {
        q: "Are decorative finishes suitable for bathrooms or kitchens?",
        a: "Some systems are suitable when specified and sealed correctly, while others are better kept away from direct water and heavy grease. We match the product and protective finish to the room rather than treating every decorative coating the same way.",
      },
    ],
  },
  {
    slug: "drywall-plaster-repair",
    name: "Drywall & Plaster Repair",
    short: "Cracks, holes, and water damage repaired and blended into the surrounding finish.",
    keyword: "drywall repair NYC",
    icon: "patch",
    hero: "Drywall and plaster repair prepared for a clean repaint",
    intro:
      "Settling cracks, water stains, anchor holes, and damaged pre-war plaster need more than filler. We repair and feather the substrate, prime where needed, and repaint to blend with the surrounding surface.",
    bullets: [
      "Pre-war plaster and lath restoration",
      "Water-damage repair and stain-blocking primer",
      "Hairline crack stabilization based on the underlying condition",
      "Texture and skim matching for seamless blends",
      "Primed and painted to minimize visible patching",
    ],
    faqs: [
      {
        q: "Will the repaired area be noticeable after painting?",
        a: "Our goal is a repair that blends with the surrounding wall. We feather, sand, and prime the patch, then paint corner-to-corner where needed. Existing texture, sheen, fading, and active movement can affect how closely any repair matches.",
      },
    ],
  },
  {
    slug: "property-manager-turnovers",
    name: "Property Manager Turnovers",
    short: "Repeatable, lease-ready painting and repair scopes for rental portfolios and managed buildings.",
    keyword: "property management painting NYC",
    icon: "building",
    hero: "A repeatable turnover program for managed properties",
    intro:
      "We help property managers standardize apartment turns with defined paint systems, photo-based scoping, documented add-ons, and scheduling built around move-outs, inspections, and new-tenant dates.",
    bullets: [
      "Standard color and sheen schedules by property or unit type",
      "Photo-based scoping with itemized repair and paint options",
      "Patch, prime, repaint, and common touch-up work in one scope",
      "Occupied-building protection and management coordination",
      "Completion photos and clear closeout notes for each unit",
    ],
    faqs: [
      {
        q: "Can you use the same paint standard across several buildings?",
        a: "Yes. We can document preferred colors, products, sheens, and typical unit scopes so estimates and completed turns stay more consistent across a portfolio.",
      },
      {
        q: "How do you handle repairs discovered after move-out?",
        a: "We separate standard turnover work from condition-based add-ons such as heavy patching, water staining, or damaged trim. Photos and written approval keep the scope clear before extra work proceeds.",
      },
      {
        q: "Do you work around move-in and leasing deadlines?",
        a: "Yes. We schedule around the required handoff date and flag drying time, access constraints, or repairs that could affect it before work begins. Larger portfolios can be phased by building, floor, or unit readiness.",
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
    title: "Project paperwork prepared",
    text: "Estimates document the work, materials, exclusions, and schedule. Building paperwork and insurance documentation are coordinated when the project requires them.",
  },
  {
    icon: "medal",
    title: `${site.warrantyYears}-year workmanship warranty`,
    text: "Covered workmanship is documented in writing, including the warranty term and how to report an issue after completion.",
  },
  {
    icon: "check",
    title: "Free, itemized estimates",
    text: "The written scope separates included work, options, and condition-based repairs so you can compare the complete project, not just a headline price.",
  },
  {
    icon: "leaf",
    title: "Premium, low-VOC finishes",
    text: "Benjamin Moore & Sherwin-Williams as standard, with low- and zero-VOC lines so your space is safe to use the same day.",
  },
  {
    icon: "clock",
    title: "A documented schedule",
    text: "We confirm access, work hours, sequencing, and expected completion before the start, then communicate promptly if conditions change.",
  },
  {
    icon: "phone",
    title: "A real person to talk to",
    text: "One project contact keeps the estimate, schedule, questions, and final walkthrough organized from start to finish.",
  },
] as const;

export type Guarantee = (typeof guarantees)[number];

export const faqs = [
  {
    q: "Are you licensed and insured?",
    a: "We provide the business and insurance documentation required for the agreed scope and can coordinate a Certificate of Insurance when a building requests one. Confirm any project-specific limits or additional-insured language during the estimate.",
  },
  {
    q: "How much does painting cost in NYC?",
    a: "Most interior apartment projects range from $3–$9 per square foot depending on prep, ceiling height, and finish level. We give a clear, itemized written estimate up front — no hidden fees, no surprises.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Start with photos and a short project description; we will let you know whether the scope can be estimated remotely or needs an on-site walkthrough.",
  },
  {
    q: "What kind of warranty do you provide?",
    a: `Our written workmanship warranty runs for ${site.warrantyYears} years. The estimate and warranty terms explain covered work, exclusions, and how to report a workmanship issue.`,
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
    text: "Call or book online. We learn the scope, access needs, timeline, and priorities, then decide whether photos or a walkthrough are the right next step.",
  },
  {
    title: "Detailed Written Estimate",
    text: "You get a written scope covering preparation, materials, included areas, options, exclusions, schedule, and price.",
  },
  {
    title: "Prep & Protection",
    text: "We mask, cover, patch, sand, and prime according to the agreed finish level and the condition of each surface.",
  },
  {
    title: "Careful Application",
    text: "The crew follows the documented product, sheen, color, and coat schedule while keeping the work area organized.",
  },
  {
    title: "Walkthrough & Warranty",
    text: "We inspect together, touch up anything you flag, and back the whole job with our written warranty.",
  },
] as const;
