"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icons";

type Project = { slug: string; title: string; description: string; keyword: string; icon: IconName };
type Group = { title: string; projects: Project[] };

const mainSlugs = [
  "apartment-painting-nyc", "single-room-accent-wall-painting-nyc",
  "kitchen-cabinet-painting-nyc", "plaster-wall-repair-painting-nyc",
  "wallpaper-installation-nyc", "office-painting-nyc",
  "exterior-painting-nyc", "rental-turnover-painting-nyc",
];
const categoryOrder = ["Homes & apartments", "Rooms & interior details", "Specialty & finishing", "Commercial", "Project planning & access", "Decorative wall finishes", "Carpentry & floors", "Detailed painting & finishing scopes"];
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).map((word) => word.length > 3 && word.endsWith("s") && !word.endsWith("ss") ? word.slice(0, -1) : word).join(" ");

function ProjectCard({ project }: { project: Project }) {
  const Mark = Icon[project.icon];
  return <Link href={`/painting/${project.slug}`} className="card p-6 group hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green-600)]">
    <span className="grid place-items-center w-11 h-11 rounded-xl bg-[var(--color-ink)] text-white"><Mark aria-hidden="true" className="w-5 h-5" /></span>
    <h3 className="font-display text-xl mt-4">{project.title}</h3>
    <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">{project.description}</p>
    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-green-600)]">View scope & costs <Icon.arrow aria-hidden="true" className="w-4 h-4" /></span>
  </Link>;
}

export function ProjectFinder({ groups }: { groups: Group[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All projects");
  const orderedGroups = [...groups].sort((a, b) => {
    const rank = (title: string) => categoryOrder.includes(title) ? categoryOrder.indexOf(title) : categoryOrder.length;
    return rank(a.title) - rank(b.title);
  });
  const words = normalize(query).split(" ").filter(Boolean);
  const matches = (project: Project) => words.every((word) => normalize(`${project.title} ${project.description} ${project.keyword}`).includes(word));
  const filtered = orderedGroups.filter((group) => category === "All projects" || group.title === category).map((group) => ({ ...group, projects: group.projects.filter(matches) }));
  const count = filtered.reduce((total, group) => total + group.projects.length, 0);
  const browsing = category === "All projects" && words.length === 0;
  const allProjects = groups.flatMap((group) => group.projects);
  const mainProjects = browsing ? mainSlugs.flatMap((slug) => allProjects.filter((project) => project.slug === slug)) : [];
  const reset = () => { setQuery(""); setCategory("All projects"); };

  return <section className="container-x py-8 sm:py-12" aria-label="Find a painting project">
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-5 sm:p-7">
      <label htmlFor="project-search" className="block font-semibold text-lg">What needs painting?</label>
      <p id="project-search-help" className="mt-1 text-sm text-[var(--color-muted)]">Search by room, surface or neighborhood, or choose a category below.</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input id="project-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-describedby="project-search-help" aria-controls="project-results" placeholder="Try apartment, cabinets or Brooklyn" className="w-full sm:flex-1 min-w-0 rounded-xl border border-[var(--color-line)] px-4 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green-600)]" />
        {(query || category !== "All projects") && <button type="button" onClick={reset} className="min-h-11 px-3 text-sm font-semibold underline underline-offset-4">Clear search & filters</button>}
      </div>
      <fieldset className="mt-6">
        <legend className="text-sm font-semibold mb-3">Filter by project type</legend>
        <div className="flex flex-wrap gap-2">
          {["All projects", ...orderedGroups.map((group) => group.title)].map((title) => <button key={title} type="button" aria-pressed={category === title} aria-controls="project-results" onClick={() => setCategory(title)} className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green-600)] ${category === title ? "bg-[var(--color-ink)] border-[var(--color-ink)] text-white" : "border-[var(--color-line)] hover:bg-[var(--color-cream)]"}`}>{title}</button>)}
        </div>
      </fieldset>
    </div>
    <p role="status" aria-live="polite" aria-atomic="true" className="mt-6 text-sm text-[var(--color-muted)]">{count} {count === 1 ? "project" : "projects"}{category !== "All projects" ? ` in ${category}` : " available"}{query.trim() ? ` matching “${query.trim()}”` : ""}</p>
    <div id="project-results" className="mt-8 space-y-12">
      {mainProjects.length > 0 && <div><h2 className="font-display text-3xl">Start with the main services</h2><p className="mt-2 text-[var(--color-muted)]">Apartments, individual rooms, cabinets, repairs and larger projects.</p><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{mainProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div>}
      {filtered.map((group) => {
        const projects = browsing ? group.projects.filter((project) => !mainSlugs.includes(project.slug)) : group.projects;
        return projects.length > 0 ? <div key={group.title}><h2 className="font-display text-2xl sm:text-3xl">{group.title}</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div></div> : null;
      })}
      {count === 0 && <div className="card p-8 text-center"><h2 className="font-display text-2xl">No matching projects</h2><p className="mt-3 text-[var(--color-muted)]">Try a broader term, such as “wall” or “apartment”, or clear the filters to see every project.</p><button type="button" onClick={reset} className="mt-5 min-h-11 px-4 font-semibold underline underline-offset-4">Show all projects</button><p className="mt-3"><Link href="/contact" className="font-semibold text-[var(--color-green-600)] underline underline-offset-4">Tell us what you need painted</Link></p></div>}
    </div>
  </section>;
}
