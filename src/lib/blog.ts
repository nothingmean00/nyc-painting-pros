import { officeTurnoverPosts } from "./office-turnover-content";
// ===========================================================================
// Blog content. Each post is long-form and genuinely useful (SEO + trust).
// Cover images are real, verified Unsplash photo IDs (loaded via next/image).
// ===========================================================================

import { expansionPosts } from "./expansion-posts";
import { roomPosts } from "./room-posts";
import { woodworkPosts } from "./woodwork-posts";
import { decorativePosts } from "./decorative-posts";
import { projectPosts } from "./project-posts";
import { repairPosts } from "./repair-posts";
import { finishGuides } from "./finish-guides";
import { planningGuides } from "./planning-guides";

export type Block = {
  h2: string;
  body: string[];
  bullets?: string[];
  table?: { headings: string[]; rows: string[][] };
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  updated?: string;
  readMinutes: number;
  author: string;
  cover: { id: string; alt: string };
  references?: { label: string; href: string }[];
  relatedPages?: string[];
  intro: string[];
  blocks: Block[];
  takeaway?: string;
};

// Helper: build a sized Unsplash URL from a photo ID.
export function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const posts: Post[] = [
  ...officeTurnoverPosts,
  ...expansionPosts,
  ...roomPosts,
  ...woodworkPosts,
  ...decorativePosts,
  ...projectPosts,
  ...repairPosts,
  ...finishGuides,
  ...planningGuides,
  {
    slug: "how-much-does-it-cost-to-paint-an-apartment-nyc",
    title: "How Much Does It Cost to Paint an Apartment in NYC? (2026 Guide)",
    excerpt:
      "A clear, no-nonsense breakdown of NYC apartment painting costs — what drives the price, realistic ranges by apartment size, and how to avoid the quotes that look cheap but aren't.",
    category: "Cost & Planning",
    date: "2026-05-28",
    updated: "2026-10-30",
    readMinutes: 7,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1562259949-e8e7689d7828", alt: "A painter rolling fresh paint onto an apartment wall" },
    relatedPages: ["apartment-painting-nyc", "single-room-accent-wall-painting-nyc"],
    intro: [
      "It's the first question every New Yorker asks, and the honest answer is: it depends. But \"it depends\" isn't helpful when you're trying to budget. So here's the real breakdown — what actually moves the number, and what you should expect to pay for a quality job in 2026.",
      "For early planning, this guide uses a broad allowance of $3–$9 per square foot of floor area. These editorial budgeting ranges are not a market survey or a binding quote. A walls-only refresh and a full repaint with ceilings, trim, and repairs are different scopes; compare the included work before comparing totals.",
    ],
    blocks: [
      {
        h2: "The five things that drive your price",
        body: [
          "Two identical-looking apartments can quote thousands apart. These are the factors that explain why:",
        ],
        bullets: [
          "Surface prep — patching, sanding, and skim coating old plaster is labor, and labor is most of the bill.",
          "Ceilings and trim — each adds surface preparation and application work beyond walls alone; the amount depends on the room and trim detail.",
          "Ceiling height — pre-war 10-foot ceilings need more paint, more cutting-in, and sometimes scaffolding.",
          "Number of coats and color change — going dark-over-light or covering bold colors often needs primer plus two coats.",
          "Condition — cracked plaster, water stains, and previously papered walls all add prep time.",
        ],
      },
      {
        h2: "Realistic ranges by apartment size",
        body: [
          "Use these existing planning allowances to start a scope conversation, not to judge a quote on apartment size alone. The scopes below differ, so their prices are not directly comparable. Confirm materials, protection, repair allowances, coats, taxes, and exclusions in the written estimate.",
        ],
        table: {
          headings: ["Project", "Planning allowance", "Scope to confirm"],
          rows: [
            ["Studio", "$1,400–$3,200", "Walls only; ask about closets and ceilings"],
            ["One-bedroom", "$2,800–$5,500", "Walls, ceilings, and trim; identify doors separately"],
            ["Two-bedroom", "$4,500–$9,000", "Full repaint; list every room and included surface"],
            ["Single room or accent wall", "$550–$1,500", "Minimum visit, repairs, and number of colors"],
          ],
        },
      },
      {
        h2: "Floor area is not paintable wall area",
        body: ["An 800-square-foot apartment describes its floor footprint, not the area of its walls and ceilings. A floor-area allowance of $3–$9 produces a broad $2,400–$7,200 planning envelope; it is arithmetic, not a quote for your apartment. Ceiling height, partitions, trim, and surface condition still determine the work.", "Ask whether a per-square-foot quote uses floor area or measured painted surface area. Do not compare the two rates directly. For a reliable comparison, ask each painter to price the same room-by-room list."],
      },
      {
        h2: "Compare estimates with the same checklist",
        body: ["A useful estimate lets you see what changes when you add a ceiling, remove a room, or choose more extensive repairs. Ask for optional work separately rather than accepting an undefined all-in scope."],
        bullets: ["Surfaces: walls, ceilings, doors, trim, closets, and radiators listed as included or excluded.", "Preparation: nail holes, cracks, stains, adhesive removal, and skim coating described separately.", "Finish system: paint line, sheen, primer where needed, color changes, and coat schedule.", "Logistics: furniture moving, floor protection, daily cleanup, access hours, and occupied-room sequencing.", "Commercial terms: materials, tax treatment, payment milestones, change approvals, and written warranty exclusions."],
      },
      {
        h2: "What a lower quote may leave out",
        body: [
          "A lower quote may reflect a smaller scope, different materials, simpler logistics, or lower overhead. Price alone cannot tell you the quality. Ask what preparation and finish standard are included, and how unexpected repairs will be priced and approved.",
          "When you compare quotes, make sure they specify the same scope: how many coats, whether trim and ceilings are included, what prep is covered, and what paint line. A $4 and a $7 per-square-foot quote are often quoting two completely different jobs.",
        ],
      },
      {
        h2: "How to get an accurate number for your apartment",
        body: [
          "The fastest way is a few clear photos of each room plus rough dimensions — most reputable painters can give a tight ballpark from that, then confirm with a short walkthrough. Insist on a written, itemized estimate so you can see exactly what's included and adjust scope if you want to save.",
        ],
      },
    ],
    takeaway:
      "Use a broad allowance to plan, then request an itemized estimate for your actual rooms, surfaces, repairs, and building access. Agree on additions in writing before work begins.",
  },

  {
    slug: "paint-colors-small-nyc-apartment-feel-bigger",
    title: "Paint Colors That Make a Small NYC Apartment Feel Bigger",
    excerpt:
      "Color is the cheapest square footage you'll ever buy. Here's how to use paint to make a tight New York apartment feel open, bright, and a whole lot larger.",
    category: "Color & Design",
    date: "2026-05-12",
    readMinutes: 6,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1493809842364-78817add7ffb", alt: "A bright, airy living room with light-colored walls" },
    relatedPages: ["apartment-painting-nyc", "single-room-accent-wall-painting-nyc"],
    references: [{ label: "Benjamin Moore: how to use paint color samples", href: "https://www.benjaminmoore.com/en-us/interior-exterior-paints-stains/how-to-advice/painting-101/choosing-paint-samples" }],
    intro: [
      "You can't add square footage to a New York apartment, but you can make it feel like you did. Color, sheen, and a few painting tricks change how big a room reads — often more dramatically than furniture ever could.",
      "Here's what actually works in small NYC spaces, based on the rooms we paint every week.",
    ],
    blocks: [
      {
        h2: "Test the color before expanding the painting scope",
        body: [
          "Start with a short list of colors and view movable samples beside your flooring, sofa, and trim in daylight and under the lamps you actually use. Move each sample between the brightest and darkest walls. A color that works near a window may look quite different at the back of a narrow room.",
          "Once you choose a direction, decide which surfaces need changing. Matching the trim to the walls adds trim preparation and a separate finish choice; continuing the color onto the ceiling adds another surface. Request those options separately so you can compare a single-room refresh with a broader apartment repaint. Confirm the final paint product and sheen as well as the color name.",
        ],
      },
      {
        h2: "Go light, but go warm",
        body: [
          "Light colors reflect more light and push walls back visually. But stark white can feel cold and clinical in a small space, especially with NYC's north-facing windows. Warm whites and soft greiges keep things bright while feeling like a home, not a gallery.",
          "Try warm whites like Benjamin Moore White Dove or a soft greige like Edgecomb Gray — they read clean without going sterile.",
        ],
      },
      {
        h2: "Paint the trim and walls the same color",
        body: [
          "In a small room, contrasting trim chops the walls into segments and makes them feel smaller. Painting trim, walls, and even doors the same color (in different sheens) removes those visual breaks so the room reads as one continuous, larger space.",
        ],
      },
      {
        h2: "Take the wall color to the ceiling",
        body: [
          "A bright white ceiling over colored walls draws a hard line that lowers the room. Continuing a light wall color up onto the ceiling — or using a color just a shade or two lighter — blurs that edge and makes ceilings feel higher.",
        ],
      },
      {
        h2: "Use sheen strategically",
        body: [
          "Sheen bounces light. In darker apartments, an eggshell or low-sheen satin on walls reflects more daylight than a dead-flat matte, which can make a room feel brighter without changing the color at all.",
        ],
        bullets: [
          "North-facing/dark rooms: warm whites + eggshell sheen",
          "Long narrow rooms: paint the far short wall a half-shade deeper to 'pull' it closer",
          "Low ceilings: same color walls-to-ceiling, lighter sheen up top",
        ],
      },
    ],
    takeaway:
      "Warm light colors, trim that matches the walls, and color carried up to the ceiling will make almost any small NYC apartment feel noticeably larger.",
  },

  {
    slug: "prep-steps-professional-paint-job",
    title: "The 7 Prep Steps That Separate a Pro Paint Job From a DIY One",
    excerpt:
      "Anyone can roll paint on a wall. The difference between a finish that lasts ten years and one that fails in one is almost entirely in the prep. Here are the seven steps the pros never skip.",
    category: "How-To",
    date: "2026-04-30",
    readMinutes: 8,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1513161455079-7dc1de15ef3e", alt: "Paint rollers, brushes and prep tools laid out" },
    intro: [
      "Here's the industry secret: painting is maybe 20% of a great paint job. The other 80% is preparation — the unglamorous work that no one sees but everyone feels when the finish lasts for years and the lines are razor-sharp.",
      "Whether you're hiring a pro or tackling a room yourself, these are the seven steps that actually determine the result.",
    ],
    blocks: [
      {
        h2: "1. Clear and protect the room",
        body: [
          "Everything gets moved or covered. Floors are masked, fixtures are taped, and furniture is sealed. Skipping this is how you end up with speckled floors and a ruined sofa.",
        ],
      },
      {
        h2: "2. Clean the surfaces",
        body: [
          "Paint doesn't bond to grease, dust, or smoke film — common on kitchen walls and in older NYC apartments. A proper wash (and degrease in kitchens) is what keeps the new coat from peeling later.",
        ],
      },
      {
        h2: "3. Repair, patch, and fill",
        body: [
          "Nail holes, cracks, dents, and gaps all get filled and, in older buildings, plaster cracks get stabilized so they don't reappear. This is where pre-war apartments eat the most labor.",
        ],
      },
      {
        h2: "4. Sand everything smooth",
        body: [
          "Patches get sanded flush, glossy surfaces get scuffed so paint can grip, and ridges from previous jobs get knocked down. Your hand should glide across the wall before any paint goes on.",
        ],
      },
      {
        h2: "5. Prime where it matters",
        body: [
          "Bare patches, stains, and big color changes all need primer. Stain-blocking primer over water marks is the only thing that stops them bleeding through your finish coat months later.",
        ],
      },
      {
        h2: "6. Caulk the gaps",
        body: [
          "A bead of caulk where trim meets wall is the difference between 'painted' and 'finished.' It's the detail that makes trim look custom rather than tired.",
        ],
      },
      {
        h2: "7. Cut in clean, then roll",
        body: [
          "Only now does paint happen — sharp brushed edges at ceilings, corners, and trim, followed by even rolling that keeps a wet edge for a consistent finish. Two coats, not one.",
        ],
      },
    ],
    takeaway:
      "If a quote or a weekend plan doesn't account for steps 1–6, the paint is the easy part — and the result won't last. Prep is the whole game.",
  },

  {
    slug: "repaint-or-refinish-kitchen-cabinets-nyc",
    title: "Repaint or Replace? The Smart Way to Update Kitchen Cabinets in NYC",
    excerpt:
      "New cabinets can cost $30k and weeks of demolition. Refinishing — done right — gets you a factory-smooth look for a fraction of the price. Here's how to decide.",
    category: "Kitchens",
    date: "2026-04-15",
    readMinutes: 6,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1556909114-44e3e70034e2", alt: "A bright, freshly finished modern kitchen" },
    intro: [
      "Your kitchen looks dated, but the boxes are solid and the layout works. Do you rip it all out, or refinish what you have? For most NYC kitchens, refinishing is the smarter spend — if it's done with the right process.",
      "Here's how to tell which path is right for your kitchen, and what separates a refinish that lasts from one that peels.",
    ],
    blocks: [
      {
        h2: "When refinishing is the obvious win",
        body: [
          "If your cabinet boxes are structurally sound and you're mainly unhappy with the color or finish, refinishing delivers a near-new look for roughly 30–50% of replacement cost — without tearing your kitchen apart for weeks.",
        ],
        bullets: [
          "Solid wood or quality plywood boxes in good shape",
          "Layout you're happy with",
          "Dated color or worn, yellowed finish",
          "Want minimal downtime (about a week vs. weeks)",
        ],
      },
      {
        h2: "When replacement makes more sense",
        body: [
          "If the boxes are water-damaged, falling apart, or you want a completely different layout or more storage, replacement is the right call. Refinishing can't fix a bad layout or rotted particleboard.",
        ],
      },
      {
        h2: "Why process is everything with cabinets",
        body: [
          "Cabinets get touched, scrubbed, and splashed constantly, so a brushed-on wall paint will chip within months. A proper refinish means degreasing, sanding, a bonding primer, and a sprayed catalyzed (conversion) topcoat — the same category of finish factories use. That's what makes it cure rock-hard and resist chipping.",
        ],
      },
      {
        h2: "What it costs in NYC",
        body: [
          "A standard NYC kitchen (15–30 doors) typically runs $5,000–$7,500 to refinish, versus $20,000–$40,000+ to replace. Smaller kitchens start around $3,500; large or two-tone kitchens run higher.",
        ],
      },
    ],
    takeaway:
      "If your boxes are sound and your layout works, a sprayed, catalyzed refinish gets you a showroom look for a fraction of replacement — just never let anyone brush-and-roll your cabinets.",
  },

  {
    slug: "get-coop-board-approve-painting-project",
    title: "NYC Co-op Painting Approval: COI & Paperwork Checklist",
    excerpt:
      "Prepare your NYC co-op painting request: building rules, insurance documents, scope, work hours, and elevator access. Confirm approval before booking a start.",
    category: "NYC Living",
    date: "2026-03-22",
    updated: "2026-10-30",
    relatedPages: ["co-op-condo-painting-nyc"],
    references: [{ label: "FirstService Residential: decoration and alteration procedures (page 4)", href: "https://learn.fsresidential.com/hubfs/Media/New%20York/First%20Edition/2024%20Q2%20First%20Edition.pdf" }],
    readMinutes: 5,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1545324418-cc1a3fa10c00", alt: "A classic New York co-op apartment building facade" },
    intro: [
      "Painting approval depends on your building and the proposed work. Ask management which decoration or alteration process applies before booking. A cosmetic repaint can still require paperwork; neither a quote nor an insurance certificate is permission to start.",
      "Use this checklist to prepare a complete request and identify what is still waiting on review. It does not guarantee approval or a particular turnaround time.",
    ],
    blocks: [
      {
        h2: "Your painting approval packet at a glance",
        body: ["Use one project description across the estimate, building submission, and contractor schedule. These are practical items to confirm with your own managing agent."],
        bullets: [
          "Scope: rooms, surfaces, preparation, and any repairs, with exclusions written down.",
          "Documents: the required building form and the current insurance instructions for your contractor to review.",
          "Access: permitted hours, elevator booking, shared-area protection, and the on-site contact.",
          "Status: submitted, changes requested, or accepted in writing; record any conditions before confirming the start.",
        ],
      },
      {
        h2: "1. The Certificate of Insurance (COI)",
        body: [
          "Ask management for its current insurance requirements, including limits, certificate-holder details, and additional-insured wording. Share them with the contractor before agreeing on dates. Issuance and building review take time; a same-day certificate is not a substitute for confirming that the documentation meets the building's requirements.",
        ],
      },
      {
        h2: "2. Check for an alteration agreement",
        body: [
          "Ask which form applies to your exact scope: a decoration or minor-work agreement, an alteration agreement, or another written notification. FirstService Residential describes separate procedures for decorative and alteration work; your own building documents determine the process. Include planned repairs as well as painting when asking management.",
        ],
      },
      {
        h2: "3. Confirm building work hours",
        body: [
          "Buildings restrict when contractor work can happen — typically weekday daytime hours. Your painter should schedule crews to those windows and reserve the freight elevator with the super in advance.",
        ],
      },
      {
        h2: "4. Submit early and in writing",
        body: [
          "Send the managing agent your painter's COI, the scope of work, and proposed dates well before you want to start. Keep the response with the estimate and ask who confirms acceptance, what remains missing, and when the request will next be reviewed.",
        ],
      },
    ],
    takeaway:
      "Obtain the building's requirements early, submit the proposed scope and insurance documentation, and confirm approval and permitted hours before scheduling work.",
  },

  {
    slug: "matte-eggshell-satin-paint-finish-guide",
    title: "Matte, Eggshell, or Satin? The Right Paint Finish for Every Room",
    excerpt:
      "The color gets all the attention, but the sheen decides how a room looks and how well it survives daily life. Here's a simple room-by-room guide to choosing the right finish.",
    category: "How-To",
    date: "2026-03-05",
    readMinutes: 5,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1589939705384-5185137a7f0f", alt: "Open paint cans showing different colors and sheens" },
    intro: [
      "Pick the wrong sheen and even a perfect color can look flat, show every flaw, or wear out fast. Sheen controls light reflection, durability, and how easy a wall is to clean — so it deserves as much thought as the color itself.",
      "Here's how to choose, room by room.",
    ],
    blocks: [
      {
        h2: "Flat & matte: ceilings and low-traffic walls",
        body: [
          "Matte hides imperfections best because it reflects the least light — ideal for ceilings and for living rooms or bedrooms with older, less-than-perfect walls. The trade-off is that it's harder to scrub, so keep it away from high-touch areas.",
        ],
      },
      {
        h2: "Eggshell: the everyday all-rounder",
        body: [
          "Eggshell has a soft, low glow, hides minor flaws reasonably well, and cleans up far better than matte. It's the default for most NYC living rooms, bedrooms, and hallways for good reason.",
        ],
      },
      {
        h2: "Satin: kitchens, baths, and busy spaces",
        body: [
          "Satin's slightly higher sheen stands up to moisture and scrubbing, making it the right pick for kitchens, bathrooms, kids' rooms, and high-traffic hallways. It shows wall imperfections a bit more, so prep matters.",
        ],
      },
      {
        h2: "Semi-gloss & gloss: trim, doors, and cabinets",
        body: [
          "Trim, doors, and cabinetry take abuse and get touched constantly, so they need a durable, wipeable finish. Semi-gloss is the classic choice — it's tough, cleans easily, and gives crisp definition against eggshell walls.",
        ],
        bullets: [
          "Ceilings: flat",
          "Bedrooms & living rooms: eggshell (or matte if walls are flawless)",
          "Kitchens, baths, hallways: satin",
          "Trim, doors, cabinets: semi-gloss",
        ],
      },
    ],
    takeaway:
      "Match sheen to the room's traffic and moisture: flat up high, eggshell for living spaces, satin where it gets wet or busy, semi-gloss on trim. It's the easiest upgrade most people overlook.",
  },

  {
    slug: "upper-east-side-apartment-painting-checklist",
    title: "Upper East Side Apartment Painting Checklist: COIs, Prep, and Timing",
    excerpt:
      "Painting an Upper East Side apartment is part finish work and part building coordination. Use this checklist to avoid board delays, elevator issues, and rushed prep.",
    category: "NYC Living",
    date: "2026-06-23",
    readMinutes: 7,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1484154218962-a197022b5858", alt: "A refined apartment living room with bright painted walls" },
    relatedPages: ["upper-east-side-apartment-painters", "co-op-condo-painting-nyc", "pre-war-apartment-painting-nyc"],
    intro: [
      "The fastest way to delay an Upper East Side repaint is to treat it like a simple wall-color change. In many co-op and condo buildings, the approval path matters as much as the paint itself.",
      "Before the crew arrives, you want five things settled: insurance, access, work hours, surface condition, and room sequencing. This checklist keeps the project moving cleanly.",
    ],
    blocks: [
      {
        h2: "1. Ask the managing agent for exact COI wording",
        body: [
          "Do not guess at the Certificate of Insurance language. Ask the managing agent for the building name, ownership entity, additional insured wording, liability limits, and email address for submission.",
          "A professional painter should be able to issue the COI quickly once those details are clear.",
        ],
      },
      {
        h2: "2. Reserve elevator and service access early",
        body: [
          "Even a small apartment repaint involves drop cloths, ladders, tools, paint, and debris removal. Buildings may require freight elevator reservations or service entrance use, especially in doorman buildings.",
        ],
        bullets: [
          "Confirm allowed contractor hours",
          "Reserve elevator windows before the start date",
          "Ask whether lobby and hallway protection is required",
        ],
      },
      {
        h2: "3. Decide whether plaster repair belongs in the main scope",
        body: [
          "Pre-war Upper East Side walls often have hairline cracks, old patch ridges, and previous water marks. If those repairs are not included in the estimate, the final finish will only look as good as the old wall underneath.",
        ],
      },
      {
        h2: "4. Sequence rooms for real life",
        body: [
          "If you are living in the apartment during the repaint, work room by room. Keep a bedroom, kitchen path, and bathroom path usable whenever possible, and move belongings before the crew arrives so labor goes into painting instead of sorting.",
        ],
      },
    ],
    takeaway:
      "For Upper East Side apartment painting, get COI wording first, reserve access early, and put plaster prep in writing before comparing quotes.",
  },

  {
    slug: "tribeca-loft-painting-guide",
    title: "Tribeca Loft Painting Guide: High Ceilings, Brick, and Gallery Walls",
    excerpt:
      "Loft painting is unforgiving: tall walls, strong light, brick edges, and long sightlines reveal every shortcut. Here is what to plan before repainting a Tribeca loft.",
    category: "Lofts",
    date: "2026-06-20",
    readMinutes: 7,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1518005020951-eccb494ad742", alt: "A spacious loft interior with high ceilings and large windows" },
    relatedPages: ["tribeca-loft-painting", "skim-coating-nyc", "interior-painting-manhattan"],
    intro: [
      "A Tribeca loft gives paint nowhere to hide. Natural light travels across long walls, ceiling heights amplify small mistakes, and exposed brick or steel makes the transitions more visible.",
      "That does not mean loft painting has to be complicated. It means the prep, access plan, and sheen choice need to be decided before the first coat goes up.",
    ],
    blocks: [
      {
        h2: "Start with the light, not the color chip",
        body: [
          "Oversized windows can make a color look cooler, brighter, or flatter than it did in the store. Test large samples on multiple walls and look at them in morning, afternoon, and evening light.",
        ],
      },
      {
        h2: "Long walls need better patch blending",
        body: [
          "Patch halos show up fast on broad loft walls. Repairs should be feathered wider than the visible damage, sanded smooth, and primed before finish paint so the sheen stays even.",
        ],
        bullets: [
          "Prime repaired areas before painting",
          "Avoid high sheen on imperfect long walls",
          "Paint full wall planes instead of spot-touching visible areas",
        ],
      },
      {
        h2: "Protect brick and raw materials before sanding",
        body: [
          "Exposed brick, stone, steel, and glass are usually the reason the loft feels special. They need protection before sanding or rolling begins, because dust and paint specks are difficult to remove from textured surfaces.",
        ],
      },
      {
        h2: "Plan access for high ceilings",
        body: [
          "High ceilings can require tall ladders, scaffold, or lift access. That affects schedule, cost, and building approval, so it belongs in the original estimate instead of becoming a day-one surprise.",
        ],
      },
    ],
    takeaway:
      "A great loft repaint comes down to light testing, wide patch blending, careful protection around brick, and a clear high-ceiling access plan.",
  },

  {
    slug: "park-slope-brownstone-painting-plan",
    title: "A Practical Painting Plan for Park Slope Brownstones",
    excerpt:
      "Brownstones need a different painting plan than apartments. Learn how to phase parlor floors, stair halls, plaster, trim, and exterior details without turning the whole house upside down.",
    category: "Brownstones",
    date: "2026-06-18",
    readMinutes: 8,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1522708323590-d24dbb6b0267", alt: "A historic home interior with bright walls and wood floors" },
    relatedPages: ["park-slope-brownstone-painters", "brownstone-painting-brooklyn", "trim-molding-installation-nyc"],
    intro: [
      "Painting a Park Slope brownstone all at once can be disruptive. Painting it without a plan can be worse: crews repeat setup, stair halls stay half-finished, and plaster repairs get separated from the finish work.",
      "A better plan phases the house by use, access, and surface type. The goal is to make progress without taking over every room at the same time.",
    ],
    blocks: [
      {
        h2: "Phase by how the house is used",
        body: [
          "Start with the rooms that affect daily life most: bedrooms, kitchen-adjacent areas, and primary living spaces. Save lower-priority guest rooms or storage areas for a later phase if budget or schedule is tight.",
        ],
      },
      {
        h2: "Do stair halls as their own project",
        body: [
          "Stair halls are access-heavy and detail-heavy. Railings, spindles, landings, tall walls, and traffic all make them slower than a normal room. Treating the stair as its own phase keeps the rest of the project cleaner.",
        ],
      },
      {
        h2: "Bundle plaster and trim prep before finish coats",
        body: [
          "Brownstone walls and trim usually need more than paint. Crack repair, skim coating, caulking, nail-hole filling, and sanding should happen together so the finish coat goes over a consistent surface.",
        ],
        bullets: [
          "Repair plaster cracks before color decisions are final",
          "Caulk trim seams after sanding and before finish paint",
          "Prime patched plaster so it does not flash through",
        ],
      },
      {
        h2: "Do exterior details when weather cooperates",
        body: [
          "Front doors, railings, and facade details need dry weather and the right temperatures. If exterior painting is part of the plan, build in weather flexibility instead of forcing a coating on a bad day.",
        ],
      },
    ],
    takeaway:
      "For a Park Slope brownstone, phase the work by daily use, separate stair halls, complete plaster and trim prep before finish coats, and schedule exterior details around weather.",
  },

  {
    slug: "paint-before-moving-into-long-island-city-condo",
    title: "Should You Paint Before Moving Into a Long Island City Condo?",
    excerpt:
      "In most LIC condos, painting before furniture arrives saves time, money, and stress. Here is how to line up COIs, elevator access, color choices, and final touchups.",
    category: "Move-In Planning",
    date: "2026-06-15",
    readMinutes: 6,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1505693416388-ac5ce068fe85", alt: "A modern condo bedroom with clean painted walls" },
    relatedPages: ["long-island-city-condo-painting", "apartment-painting-nyc", "co-op-condo-painting-nyc"],
    intro: [
      "If you can paint before moving into a Long Island City condo, do it. Empty rooms are faster to protect, easier to patch, and cheaper to paint than rooms full of furniture and boxes.",
      "The only catch is coordination. You need the painter, building, elevator schedule, and move-in date to line up in the right order.",
    ],
    blocks: [
      {
        h2: "Why empty-unit painting is more efficient",
        body: [
          "With no furniture in the way, crews can cover floors once, move cleanly, and paint full wall planes without breaking the work into tiny sections. That usually reduces labor and shortens the schedule.",
        ],
      },
      {
        h2: "Get building approval before your closing or lease start if possible",
        body: [
          "Many LIC condo buildings require a COI and elevator reservation before contractor work. Ask for those requirements as soon as you have access dates, not after you pick colors.",
        ],
      },
      {
        h2: "Patch now, not after the furniture is in",
        body: [
          "Pre-move painting is the best time to fix TV mount holes, old art holes, settlement cracks, and scuffed corners. Once furniture arrives, those repairs take longer and create more dust control work.",
        ],
        bullets: [
          "Patch holes from prior owners or tenants",
          "Repair nail pops before finish paint",
          "Paint closets before they are filled",
        ],
      },
      {
        h2: "Hold one touchup visit if movers are coming next",
        body: [
          "Movers can scuff corners and door frames even when they are careful. For larger move-in projects, plan a small touchup window after furniture delivery so the final walkthrough happens when the home is actually set up.",
        ],
      },
    ],
    takeaway:
      "Painting an LIC condo before move-in is usually faster and cleaner; just secure the COI, elevator access, color approvals, and a post-move touchup plan early.",
  },

  {
    slug: "williamsburg-office-painting-without-downtime",
    title: "How to Paint a Williamsburg Office Without Shutting Down Work",
    excerpt:
      "A fresh office should not cost a week of productivity. Here is how to phase rooms, schedule after-hours work, choose low-odor coatings, and protect equipment.",
    category: "Commercial",
    date: "2026-06-12",
    readMinutes: 6,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1497366811353-6870744d04b2", alt: "A modern creative office with desks and clean painted walls" },
    relatedPages: ["williamsburg-office-painting", "office-painting-nyc", "commercial-painting-manhattan"],
    intro: [
      "Office painting gets expensive when it interrupts the workday. For Williamsburg studios, agencies, showrooms, and retail offices, the right plan is usually phased, after-hours, and low-odor.",
      "The goal is simple: make the space look sharper without leaving staff, clients, or inventory in the middle of a construction zone.",
    ],
    blocks: [
      {
        h2: "Break the office into paintable zones",
        body: [
          "Conference rooms, phone rooms, entry walls, open desk areas, and back-of-house spaces should be scheduled separately. A zone plan lets the business keep operating while one area is protected and painted.",
        ],
      },
      {
        h2: "Use nights and weekends for client-facing spaces",
        body: [
          "Reception areas, showrooms, and meeting rooms are often best handled after hours. That gives paint time to dry before people return and keeps the most visible parts of the office from looking unfinished during the day.",
        ],
      },
      {
        h2: "Choose coatings for smell and durability",
        body: [
          "Low-VOC coatings reduce odor, but offices also need scrub resistance. Hallways, kitchen areas, and high-touch walls should get durable commercial finishes that can handle scuffs and cleaning.",
        ],
        bullets: [
          "Low-odor paint for occupied offices",
          "Washable finishes in high-traffic zones",
          "Brand-color drawdowns before accent walls are painted",
        ],
      },
      {
        h2: "Protect equipment before dust starts",
        body: [
          "Computers, displays, inventory, samples, and production gear should be covered or moved before sanding and patching. The protection plan is as important as the paint schedule.",
        ],
      },
    ],
    takeaway:
      "To repaint a Williamsburg office without downtime, zone the work, schedule visible areas after hours, use low-odor durable coatings, and protect equipment before prep begins.",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

// Newest first.
export const sortedPosts = [...posts].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);
