import type { MoneyPage } from "./money-pages";

export const woodworkMoneyPages: MoneyPage[] = [
  {
    slug: "interior-door-painting-nyc", keyword: "interior door painting NYC", icon: "roller",
    title: "Interior Door Painting NYC | Faces, Edges & Frames",
    description: "Interior door painting in NYC with defined faces, edges, frames, hardware handling, and finish instructions. Request an estimate by door type and condition.",
    h1: "Interior door painting in NYC",
    lede: "A door repaint should look finished and function properly. Plan the components, hardware, and handling together.",
    intro: ["Interior doors receive frequent contact and frame the view between rooms. A complete proposal identifies the faces, edges, and surrounding components rather than relying on a vague price per door. We help map that scope for a single room or an apartment-wide repaint.", "Tell us the number and type of doors, whether both faces change color, and how each door currently opens and latches. Share photographs of panels, damage, and hardware. Existing fit problems should be recorded before painting so any needed adjustments can be scoped separately."],
    scope: { heading: "Define each door opening", items: ["Inventory of door types and included faces", "Agreed treatment of edges, frames, stops, and casings", "Existing condition and operation review", "Hardware protection or removal and reinstallation plan", "Specified surface repairs and compatible coating system", "Color boundaries between adjoining rooms", "Product-specific handling and closing instructions", "Final appearance and normal-operation review"] },
    sections: [
      { h2: "Count the components, not just the openings", body: "A flat slab, a paneled door, a louvered closet door, and a glazed door present different work. Identify both faces and any frames in the request. If rooms use different colors, agree which color continues onto each edge. That small decision prevents an awkward transition when the door is open." },
      { h2: "Record fit issues before a finish change", body: "If a door already rubs, drops, or fails to latch, painting is not the complete remedy. Discuss adjustment or repair with the appropriate trade and coordinate it before the final finish where practical. Coating buildup and sticky contact surfaces also deserve assessment; adding another coat without identifying the issue may not help." },
      { h2: "Keep daily use in the schedule", body: "An occupied apartment may need bathroom privacy or bedroom access throughout the project. We discuss sequencing and whether doors remain in place or require a separate work setup. Entry doors and special assemblies need their own review, including building requirements. Required access and safety hardware must remain appropriate during the work." },
      { h2: "Handoff includes handling instructions", body: "Sherwin-Williams identifies insufficient drying time and coating block resistance as factors when painted contact surfaces stick. Ask for guidance for the actual selected product before returning every door to normal use. The final review should include faces, edges, hardware, and operation, with any unresolved adjustment recorded." }
    ],
    cost: { intro: "Door pricing follows type, condition, included components, and handling arrangements.", rows: [{ item: "Door faces", range: "Counted by type and number of sides" }, { item: "Edges, frames, and casings", range: "Explicitly included or excluded" }, { item: "Detailed panels or louvers", range: "Additional preparation and application detail" }, { item: "Repairs or adjustments", range: "Separate scope where required" }], note: "Confirm hardware responsibilities and whether adjacent wall touchups are included before comparing proposals." },
    faqs: [
      { q: "Does a door price include both sides?", a: "It should say so explicitly. Faces, edges, frame, stops, and casing need separate identification in the scope." },
      { q: "Can you paint doors while we live in the apartment?", a: "The work can be planned around occupancy where access and handling permit. Identify privacy and access needs so the sequence can be agreed before scheduling." },
      { q: "Will painting fix a door that rubs?", a: "Not by itself. Record the problem and arrange the appropriate assessment or adjustment before relying on a finish change." },
      { q: "Are apartment entry doors included?", a: "They require separate review because materials, hardware, building rules, and performance requirements may differ from ordinary interior doors." }
    ],
    planningLinks: [{ label: "Doors sticking after painting: what to check", href: "/blog/doors-sticking-after-painting" }],
    references: [{ label: "Sherwin-Williams: paint blocking", href: "https://www.sherwin-williams.com/en-us/project-center/maintenance-repair/how-to-fix-paint-blocking" }],
    relatedServices: ["interior-painting"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["interior-trim-painting-nyc", "closet-painting-nyc", "apartment-painting-nyc"]
  },
  {
    slug: "closet-painting-nyc", keyword: "closet painting NYC", icon: "roller",
    title: "Closet Painting NYC | Walls, Shelves & Storage Planning",
    description: "Closet painting for NYC apartments. Separate walls from shelving and organizers, plan temporary storage, and get a clear repaint and return-to-use scope.",
    h1: "Closet painting in NYC",
    lede: "Refresh overlooked storage spaces with a plan for the walls, shelving, and belongings that need to move.",
    intro: ["A closet can contain more finishing decisions than its floor area suggests. Walls, ceilings, shelves, organizers, doors, and rods are separate components. We define which should be painted and which should stay protected before preparing the estimate.", "For a reach-in or walk-in closet, send photos showing the opening and the interior. Include height, depth, and the type of storage system. If the apartment remains occupied, tell us where the contents can go and whether closets need to be completed one at a time."],
    scope: { heading: "Create a component-by-component scope", items: ["Walls and ceiling identified separately from storage fittings", "Assessment of visible surface damage and old repairs", "Protection or agreed removal of rods and organizers", "Specified preparation and painting of included surfaces", "Separate review of shelf and organizer material compatibility", "Optional door and frame repaint", "Phasing around temporary storage", "Loading and care instructions for painted shelf surfaces"] },
    sections: [
      { h2: "Wall refresh or storage-system refinish?", body: "If the organizer is in good condition, it may remain in place while the surrounding surfaces are refreshed, subject to access. Changing the organizer's finish is a different project. Provide material information where available so wood, laminate, and factory-finished components can be reviewed appropriately. Do not assume the wall coating is also the shelf specification." },
      { h2: "Deep returns and high shelves affect access", body: "A narrow opening can hide substantial wall area. Include photographs above the top shelf and behind sliding or bifold doors. Confirm whether door removal or organizer disassembly is necessary, who performs it, and how parts will be labeled. Those tasks should be visible in the proposal rather than discovered on the start day." },
      { h2: "Phase the work around your belongings", body: "Multiple emptied closets can fill the apartment. Agree a temporary storage location and keep working routes clear. The owner usually needs a plan for personal items before preparation begins; clarify any packing or moving assistance separately. A sequence that keeps one closet available may be more practical than treating all storage areas at once." },
      { h2: "Do not reload painted shelves by appearance alone", body: "Shelf surfaces carry sustained contact from objects, unlike most walls. Ask for product-specific loading and cleaning instructions and confirm whether shelves need additional handling time. At the final review, inspect the included surfaces before contents go back and retain the finish details for later maintenance." }
    ],
    cost: { intro: "A closet estimate should describe the storage assembly and the extent of disassembly, not simply count closets.", rows: [{ item: "Walls and ceiling", range: "Area, depth, height, and condition" }, { item: "Shelving and organizers", range: "Material and included faces reviewed separately" }, { item: "Door and frame", range: "Optional component scope" }, { item: "Disassembly or moving", range: "Responsibilities and allowance agreed in advance" }], note: "Confirm whether the price assumes an empty closet and whether storage fittings stay in place." },
    faqs: [
      { q: "Do I need to empty the closet?", a: "The work area needs suitable access. Agree which contents must move and who moves them before scheduling; a protection allowance does not necessarily include packing." },
      { q: "Can you paint laminate organizers?", a: "The material and condition require compatibility review. Send the product information or detailed photos before assuming refinishing is suitable." },
      { q: "Are shelf undersides included?", a: "Only if specified. List tops, undersides, edges, supports, and back panels so the final appearance is clear." },
      { q: "When can boxes and clothes go back?", a: "Follow the chosen finish's loading and handling guidance. Walls and painted shelf tops may have different return-to-use needs." }
    ],
    planningLinks: [{ label: "Closet repaint and temporary-storage checklist", href: "/blog/closet-painting-shelves-and-storage-plan" }],
    relatedServices: ["interior-painting"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["interior-door-painting-nyc", "built-in-bookcase-painting-nyc", "move-in-apartment-painting-nyc"]
  },
  {
    slug: "built-in-bookcase-painting-nyc", keyword: "built-in bookcase painting NYC", icon: "roller",
    title: "Built-In Bookcase Painting NYC | Shelves, Frames & Cabinets",
    description: "Plan a NYC built-in bookcase repaint with material review, defined shelf surfaces, finish samples, and a realistic reloading schedule. Request an estimate.",
    h1: "Built-in bookcase painting in NYC",
    lede: "A considered finish for the frame, shelves, and backing—with the return of your books planned from the start.",
    intro: ["Built-in bookcases combine decorative surfaces with working storage. The visible frame, back panels, shelf tops, and cabinet doors may need different preparation and handling even when they share one color. We define that assembly before pricing a repaint.", "Share dimensions, the number of adjustable shelves and doors, and photographs of the existing finish. Tell us whether the design includes a contrasting back panel or one color throughout. If the material is unknown, a closer review may be needed before selecting a coating system."],
    scope: { heading: "Specify the full bookcase finish", items: ["Material and existing-finish review", "Inventory of frames, backs, shelves, doors, and interiors", "Approved color boundaries and representative finish sample", "Protection of adjoining walls, floors, and furnishings", "Defined repairs and preparation", "Hardware and removable-part labeling plan", "Coating application to agreed surfaces", "Reassembly, loading, and care guidance"] },
    sections: [
      { h2: "One built-in can contain several materials", body: "Solid wood framing, veneer panels, MDF, and previously finished components may coexist in the same unit. Identify them where possible and discuss compatibility before choosing a finish. Existing damage or loose components may require repair outside the coating scope. A finish estimate should not imply that the structure of the bookcase has been rebuilt." },
      { h2: "Approve what the eye sees and what storage hides", body: "Decide whether enclosed interiors and shelf undersides are included as well as the front-facing surfaces. A contrasting back panel needs precise boundaries around adjustable shelves and vertical dividers. Review the sample with the room's light and planned display items so the scheme works when the shelves are filled, not only when empty." },
      { h2: "Sequence removal and storage deliberately", body: "Books, equipment, and display objects need a temporary home. Label removable shelves and hardware by location and identify responsibility for disassembly. For built-ins surrounding media equipment, agree who disconnects and reinstalls it. The painting schedule should leave enough working space without turning the hallway into an obstructed storage area." },
      { h2: "The finish needs a loading plan", body: "Benjamin Moore's bookshelf guidance emphasizes material-appropriate coatings and allowing the finish to cure before replacing objects. We discuss handling for the actual selected product. Save the product record and final application date, and inspect the empty completed unit before reloading so edges and back panels remain visible during the walkthrough." }
    ],
    cost: { intro: "Bookcase pricing follows component count, detail, condition, and the included interior surfaces.", rows: [{ item: "Frame and back panels", range: "Dimensions, design, and condition" }, { item: "Adjustable shelves", range: "Number and included faces" }, { item: "Cabinet doors and interiors", range: "Separately identified scope" }, { item: "Repairs and reassembly", range: "Defined responsibility and allowance" }], note: "A wall square-foot price does not describe the many faces of a built-in. Request an itemized component scope." },
    faqs: [
      { q: "Can the back panel be a different color?", a: "Yes, a contrasting scheme can be scoped. Approve the boundaries and sample before application." },
      { q: "Does the quote include the inside of lower cabinets?", a: "Only when listed. Cabinet interiors, doors, shelves, and frame faces should be identified separately." },
      { q: "When can I put books back?", a: "Use the selected coating's instructions and agreed loading plan. A dry surface is not sufficient evidence that it is ready for sustained contact." },
      { q: "Do you repair sagging shelves?", a: "That requires a separate repair assessment. Describe the issue before accepting a painting-only scope." }
    ],
    planningLinks: [{ label: "Planning the return of books to painted shelves", href: "/blog/painted-bookshelves-when-to-put-books-back" }],
    references: [{ label: "Benjamin Moore: bookshelf painting guidance", href: "https://www.benjaminmoore.com/en-ca/interior-exterior-paints-stains/how-to-advice/interiors/how-to-paint-a-bookshelf" }],
    relatedServices: ["interior-painting", "cabinet-refinishing"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["closet-painting-nyc", "interior-trim-painting-nyc", "wainscoting-painting-nyc"]
  },
  {
    slug: "wainscoting-painting-nyc", keyword: "wainscoting painting NYC", icon: "roller",
    title: "Wainscoting Painting NYC | Paneling, Rails & Molding",
    description: "Wainscoting and interior paneling painting in NYC. Plan repairs, color boundaries, sheen samples, and transitions around doorways before requesting an estimate.",
    h1: "Wainscoting painting in NYC",
    lede: "Bring panels, rails, and surrounding trim into one deliberate finish plan, whether subtle or contrasting.",
    intro: ["Wainscoting can define a dining room, entry, or hallway without changing the room's layout. The finish depends on more than a color choice: the panel field, profiles, cap rail, baseboard, and adjacent casings need coordinated boundaries and preparation.", "We scope repainting of existing wainscoting and finishing of completed new installations. Share photos of the whole wall and close-ups of joints and profiles. Tell us which surfaces should match, which should contrast, and whether the upper wall is part of the project."],
    scope: { heading: "Agree the paneling and surrounding surfaces", items: ["Review of panel construction and existing finish", "Defined preparation and repair allowance", "Color map for panels, rails, baseboards, and casings", "Representative color and sheen sample", "Protection of floors and adjacent wall finishes", "Compatible primer and finish selection", "Optional upper-wall repaint", "Final review at corners and doorway transitions"] },
    sections: [
      { h2: "Understand what is being finished", body: "True wood panels, sheet paneling, and applied molding over a wall are different assemblies. The materials and existing condition guide preparation. Identify loose pieces, damaged joints, or missing details before the finish stage. Carpentry and extensive restoration should be scoped separately from a repaint." },
      { h2: "Make the color boundaries explicit", body: "A single-color scheme emphasizes relief and shadow; a contrasting lower section makes the horizontal division more prominent. We discuss where the color stops at casings, corners, and openings. Marking that on a photograph prevents a design decision from becoming an assumption during application." },
      { h2: "Sample sheen as well as color", body: "Broad panels and narrow profiles reflect light differently. Approve the intended product and sheen in the room beside the floor and upper wall. If different products share a color, review the visible relationship before committing to the whole wall. The sample also provides a chance to agree how much existing texture or character should remain." },
      { h2: "Coordinate new work before finishing", body: "For newly installed paneling, confirm that the carpentry and agreed joint work are complete before the finishing schedule. For older painted work, establish the appropriate assessment and precautions before disturbance. At handoff, inspect changes in direction and doorway transitions in normal room lighting, and save the component-by-component paint record." }
    ],
    cost: { intro: "The amount of profile detail and preparation can matter as much as total wall area.", rows: [{ item: "Panel fields and rails", range: "Extent, material, and profile detail" }, { item: "Joint and surface repairs", range: "Condition-based allowance" }, { item: "Additional colors", range: "Boundary and application complexity" }, { item: "Upper walls or adjacent casings", range: "Optional coordinated scope" }], note: "Confirm whether the proposal covers existing paneling only or includes finishing completed new carpentry. Installation is a separate service scope." },
    faqs: [
      { q: "Can you paint the paneling and upper wall the same color?", a: "That can be specified. Review the products and sheen together so the relationship between flat wall areas and profiles meets your expectation." },
      { q: "Does wainscoting painting include installing it?", a: "No. Installation and carpentry need their own scope; finishing can be coordinated after the assembly is ready." },
      { q: "Can stained paneling be changed to paint?", a: "The material, condition, and existing finish require review before choosing a compatible system. Provide close-up photos and any known product history." },
      { q: "Should the cap rail match the lower or upper wall?", a: "Either can be intentional. Choose the boundary with samples and record it on the approved color plan rather than leaving it undecided." }
    ],
    planningLinks: [{ label: "Choosing wainscoting color boundaries", href: "/blog/wainscoting-paint-color-boundaries" }],
    relatedServices: ["interior-painting", "decorative-finishes"], relatedAreas: ["manhattan", "brooklyn", "queens"],
    relatedPages: ["interior-trim-painting-nyc", "trim-molding-installation-nyc", "built-in-bookcase-painting-nyc"]
  }
];
