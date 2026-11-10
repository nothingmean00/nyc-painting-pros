"use client";

import { useState } from "react";
import Link from "next/link";

const surfaceOptions = ["Walls only", "Walls and ceilings", "Walls, ceilings and trim", "Not sure yet"];
const occupancyOptions = ["Occupied during the project", "Empty before move-in", "Not sure yet"];
const repairOptions = ["Small holes or scuffs", "Cracks, peeling or stains to assess", "Not sure yet"];

export function ApartmentScopePlanner() {
  const [surfaces, setSurfaces] = useState(surfaceOptions[3]);
  const [occupancy, setOccupancy] = useState(occupancyOptions[2]);
  const [repairs, setRepairs] = useState(repairOptions[2]);
  const brief = `Apartment painting scope to confirm\nSurfaces: ${surfaces}\nOccupancy: ${occupancy}\nCondition: ${repairs}\nPlease confirm rooms, dimensions, materials, building access and timing.`;
  const href = `/contact?service=interior-painting&projectBrief=${encodeURIComponent(brief)}`;

  return (
    <section id="scope-planner" aria-labelledby="scope-planner-heading" className="my-8 scroll-mt-32 rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-7">
      <p className="eyebrow">Plan before you price</p>
      <h2 id="scope-planner-heading" className="mt-3 font-display text-2xl sm:text-3xl">Build a short apartment painting brief.</h2>
      <p className="mt-3 text-[var(--color-muted)]">Choose what you know. This organizes your request; it does not calculate a price or book work.</p>
      <div className="mt-5 grid gap-4">
        {[
          { label: "Surfaces to include", value: surfaces, options: surfaceOptions, change: setSurfaces },
          { label: "Will the apartment be occupied?", value: occupancy, options: occupancyOptions, change: setOccupancy },
          { label: "Visible surface condition", value: repairs, options: repairOptions, change: setRepairs },
        ].map((field) => (
          <label key={field.label} className="grid gap-2 text-sm font-medium">
            {field.label}
            <select value={field.value} onChange={(event) => field.change(event.target.value)} className="min-h-12 w-full min-w-0 rounded-xl border border-[var(--color-line)] bg-white p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green-600)]">
              {field.options.map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-[var(--color-cream-200)]/60 p-4" aria-live="polite" aria-atomic="true">
        <p className="font-semibold">Your starting scope</p>
        <p className="mt-2 text-sm leading-relaxed">{surfaces}. {occupancy}. {repairs}.</p>
      </div>
      <p className="mt-4 text-sm text-[var(--color-muted)]">Only these selections carry over. Add room details and photos on the estimate form; review everything before sending.</p>
      <Link href={href} prefetch={false} className="btn btn-primary mt-5 w-full text-center">Use this brief in my estimate request</Link>
    </section>
  );
}
