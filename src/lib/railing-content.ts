import type { MoneyPage } from "./money-pages";
import type { Post } from "./blog";

const slug = "exterior-metal-railing-painting-nyc";
const guide = "compare-metal-railing-painting-quotes";
const references = [
  { label: "Sherwin-Williams exterior surface preparation guidance", href: "https://www.sherwin-williams.com/painting-contractors/resources/surface-preparation" },
];

export const railingPages: MoneyPage[] = [{
  slug,
  keyword: "exterior metal railing painting NYC",
  icon: "roller",
  title: "Exterior Metal Railing Painting NYC | Stoops & Entry Rails",
  description: "Request an itemized estimate for repainting sound exterior metal railings in NYC. Compare preparation, primer, finish, and access by railing section.",
  h1: "Exterior metal railing painting in NYC",
  lede: "Repaint stoop, entry, and courtyard railings with preparation and coating specified for each section.",
  intro: [
    "A railing can look intact from the sidewalk while paint is lifting beneath the handrail or rust is gathering at the post bases. We review accessible surfaces before pricing so the proposal reflects the condition of the whole assembly.",
    "Send a wide photo of each run and close views of the bases, joints, and areas where paint is failing. Tell us which entrance must remain in use and whether the building has an approved color.",
  ],
  scope: { heading: "What the railing estimate covers", items: [
    "Measured railing runs with posts, pickets, and decorative work listed",
    "Surface preparation and coating compatibility review",
    "Protection for adjacent stone, steps, and landscaping",
    "Primer and finish specified for the existing metal and exposure",
    "Access and return-to-use plan for the entrance",
  ] },
  sections: [
    { h2: "Review the metal before choosing a coating", body: "Steel, galvanized metal, and previously painted surfaces can require different preparation and primers. We look at where the finish is lifting, where rust is visible, and whether the remaining coating is sound. Loose posts, failed connections, and badly deteriorated sections need a separate repair assessment before coating." },
    { h2: "Plan around the entrance and the forecast", body: "A stoop may be the only way in and out of the building. Confirm the access plan with management before scheduling. Product instructions determine acceptable surface conditions and recoat times. Dew or rain can move the work window even when the air feels warm." },
    { h2: "Inspect the complete railing run", body: "Review the street and building sides, the underside of the top rail, the joints, and the bases against the written scope. Keep the finish and product details for future maintenance. If the project includes a gate, confirm which moving parts and hardware are included before work starts." },
  ],
  cost: { intro: "An estimate separates railing geometry, preparation, and site access.", rows: [
    { item: "Simple straight runs", range: "Length, height, and number of faces" },
    { item: "Ornamental sections", range: "Picket count, scrollwork, and tight joints" },
    { item: "Coating removal and rust preparation", range: "Condition and preparation requirements" },
    { item: "Access and protection", range: "Stoop traffic, adjoining finishes, and work windows" },
  ], note: "Final pricing follows a condition review and an agreed access plan." },
  faqs: [
    { q: "Can peeling paint be spot repaired?", a: "Sometimes. The proposal should identify whether failure is isolated and where preparation or coating needs to extend across a complete railing section." },
    { q: "Can you repaint just the front stoop railing?", a: "Share the photos and approximate lengths of both sides of the stoop so we can assess a standalone railing scope." },
    { q: "Who confirms the color?", a: "The owner or building representative confirms the finish. Share any existing specifications or required approvals before materials are ordered." },
  ],
  planningLinks: [{ label: "Compare metal railing painting quotes", href: "/blog/" + guide }],
  references,
  relatedServices: ["exterior-painting"],
  relatedAreas: ["manhattan", "brooklyn", "queens"],
  relatedPages: ["exterior-painting-nyc", "brownstone-painting-brooklyn"],
}];

export const railingPosts: Post[] = [{
  slug: guide,
  title: "How to Compare Exterior Metal Railing Painting Quotes",
  excerpt: "Use photos, preparation details, and an access plan to compare quotes for repainting a NYC stoop or entry railing.",
  category: "Cost & Planning",
  date: "2026-11-09",
  readMinutes: 3,
  author: "NYC Painting Pros Team",
  cover: { id: "photo-1560518883-ce09059eeffa", alt: "Residential exterior illustrating an exterior maintenance guide" },
  relatedPages: [slug, "exterior-painting-nyc"],
  references,
  intro: [
    "Two quotes for the same stoop can describe very different work. One may include both sides of the rail and each picket while another assumes a quick coat on the visible faces. Send each bidder the same photo set and ask for a written description of how they will prepare, protect, and finish the railing.",
  ],
  blocks: [
    { h2: "Give every bidder the same railing inventory", body: ["Label each run by location, such as street-left stair rail, landing guard, and courtyard gate. Add an approximate length and one wide photo per run. Take close views of the underside of the top rail and the points where posts meet stone or concrete. Include the far face if it is accessible."], bullets: ["Identify which rails and gates are included", "Show decorative work and hard-to-reach faces", "Flag loose posts or visibly deteriorated sections for separate assessment"] },
    { h2: "Compare preparation before coat counts", body: ["Ask what happens to loose paint and corrosion, how the surrounding stone will be protected, and where primer is included. A quote that specifies two finish coats can still leave these items open. Sherwin-Williams' preparation guidance distinguishes metal substrates and calls for a sound, dry surface. Ask the bidder to name the proposed system and explain how they will check compatibility with the old finish."] },
    { h2: "Write down how residents will get in and out", body: ["Tell bidders which door residents use, when deliveries arrive, and who can approve a temporary change in access. Ask what weather or surface conditions would postpone the work, and when handrails can be used again. Make sure the proposal includes protection removal and cleanup."], table: { headings: ["Ask about", "Record in the quote"], rows: [["Railing coverage", "Included runs, faces, posts, and gates"], ["Preparation", "Loose coating, corrosion, and adjacent stone protection"], ["Coating", "Primer and finish products, color, and sheen"], ["Handoff", "Entry access, weather rescheduling, and final inspection"]] } },
    { h2: "Walk both sides before closing out", body: ["Compare the completed work with the original inventory. Inspect the underside and the courtyard side from safe, accessible positions. Record any correction by railing run and keep the product and color details with the building's maintenance records."] },
  ],
  takeaway: "Compare the same railing runs, preparation, coating system, and access plan across bids.",
}];
