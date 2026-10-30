import type { MoneyPage } from "./money-pages";

export const projectMoneyPages: MoneyPage[] = [
  {
    slug: "occupied-apartment-painting-nyc", keyword: "occupied apartment painting NYC", icon: "house",
    title: "Occupied Apartment Painting NYC | Phased Repaint Planning",
    description: "Plan painting in an occupied NYC apartment with defined work zones, furniture moves, essential-room access, and daily handoffs. Request a phased project estimate.",
    h1: "Occupied apartment painting in NYC",
    lede: "A room-by-room repaint plan built around the household's practical needs and the work each stage requires.",
    intro: ["Painting a furnished, occupied apartment needs more coordination than an empty-room repaint. The estimate should account for belongings, working space, essential rooms, and the point at which each area can return to use. We discuss those constraints before proposing a sequence.", "Tell us who will be home, which rooms are essential each day, and whether temporary relocation is an option. Staying in place is not suitable for every scope or household. The plan needs to work for the actual products, preparation, and site conditions rather than relying on a general low-odor promise."],
    scope: { heading: "Build the phased work plan", items: ["Room-by-room scope and condition review", "Furniture and contents responsibilities", "Defined work zones and storage locations", "Ventilation and product-instruction review", "Sequencing around bathroom, sleeping, and work needs", "Daily progress and handoff communication", "Product-specific handling and care instructions", "Final review of each completed phase"] },
    sections: [
      { h2: "Start with the household's non-negotiables", body: "A home office, a single bathroom, or a pet that needs separation can change the schedule. Share those details at the outset. We identify which areas need to remain available and what conditions must be met before moving to the next phase. If the proposed arrangement is impractical, revise occupancy or timing before the work begins." },
      { h2: "Price moving and protection honestly", body: "Large furniture can restrict preparation and application even when it remains in the apartment. Agree who empties shelves, moves fragile items, and repositions heavy pieces. Protection is not the same as packing or storage. List repeated moves between phases where required so the proposal reflects the actual workload." },
      { h2: "Review preparation as well as paint", body: "The type of repairs and surface disturbance matters to occupancy planning. For older housing, confirm applicable lead-related requirements and appropriately certified professionals before covered work begins. EPA's indoor painting guidance also highlights ventilation and exposure precautions. Product choice alone does not replace a suitable work and occupancy plan." },
      { h2: "Define each handoff", body: "A phase should end with a clear account of completed surfaces, remaining restrictions, and the next steps. Ordinary access, furniture placement, cleaning, and full return to use may occur at different points according to the selected finish. Record these instructions so occupants do not have to infer readiness from appearance." }
    ],
    cost: { intro: "Phasing can add setup, protection, and moving work. Compare the proposed sequence alongside the price.", rows: [{ item: "Painting and repairs", range: "Defined by room and surface" }, { item: "Phased setup and protection", range: "Based on agreed work zones" }, { item: "Furniture and contents handling", range: "Responsibilities and repeated moves listed" }, { item: "Schedule constraints", range: "Reviewed against building and household access" }], note: "A final sequence depends on the work and site conditions. Occupancy suitability is assessed rather than guaranteed for every project." },
    faqs: [
      { q: "Can we sleep in the apartment during painting?", a: "That requires review of the work, separation, ventilation, product instructions, and household needs. Do not assume an occupied schedule is appropriate without a specific plan." },
      { q: "Can you work around remote meetings?", a: "Share required quiet periods early. They may affect sequencing and working hours and should appear in the agreed schedule." },
      { q: "Who moves the furniture?", a: "The proposal should state responsibilities, including heavy, fragile, or valuable items. Do not assume protection includes every moving task." },
      { q: "Will every room be available each evening?", a: "Not necessarily. Define daily handoffs and any restrictions before accepting the sequence." }
    ],
    planningLinks: [{ label: "Can you stay home during apartment painting?", href: "/blog/living-at-home-during-apartment-painting" }],
    references: [{ label: "EPA: indoor painting practices", href: "https://www.epa.gov/tsca-screening-tools/healthy-indoor-painting-practices" }, { label: "EPA: RRP consumer guidance", href: "https://www.epa.gov/lead/renovation-repair-and-painting-rrp-program-consumers" }],
    relatedServices: ["interior-painting"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["apartment-painting-nyc", "bathroom-painting-nyc", "co-op-condo-painting-nyc"]
  },
  {
    slug: "stairwell-painting-nyc", keyword: "stairwell painting NYC", icon: "building",
    title: "Stairwell Painting NYC | Access, Protection & Phasing",
    description: "Stairwell painting for NYC buildings and homes. Scope flights, landings, wall repairs, protection, and access responsibilities before requesting an estimate.",
    h1: "Stairwell painting in NYC",
    lede: "A coordinated repaint for flights and landings, with access and protection planned before the first phase.",
    intro: ["Stairwell painting combines tall or awkward surfaces with a route occupants may need to use. We begin with the building layout and a site assessment, then define the surfaces and sequence. Wall area alone is not enough to establish the project.", "Share the number of flights, photographs from each landing, building work hours, and how the stairs are used. Identify whether the request covers walls and ceilings only or also doors, trim, and railing components. Each component should have its own clear inclusion in the estimate."],
    scope: { heading: "Define the stairwell project", items: ["Flight-by-flight and landing-by-landing condition review", "Qualified assessment of work access and equipment needs", "Coordination with the building's access requirements", "Protection appropriate to existing steps, flooring, and rails", "Specified wall and ceiling repairs", "Clearly identified doors, trim, or railings when included", "Daily handoff and management communication", "Location-based finish record for maintenance"] },
    sections: [
      { h2: "Access is part of the scope", body: "Required routes and life-safety arrangements must remain appropriate during the work. We discuss the proposed sequence with the building representative before scheduling. If a method conflicts with required access, the method or schedule needs revision. Equipment selection follows the site assessment; an owner should not need to improvise a work platform to make a quote possible." },
      { h2: "Separate the surfaces and their conditions", body: "A stairwell can contain plaster walls, metal rails, wood trim, and several door types. Mark what receives paint and what remains protected. Note scuffs from deliveries, damaged corners, and old repairs by location. The finish system and preparation should follow the component rather than treating the entire stairwell as one uniform surface." },
      { h2: "Plan the daily building handoff", body: "Agree the contact for resident questions, the timing of updates, and where materials will be stored. Landings should not become unplanned storage zones. Each phase should communicate what is complete, what remains restricted, and what the next stage requires. Coordinate known deliveries and other contractors before they interfere with the work area." },
      { h2: "Make future touchups easier", body: "At completion, review the route from ordinary approaches and under normal lighting. Record products and colors by landing or component, especially when rails and walls use different systems. A useful closeout record lets the building maintain the finish without guessing which paint belongs where." }
    ],
    cost: { intro: "Stairwell estimates depend on layout, height, access, component detail, and the repair scope.", rows: [{ item: "Walls and ceilings", range: "Measured by flight and landing" }, { item: "Access and setup", range: "Site-assessed requirements" }, { item: "Doors, trim, and rails", range: "Separate component allowances" }, { item: "Repairs and phasing", range: "Condition and building-use requirements" }], note: "Stair treads, structural work, and specialist repairs are not automatically included in a wall-and-ceiling repaint." },
    faqs: [
      { q: "Can residents keep using the stairs?", a: "The access plan must be reviewed for the building and proposed work. Required routes cannot simply be blocked; resolve the method and sequence before scheduling." },
      { q: "Are handrails included?", a: "Only when specified, with the material, preparation, and finish identified separately from the walls." },
      { q: "Can you quote from the number of floors?", a: "That is useful initial information, but layout, height, condition, and access need review before confirming a complete scope." },
      { q: "Does painting include refinishing the stairs themselves?", a: "Not unless separately agreed. Treads and flooring need their own material and use assessment." }
    ],
    planningLinks: [{ label: "Stairwell access and scope checklist", href: "/blog/stairwell-painting-access-plan" }],
    relatedServices: ["interior-painting", "commercial-painting"], relatedAreas: ["manhattan", "brooklyn", "queens", "bronx"],
    relatedPages: ["apartment-building-lobby-hallway-painting-nyc", "high-ceiling-painting-nyc", "brownstone-painting-brooklyn"]
  },
  {
    slug: "high-ceiling-painting-nyc", keyword: "high ceiling painting NYC", icon: "roller",
    title: "High-Ceiling Painting NYC | Lofts & Double-Height Rooms",
    description: "High-ceiling and tall-wall painting in NYC. Review access routes, equipment needs, repairs, beams, and protection for a complete loft or double-height-room estimate.",
    h1: "High-ceiling and tall-wall painting in NYC",
    lede: "Plan the full volume of the room, from access and protection to the finish seen in its natural light.",
    intro: ["A loft or double-height room needs an estimate based on more than its floor area. Tall wall planes, overhead detail, fixed obstacles, and the route for equipment can all affect preparation and application. We review those conditions before defining the work.", "Send wide photographs, approximate wall dimensions, and images of the route from the building entrance into the room. Include beams, recesses, exposed elements, and any surfaces that should remain untouched. Final measurements and the work method are confirmed through a site assessment."],
    scope: { heading: "What to identify in a tall-room project", items: ["Wall and ceiling planes with clear boundaries", "Surface condition and repair allowance", "Qualified assessment of access and equipment", "Building delivery and work-hour requirements", "Protection and movement of furnishings", "Separate treatment of beams, columns, and recesses", "Agreed paint system and finish standard", "Review in the room's normal lighting"] },
    sections: [
      { h2: "The route into the room matters", body: "Equipment access can be limited by elevators, stairs, doorways, and tight turns. Share building constraints early, including booking procedures and delivery windows. Inside the room, a fixed island or large furnishing may limit usable setup space. The proposed method should follow those real constraints rather than an assumption based on a photograph of the high wall alone." },
      { h2: "Define every plane and overhead element", body: "Beams and soffits add faces and edges. Exposed mechanical or structural components may need a different review and are not automatically included when a proposal says ceiling. Mark the surfaces to be painted and the ones to be protected. This creates a scope that can be inspected at completion." },
      { h2: "Match preparation to visible conditions", body: "Tall windows and directional fixtures can reveal patches and unevenness across a large surface. Discuss the desired result in the lighting you normally use. Local repairs and broad smoothing are different allowances; identify them before relying on finish paint to deliver a uniform plane. Coordinate planned lighting changes with the final review." },
      { h2: "Coordinate the room's return to use", body: "Agree where furniture moves, who handles valuable or unusually heavy items, and how the space is handed back. If the room stays occupied, discuss the work-zone boundaries and restrictions. Equipment setup, removal, and protection are part of the project schedule, not incidental details after the painting is priced." }
    ],
    cost: { intro: "Tall-room pricing follows surface area, height, access, preparation, and detail.", rows: [{ item: "Tall walls and ceiling planes", range: "Dimensions confirmed on site" }, { item: "Access equipment and setup", range: "Based on the assessed work method" }, { item: "Repairs or smoothing", range: "Defined preparation allowance" }, { item: "Beams and detailed elements", range: "Separate faces and boundaries listed" }], note: "A preliminary estimate based on photographs should identify assumptions that remain subject to a site review." },
    faqs: [
      { q: "What measurements should I send?", a: "Approximate widths and heights, ceiling shape, and photographs are useful. Collect them from safe positions; the contractor can confirm measurements during the assessment." },
      { q: "Do you choose the access equipment?", a: "The appropriate method is determined through qualified site assessment, including the route into the building and the available working space." },
      { q: "Are exposed pipes and beams included?", a: "Only if explicitly reviewed and listed. Materials and coating requirements can differ from ordinary walls and ceilings." },
      { q: "Can a ceiling repaint include wall repairs?", a: "Yes, when defined in the proposal. Identify the damaged locations and intended repair standard rather than leaving preparation open-ended." }
    ],
    planningLinks: [{ label: "Measurements and photos for a high-ceiling estimate", href: "/blog/high-ceiling-painting-estimate-measurements" }],
    relatedServices: ["interior-painting", "drywall-plaster-repair"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["tribeca-loft-painting", "ceiling-painting-nyc", "stairwell-painting-nyc"]
  },
  {
    slug: "pre-sale-apartment-painting-nyc", keyword: "pre sale apartment painting NYC", icon: "house",
    title: "Pre-Sale Apartment Painting NYC | Scope Before Listing",
    description: "Prepare a NYC apartment for listing with a prioritized repaint scope, repair plan, approved colors, and coordination before cleaning, staging, and photography.",
    h1: "Pre-sale apartment painting in NYC",
    lede: "A focused repaint plan that supports presentation and fits the listing schedule without losing sight of the apartment's actual condition.",
    intro: ["Before listing, painting can address inconsistent finishes, visible scuffs, and the aftermath of completed repairs. We help define the surfaces that need attention and coordinate the finish stage with cleaning, staging, and photography.", "Share the target listing timeline, whether the apartment is occupied, and any presentation priorities agreed with your agent. A useful proposal separates necessary repairs, the base repaint scope, and optional cosmetic additions. It does not rely on a promise of a particular increase in sale value."],
    scope: { heading: "Build a prioritized listing-preparation scope", items: ["Walkthrough of visible condition and repair needs", "Base scope and optional additions identified separately", "Color approval beside existing finishes", "Defined walls, ceilings, doors, and trim", "Coordination with building access and other trades", "Handoff before staging or photography", "Final punch list of included surfaces", "Paint record for maintenance during the listing period"] },
    sections: [
      { h2: "Prioritize what changes the presentation", body: "Review the route from entry through the main rooms and identify damaged areas, uneven touchups, and distracting transitions. Sound, consistent finishes may not need the same treatment as visibly patched walls. We can price a focused base scope with optional additions so the owner can make informed choices against the deadline and budget." },
      { h2: "Resolve defects before decoration", body: "A recurring stain or unstable surface needs its cause assessed before repainting. Decorative work should follow required repairs and should not obscure a known unresolved problem. Coordinate with the appropriate professionals on repairs and any disclosure questions; those responsibilities are separate from the visual finish." },
      { h2: "Approve colors before dependent bookings", body: "Choose a coherent palette in the apartment's actual light beside the finishes that remain. Identify one decision maker and record the approved products and colors. Late changes can affect the time reserved for cleaning and staging, so sample approval belongs early in the schedule rather than on the first application day." },
      { h2: "Work backward from photography", body: "Align the repaint handoff with furniture placement, cleaning, and the photographer's appointment. Product-specific handling instructions still apply even when a listing date is close. For a vacant apartment, confirm keys, utilities, and elevator arrangements; for an occupied one, include packing and furniture movement in the plan." }
    ],
    cost: { intro: "Pricing follows the prioritized scope and the condition of each included surface.", rows: [{ item: "Base presentation scope", range: "Named rooms and visible surfaces" }, { item: "Repairs before repainting", range: "Condition-specific allowance" }, { item: "Optional rooms or components", range: "Separately priced additions" }, { item: "Occupancy and schedule constraints", range: "Reviewed before dates are confirmed" }], note: "Painting is a presentation and maintenance decision; no sale-price or return-on-investment result is guaranteed." },
    faqs: [
      { q: "Does every room need repainting before a sale?", a: "Not necessarily. Review condition and visual continuity with your agent, then prioritize the surfaces that need work." },
      { q: "Can you coordinate before listing photos?", a: "Share the target date and dependent appointments early. The confirmed sequence needs to account for preparation, application, handling, cleaning, and staging." },
      { q: "Can you quote optional work separately?", a: "Yes. A base scope plus named additions helps distinguish essential preparation from discretionary cosmetic changes." },
      { q: "Will painting increase the selling price?", a: "No specific financial outcome can be promised. The scope is intended to improve finish consistency and presentation, based on the apartment's condition." }
    ],
    planningLinks: [{ label: "What to prioritize before listing an apartment", href: "/blog/pre-sale-apartment-painting-priorities" }],
    relatedServices: ["interior-painting"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["apartment-painting-nyc", "move-out-apartment-painting-nyc", "occupied-apartment-painting-nyc"]
  }
];
