import type { MoneyPage } from "./money-pages";
import type { Post } from "./blog";

const references = [
  { label: "Office Station: office move-out planning and responsibilities", href: "https://officestation.com/guides/lease-end-office-liquidation-timeline/" },
  { label: "Benjamin Moore: caring for freshly painted surfaces", href: "https://www.benjaminmoore.com/en-us/interior-exterior-paints-stains/how-to-advice/interiors/how-to-clean-freshly-painted-walls-and-cabinets" },
];

export const officeTurnoverMoneyPages: MoneyPage[] = [{
  slug: "office-move-out-painting-nyc",
  keyword: "office move-out painting NYC",
  icon: "building",
  title: "Office Move-Out Painting NYC | Repairs & Handover Scope",
  description: "Plan an NYC office move-out repaint after furniture removal. Define wall repairs, approved colors, access, and a documented painting handover. Request an estimate.",
  h1: "Office move-out painting in NYC",
  lede: "Close out the painting work with clear repair boundaries, an agreed finish, and a documented handover.",
  intro: [
    "An office move-out exposes surfaces that were hidden by desks, shelving, screens, and branding. A useful painting estimate separates those newly visible repairs from the repaint itself. We scope commercial interior painting around the cleared space, the approved finish, and the building's access requirements.",
    "Share the painting requirements confirmed with your landlord or property manager, a floor plan, and the removal schedule. This is a painting and agreed surface-repair scope, not a complete office decommissioning package. Furniture liquidation, IT removal, electrical work, and interpretation of lease obligations need their own responsible parties.",
  ],
  scope: { heading: "Define the painting portion of your move-out", items: [
    "Room-by-room list of included walls, ceilings, doors, and trim",
    "Condition review after furniture and mounted items are removed",
    "Agreed repairs to fixing holes and localized surface damage",
    "Approved color, sheen, and coating-system record",
    "Protection of retained flooring, glazing, and fixtures",
    "Building access and freight-elevator coordination",
    "Clearly priced options for full-wall finishes versus local touchups",
    "Final painting walkthrough and outstanding-work list",
  ] },
  sections: [
    { h2: "Price the exposed walls, not just the floor plan", body: "Office floor area helps describe the space, but partitions, meeting rooms, ceiling height, and built-in storage determine the actual painted area. Photograph the space before removal and allow a second condition review afterward. A fixing hidden behind a display or a damaged patch behind a cabinet may change the repair allowance. Confirm any additional work in writing before it begins." },
    { h2: "Agree on the finish before ordering paint", body: "Do not assume that any white paint will satisfy the agreed handover. Ask the property manager to identify the intended color and sheen, then record the chosen product and the surfaces receiving it. If an exact existing finish is unknown, discuss a sample and the proposed full-wall boundaries. Local touchups can differ from older paint in color, texture, or sheen even when a familiar color name is used." },
    { h2: "Sequence removal, repairs, painting, and inspection", body: "Plan painting after the work that could reopen holes or damage fresh finishes. Identify who removes signs, screens, brackets, or cabling, and what repairs follow. Keep a separate access window for the final walkthrough and any agreed corrections. Evening or weekend work depends on building permission and availability; a fixed handover deadline does not shorten the coating manufacturer's preparation or drying instructions." },
    { h2: "Hand over an inspectable painting scope", body: "Walk the included rooms with the written scope in hand. Record completed surfaces, any excluded items, and remaining corrections by location. Save dated photographs and the paint product, color, and sheen for the property manager. Painting completion does not establish compliance with every lease condition or guarantee a deposit outcome; those decisions sit outside the decorative work." },
  ],
  cost: { intro: "The estimate follows the cleared condition, included surfaces, and access sequence. Request optional work as separate line items.", rows: [
    { item: "Wall repairs after removals", range: "Number, size, and condition of affected areas" },
    { item: "Finish repaint", range: "Measured surfaces and approved coating system" },
    { item: "Doors, trim, and ceilings", range: "Separate included or optional components" },
    { item: "Access and phased handover", range: "Approved work windows and mobilizations" },
  ], note: "An itemized estimate requires the actual scope and building requirements. Removal services and unresolved building repairs are not assumed to be included." },
  faqs: [
    { q: "Can you quote before the office is empty?", a: "Photos and plans can establish an initial scope. Confirm any assumptions about hidden damage, then review exposed surfaces after removal before approving additional repairs." },
    { q: "Must every wall be repainted?", a: "That depends on the condition and the painting scope agreed with the property manager. We can distinguish local repairs, complete wall planes, and a broader repaint in the proposal." },
    { q: "Is furniture or IT removal included?", a: "No. Arrange those responsibilities separately and tell us when the included surfaces will be accessible. Any related repair work must be explicitly scoped." },
    { q: "Can you guarantee the landlord will accept the space?", a: "No. We document and complete the agreed painting work. Overall handover acceptance and lease or deposit decisions depend on matters outside that scope." },
  ],
  planningLinks: [{ label: "Use the office move-out painting checklist", href: "/blog/office-move-out-painting-checklist" }],
  references,
  relatedServices: ["commercial-painting", "drywall-plaster-repair"],
  relatedAreas: ["manhattan", "brooklyn", "queens"],
  relatedPages: ["office-painting-nyc", "commercial-painting-manhattan", "drywall-repair-nyc"],
}];

