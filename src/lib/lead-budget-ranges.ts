export const smallRoomBudget = "$550 – $1,200";
export const smallDrywallPatchBudget = "$150 – $400";

export const leadBudgetOptions = {
  small_room: {
    scope: "one small interior room with standard prep and ordinary access",
    paragraph: "As a rough budget, painting one small room typically runs " + smallRoomBudget + ". We’ll confirm the price once the scope and condition are clear.",
  },
  small_drywall_patch: {
    scope: "one small drywall hole or a few nail pops, with no water damage, ceiling work, or section replacement",
    paragraph: "As a rough budget, a small drywall patch typically runs " + smallDrywallPatchBudget + ". We’ll confirm the price once we know the size and finish needed.",
  },
} as const;
