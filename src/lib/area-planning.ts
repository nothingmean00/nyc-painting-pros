export const areaPlanning: Record<string, {
  title: string;
  description: string;
  projects: string[];
  scenarios: { title: string; body: string; href: string; label: string }[];
}> = {
  brooklyn: {
    title: "Brooklyn Painters | Apartments, Brownstones & Interiors",
    description: "Plan painting in Brooklyn: compare apartment, brownstone and cabinet scopes, access needs and preparation. Request an itemized project estimate.",
    projects: ["interior-painting-brooklyn", "brownstone-painting-brooklyn", "park-slope-brownstone-painters", "apartment-painting-nyc", "kitchen-cabinet-painting-nyc", "williamsburg-office-painting"],
    scenarios: [
      { title: "Brownstone rooms and original detail", body: "List the walls separately from casings, stair details and built-ins. Photograph cracks or old coatings before deciding which preparation belongs in the estimate.", href: "/painting/brownstone-painting-brooklyn", label: "Compare a Brooklyn brownstone scope" },
      { title: "An occupied apartment or loft", body: "Identify where furniture can move, the ceiling height and which rooms must remain usable. Confirm access and the handoff sequence before agreeing on dates.", href: "/painting/apartment-painting-nyc", label: "Plan an apartment repaint" },
      { title: "A kitchen finish update", body: "Count doors and drawer fronts, identify exposed sides and flag damaged panels. Keep cabinet interiors and hardware changes explicit in the quote.", href: "/painting/kitchen-cabinet-painting-nyc", label: "Check cabinet painting options" },
    ],
  },
  queens: {
    title: "Queens Painters | Apartments, Condos & Home Interiors",
    description: "Compare painting scopes in Queens for apartments, condos and home interiors. Plan preparation, building access and written estimates around your project.",
    projects: ["long-island-city-condo-painting", "apartment-painting-nyc", "co-op-condo-painting-nyc", "kitchen-cabinet-painting-nyc", "move-in-apartment-painting-nyc", "single-room-accent-wall-painting-nyc"],
    scenarios: [
      { title: "Condo or co-op repaint", body: "Get the building’s current work rules and insurance requirements. Confirm the scope and access approval before treating a preferred date as a booked start.", href: "/painting/co-op-condo-painting-nyc", label: "Prepare a building approval packet" },
      { title: "A home or apartment before moving in", body: "Separate the painting completion date from product-specific handling and cure milestones. Coordinate movers, floor work and furniture placement around the agreed sequence.", href: "/painting/move-in-apartment-painting-nyc", label: "Plan painting before move-in" },
      { title: "One room or a larger repaint", body: "Name the rooms and decide whether ceilings, trim and doors belong in the same scope. A smaller option makes comparison useful when the whole home does not need work.", href: "/painting/single-room-accent-wall-painting-nyc", label: "Compare a smaller painting scope" },
    ],
  },
};