export const officeTurnoverPosts: Post[] = [{
  slug: "office-move-out-painting-checklist",
  title: "Office Move-Out Painting Checklist: From Removal to Handover",
  excerpt: "Plan office move-out painting around furniture removal, exposed wall repairs, approved finishes, and final inspection. Use a clear responsibility checklist.",
  category: "Cost & Planning",
  date: "2026-10-30",
  readMinutes: 4,
  author: "NYC Painting Pros Team",
  cover: { id: "photo-1497366811353-6870744d04b2", alt: "Office interior illustrating a commercial painting planning guide" },
  relatedPages: ["office-move-out-painting-nyc", "office-painting-nyc"],
  references,
  intro: [
    "An office move-out repaint can stall because the walls are still blocked, the approved color is unclear, or another contractor has not removed the wall-mounted equipment. Start with a responsibility list so painting occupies a defined place in the move rather than becoming the last unresolved task.",
    "This checklist covers the decorative work and its handoffs. Have the appropriate adviser resolve lease questions and ask the property manager to confirm the expected painting condition. Do not treat a painter's estimate as a determination of what your lease requires.",
  ],
  blocks: [
    { h2: "1. Confirm the painting brief with one decision-maker", body: ["Name the person who approves the scope, finish, and additions. Obtain the property manager's painting instructions and mark each room or wall on a plan. Separate included ceilings, doors, trim, and closets from walls-only work. Record exclusions as carefully as inclusions.", "If instructions conflict, resolve them before purchasing paint. Keep the approved version with the estimate so a late request can be identified as a change rather than an assumed inclusion."], bullets: ["Approved finish and exact included surfaces", "Who can approve repairs or changes", "Target inspection date and access contact", "Items excluded from the painting contractor's scope"] },
    { h2: "2. Assign removals before scheduling repairs", body: ["Walk the office and identify desks, cabinets, screens, signage, brackets, and equipment that block painted surfaces. Assign removal to the responsible mover or specialist. Painting should follow the work likely to leave new holes or marks.", "Office Station's move-out planning guide separates project ownership, building access, removal, and IT responsibilities. Apply that separation to your own team: the painter needs a clear surface handoff, not responsibility for tasks absent from the estimate."], table: { headings: ["Stage", "Confirm before the next stage"], rows: [["Clear the work zone", "Furniture and equipment removed by assigned handlers"], ["Review exposed walls", "Newly visible damage recorded and repairs approved"], ["Prepare and paint", "Finish, surface boundaries, and access agreed"], ["Inspect and hand over", "Corrections listed and completion record saved"]] } },
    { h2: "3. Review the walls after the office is cleared", body: ["Take room-wide photographs and close views of damage revealed by removals. Label locations so the repair estimate and walkthrough use the same references. A small anchor hole, torn surface paper, and a larger opening should not all disappear into an undefined 'patch walls' allowance.", "Decide whether the finish stops at a local touchup or continues across the whole wall. Existing paint can have aged or developed a different sheen. Ask for the proposed boundary before approving a repair-only option; a completed patch and an invisible patch are different expectations."] },
    { h2: "4. Keep the finish clear during the final move", body: ["Confirm where remaining materials and equipment will travel after painting. Do not schedule carts, packing, or cleaning against newly coated walls without discussing the selected product's handling instructions. Leave time for the agreed inspection and any corrections.", "Dry to the touch is not the same as fully cured. Benjamin Moore distinguishes these stages and advises waiting for cure before cleaning painted surfaces. Follow the actual product guidance and conditions rather than assigning one universal number of hours to every office finish."] },
    { h2: "5. Close the painting scope with a written record", body: ["Inspect each included surface against the agreed list. Record corrections by room and location, identify who will complete them, and distinguish excluded work from unfinished work. Store dated photos alongside the final product, color, sheen, and care instructions.", "The painting record supports a clear handover; it cannot guarantee the landlord's overall acceptance or resolve unrelated move-out obligations. If the inspection identifies additional work, obtain a written scope and schedule before assuming it is included."], bullets: ["Included rooms and surfaces checked", "Remaining corrections and owners recorded", "Product and finish details saved", "Care guidance passed to the next responsible person"] },
  ],
  takeaway: "Clear the office, review newly exposed damage, approve the finish, and inspect against one written painting scope. Assign every handoff before the final move.",
}];
