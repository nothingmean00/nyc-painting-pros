import Link from "next/link";
import { AdminHeader } from "../AdminHeader";
import { requireAdmin } from "@/lib/admin-auth";
import { getCallClickReport } from "@/lib/call-clicks";
import type { CallPlacement } from "@/lib/call-events";

export const dynamic = "force-dynamic";

const placements: Record<CallPlacement, string> = {
  header: "Desktop header", "mobile-header": "Mobile header", "mobile-menu": "Mobile menu", footer: "Footer", contact: "Contact page",
};

const formatDate = (value: string) => new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", second: "2-digit",
  timeZone: "America/New_York", timeZoneName: "short",
}).format(new Date(value));

export default async function CallClicksPage() {
  await requireAdmin();
  let report: Awaited<ReturnType<typeof getCallClickReport>> | undefined;
  try { report = await getCallClickReport(); }
  catch { console.error("[admin] Call click report unavailable."); }

  return <>
    <AdminHeader />
    <section aria-labelledby="call-click-heading" className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700">Website activity</p>
      <h1 id="call-click-heading" className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">Call clicks</h1>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Phone-number reveals and call-link clicks, recorded when received by the server. Times are shown in New York. A click does not confirm that a call connected, and no caller phone number or call audio is collected.</p>
      {report?.mode === "local-preview" && <p className="mt-5 border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">Local preview log. Published website activity is stored separately in the production database.</p>}
      {!report ? <p role="alert" className="mt-8 border border-amber-200 bg-amber-50 p-6 text-amber-900">Call tracking storage is unavailable. Check the project’s DATABASE_URL connection. The call buttons still open the phone app.</p> : <>
        <section aria-label="Call click totals" className="mt-8 grid grid-cols-3 border border-slate-200 bg-white">
          {[["All time", report.total], ["Today (New York)", report.today], ["Last 7 days", report.week]].map(([label, value]) => <div key={label} className="border-r border-slate-200 p-4 last:border-r-0 sm:p-6"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p></div>)}
        </section>
        <section className="mt-8 border border-slate-200 bg-white">
          <h2 className="border-b border-slate-200 p-5 font-semibold">Most recent 100 clicks</h2>
          {report.clicks.length === 0 ? <p className="p-8 text-sm text-slate-500">No call clicks yet. A record appears when a visitor clicks a call link.</p> : <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-5 py-3">Time (New York)</th><th className="px-5 py-3">Page</th><th className="px-5 py-3">Button</th><th className="px-5 py-3">Number called</th></tr></thead>
            <tbody className="divide-y divide-slate-100">{report.clicks.map((click) => <tr key={click.id}><td className="whitespace-nowrap px-5 py-4">{formatDate(click.createdAt)}</td><td className="px-5 py-4"><Link href={click.page} className="underline underline-offset-4">{click.page}</Link></td><td className="px-5 py-4">{placements[click.placement]}</td><td className="whitespace-nowrap px-5 py-4">{click.destination}</td></tr>)}</tbody>
          </table></div>}
        </section>
      </>}
    </section>
  </>;
}
