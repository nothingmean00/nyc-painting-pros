import type { MoneyPage } from "./money-pages";

export const expansionMoneyPages: MoneyPage[] = [
  {
    slug: "wallpaper-removal-nyc",
    keyword: "wallpaper removal NYC",
    icon: "roller",
    title: "Wallpaper Removal NYC | Wall Repair & Repainting",
    description: "Plan wallpaper removal in your NYC apartment with a test area, clear wall-repair allowance, and repainting scope. Request an estimate for your rooms.",
    h1: "Wallpaper removal in NYC",
    lede: "From the first test area to the final painted wall, know what removal includes and how hidden damage will be handled.",
    intro: ["Old wallpaper can hide an excellent wall—or a repair project. We start the estimate conversation with the covering, the underlying surface, and the finish you want next. A strip-only project is different from removal followed by smoothing, priming, and a complete repaint.", "Send room photographs, approximate wall dimensions, and any history of leaks or previous paper layers. In a furnished apartment, include the available working space and whether the room must remain accessible each evening. Those details help define a realistic scope before scheduling."],
    scope: { heading: "Build your removal scope", items: ["Agreed test area to assess layers and substrate condition", "Room and floor protection appropriate to the removal method", "Removal of the specified covering and backing", "Adhesive cleanup and assessment of the exposed wall", "Separately defined patching or full-wall smoothing", "Optional primer and repainting with a named finish system", "Waste handling and a documented final walkthrough"] },
    sections: [
      { h2: "The test area is a pricing decision", body: "A quote based only on visible square footage cannot establish how several old layers will release. The test helps distinguish straightforward stripping from a job where the wall surface needs substantial repair. Agree where the test will happen and how it will be made presentable if you do not proceed.", bullets: ["Identify the number of visible layers.", "Record damage revealed during removal.", "Approve additional repair work before it starts."] },
      { h2: "Choose the finish before choosing the repair allowance", body: "A newly painted hall under strong side lighting can require more smoothing than a wall receiving another textured covering. We discuss the intended finish and normal room lighting at the estimate stage. Local patching, skim coating, primer, and paint should appear as identifiable parts of the proposal rather than one undefined preparation charge." },
      { h2: "Plan access in a furnished NYC apartment", body: "Narrow passages and rooms with built-in storage require a working-space plan. Identify what can be moved, who moves it, and where it will go. Confirm building work hours and debris rules before setting dates. Drying and repair stages may keep a wall unavailable after the paper itself is gone; the schedule should cover the finished result, not just removal." },
      { h2: "What this service does not solve by itself", body: "Decorative removal is not a remedy for an active leak or an unstable wall. Environmental assessment, remediation, and structural repairs are separate scopes when needed. If underlying old coatings may be disturbed, applicable precautions and qualifications must be confirmed before work proceeds. We do not treat unknown damage as automatically included in a decorating estimate." }
    ],
    cost: { intro: "Pricing follows wall area, removal difficulty, access, and the agreed finish. Request these items separately so you can compare like-for-like proposals.", rows: [{ item: "Test and removal", range: "Based on layers, adhesion, height, and access" }, { item: "Surface repairs", range: "Localized repairs or full-wall smoothing, specified separately" }, { item: "Primer and repaint", range: "Based on the selected system and included surfaces" }], note: "A written estimate follows scope review. Hidden damage should trigger a documented change proposal, not an unapproved addition to the bill." },
    faqs: [
      { q: "Can you quote from photos?", a: "Photos help establish the rooms and access, but they may not reveal how the covering will release. A site review or test area may be needed before confirming the repair allowance." },
      { q: "Does removal include painting?", a: "Only when painting is included in the written scope. Ask whether the deliverable is a stripped wall, a prepared wall, or a completed painted finish." },
      { q: "Will removal damage my drywall?", a: "The outcome depends on the existing surface, adhesive, and installation. A test area helps identify vulnerability; the proposal should explain how repairs will be authorized." },
      { q: "Can the room stay furnished?", a: "Often the plan can retain some furniture, but the walls and working route need sufficient clearance. Identify moving and protection responsibilities before the start date." }
    ],
    planningLinks: [{ label: "Should you remove wallpaper or paint over it?", href: "/blog/remove-wallpaper-or-paint-over-it" }],
    references: [{ label: "BEHR: wallpaper removal preparation", href: "https://www.behr.com/how-to/interior/how-to-remove-wallpaper" }],
    relatedServices: ["wallpaper-removal", "drywall-plaster-repair", "interior-painting"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["wallpaper-installation-nyc", "skim-coating-nyc", "apartment-painting-nyc"]
  },
  {
    slug: "wallpaper-installation-nyc",
    keyword: "wallpaper installation NYC",
    icon: "roller",
    title: "Wallpaper Installation NYC | Layout, Prep & Hanging",
    description: "Wallpaper installation for NYC rooms and feature walls. Review material quantities, pattern placement, wall preparation, and installation scope before booking.",
    h1: "Wallpaper installation in NYC",
    lede: "A considered layout, a suitable wall, and the right amount of material—planned together before the first strip is hung.",
    intro: ["Wallpaper installation starts before the rolls arrive. The design repeat, wall height, corners, and focal point all influence how much to order and where the pattern lands. Bring us the exact product specification so the estimate reflects your material rather than a generic wallcovering assumption.", "We plan room and feature-wall installations around the finished composition. An entry wall seen from the front door needs a different starting-point decision from a bedroom wall framed by a headboard. Share a room photograph and the furniture layout alongside your measurements."],
    scope: { heading: "What to agree before installation", items: ["Review of product instructions, match type, and material suitability", "Wall measurements and quantity review before ordering", "Preparation allowance for the existing surface", "Layout and focal-point discussion", "Defined installation boundaries at corners, trim, and returns", "Protection of adjacent finishes and furnishings", "Material inspection and an agreed process for defects", "Final review of pattern alignment and finishing details"] },
    sections: [
      { h2: "The product determines the installation plan", body: "Traditional paper, nonwoven coverings, adhesive-backed products, and murals have different requirements. Send the manufacturer's hanging instructions with the product link. Confirm suitability before purchasing, especially for humid rooms or unusual substrates. We review the proposed material as part of scoping; a photo of the design does not establish installation compatibility." },
      { h2: "Make the layout intentional", body: "We discuss what should be centered, which wall is most visible, and where a pattern transition will be least distracting. Doors and windows can interrupt a repeat, and an out-of-square corner may affect the composition. For murals, approve the crop and panel arrangement against actual dimensions before the order becomes final.", bullets: ["Show the final position of beds, consoles, and shelving.", "Confirm papered returns and stopping points.", "Review conspicuous motifs before cutting begins."] },
      { h2: "Separate preparation from hanging", body: "New wallpaper should not be asked to conceal an undefined repair problem. Existing wallpaper removal, damaged drywall facing, pronounced texture, and uneven patches can require separate preparation. The proposal should state the intended substrate condition and any product-specific primer or adhesive. If the wall needs more work after inspection, approve that scope before the installation date." },
      { h2: "Schedule around materials and building access", body: "Confirm delivery and inspect supplied material before committing to a final hanging date. Document who purchases it and who handles shortages or defects. In a co-op or condo, share work-hour and access requirements early. For a powder room, also identify which fittings need to be removed and who is responsible for safely removing and reinstalling them." }
    ],
    cost: { intro: "Installation cost depends on both the wall and the product. A small room with many obstacles can involve more detailed fitting than a larger uninterrupted wall.", rows: [{ item: "Wall preparation", range: "Assessed from existing finish and required repairs" }, { item: "Hanging and layout", range: "Quoted by material, repeat, height, and complexity" }, { item: "Wallpaper supply", range: "Confirm owner-supplied versus included material" }, { item: "Removal of existing covering", range: "Separate scope when required" }], note: "Provide the product specification before accepting an installation price. Material quantity and labor price are different calculations." },
    faqs: [
      { q: "Should I order the wallpaper before contacting you?", a: "Contact us with the product link and room dimensions first. Quantity and suitability should be reviewed before an order, especially for custom or nonreturnable material." },
      { q: "Can you install a mural?", a: "Share the panel specification, artwork proof, and wall measurements for review. The scope depends on product suitability, the proposed crop, and the condition of the wall." },
      { q: "Is peel-and-stick wallpaper always removable without damage?", a: "Do not assume that. Follow the product's substrate and removal requirements, and review any rental restoration obligations before choosing it." },
      { q: "What happens if the material is defective?", a: "Agree on an inspection and stop-work process before hanging. Keep packaging and order records, and confirm who will contact the supplier and arrange replacement material." }
    ],
    planningLinks: [{ label: "How much wallpaper should you order?", href: "/blog/how-much-wallpaper-to-order-nyc" }],
    references: [{ label: "Wallcovering Installers Association: consumer resources", href: "https://www.wallcoveringinstallers.org/consumers/wallcovering-resources/wallcovering-info-and-tips/" }],
    relatedServices: ["wallpaper-installation", "wallpaper-removal", "decorative-finishes"],
    relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["wallpaper-removal-nyc", "skim-coating-nyc", "single-room-accent-wall-painting-nyc"]
  }
];
