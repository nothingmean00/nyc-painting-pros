// ===========================================================================
// Blog content. Each post is long-form and genuinely useful (SEO + trust).
// Cover images are real, verified Unsplash photo IDs (loaded via next/image).
// ===========================================================================

export type Block = {
  h2: string;
  body: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMinutes: number;
  author: string;
  cover: { id: string; alt: string };
  intro: string[];
  blocks: Block[];
  takeaway?: string;
};

// Helper: build a sized Unsplash URL from a photo ID.
export function unsplash(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const posts: Post[] = [
  {
    slug: "how-much-does-it-cost-to-paint-an-apartment-nyc",
    title: "How Much Does It Cost to Paint an Apartment in NYC? (2026 Guide)",
    excerpt:
      "A clear, no-nonsense breakdown of NYC apartment painting costs — what drives the price, realistic ranges by apartment size, and how to avoid the quotes that look cheap but aren't.",
    category: "Cost & Planning",
    date: "2026-05-28",
    readMinutes: 7,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1562259949-e8e7689d7828", alt: "A painter rolling fresh paint onto an apartment wall" },
    intro: [
      "It's the first question every New Yorker asks, and the honest answer is: it depends. But \"it depends\" isn't helpful when you're trying to budget. So here's the real breakdown — what actually moves the number, and what you should expect to pay for a quality job in 2026.",
      "Most NYC apartment interiors land between $3 and $9 per square foot of floor area, or roughly $2,500–$9,000 for a typical one- to two-bedroom. Where you fall in that range comes down to five things.",
    ],
    blocks: [
      {
        h2: "The five things that drive your price",
        body: [
          "Two identical-looking apartments can quote thousands apart. These are the factors that explain why:",
        ],
        bullets: [
          "Surface prep — patching, sanding, and skim coating old plaster is labor, and labor is most of the bill.",
          "Ceilings and trim — painting them doubles the surfaces and the time versus walls alone.",
          "Ceiling height — pre-war 10-foot ceilings need more paint, more cutting-in, and sometimes scaffolding.",
          "Number of coats and color change — going dark-over-light or covering bold colors often needs primer plus two coats.",
          "Condition — cracked plaster, water stains, and previously papered walls all add prep time.",
        ],
      },
      {
        h2: "Realistic ranges by apartment size",
        body: [
          "These are typical NYC ranges for a quality two-coat job including standard prep. Heavy repairs or high-end finishes push higher.",
          "Studio (walls only): $1,400–$3,200. One-bedroom (walls, ceilings, trim): $2,800–$5,500. Two-bedroom full repaint: $4,500–$9,000. A single room or accent wall usually runs $550–$1,500.",
        ],
      },
      {
        h2: "Why the cheapest quote is rarely the cheapest job",
        body: [
          "A lowball quote almost always means skipped prep. The paint looks fine for a few weeks, then the patches telegraph, the lines aren't crisp, and the trim shows brush marks. You end up paying twice.",
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
      "Budget $3–$9 per square foot for a quality NYC apartment repaint, get itemized written quotes, and compare scope — not just the bottom-line number.",
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
    intro: [
      "You can't add square footage to a New York apartment, but you can make it feel like you did. Color, sheen, and a few painting tricks change how big a room reads — often more dramatically than furniture ever could.",
      "Here's what actually works in small NYC spaces, based on the rooms we paint every week.",
    ],
    blocks: [
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
    title: "How to Get Your Co-op Board to Approve Your Painting Project",
    excerpt:
      "COIs, alteration agreements, building hours — the paperwork can be more daunting than the paint. Here's exactly what NYC co-op and condo boards want, and how to sail through approval.",
    category: "NYC Living",
    date: "2026-03-22",
    readMinutes: 5,
    author: "NYC Painting Pros Team",
    cover: { id: "photo-1545324418-cc1a3fa10c00", alt: "A classic New York co-op apartment building facade" },
    intro: [
      "In a New York co-op or condo, the painting is the easy part — it's the approvals that trip people up. The good news: boards aren't trying to stop your project, they're trying to protect the building. Give them what they need and approval is usually quick.",
      "Here's the checklist that gets you a yes.",
    ],
    blocks: [
      {
        h2: "1. The Certificate of Insurance (COI)",
        body: [
          "This is non-negotiable in almost every building. Your painter must provide a COI naming the building and managing agent as additional insured, with the liability limits your building requires (often $1–2M). A professional company issues these same-day; if a contractor can't, that's a red flag.",
        ],
      },
      {
        h2: "2. Check for an alteration agreement",
        body: [
          "Most interior painting is cosmetic and doesn't trigger an alteration agreement — but some buildings require one for any contractor work. Ask your managing agent early so it doesn't delay your start date.",
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
          "Send the managing agent your painter's COI, the scope of work, and proposed dates well before you want to start. Doing it in writing creates a clean record and speeds the board's sign-off.",
        ],
      },
    ],
    takeaway:
      "A same-day COI, a written scope, and respect for building hours are 90% of board approval. Hire a painter who handles this paperwork for you and the rest is easy.",
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
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

// Newest first.
export const sortedPosts = [...posts].sort(
  (a, b) => +new Date(b.date) - +new Date(a.date)
);
