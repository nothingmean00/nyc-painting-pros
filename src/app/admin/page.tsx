import Link from "next/link";
import { ArrowRight, Database, Inbox, Search } from "lucide-react";
import { AdminHeader } from "./AdminHeader";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getIntakeStats,
  intakeStatuses,
  isIntakeStorageConfigured,
  listIntakes,
  type IntakeStatus,
} from "@/lib/intakes";

export const dynamic = "force-dynamic";

const statusStyles: Record<IntakeStatus, string> = {
  new: "bg-emerald-100 text-emerald-800",
  contacted: "bg-sky-100 text-sky-800",
  quoted: "bg-amber-100 text-amber-900",
  won: "bg-violet-100 text-violet-800",
  lost: "bg-rose-100 text-rose-800",
  archived: "bg-slate-200 text-slate-700",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdmin();
  const query = await searchParams;
  const status = intakeStatuses.includes(query.status as IntakeStatus)
    ? (query.status as IntakeStatus)
    : "all";
  const search = (query.q ?? "").slice(0, 100);
  const configured = isIntakeStorageConfigured();
  let intakes: Awaited<ReturnType<typeof listIntakes>> = [];
  let stats = { total: 0, new: 0, contacted: 0, quoted: 0, won: 0 };
  let storageError = "";

  if (configured) {
    try {
      [intakes, stats] = await Promise.all([
        listIntakes({ status, search }),
        getIntakeStats(),
      ]);
    } catch (error) {
      console.error("[admin] Could not load intake storage:", error);
      storageError = "The database is configured but could not be reached.";
    }
  }

  const connected = configured && !storageError;

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Pipeline</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">Estimate intakes</h1>
            <p className="mt-2 text-sm text-slate-600">Newest requests first. Times shown in New York.</p>
          </div>
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
            <span className={`size-2 ${connected ? "bg-emerald-500" : "bg-amber-500"}`} />
            {connected ? "Database connected" : storageError || "Database setup required"}
          </div>
        </div>

        <section aria-label="Intake summary" className="mt-8 grid grid-cols-2 border border-slate-200 bg-white md:grid-cols-5">
          {[
            ["Total", stats.total],
            ["New", stats.new],
            ["Contacted", stats.contacted],
            ["Quoted", stats.quoted],
            ["Won", stats.won],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-r border-slate-200 p-4 last:border-r-0 md:border-b-0 sm:p-5">
              <div className="text-xs font-medium uppercase text-slate-500">{label}</div>
              <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
            </div>
          ))}
        </section>

        {!connected ? (
          <section className="mt-8 border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <Database className="size-6 text-amber-700" />
            <h2 className="mt-4 text-xl font-semibold">Connect intake storage</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-900/80">
              {storageError || "Add a Neon Postgres integration to the Vercel project and expose DATABASE_URL."} The intake table and indexes are created automatically on the first successful request.
            </p>
          </section>
        ) : (
          <>
            <form className="mt-8 flex flex-col gap-3 border border-slate-200 bg-white p-3 sm:flex-row" method="get">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Search intakes</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  defaultValue={search}
                  placeholder="Search name, email, phone, neighborhood, or service"
                  className="h-11 w-full border border-slate-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                />
              </label>
              <label>
                <span className="sr-only">Filter by status</span>
                <select
                  name="status"
                  defaultValue={status}
                  className="h-11 w-full border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600 sm:w-40"
                >
                  <option value="all">All statuses</option>
                  {intakeStatuses.map((item) => (
                    <option key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</option>
                  ))}
                </select>
              </label>
              <button className="h-11 bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Apply
              </button>
            </form>

            <section className="mt-4 overflow-hidden border border-slate-200 bg-white">
              {intakes.length === 0 ? (
                <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
                  <div>
                    <Inbox className="mx-auto size-8 text-slate-400" />
                    <h2 className="mt-4 text-lg font-semibold">No matching intakes</h2>
                    <p className="mt-2 text-sm text-slate-500">New estimate requests will appear here automatically.</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[880px] border-collapse text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-5 py-3 font-medium">Received</th>
                        <th className="px-5 py-3 font-medium">Customer</th>
                        <th className="px-5 py-3 font-medium">Project</th>
                        <th className="px-5 py-3 font-medium">Location</th>
                        <th className="px-5 py-3 font-medium">Status</th>
                        <th className="px-5 py-3"><span className="sr-only">Open</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {intakes.map((intake) => (
                        <tr key={intake.id} className="transition hover:bg-slate-50">
                          <td className="whitespace-nowrap px-5 py-4 text-slate-500">{formatDate(intake.createdAt)}</td>
                          <td className="px-5 py-4">
                            <div className="font-semibold text-slate-900">{intake.name}</div>
                            <div className="mt-0.5 text-xs text-slate-500">{intake.email}</div>
                          </td>
                          <td className="max-w-64 px-5 py-4"><div className="truncate">{intake.service}</div></td>
                          <td className="px-5 py-4 text-slate-600">{intake.location}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-semibold capitalize ${statusStyles[intake.status]}`}>{intake.status}</span>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <Link href={`/admin/intakes/${intake.id}`} aria-label={`Open intake from ${intake.name}`} className="inline-grid size-9 place-items-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
                              <ArrowRight className="size-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
