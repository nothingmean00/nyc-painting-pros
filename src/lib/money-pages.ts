// ===========================================================================
// "Money pages" — high commercial-intent landing pages built to capture NYC
// painting search. Each entry is intentionally deep (unique intro, scope, two
// content sections, a cost-guidance table, and unique FAQs) so none are thin.
//
// Cost ranges are typical NYC market ranges for orientation only — every
// project is quoted individually. Keep them realistic; do not inflate.
// ===========================================================================

import type { IconName } from "@/components/Icons";

export type MoneyPage = {
  slug: string;
  keyword: string;
  icon: IconName;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  lede: string; // hero subtitle
  intro: string[]; // 1–2 opening paragraphs (unique)
  scope: { heading: string; items: string[] }; // what's included
  sections: { h2: string; body: string; bullets?: string[] }[];
  cost: {
    intro: string;
    rows: { item: string; range: string }[];
    note: string;
  };
  faqs: { q: string; a: string }[];
  relatedServices: string[]; // service slugs
  relatedAreas: string[]; // area slugs
  relatedPages?: string[]; // money-page slugs
};

export const moneyPages: MoneyPage[] = [
  // 1 ---------------------------------------------------------------------
  {
    slug: "interior-painting-manhattan",
    keyword: "interior painters Manhattan",
    icon: "roller",
    title: "Interior Painters in Manhattan | Apartments, Co-ops & Condos",
    description:
      "Professional interior painting in Manhattan — pre-war co-ops, condo combinations and high-floor apartments. Dust-controlled prep, premium low-VOC finishes, COIs same day. Free estimate.",
    h1: "Interior painting in Manhattan",
    lede: "Pre-war co-ops, condo combinations, and high-floor apartments — finished with razor-sharp lines and a job site clean enough to host guests the same night.",
    intro: [
      "Manhattan interiors come with their own rulebook: tight freight-elevator windows, strict building hours, mandatory Certificates of Insurance, and plaster walls that have seen a century of repaints. We handle all of it so your only job is choosing the color.",
      "Whether it's a studio refresh on the Upper East Side or a full pre-sale repaint of a Tribeca loft, our crews protect every floor and fixture, prime properly, and lay down even, durable coats that look flawless under Manhattan's unforgiving natural light.",
    ],
    scope: {
      heading: "What a Manhattan interior project includes",
      items: [
        "Full floor, furniture and fixture masking and protection",
        "Patching, sanding and priming of plaster and drywall",
        "Crisp cut-ins at trim, crown molding and ceilings",
        "Two coats of premium low-VOC Benjamin Moore or Sherwin-Williams",
        "Building COI issued same day; work within board-approved hours",
        "Daily clean-up and a spotless final walkthrough",
      ],
    },
    sections: [
      {
        h2: "Built for Manhattan buildings and boards",
        body: "Most Manhattan co-ops and condos require a Certificate of Insurance naming the building and managing agent before work begins. We issue them the same day, schedule around your building's permitted work hours, and coordinate freight-elevator and COI logistics with your managing agent directly — so the project starts on time without back-and-forth.",
      },
      {
        h2: "Plaster, prep, and a finish that lasts",
        body: "Pre-war plaster cracks, settles, and telegraphs every shortcut. We don't just paint over it — we stabilize cracks, skim where needed, and prime so the finish coat lands smooth and stays that way.",
        bullets: [
          "Hairline crack stabilization that won't reappear",
          "Level skim coating on damaged or previously papered walls",
          "Stain-blocking primer for water marks and old repairs",
        ],
      },
    ],
    cost: {
      intro:
        "Manhattan interior pricing depends on square footage, ceiling height, prep level, and finish. Typical ranges to orient you:",
      rows: [
        { item: "Studio / 1-bedroom repaint", range: "$2,500 – $5,500" },
        { item: "2-bedroom apartment", range: "$4,500 – $9,000" },
        { item: "Single room or accent wall", range: "$650 – $1,800" },
        { item: "Walls, ceilings & trim (per sq ft)", range: "$4 – $9 / sq ft" },
      ],
      note: "Every Manhattan project is quoted individually after we review photos or walk the space. Your written estimate is free and itemized — no hidden fees.",
    },
    faqs: [
      {
        q: "Do you provide Certificates of Insurance for Manhattan buildings?",
        a: "Yes — same day. We carry $2M general liability plus workers' comp and can name your building and managing agent as additional insured before the first day of work.",
      },
      {
        q: "Can you work within my co-op's permitted hours?",
        a: "Absolutely. Most Manhattan buildings allow work on weekdays within set hours. We schedule crews to those windows and coordinate freight-elevator reservations with your managing agent.",
      },
      {
        q: "How long does it take to paint a Manhattan apartment?",
        a: "A typical 1–2 bedroom takes 2–4 working days including prep, two finish coats, and cleanup. We confirm an exact timeline in your written estimate.",
      },
      {
        q: "Do I need to leave during the work?",
        a: "No. We seal off active rooms with plastic, contain dust, and use low-VOC paints, so most clients stay in their apartment throughout the project.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair", "wallpaper-removal"],
    relatedAreas: ["manhattan"],
    relatedPages: ["pre-war-apartment-painting-nyc", "co-op-condo-painting-nyc", "apartment-painting-nyc"],
  },

  // 2 ---------------------------------------------------------------------
  {
    slug: "interior-painting-brooklyn",
    keyword: "interior painters Brooklyn",
    icon: "roller",
    title: "Interior Painters in Brooklyn | Brownstones, Lofts & Apartments",
    description:
      "Interior painting in Brooklyn — Park Slope brownstones to Williamsburg lofts. Meticulous prep, premium low-VOC finishes, tidy crews, written warranty. Free estimate.",
    h1: "Interior painting in Brooklyn",
    lede: "From Park Slope brownstones to Williamsburg lofts, our Brooklyn crews handle historic detail and modern open-plan spaces with the same obsessive care.",
    intro: [
      "Brooklyn's housing is wonderfully varied — original parlor-floor moldings in Fort Greene, exposed-brick lofts in Bushwick, garden apartments in Cobble Hill. Each needs a different touch, and we tailor prep and product to the space rather than running one playbook.",
      "We show up on time, protect your floors and furniture, and leave the place cleaner than we found it. No blown timelines, no surprise charges, no mess left behind.",
    ],
    scope: {
      heading: "What a Brooklyn interior project includes",
      items: [
        "Protection of original floors, moldings and built-ins",
        "Patching, sanding and priming for a smooth base",
        "Sharp lines at crown molding, picture rails and trim",
        "Two coats of premium low-VOC paint in your chosen finish",
        "Restoration-grade care on historic detail work",
        "Full daily clean-up and final walkthrough",
      ],
    },
    sections: [
      {
        h2: "Respecting Brooklyn's historic detail",
        body: "Brownstone interiors are full of irreplaceable woodwork — picture rails, ceiling medallions, deep baseboards, original doors. We mask and cut around them with care, and where paint has built up over decades we can strip and re-finish so the detail reads crisp again instead of soft and clogged.",
      },
      {
        h2: "Modern lofts and open-plan spaces",
        body: "Open layouts mean fewer break points and more visible wall, so consistency is everything. We keep a wet edge, match sheen across long runs, and handle tall loft ceilings with the right equipment.",
        bullets: [
          "Even coverage across long, uninterrupted walls",
          "Safe access and clean lines on high loft ceilings",
          "Color and sheen guidance for big light-filled rooms",
        ],
      },
    ],
    cost: {
      intro:
        "Brooklyn interior pricing varies with square footage, ceiling height, and how much prep the space needs. Typical ranges:",
      rows: [
        { item: "Studio / 1-bedroom repaint", range: "$2,300 – $5,000" },
        { item: "2-bedroom apartment", range: "$4,000 – $8,500" },
        { item: "Brownstone parlor floor", range: "$5,500 – $12,000" },
        { item: "Walls, ceilings & trim (per sq ft)", range: "$3.50 – $8 / sq ft" },
      ],
      note: "We quote every Brooklyn project individually. Your written, itemized estimate is always free.",
    },
    faqs: [
      {
        q: "Can you match the original trim color in my brownstone?",
        a: "Yes. We color-match existing trim and woodwork precisely, and can provide drawdown samples so you see the exact match before we commit.",
      },
      {
        q: "Do you paint garden and basement apartments?",
        a: "We do. These spaces often need moisture-aware prep and the right primer; we assess humidity and surface condition before recommending a system.",
      },
      {
        q: "How much notice do you need to start in Brooklyn?",
        a: "For most residential interiors we can start within a week of accepting the estimate, often sooner. We'll give you a firm date in writing.",
      },
      {
        q: "Is the paint safe for kids and pets?",
        a: "We use low-VOC and zero-VOC lines as standard, so rooms are safe to use the same day with proper ventilation.",
      },
    ],
    relatedServices: ["interior-painting", "wallpaper-removal", "drywall-plaster-repair"],
    relatedAreas: ["brooklyn"],
    relatedPages: ["brownstone-painting-brooklyn", "apartment-painting-nyc"],
  },

  // 3 ---------------------------------------------------------------------
  {
    slug: "apartment-painting-nyc",
    keyword: "apartment painting NYC",
    icon: "roller",
    title: "Apartment Painting NYC | Cost, Timeline & Free Estimate",
    description:
      "Apartment painting in NYC done right — studios to large units across all five boroughs. Clear pricing, dust-controlled prep, low-VOC paint, written warranty. Free estimate.",
    h1: "Apartment painting in NYC",
    lede: "Studios, walk-ups, and high-rises across all five boroughs — painted cleanly, on schedule, and without you having to move out.",
    intro: [
      "Painting an NYC apartment is its own art form: small rooms, tight hallways, furniture with nowhere to go, and neighbors on the other side of every wall. We've built our entire process around working cleanly and efficiently in occupied city apartments.",
      "You get a clear written quote up front, a crew that protects your belongings, and low-VOC paint so you can sleep in your own bed the same night. No surprises, no mess.",
    ],
    scope: {
      heading: "What apartment painting includes",
      items: [
        "Move and protect furniture; mask floors and fixtures",
        "Patch nail holes, cracks and dings; sand and spot-prime",
        "Cut-in and roll walls, ceilings and trim",
        "Two coats of premium low-VOC paint",
        "Closets, doors and radiator covers on request",
        "Same-day clean-up — we haul our own debris",
      ],
    },
    sections: [
      {
        h2: "How much does it cost to paint an apartment in NYC?",
        body: "The biggest cost drivers are square footage, ceiling height, and how much prep and trim work is involved. A simple one-coat refresh costs far less than a repair-heavy repaint with ceilings and trim. We itemize everything so you can see exactly what drives the number and adjust scope if you want.",
      },
      {
        h2: "Painting an occupied apartment, the right way",
        body: "You don't need to move out. We work room-by-room, seal active zones, and keep walkways clear so daily life keeps moving.",
        bullets: [
          "Plastic containment to keep dust out of living areas",
          "Low- and zero-VOC paint for same-day occupancy",
          "Evening and weekend scheduling available",
        ],
      },
    ],
    cost: {
      intro: "Typical NYC apartment painting ranges, to orient your budget:",
      rows: [
        { item: "Studio (walls only)", range: "$1,400 – $3,200" },
        { item: "1-bedroom (walls, ceilings, trim)", range: "$2,800 – $5,500" },
        { item: "2-bedroom full repaint", range: "$4,500 – $9,000" },
        { item: "Single room", range: "$550 – $1,500" },
      ],
      note: "Ranges are for orientation only — we quote your apartment individually after photos or a quick walkthrough. The estimate is free and itemized.",
    },
    faqs: [
      {
        q: "How long does it take to paint an NYC apartment?",
        a: "A studio is often one day; a 1–2 bedroom typically takes 2–4 working days including prep and two coats. We confirm timing in your written estimate.",
      },
      {
        q: "Do you move furniture?",
        a: "Yes. We move and cover furniture within the apartment and put everything back. For very large pieces we'll agree on a plan in advance.",
      },
      {
        q: "Can you paint on a weekend?",
        a: "We offer evening and weekend scheduling where your building allows it, which is ideal for occupied apartments and tight timelines.",
      },
      {
        q: "What if my walls have a lot of damage?",
        a: "We handle patching, crack repair, and skim coating as part of prep. Heavier plaster or water-damage repair is itemized separately so the quote stays transparent.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["interior-painting-manhattan", "rental-turnover-painting-nyc", "pre-war-apartment-painting-nyc"],
  },

  // 4 ---------------------------------------------------------------------
  {
    slug: "pre-war-apartment-painting-nyc",
    keyword: "pre-war apartment painting NYC",
    icon: "patch",
    title: "Pre-War Apartment Painting NYC | Plaster Repair & Skim Coating",
    description:
      "Pre-war apartment painting in NYC with expert plaster repair and Level 5 skim coating. Restore cracked, century-old walls to glass-smooth. Licensed, insured, warrantied.",
    h1: "Pre-war apartment painting & plaster restoration",
    lede: "Century-old plaster, settled cracks, and decades of repaints — restored to a glass-smooth finish that honors the apartment's character.",
    intro: [
      "Pre-war apartments are some of the most beautiful — and most demanding — interiors in New York. The plaster is thick and characterful, but it cracks, bows, and carries the scars of a hundred years of repairs. Painting one well is as much restoration as it is finishing.",
      "We specialize in bringing these walls back. Proper crack repair, skim coating, and priming mean the finish coat lands smooth and stays smooth — not a quick cover-up that telegraphs every flaw a month later.",
    ],
    scope: {
      heading: "What pre-war restoration includes",
      items: [
        "Assessment of plaster condition and movement",
        "Crack stabilization and repair that won't return",
        "Level skim coating for a smooth, flat surface",
        "Lath and plaster patching where needed",
        "Stain-blocking primer over old water marks",
        "Two finish coats in a premium low-VOC paint",
      ],
    },
    sections: [
      {
        h2: "Why pre-war walls crack — and how we fix it for good",
        body: "Most cracks come from seasonal movement and old plaster keys failing against the lath behind them. Painting over them just resets the clock. We address the cause: re-securing or rebuilding the substrate, bridging cracks with the right materials, and feathering repairs so they disappear under the finish.",
      },
      {
        h2: "Level 5 skim coating for flawless walls",
        body: "Where walls are wavy, patched, or stripped of old wallpaper, a skim coat creates a uniform, glass-smooth surface — the same standard used in high-end new construction.",
        bullets: [
          "Removes the rippled, patched look of old plaster",
          "Ideal before deep or high-gloss colors that show every flaw",
          "Primed and sealed, ready for a perfect finish coat",
        ],
      },
    ],
    cost: {
      intro: "Pre-war work is prep-driven, so cost tracks the condition of the plaster:",
      rows: [
        { item: "Crack repair & spot skim (per room)", range: "$400 – $1,200" },
        { item: "Full Level 5 skim coat (per room)", range: "$900 – $2,500" },
        { item: "1-bedroom restore + repaint", range: "$5,000 – $11,000" },
        { item: "Plaster/lath repair (per area)", range: "Quoted on inspection" },
      ],
      note: "Because no two pre-war walls are alike, we always assess in person or from detailed photos before quoting. The estimate is free and fully itemized.",
    },
    faqs: [
      {
        q: "Will the cracks come back after you paint?",
        a: "Not when the substrate is repaired properly. We address why the crack formed — not just the surface — so repairs stay invisible through normal seasonal movement.",
      },
      {
        q: "Can you fix walls after wallpaper removal?",
        a: "Yes. Stripping old wallpaper often leaves adhesive residue and gouged plaster; we clean, skim, and prime to a smooth surface before painting.",
      },
      {
        q: "Do you do plaster repair, or only painting?",
        a: "Both. Plaster and lath restoration is one of our specialties — it's what makes a pre-war repaint actually look right.",
      },
      {
        q: "Is skim coating worth it?",
        a: "If your walls are wavy or patchy, or you're using a deep or glossy color, yes — skim coating is the difference between 'repainted' and 'like new.'",
      },
    ],
    relatedServices: ["drywall-plaster-repair", "wallpaper-removal", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn"],
    relatedPages: ["interior-painting-manhattan", "co-op-condo-painting-nyc"],
  },

  // 5 ---------------------------------------------------------------------
  {
    slug: "co-op-condo-painting-nyc",
    keyword: "co-op and condo painting NYC",
    icon: "building",
    title: "Co-op & Condo Painting NYC | Board Approvals & COIs Handled",
    description:
      "Co-op and condo painting in NYC with board approvals, Certificates of Insurance, and managing-agent coordination handled for you. Clean, on-schedule, warrantied work.",
    h1: "Co-op & condo painting in NYC",
    lede: "We speak fluent managing-agent: COIs, board rules, building hours, and elevator logistics — all handled so your project starts smoothly.",
    intro: [
      "Painting in an NYC co-op or condo is half craftsmanship, half paperwork. Boards require insurance certificates, alteration agreements may apply, and work has to fit inside the building's permitted hours. Get any of it wrong and your start date slips.",
      "We've done this hundreds of times. We produce the documents your board and managing agent need, schedule to building rules, and keep common areas spotless so the project never becomes a complaint at the next board meeting.",
    ],
    scope: {
      heading: "What co-op & condo projects include",
      items: [
        "Certificate of Insurance naming building & managing agent",
        "Coordination with your managing agent and super",
        "Work scheduled within board-permitted hours",
        "Hallway, elevator and common-area protection",
        "Quiet, tidy crews respectful of neighbors",
        "Premium low-VOC finishes and written warranty",
      ],
    },
    sections: [
      {
        h2: "Insurance and board paperwork, handled",
        body: "Most buildings require a COI before anyone lifts a brush, often with specific limits and additional-insured language. We carry $2M general liability plus workers' comp and issue compliant certificates the same day. If your building uses an alteration agreement or has a preferred-vendor process, we'll work within it.",
      },
      {
        h2: "Respectful of the whole building, not just your unit",
        body: "Neighbors notice everything in a co-op. We protect shared hallways and elevators, contain dust, keep noise to permitted hours, and clean common areas daily.",
        bullets: [
          "Floor and wall protection from the freight elevator to your door",
          "Debris removed daily — never left in the hallway or trash room",
          "Crews briefed on building etiquette and quiet hours",
        ],
      },
    ],
    cost: {
      intro: "Co-op/condo interior pricing follows unit size and prep, similar to other apartments:",
      rows: [
        { item: "1-bedroom unit", range: "$2,800 – $5,800" },
        { item: "2-bedroom unit", range: "$4,500 – $9,500" },
        { item: "3-bedroom / combination", range: "$8,000 – $18,000" },
        { item: "Certificate of Insurance", range: "Included, no fee" },
      ],
      note: "COIs and managing-agent coordination are included at no extra charge. Every unit is quoted individually with a free, itemized estimate.",
    },
    faqs: [
      {
        q: "How fast can you get a Certificate of Insurance?",
        a: "Same day. Send us your building's COI requirements and additional-insured wording and we'll have a compliant certificate issued right away.",
      },
      {
        q: "Do you work with managing agents and supers directly?",
        a: "Yes. We coordinate elevator reservations, building hours, and access with your managing agent and super so you don't have to play middleman.",
      },
      {
        q: "Can you work around an alteration agreement?",
        a: "We can. Send us the agreement and any building rules; we'll schedule and document the work to comply.",
      },
      {
        q: "Will the work disturb my neighbors?",
        a: "We keep noise within permitted hours, contain dust, and protect common areas. Most neighbors don't even know we're there.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair", "commercial-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["interior-painting-manhattan", "pre-war-apartment-painting-nyc", "apartment-painting-nyc"],
  },

  // 6 ---------------------------------------------------------------------
  {
    slug: "brownstone-painting-brooklyn",
    keyword: "brownstone painting Brooklyn",
    icon: "house",
    title: "Brownstone Painting in Brooklyn | Interior, Facade & Trim",
    description:
      "Brownstone painting in Brooklyn — interiors, facades, cornices, doors and ironwork. Landmark-aware color matching and weatherproof systems. Licensed, insured, warrantied.",
    h1: "Brownstone painting in Brooklyn",
    lede: "Parlor-floor interiors, weatherproofed facades, and front doors that turn heads — done with restoration-grade care.",
    intro: [
      "A Brooklyn brownstone is a landmark you live in. Its interiors carry irreplaceable detail and its facade faces decades of freeze-thaw winters and humid summers. Painting one demands a contractor who understands both restoration and weatherproofing.",
      "We handle the full brownstone: smooth, sharp interior work that respects original moldings, plus exterior systems engineered to protect cornices, lintels, stoops, and ironwork from New York weather.",
    ],
    scope: {
      heading: "What brownstone painting includes",
      items: [
        "Interior prep that protects original woodwork and plaster",
        "Facade scrape, sand, prime and weatherproof topcoat",
        "Cornice, lintel and window-trim restoration",
        "Rust treatment and repaint of iron railings and gates",
        "Front door refinishing for a showpiece entry",
        "Landmark-aware color matching and documentation",
      ],
    },
    sections: [
      {
        h2: "Exteriors built for New York weather",
        body: "Brownstone facades take a beating. We power-wash, scrape, and properly prime before applying 100% acrylic or elastomeric systems rated for freeze-thaw cycling, so the finish resists peeling, blistering, and fading far longer than a quick recoat.",
      },
      {
        h2: "Landmark districts and color approvals",
        body: "Many Brooklyn brownstones sit in landmark or historic districts with color and material guidelines. We provide drawdowns and product specs to support board or Landmarks Preservation Commission approvals.",
        bullets: [
          "Color drawdowns for board and LPC review",
          "Historically appropriate palettes and finishes",
          "Documentation packaged for approval submissions",
        ],
      },
    ],
    cost: {
      intro: "Brownstone work spans interior and exterior; representative ranges:",
      rows: [
        { item: "Parlor floor interior", range: "$5,500 – $12,000" },
        { item: "Facade trim & cornice repaint", range: "$6,000 – $20,000" },
        { item: "Front door refinishing", range: "$650 – $2,000" },
        { item: "Iron railing rust treatment & repaint", range: "$900 – $3,500" },
      ],
      note: "Brownstone projects vary widely by size and condition. We always assess on site and provide a free, itemized estimate.",
    },
    faqs: [
      {
        q: "Can you handle Landmarks Preservation Commission requirements?",
        a: "Yes. We provide color drawdowns, product data, and documentation to support LPC and co-op board approvals for facade work in historic districts.",
      },
      {
        q: "What's the best time of year for brownstone exterior painting?",
        a: "April through November gives the right temperature and humidity for proper curing. We monitor the forecast and only coat when conditions guarantee a lasting finish.",
      },
      {
        q: "Do you treat rusted iron railings and gates?",
        a: "We do — wire-brushing or media prep, rust-inhibitive primer, then a durable enamel topcoat so the ironwork is protected, not just painted.",
      },
      {
        q: "Can you match my neighbors' historic trim color?",
        a: "Yes, we color-match precisely and can provide samples so the block stays cohesive and any approvals go smoothly.",
      },
    ],
    relatedServices: ["exterior-painting", "interior-painting", "drywall-plaster-repair"],
    relatedAreas: ["brooklyn"],
    relatedPages: ["interior-painting-brooklyn", "exterior-painting-nyc"],
  },

  // 7 ---------------------------------------------------------------------
  {
    slug: "kitchen-cabinet-painting-nyc",
    keyword: "kitchen cabinet painting NYC",
    icon: "cabinet",
    title: "Kitchen Cabinet Painting NYC | Factory-Smooth Refinishing",
    description:
      "Kitchen cabinet painting and refinishing in NYC — sprayed, factory-smooth finishes for a fraction of replacement. Durable catalyzed topcoats, dust-free process, warranty.",
    h1: "Kitchen cabinet painting & refinishing in NYC",
    lede: "A showroom-smooth kitchen for a fraction of replacement — degreased, sanded, primed, and sprayed with a finish that cures rock-hard.",
    intro: [
      "Replacing NYC kitchen cabinets can run $20–40k and weeks of demolition. Refinishing them — done correctly — delivers a comparable, factory-smooth look for a fraction of the cost and a fraction of the disruption.",
      "The catch is that 'done correctly' matters enormously. Cabinets are touched, scrubbed, and splashed daily, so adhesion and durability are everything. We degrease, sand, prime with a bonding primer, and spray a catalyzed topcoat that resists chips and yellowing for years.",
    ],
    scope: {
      heading: "What cabinet refinishing includes",
      items: [
        "Label, remove and transport doors and drawers",
        "Thorough degreasing and sanding for adhesion",
        "Bonding primer on every surface",
        "Sprayed, self-leveling catalyzed topcoat (not brushed)",
        "Boxes finished in place with dust containment",
        "Reinstall, adjust hardware, and final inspection",
      ],
    },
    sections: [
      {
        h2: "Why sprayed, catalyzed finishes beat a brush-and-roll",
        body: "Brushing cabinets leaves stroke marks and a softer film that chips at the edges. We spray for a glass-smooth, self-leveling surface and use catalyzed (conversion) coatings engineered for cabinetry — the same category of finish used on factory cabinets — so it holds up to daily kitchen abuse.",
      },
      {
        h2: "A clean process in an occupied home",
        body: "Doors and drawers are finished off-site in a controlled environment for a dust-free result; boxes are finished in place behind containment.",
        bullets: [
          "Off-site door spraying = no overspray in your kitchen",
          "Dust barriers and masking protect counters and appliances",
          "Most kitchens are back in service within about a week",
        ],
      },
    ],
    cost: {
      intro: "Cabinet refinishing is priced largely by door and drawer count:",
      rows: [
        { item: "Small kitchen (≤15 doors)", range: "$3,500 – $5,000" },
        { item: "Standard kitchen (15–30 doors)", range: "$5,000 – $7,500" },
        { item: "Large / two-tone kitchen", range: "$7,500 – $12,000" },
        { item: "Vanity or bathroom cabinet", range: "$650 – $1,800" },
      ],
      note: "Compared with $20–40k for replacement, refinishing typically runs 30–50% of the cost. Every kitchen is quoted individually and the estimate is free.",
    },
    faqs: [
      {
        q: "How much cheaper is refinishing than replacing cabinets?",
        a: "Refinishing typically costs 30–50% of replacement while delivering a comparable factory-smooth look — and without the demolition, dust, and weeks of downtime.",
      },
      {
        q: "Will the finish chip or peel?",
        a: "Not with our process. Proper degreasing, sanding, a bonding primer, and a catalyzed sprayed topcoat create a hard, durable film that resists chipping — and it's backed by our warranty.",
      },
      {
        q: "Can you change the color of my cabinets?",
        a: "Yes — any color. White and off-white are most popular, but we spray any hue and can do two-tone (different islands or uppers/lowers).",
      },
      {
        q: "How long does a cabinet project take?",
        a: "A standard kitchen averages about a week from door removal to reinstall, depending on coats and cure time.",
      },
    ],
    relatedServices: ["cabinet-refinishing", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["cabinet-refinishing-cost-nyc", "apartment-painting-nyc"],
  },

  // 8 ---------------------------------------------------------------------
  {
    slug: "exterior-painting-nyc",
    keyword: "exterior painters NYC",
    icon: "house",
    title: "Exterior Painting NYC | Facades, Trim & Weatherproof Systems",
    description:
      "Exterior painting in NYC built to beat the weather — facades, trim, doors, fire escapes and ironwork. Power-wash, full prep, weather-rated coatings, lead-safe practices.",
    h1: "Exterior painting in NYC",
    lede: "Facades, cornices, fire escapes, and front doors — prepped and coated with weather-rated systems engineered for New York's freeze-thaw winters and humid summers.",
    intro: [
      "New York is brutal on exterior paint. Freeze-thaw cycling, salt, soot, and humidity attack any finish that wasn't prepped and coated correctly. A cheap recoat looks fine for a season and then peels.",
      "We do exteriors the durable way: power-wash, full scrape and sand, rust treatment on metal, the right primer for each substrate, and weatherproof topcoats that protect the building for years — not months.",
    ],
    scope: {
      heading: "What exterior painting includes",
      items: [
        "Power-washing and full scrape/sand preparation",
        "Rust treatment for iron railings and fire escapes",
        "Substrate-specific priming (masonry, wood, metal)",
        "Elastomeric and 100% acrylic weatherproof systems",
        "EPA lead-safe practices on pre-1978 buildings",
        "Caulking and minor repairs to seal out water",
      ],
    },
    sections: [
      {
        h2: "Prep is what makes exterior paint last",
        body: "On exteriors, prep is the entire game. We remove failing paint, treat rust and rot, prime bare substrate, and re-caulk gaps before a single finish coat goes on. Skipping these steps is exactly why so many NYC exteriors peel within a year.",
      },
      {
        h2: "Lead-safe work on older buildings",
        body: "Most pre-1978 NYC buildings contain lead paint. We're EPA Lead-Safe (RRP) certified and follow containment and disposal rules that protect your family, neighbors, and our crews.",
        bullets: [
          "Certified lead-safe scraping and containment",
          "Proper debris capture and disposal",
          "Documentation available for your records",
        ],
      },
    ],
    cost: {
      intro: "Exterior pricing depends on height, access, substrate, and prep condition:",
      rows: [
        { item: "Trim, doors & windows only", range: "$3,500 – $9,000" },
        { item: "Townhouse / brownstone facade", range: "$8,000 – $25,000" },
        { item: "Fire escape rust treatment & paint", range: "$1,500 – $6,000" },
        { item: "Front door refinishing", range: "$650 – $2,000" },
      ],
      note: "Access and height drive exterior cost as much as area. We assess on site and provide a free, itemized estimate.",
    },
    faqs: [
      {
        q: "When is the best time for exterior painting in NYC?",
        a: "April through November offers the temperature and humidity needed for proper curing. We watch the forecast and only coat when conditions ensure a lasting finish.",
      },
      {
        q: "Are you lead-safe certified for older buildings?",
        a: "Yes — EPA Lead-Safe (RRP) certified. We follow all containment and disposal practices required for pre-1978 buildings.",
      },
      {
        q: "How long will an exterior paint job last?",
        a: "With proper prep and quality coatings, a well-executed NYC exterior typically lasts 7–10 years on trim and longer on masonry, depending on exposure.",
      },
      {
        q: "Do you handle co-op board or landmark approvals?",
        a: "Yes. We provide color drawdowns and product specs your board or the Landmarks Preservation Commission needs to approve the work.",
      },
    ],
    relatedServices: ["exterior-painting", "drywall-plaster-repair"],
    relatedAreas: ["brooklyn", "queens", "staten-island", "bronx"],
    relatedPages: ["brownstone-painting-brooklyn"],
  },

  // 9 ---------------------------------------------------------------------
  {
    slug: "commercial-painting-manhattan",
    keyword: "commercial painters Manhattan",
    icon: "building",
    title: "Commercial Painters in Manhattan | After-Hours, COI Same Day",
    description:
      "Commercial painting in Manhattan — offices, lobbies, retail and multi-unit buildings. After-hours scheduling, $2M insurance, COIs same day, durable commercial coatings.",
    h1: "Commercial painting in Manhattan",
    lede: "Offices, lobbies, retail, and multi-unit buildings — painted after hours so your business never skips a beat.",
    intro: [
      "Downtime is the real cost of commercial painting in Manhattan. A closed storefront or a disrupted office floor costs far more than the paint. Our entire commercial process is built to eliminate that downtime.",
      "We work nights and weekends, phase by floor or zone, coordinate COIs and freight access with building management, and use durable, scrubbable commercial coatings that keep looking sharp under heavy traffic.",
    ],
    scope: {
      heading: "What commercial projects include",
      items: [
        "After-hours, overnight and weekend scheduling",
        "$2M general liability + workers' comp; COI same day",
        "Phased work to keep the business operating",
        "Durable, scrubbable commercial-grade coatings",
        "Single point of contact and written progress updates",
        "Building management and freight-elevator coordination",
      ],
    },
    sections: [
      {
        h2: "Zero-downtime scheduling",
        body: "We plan around your operating hours, not the other way around. For offices that means overnight or weekend work; for retail it means painting after close. You come back to finished, dry, ready-to-use space — never a half-done job blocking the floor.",
      },
      {
        h2: "Built for property managers and facilities teams",
        body: "We make the paperwork and reporting easy: same-day COIs, a single contact, and clear progress updates so you can keep stakeholders informed.",
        bullets: [
          "Certificates of Insurance naming building & management",
          "Scope and timeline documented up front",
          "Clean, uniform results across multiple floors or sites",
        ],
      },
    ],
    cost: {
      intro: "Commercial pricing is driven by area, coatings, and access windows:",
      rows: [
        { item: "Office suite repaint", range: "$3 – $7 / sq ft" },
        { item: "Lobby / common area", range: "$4,000 – $15,000" },
        { item: "Retail storefront interior", range: "$3,500 – $12,000" },
        { item: "After-hours premium", range: "Quoted per project" },
      ],
      note: "We provide detailed commercial proposals with scope, schedule, and product specs. Walkthrough estimates are free.",
    },
    faqs: [
      {
        q: "Can you paint our office without disrupting business?",
        a: "Yes — we schedule overnight, weekend, or phased work so your team returns to finished space. No half-done floors during business hours.",
      },
      {
        q: "How fast can you provide a Certificate of Insurance?",
        a: "Same day. We carry $2M general liability plus workers' comp and name your building and management company as additional insured.",
      },
      {
        q: "Do you handle multi-floor or multi-site rollouts?",
        a: "We do, with a single point of contact and consistent results across every floor or location so your brand standard stays uniform.",
      },
      {
        q: "What kind of paint do you use commercially?",
        a: "Durable, scrubbable commercial-grade coatings rated for high-traffic environments, so lobbies and corridors stay presentable far longer.",
      },
    ],
    relatedServices: ["commercial-painting", "interior-painting"],
    relatedAreas: ["manhattan"],
    relatedPages: ["office-painting-nyc", "retail-storefront-painting-nyc"],
  },

  // 10 --------------------------------------------------------------------
  {
    slug: "office-painting-nyc",
    keyword: "office painting NYC",
    icon: "building",
    title: "Office Painting NYC | After-Hours Commercial Painters",
    description:
      "Office painting in NYC with after-hours and weekend scheduling, same-day COIs, and durable low-odor coatings. Keep your team working while we repaint. Free walkthrough.",
    h1: "Office painting in NYC",
    lede: "Repaint your workspace overnight or over a weekend — low-odor, fully dry, and ready for Monday.",
    intro: [
      "An office repaint shouldn't cost you a single working hour. Whether you're refreshing for a lease renewal, rebranding, or prepping for a move-in, we schedule the work around your team so productivity never takes a hit.",
      "Low-odor, fast-curing coatings mean no lingering smell when employees return, and our crews leave workstations, cabling, and equipment exactly as they found them.",
    ],
    scope: {
      heading: "What office painting includes",
      items: [
        "Overnight and weekend scheduling",
        "Protection of desks, equipment, cabling and floors",
        "Low-odor, low-VOC, fast-drying commercial coatings",
        "Accent walls, conference rooms and reception areas",
        "Same-day Certificate of Insurance for your building",
        "Clean, uniform finish ready for the next business day",
      ],
    },
    sections: [
      {
        h2: "Painted overnight, working by morning",
        body: "We sequence the work so each area is finished and dry before your team needs it. For most offices that means starting after close and wrapping before opening, or completing the whole floor across a weekend.",
      },
      {
        h2: "Brand colors and a polished first impression",
        body: "Reception areas and conference rooms set the tone for clients. We match brand palettes precisely and deliver the crisp accent walls and clean lines that make a space feel intentional.",
        bullets: [
          "Exact brand-color matching",
          "Accent walls and feature finishes",
          "Durable coatings for high-touch corridors and pantries",
        ],
      },
    ],
    cost: {
      intro: "Office painting is typically priced per square foot, plus any after-hours premium:",
      rows: [
        { item: "Open-plan office (per sq ft)", range: "$3 – $6 / sq ft" },
        { item: "Conference room / private office", range: "$700 – $2,500" },
        { item: "Reception + accent wall", range: "$1,200 – $4,000" },
        { item: "Weekend / overnight scheduling", range: "Quoted per project" },
      ],
      note: "We provide a detailed proposal after a quick walkthrough. The estimate is free, with scope and schedule in writing.",
    },
    faqs: [
      {
        q: "Will the office smell like paint when we return?",
        a: "No. We use low-odor, low-VOC, fast-curing coatings and ventilate, so your team comes back to a fresh — not fumey — space.",
      },
      {
        q: "Can you protect our computers and cabling?",
        a: "Yes. We mask and cover equipment, monitors, and cabling, and keep workstations intact so nothing is disrupted.",
      },
      {
        q: "Do you work weekends?",
        a: "Weekends and overnights are our standard for offices — it's the easiest way to repaint with zero impact on your workday.",
      },
      {
        q: "Can you match our brand colors?",
        a: "Precisely. Provide the hex or Pantone values (or a sample) and we'll match them across walls and accent features.",
      },
    ],
    relatedServices: ["commercial-painting", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["commercial-painting-manhattan", "retail-storefront-painting-nyc"],
  },

  // 11 --------------------------------------------------------------------
  {
    slug: "retail-storefront-painting-nyc",
    keyword: "storefront painting NYC",
    icon: "building",
    title: "Retail & Storefront Painting NYC | Overnight, On-Brand",
    description:
      "Retail and storefront painting in NYC — interiors, facades and signage prep painted after close so you never lose a sales day. On-brand color matching, durable coatings.",
    h1: "Retail & storefront painting in NYC",
    lede: "Sales floors and storefronts painted after close — on brand, on schedule, and open for business the next morning.",
    intro: [
      "For a retailer, every closed hour is lost revenue. We paint sales floors, fitting rooms, and storefronts after close or overnight so you never dark your doors during business hours.",
      "And because your space is your brand, we match colors exactly and deliver the clean, polished finish that makes customers trust what's on the shelves.",
    ],
    scope: {
      heading: "What retail painting includes",
      items: [
        "After-close and overnight scheduling",
        "Sales floor, fitting room and stockroom painting",
        "Storefront facade and bulkhead prep and paint",
        "Exact brand-color matching",
        "Durable, scrubbable, high-traffic coatings",
        "Merchandise and fixture protection",
      ],
    },
    sections: [
      {
        h2: "No lost sales days",
        body: "We work around your hours and merchandising calendar — overnight, before a grand opening, or between seasonal resets — so the store is camera-ready the moment you unlock the doors.",
      },
      {
        h2: "Finishes that survive retail traffic",
        body: "Sales floors take abuse: carts, hands, restocks, cleaning. We specify scrubbable, durable coatings that keep the space looking new far longer than standard wall paint.",
        bullets: [
          "Scuff- and stain-resistant finishes",
          "Easy-clean surfaces for high-touch areas",
          "Consistent brand color across multiple locations",
        ],
      },
    ],
    cost: {
      intro: "Storefront and retail pricing depends on area, facade work, and scheduling:",
      rows: [
        { item: "Small boutique interior", range: "$2,500 – $7,000" },
        { item: "Mid-size sales floor", range: "$6,000 – $18,000" },
        { item: "Storefront facade & bulkhead", range: "$3,000 – $10,000" },
        { item: "Overnight scheduling", range: "Quoted per project" },
      ],
      note: "We provide a clear proposal with scope and timing after a walkthrough. Estimates are free.",
    },
    faqs: [
      {
        q: "Can you paint without closing my store?",
        a: "Yes. We work after close or overnight so you don't lose a single sales day — the store is ready when you open.",
      },
      {
        q: "Do you paint storefront facades and bulkheads?",
        a: "We do, including prep for signage. Facade work is weather-dependent, so we schedule it for suitable conditions.",
      },
      {
        q: "Can you keep finishes consistent across multiple stores?",
        a: "Yes — we standardize colors and products so every location matches your brand exactly.",
      },
      {
        q: "How durable are the finishes?",
        a: "We use scrubbable, high-traffic commercial coatings designed to resist scuffs and cleaning in busy retail environments.",
      },
    ],
    relatedServices: ["commercial-painting", "exterior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["commercial-painting-manhattan", "office-painting-nyc", "restaurant-painting-nyc"],
  },

  // 12 --------------------------------------------------------------------
  {
    slug: "restaurant-painting-nyc",
    keyword: "restaurant painting NYC",
    icon: "building",
    title: "Restaurant Painting NYC | Overnight, Health-Code Friendly",
    description:
      "Restaurant and bar painting in NYC — dining rooms, kitchens and facades painted overnight between services. Washable, low-odor, durable coatings. Free walkthrough.",
    h1: "Restaurant & bar painting in NYC",
    lede: "Dining rooms, bars, and back-of-house painted overnight between services — washable, low-odor, and ready for the next seating.",
    intro: [
      "Restaurants can't afford to close, and they can't afford a lingering paint smell near food service. We paint between services or overnight, using low-odor, washable coatings that meet the practical demands of a working kitchen and dining room.",
      "From a full dining-room refresh to a facade that pulls people in off the sidewalk, we deliver the atmosphere your concept depends on without interrupting covers.",
    ],
    scope: {
      heading: "What restaurant painting includes",
      items: [
        "Overnight and between-service scheduling",
        "Dining room, bar, restroom and back-of-house",
        "Washable, low-odor, durable coatings",
        "Facade and entrance for curb appeal",
        "Protection of furniture, equipment and surfaces",
        "Fast turnaround so you never miss a seating",
      ],
    },
    sections: [
      {
        h2: "Painted between services, no closures",
        body: "We sequence work to your service schedule — overnight after last call, or during a planned dark day — and use fast-curing, low-odor products so there's no smell when guests return.",
      },
      {
        h2: "Finishes built for food-service reality",
        body: "Dining rooms and back-of-house need surfaces that wipe clean and stand up to grease, steam, and constant cleaning.",
        bullets: [
          "Washable, scrubbable wall finishes",
          "Moisture- and grease-aware products for kitchens",
          "Durable trim and door coatings for heavy use",
        ],
      },
    ],
    cost: {
      intro: "Restaurant pricing depends on area, surfaces, and scheduling:",
      rows: [
        { item: "Dining room refresh", range: "$3,500 – $12,000" },
        { item: "Bar / lounge area", range: "$2,500 – $8,000" },
        { item: "Facade & entrance", range: "$2,500 – $9,000" },
        { item: "Overnight / dark-day scheduling", range: "Quoted per project" },
      ],
      note: "We walk the space, learn your service calendar, and provide a free, itemized proposal with timing.",
    },
    faqs: [
      {
        q: "Can you paint without closing the restaurant?",
        a: "Yes — we work overnight or during a dark day and use fast-curing, low-odor coatings so you're ready for the next service with no smell.",
      },
      {
        q: "Are the finishes washable for a food-service space?",
        a: "We specify washable, scrubbable coatings for dining and back-of-house, and moisture-aware products near kitchens.",
      },
      {
        q: "Do you paint kitchens and prep areas?",
        a: "We do, using products suited to grease and steam, scheduled so they're fully cured before service resumes.",
      },
      {
        q: "Can you also refresh the facade?",
        a: "Yes — a clean, on-brand facade drives walk-ins. We handle entrances and storefronts as part of the project.",
      },
    ],
    relatedServices: ["commercial-painting", "exterior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["retail-storefront-painting-nyc", "commercial-painting-manhattan"],
  },

  // 13 --------------------------------------------------------------------
  {
    slug: "new-construction-painting-nyc",
    keyword: "new construction painting NYC",
    icon: "building",
    title: "New Construction & Renovation Painting NYC | GC-Ready Crews",
    description:
      "New construction and renovation painting in NYC — priming, Level 5 finishes and spray application coordinated with your GC's schedule. Reliable, on-spec, on-time.",
    h1: "New construction & renovation painting in NYC",
    lede: "Priming, Level 5 finishes, and spray application coordinated tightly with your general contractor's schedule.",
    intro: [
      "On a build or gut renovation, the painter can make or break the punch list. Miss the window between trades and the whole schedule slips; cut corners on prime and the finish shows every seam. We work as a dependable partner to GCs, developers, and homeowners managing renovations.",
      "We coordinate sequencing with other trades, prime drywall properly, deliver smooth Level 4/5 finishes, and hit spray-grade results on doors, trim, and cabinetry so the project closes out clean and on time.",
    ],
    scope: {
      heading: "What new construction painting includes",
      items: [
        "Drywall priming and Level 4 / Level 5 finishing",
        "Spray application for trim, doors and built-ins",
        "Tight coordination with the GC's trade schedule",
        "Specification-grade products and color accuracy",
        "Punch-list responsiveness and touch-ups",
        "Final clean hand-off ready for inspection",
      ],
    },
    sections: [
      {
        h2: "A painter your GC can schedule around",
        body: "We understand sequencing — when to prime, when to hold for other trades, and how to protect finished work through the rest of the build. We show up in our window, communicate proactively, and don't become the reason the schedule slips.",
      },
      {
        h2: "Spec-grade finishes and accountability",
        body: "We work to the architect's or designer's spec, document products and colors, and stand behind the result through the punch-list process.",
        bullets: [
          "Level 5 skim for high-end, high-light interiors",
          "Sprayed trim, doors and millwork for a factory look",
          "Documented specs, colors, and warranty",
        ],
      },
    ],
    cost: {
      intro: "New-construction painting is typically bid per square foot against the spec:",
      rows: [
        { item: "Standard new-build interior", range: "$3.50 – $7 / sq ft" },
        { item: "Level 5 high-end finish", range: "$6 – $12 / sq ft" },
        { item: "Sprayed trim & doors", range: "Quoted per spec" },
        { item: "Full renovation repaint", range: "Quoted per project" },
      ],
      note: "Send us the plans or spec and we'll provide a detailed, line-item bid. Estimates for GCs and developers are free.",
    },
    faqs: [
      {
        q: "Do you work directly with general contractors?",
        a: "Yes — GCs, developers, and homeowners managing renovations. We coordinate sequencing and keep our window so your schedule holds.",
      },
      {
        q: "Can you deliver a Level 5 finish?",
        a: "We can. Level 5 skim coating is ideal for high-end interiors and rooms with lots of natural light or deep/glossy colors.",
      },
      {
        q: "Do you spray trim, doors, and millwork?",
        a: "Yes — spray application gives a smooth, factory-grade finish on trim, doors, and built-ins that brushwork can't match.",
      },
      {
        q: "Will you handle the punch list?",
        a: "Absolutely. We stay responsive through close-out, handling touch-ups so the project passes inspection clean.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair", "cabinet-refinishing"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["co-op-condo-painting-nyc"],
  },

  // 14 --------------------------------------------------------------------
  {
    slug: "rental-turnover-painting-nyc",
    keyword: "rental turnover painting NYC",
    icon: "roller",
    title: "Rental Turnover Painting NYC | Fast Landlord & PM Repaints",
    description:
      "Rental turnover painting in NYC for landlords and property managers — fast, durable, lease-ready repaints between tenants. Volume pricing, reliable scheduling, COIs.",
    h1: "Rental turnover painting in NYC",
    lede: "Lease-ready repaints between tenants — fast, durable, and scheduled to shrink your vacancy window.",
    intro: [
      "For landlords and property managers, every vacant day is lost rent. Turnover painting has to be fast, consistent, and reliable — a crew you can call repeatedly and trust to deliver a rent-ready unit on a tight timeline.",
      "We specialize in efficient, durable turnover repaints across portfolios: standardized colors, scuff-resistant finishes, and dependable scheduling that gets the unit back on the market quickly.",
    ],
    scope: {
      heading: "What turnover painting includes",
      items: [
        "Fast patch, prime and two-coat repaints",
        "Standardized portfolio colors and finishes",
        "Durable, scuff-resistant wall coatings",
        "Trim, doors and ceilings as needed",
        "Reliable scheduling to cut vacancy time",
        "COIs and volume pricing for managers",
      ],
    },
    sections: [
      {
        h2: "Built to shrink vacancy",
        body: "We turn units quickly without cutting the corners that come back to bite you at the next inspection. Fast patching, efficient crews, and dependable scheduling mean the unit is photo- and lease-ready in days, not weeks.",
      },
      {
        h2: "Made for portfolios, not just one-offs",
        body: "Manage multiple buildings? We standardize your spec so every unit matches, simplify billing, and become the repeatable crew you call for every turnover.",
        bullets: [
          "Standard color/finish spec across your portfolio",
          "Volume pricing for repeat and multi-unit work",
          "Same-day COIs for your buildings",
        ],
      },
    ],
    cost: {
      intro: "Turnover pricing is efficient and volume-friendly:",
      rows: [
        { item: "Studio turnover", range: "$900 – $2,200" },
        { item: "1-bedroom turnover", range: "$1,500 – $3,500" },
        { item: "2-bedroom turnover", range: "$2,500 – $5,500" },
        { item: "Portfolio / volume pricing", range: "Discounted — ask us" },
      ],
      note: "We offer volume pricing for landlords and property managers with repeat work. Estimates are free, and we can hold a standing spec for your portfolio.",
    },
    faqs: [
      {
        q: "How fast can you turn a unit?",
        a: "Most studios and 1-bedrooms can be turned in 1–2 working days. We schedule tightly to minimize your vacancy window.",
      },
      {
        q: "Do you offer pricing for multiple units?",
        a: "Yes — volume pricing for landlords and property managers with repeat or multi-unit work. We can hold a standard spec so every unit matches.",
      },
      {
        q: "Can you provide COIs for our buildings?",
        a: "Same day. We carry $2M general liability plus workers' comp and name your building and management company as additional insured.",
      },
      {
        q: "Do you use durable paint for rentals?",
        a: "We use scuff- and scrub-resistant finishes built to survive tenants and make the next turnover easier and cheaper.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair"],
    relatedAreas: ["manhattan", "brooklyn", "queens", "bronx"],
    relatedPages: ["apartment-painting-nyc", "co-op-condo-painting-nyc"],
  },

  // 15 --------------------------------------------------------------------
  {
    slug: "single-room-accent-wall-painting-nyc",
    keyword: "single room and accent wall painting NYC",
    icon: "roller",
    title: "Single Room & Accent Wall Painting NYC | Quick, Clean, Affordable",
    description:
      "Single room and accent wall painting in NYC — bedrooms, nurseries, home offices and feature walls done in a day. Clean lines, low-VOC paint, tidy crews. Free quote.",
    h1: "Single room & accent wall painting in NYC",
    lede: "One room, one bold wall, one day — a fast, clean, affordable way to transform a space without a full repaint.",
    intro: [
      "Not every project is a whole apartment. Sometimes it's a nursery that needs a calmer color, a home office that needs to feel sharper on video calls, or one wall that deserves to be the room's centerpiece. We make those small jobs easy to book and beautifully executed.",
      "Small scope doesn't mean less care. You still get proper prep, crisp lines, low-VOC paint, and a spotless clean-up — usually finished in a single day.",
    ],
    scope: {
      heading: "What a single-room project includes",
      items: [
        "Furniture moved and protected; floors masked",
        "Patching, sanding and spot-priming",
        "Crisp accent-wall lines and clean edges",
        "Two coats of premium low-VOC paint",
        "Color consultation for the right feature shade",
        "Same-day clean-up — done in a day for most rooms",
      ],
    },
    sections: [
      {
        h2: "Accent walls done right",
        body: "A great accent wall is all about the line where it meets the ceiling, the adjacent walls, and the trim. We cut those transitions razor-sharp — no bleed, no wavy edges — so the wall looks deliberate and high-end, not like a weekend project.",
      },
      {
        h2: "Perfect for quick, high-impact changes",
        body: "Single-room and feature-wall work is the fastest way to refresh a space on a budget or before guests, a sale, or a move.",
        bullets: [
          "Nurseries, bedrooms, home offices and dining nooks",
          "Bold feature walls and two-tone schemes",
          "Color guidance so you love it in your room's light",
        ],
      },
    ],
    cost: {
      intro: "Small-scope work is priced simply and affordably:",
      rows: [
        { item: "Accent wall", range: "$350 – $900" },
        { item: "Single small room", range: "$550 – $1,200" },
        { item: "Single large room (walls + trim)", range: "$1,000 – $2,500" },
        { item: "Color consultation", range: "Included" },
      ],
      note: "Most single-room jobs are completed in a day. We'll give you a fast, free quote — often from a couple of photos.",
    },
    faqs: [
      {
        q: "Can you really finish a room in one day?",
        a: "Most single rooms and accent walls are completed in a day including prep, two coats, and cleanup. Heavy repairs may add time, which we'll flag up front.",
      },
      {
        q: "Is there a minimum project size?",
        a: "We happily take single-room and accent-wall jobs. Tell us the room and we'll give you a quick, fair quote.",
      },
      {
        q: "Can you help me choose the accent color?",
        a: "Yes — color consultation is included. We'll help you pick a shade that works in your room's specific light and palette.",
      },
      {
        q: "How sharp will the accent-wall edges be?",
        a: "Very. We cut clean, straight transitions at ceilings, corners, and trim so the wall looks intentional and professionally finished.",
      },
    ],
    relatedServices: ["interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["apartment-painting-nyc", "interior-painting-brooklyn"],
  },

  // 16 — TIER 1 -----------------------------------------------------------
  {
    slug: "skim-coating-nyc",
    keyword: "skim coating NYC",
    icon: "wall",
    title: "Skim Coating NYC | Level 5 Glass-Smooth Walls",
    description:
      "Professional skim coating in NYC — Level 5 plaster and drywall finishing that turns wavy, patched or papered walls glass-smooth. Ideal before deep or glossy colors. Free estimate.",
    h1: "Skim coating in NYC",
    lede: "Wavy, patched, or wallpaper-scarred walls made glass-smooth — the Level 5 finish high-end interiors are built on.",
    intro: [
      "Skim coating is the difference between a wall that looks repainted and one that looks brand new. By troweling a thin, uniform layer of compound over the entire surface, we erase ripples, patch marks, old texture, and wallpaper damage — leaving a dead-flat, glass-smooth canvas.",
      "It's the single biggest upgrade most NYC walls can get, and it's essential before deep or high-gloss colors, which reveal every imperfection a standard repaint would hide.",
    ],
    scope: {
      heading: "What skim coating includes",
      items: [
        "Assessment of wall flatness and existing damage",
        "Adhesive and residue removal after wallpaper",
        "Full Level 5 skim coat across the surface",
        "Sanding to a uniform, glass-smooth finish",
        "Crack and gouge repair before skimming",
        "Primer-seal, ready for a flawless finish coat",
      ],
    },
    sections: [
      {
        h2: "When your walls need skim coating",
        body: "Not every wall needs it — but when it does, nothing else will do. The usual triggers are walls left rough after wallpaper removal, old plaster that has gone wavy and patchy over the decades, heavy texture you want gone, or simply a plan to use a deep, saturated, or high-sheen color that would spotlight every flaw.",
        bullets: [
          "After stripping wallpaper that left a rough, uneven surface",
          "Wavy or repeatedly patched pre-war plaster",
          "Before deep, dark, or high-gloss paint colors",
          "To achieve a true high-end, new-construction look",
        ],
      },
      {
        h2: "What 'Level 5' actually means",
        body: "Drywall finishing is rated Level 0 to 5. Most builders stop at Level 4, which looks fine under flat paint and soft light. Level 5 — a skim coat over the entire surface — is the top standard, and it's what prevents flashing, telegraphed seams, and shadowing under bright NYC light or glossy finishes.",
      },
    ],
    cost: {
      intro: "Skim coating is labor-driven, priced by wall condition and area:",
      rows: [
        { item: "Spot skim & smooth (per room)", range: "$400 – $1,000" },
        { item: "Full Level 5 skim coat (per room)", range: "$900 – $2,500" },
        { item: "Skim after wallpaper removal (per room)", range: "$700 – $2,000" },
        { item: "Whole apartment", range: "Quoted on inspection" },
      ],
      note: "Because skim coating is all about wall condition, we assess in person or from detailed photos before quoting. The estimate is free and itemized.",
    },
    faqs: [
      {
        q: "Is skim coating worth the extra cost?",
        a: "If your walls are wavy, patchy, or you're using a deep or glossy color, absolutely — it's the difference between 'repainted' and 'looks brand new.' For already-smooth walls under flat paint, it may not be necessary, and we'll tell you so.",
      },
      {
        q: "How long does skim coating take to dry?",
        a: "Each coat needs to dry before sanding, so a skim-coated room typically adds a day or two to the schedule versus a standard repaint. We build it into your written timeline.",
      },
      {
        q: "Can you skim coat over textured or popcorn walls?",
        a: "Yes. We can skim over most textures to flatten them, or scrape first where needed, then skim to a smooth Level 5 finish.",
      },
      {
        q: "Does skim coating fix cracks too?",
        a: "We repair and stabilize cracks first, then skim over them. On moving pre-war plaster we address the underlying cause so cracks don't telegraph back through.",
      },
    ],
    relatedServices: ["drywall-plaster-repair", "wallpaper-removal", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn"],
    relatedPages: ["pre-war-apartment-painting-nyc", "drywall-repair-nyc"],
  },

  // 17 — TIER 1 -----------------------------------------------------------
  {
    slug: "drywall-repair-nyc",
    keyword: "drywall repair NYC",
    icon: "patch",
    title: "Drywall & Sheetrock Repair NYC | Holes, Cracks & Water Damage",
    description:
      "Drywall and sheetrock repair in NYC — holes, cracks, water damage and anchor holes patched and painted to invisible. Fast, clean, warrantied. Free estimate.",
    h1: "Drywall & sheetrock repair in NYC",
    lede: "Holes, cracks, water stains, and anchor damage — repaired and painted so the patch disappears completely.",
    intro: [
      "A bad drywall patch is obvious forever — a raised lump, a visible ring, a texture that doesn't match. A proper one vanishes. The difference is in feathering, sanding, priming, and blending the repair into the surrounding wall so light hits it the same way.",
      "From a doorknob hole to a ceiling soaked by an upstairs leak, we repair the substrate correctly and paint it to invisible, not just covered up.",
    ],
    scope: {
      heading: "What drywall repair includes",
      items: [
        "Patching holes, dents, cracks and anchor damage",
        "Water-damage repair and stain-blocking primer",
        "Cutting in and replacing damaged drywall sections",
        "Feathering and sanding for a flush, invisible blend",
        "Texture matching where needed",
        "Priming and painting the repair to disappear",
      ],
    },
    sections: [
      {
        h2: "Repairs we handle every week",
        body: "Most NYC drywall calls fall into a few buckets — and we fix all of them so they're undetectable once painted.",
        bullets: [
          "Doorknob and furniture holes",
          "Settling and stress cracks at corners and seams",
          "Water stains and ceiling damage from leaks above",
          "Anchor, screw, and TV-mount holes",
          "Popped nails and failing seam tape",
        ],
      },
      {
        h2: "Why the patch disappears",
        body: "The secret is blending, not just filling. We feather each repair wider than the damage, sand it dead-flat, prime it (stain-blocking primer over any water marks), and paint corner-to-corner where needed so there's no halo, no flashing, and no texture mismatch.",
      },
    ],
    cost: {
      intro: "Drywall repair is priced by the number and size of repairs:",
      rows: [
        { item: "Small hole / few nail pops", range: "$150 – $400" },
        { item: "Multiple patches (per room)", range: "$350 – $900" },
        { item: "Water-damage / ceiling repair", range: "$500 – $2,000" },
        { item: "Section replacement", range: "Quoted on inspection" },
      ],
      note: "Most repairs are bundled into a repaint at a lower combined cost. Standalone repairs get a free, itemized quote.",
    },
    faqs: [
      {
        q: "Will I be able to see the patch after painting?",
        a: "No. We feather, sand, prime, and paint each repair — and paint corner-to-corner where needed — so it blends invisibly into the surrounding wall.",
      },
      {
        q: "Can you fix water-damaged ceilings?",
        a: "Yes. We repair the damaged drywall, seal stains with a stain-blocking primer so they don't bleed back through, and repaint to match. (If the leak is active, that needs fixing first.)",
      },
      {
        q: "Do you repair plaster as well as drywall?",
        a: "Both. Pre-war plaster and lath repair is a specialty of ours, alongside modern drywall and sheetrock.",
      },
      {
        q: "Is it cheaper to repair during a repaint?",
        a: "Usually, yes — combining repairs with a repaint avoids separate trip and setup charges, so the repair cost is lower than a standalone visit.",
      },
    ],
    relatedServices: ["drywall-plaster-repair", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens", "bronx"],
    relatedPages: ["skim-coating-nyc", "pre-war-apartment-painting-nyc"],
  },

  // 18 — TIER 1 -----------------------------------------------------------
  {
    slug: "cabinet-refinishing-cost-nyc",
    keyword: "cabinet refinishing cost NYC",
    icon: "cabinet",
    title: "Cabinet Refinishing Cost in NYC | 2026 Price Guide",
    description:
      "What does cabinet refinishing cost in NYC? A clear 2026 breakdown by kitchen size and door count, how it compares to replacement, and what drives the price. Free estimate.",
    h1: "What cabinet refinishing costs in NYC",
    lede: "A straight answer on price — what NYC kitchens actually pay to refinish cabinets, what drives the number, and why it beats replacement.",
    intro: [
      "Refinishing your cabinets instead of replacing them is one of the highest-return upgrades in any NYC kitchen — but only if you understand what you're paying for. Here's the honest breakdown of what it costs in 2026 and what moves the price.",
      "The short version: most NYC kitchens land between $3,500 and $7,500 to refinish, versus $20,000–$40,000+ to replace. You're paying mainly for labor and a durable sprayed finish — not expensive materials.",
    ],
    scope: {
      heading: "What's included in a refinishing quote",
      items: [
        "Labeling, removing and transporting doors and drawers",
        "Degreasing and sanding every surface for adhesion",
        "Bonding primer on all faces",
        "Sprayed, self-leveling catalyzed topcoat",
        "Boxes finished in place with dust containment",
        "Reinstall, hardware adjustment and inspection",
      ],
    },
    sections: [
      {
        h2: "What drives the price",
        body: "Cabinet refinishing is priced mostly by door and drawer count, since each piece is removed, prepped, primed, and sprayed individually. Beyond count, the main factors are color change (white over dark wood needs more coats), two-tone or glazed finishes, current condition, and whether you're refinishing bathroom vanities at the same time.",
        bullets: [
          "Number of doors and drawers (the biggest factor)",
          "Color change and number of coats",
          "Two-tone, glazed, or specialty finishes",
          "Current condition and grease/wear",
        ],
      },
      {
        h2: "Refinishing vs. replacement",
        body: "Refinishing typically runs 30–50% of replacement cost while delivering a comparable factory-smooth look — and without weeks of demolition, dust, and a torn-apart kitchen. If your boxes are solid and your layout works, it's almost always the smarter spend.",
      },
    ],
    cost: {
      intro: "Typical NYC cabinet refinishing prices by kitchen size:",
      rows: [
        { item: "Small kitchen (≤15 doors)", range: "$3,500 – $5,000" },
        { item: "Standard kitchen (15–30 doors)", range: "$5,000 – $7,500" },
        { item: "Large / two-tone kitchen", range: "$7,500 – $12,000" },
        { item: "Bathroom vanity (add-on)", range: "$650 – $1,800" },
      ],
      note: "Replacement for the same kitchens typically runs $20,000–$40,000+. Every kitchen is quoted individually after we count doors and check condition — the estimate is free.",
    },
    faqs: [
      {
        q: "How much does it cost to refinish kitchen cabinets in NYC?",
        a: "Most NYC kitchens run $3,500–$7,500 depending on door count, condition, and color change. Small kitchens start around $3,500; large or two-tone kitchens can reach $12,000.",
      },
      {
        q: "Is refinishing really cheaper than new cabinets?",
        a: "Significantly — typically 30–50% of replacement cost, with a comparable finish and far less disruption. New cabinets for the same kitchen usually start around $20,000.",
      },
      {
        q: "What makes one refinishing quote higher than another?",
        a: "Mostly door count and process. A sprayed, catalyzed finish (what we do) costs more than a quick brush-and-roll — but brushed cabinets chip within months, so the cheaper quote usually costs more in the end.",
      },
      {
        q: "Does the quote include hardware and reinstallation?",
        a: "Yes — removal, refinishing, hardware adjustment, and reinstallation are all included. New hardware (if you want it) is a simple add-on.",
      },
    ],
    relatedServices: ["cabinet-refinishing", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["kitchen-cabinet-painting-nyc"],
  },

  // 19 — TIER 2 -----------------------------------------------------------
  {
    slug: "trim-molding-installation-nyc",
    keyword: "trim & molding installation NYC",
    icon: "wall",
    title: "Trim & Molding Installation NYC | Crown, Baseboard & Wainscoting",
    description:
      "Trim and molding installation in NYC — crown molding, baseboards, wainscoting and casing, installed and painted to a seamless finish. Carpentry + paint from one crew. Free estimate.",
    h1: "Trim & molding carpentry in NYC",
    lede: "Crown molding, baseboards, wainscoting, and custom casing — installed crisp and painted seamless by the same crew.",
    intro: [
      "Nothing adds character to a New York apartment faster than trim. Crown molding lifts a ceiling, wainscoting brings a hallway to life, and substantial baseboards make a room feel finished and intentional — the kind of detail that reads expensive.",
      "Because we handle both the carpentry and the paint, you get one accountable crew, perfectly mitered corners, caulked seams, and a sprayed or hand-finished result with no gap between 'installed' and 'painted.'",
    ],
    scope: {
      heading: "What trim & molding work includes",
      items: [
        "Crown molding, baseboards, casing and chair rail",
        "Wainscoting, picture-frame and box molding",
        "Precise mitered and coped corners",
        "Caulking and filling for seamless joints",
        "Primed and finish-painted (sprayed or brushed)",
        "Matching existing profiles in pre-war apartments",
      ],
    },
    sections: [
      {
        h2: "Carpentry and paint from one crew",
        body: "The usual headache with trim is coordinating a carpenter and a painter — two trades, two schedules, and finger-pointing if the seams aren't clean. We do both, so the molding is installed, caulked, filled, primed, and painted as one continuous job with one point of accountability.",
      },
      {
        h2: "The details that make trim look custom",
        body: "Cheap-looking trim almost always comes down to the joints. We cope inside corners, miter outside corners tightly, and caulk every seam where trim meets wall and ceiling — the steps that separate built-in-looking millwork from an obvious add-on.",
        bullets: [
          "Coped inside corners that stay tight as the building moves",
          "Caulked top and bottom edges for a seamless look",
          "Filled and sanded nail holes — invisible under paint",
          "Profile matching for landmark and pre-war interiors",
        ],
      },
    ],
    cost: {
      intro: "Trim and molding is priced by linear foot and profile complexity:",
      rows: [
        { item: "Baseboard replacement (per room)", range: "$600 – $2,000" },
        { item: "Crown molding (per room)", range: "$900 – $3,500" },
        { item: "Wainscoting / accent wall", range: "$1,500 – $5,000" },
        { item: "Whole-apartment trim package", range: "Quoted on inspection" },
      ],
      note: "Profile, ceiling height, and corner count drive the price. Every job gets a free, itemized estimate — and it's most economical bundled with a repaint.",
    },
    faqs: [
      {
        q: "Do you install the molding and paint it, or just one?",
        a: "Both. We install the carpentry and finish-paint it as a single job, so there's no coordinating two trades and no gap in accountability.",
      },
      {
        q: "Can you match the existing molding in my pre-war apartment?",
        a: "Usually, yes. We match existing profiles where stock allows, and can source or build up custom profiles for landmark and pre-war interiors.",
      },
      {
        q: "Will the seams and nail holes show after painting?",
        a: "No. We caulk every seam and fill and sand all nail holes before priming, so the finished trim looks like seamless built-in millwork.",
      },
      {
        q: "Is crown molding worth it in an apartment?",
        a: "It's one of the highest-impact upgrades for the money — it draws the eye up, makes ceilings feel taller, and reads as a high-end, finished space.",
      },
    ],
    relatedServices: ["interior-painting", "drywall-plaster-repair"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["wood-floor-refinishing-nyc", "interior-painting-manhattan"],
  },

  // 20 — TIER 2 -----------------------------------------------------------
  {
    slug: "wood-floor-refinishing-nyc",
    keyword: "wood floor refinishing NYC",
    icon: "house",
    title: "Wood Floor Refinishing NYC | Sand, Stain & Refinish Hardwood",
    description:
      "Hardwood floor refinishing in NYC — dustless sanding, custom staining, and durable finishes that bring tired floors back to life. Pairs perfectly with a repaint. Free estimate.",
    h1: "Wood floor refinishing in NYC",
    lede: "Tired, scratched hardwood sanded back, re-stained, and sealed to a rich, durable finish — the perfect pairing with a fresh repaint.",
    intro: [
      "Original hardwood is one of the best features of a New York apartment, but decades of foot traffic, sun, and old finishes leave it dull, scratched, and gray. Refinishing brings it back — often to better-than-new — for a fraction of the cost of replacement.",
      "And there's no better time to do it than during a repaint: the room is already empty and protected, so combining the two saves you a second disruption and a second setup.",
    ],
    scope: {
      heading: "What floor refinishing includes",
      items: [
        "Dustless sanding to bare, smooth wood",
        "Gap filling and minor board repair",
        "Custom stain color or natural finish",
        "Durable water- or oil-based polyurethane topcoats",
        "Edge and corner detailing by hand",
        "Coordination with your repaint for one clean project",
      ],
    },
    sections: [
      {
        h2: "Dustless sanding for an occupied building",
        body: "Traditional floor sanding fills an apartment — and your neighbors' hallway — with fine dust. We use dust-containment sanding systems that capture the vast majority of it at the source, keeping the job clean enough to do in an occupied NYC building.",
      },
      {
        h2: "Refinish during your repaint and save",
        body: "Floors and walls are a natural pair. With the room already cleared and masked for painting, adding a floor refinish avoids a second move-out and a second setup — and the sequencing (floors and walls in the right order) is handled by one crew.",
        bullets: [
          "One empty-room setup instead of two",
          "Correct sequencing of sanding, painting, and sealing",
          "Stain and wall-color chosen to work together",
        ],
      },
    ],
    cost: {
      intro: "Floor refinishing is priced per square foot, by condition and finish:",
      rows: [
        { item: "Refinish existing hardwood (per sq ft)", range: "$4 – $8 / sq ft" },
        { item: "Average NYC room", range: "$800 – $2,500" },
        { item: "1-bedroom apartment floors", range: "$2,500 – $5,500" },
        { item: "Custom stain / repairs", range: "Quoted on inspection" },
      ],
      note: "Floor condition, stain choice, and the number of coats drive the price. Bundled with a repaint it's more economical — every job gets a free, itemized estimate.",
    },
    faqs: [
      {
        q: "How much does it cost to refinish floors in NYC?",
        a: "Most refinishing runs $4–$8 per square foot, so an average room is roughly $800–$2,500 and a one-bedroom's floors $2,500–$5,500, depending on condition and finish.",
      },
      {
        q: "Is sanding going to cover my apartment in dust?",
        a: "We use dust-containment (dustless) sanding that captures the vast majority of dust at the source, so it's clean enough for occupied buildings — though a light final wipe-down is always part of the job.",
      },
      {
        q: "Should I refinish floors before or after painting?",
        a: "We sequence it correctly within one project — typically sanding first, then painting, then the final floor coats — so neither finish damages the other. Doing both together saves a second setup.",
      },
      {
        q: "Can you change the stain color of my floors?",
        a: "Yes. After sanding to bare wood we can apply a custom stain — lighter, darker, or a different tone — and seal it with a durable topcoat.",
      },
    ],
    relatedServices: ["interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["trim-molding-installation-nyc", "apartment-painting-nyc"],
  },
];

export function getMoneyPage(slug: string) {
  return moneyPages.find((p) => p.slug === slug);
}
