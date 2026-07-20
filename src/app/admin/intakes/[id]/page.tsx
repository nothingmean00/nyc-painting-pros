import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarClock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Save,
} from "lucide-react";
import { AdminHeader } from "../../AdminHeader";
import { updateIntakeAction } from "../../actions";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getIntake,
  intakeStatuses,
  isIntakeStorageConfigured,
} from "@/lib/intakes";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  }).format(new Date(value));
}

export default async function IntakeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  if (!isIntakeStorageConfigured()) redirect("/admin");

  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    notFound();
  }
  const intake = await getIntake(id);
  if (!intake) notFound();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950">
          <ArrowLeft className="size-4" /> Back to intakes
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">{intake.service}</p>
            <h1 className="mt-2 break-words text-3xl font-semibold tracking-normal sm:text-4xl">{intake.name}</h1>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
              <CalendarClock className="size-4" /> Received {formatDate(intake.createdAt)}
            </p>
          </div>
          <span className="bg-white px-3 py-2 text-xs font-semibold capitalize text-slate-700 shadow-sm ring-1 ring-slate-200">
            {intake.status}
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-7">
            <section className="border border-slate-200 bg-white">
              <h2 className="border-b border-slate-200 px-5 py-4 text-sm font-semibold">Contact and project</h2>
              <dl className="grid sm:grid-cols-2">
                <div className="border-b border-slate-100 p-5 sm:border-r">
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500"><Phone className="size-4" /> Phone</dt>
                  <dd className="mt-2"><a href={`tel:${intake.phone}`} className="font-semibold text-emerald-700 hover:underline">{intake.phone}</a></dd>
                </div>
                <div className="border-b border-slate-100 p-5">
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500"><Mail className="size-4" /> Email</dt>
                  <dd className="mt-2 break-all"><a href={`mailto:${intake.email}`} className="font-semibold text-emerald-700 hover:underline">{intake.email}</a></dd>
                </div>
                <div className="border-b border-slate-100 p-5 sm:border-b-0 sm:border-r">
                  <dt className="flex items-center gap-2 text-xs font-medium uppercase text-slate-500"><MapPin className="size-4" /> Neighborhood / ZIP</dt>
                  <dd className="mt-2 font-medium">{intake.location}</dd>
                </div>
                <div className="p-5">
                  <dt className="text-xs font-medium uppercase text-slate-500">Email notification</dt>
                  <dd className="mt-2 font-medium">{intake.emailDelivered ? "Delivered" : "Not delivered"}</dd>
                </div>
              </dl>
            </section>

            <section className="border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-sm font-semibold">Project details</h2>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {intake.details || "No additional details provided."}
              </p>
            </section>

            <section className="border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="text-sm font-semibold">Attribution</h2>
              <dl className="mt-4 grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Source page</dt>
                  <dd className="mt-2 break-all text-slate-700">{intake.sourcePage || "Unknown"}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">Referrer</dt>
                  <dd className="mt-2 break-all text-slate-700">{intake.referrer || "Direct / not provided"}</dd>
                </div>
              </dl>
              {intake.sourcePage.startsWith("/") && (
                <a href={intake.sourcePage} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
                  Open source page <ExternalLink className="size-4" />
                </a>
              )}
            </section>
          </div>

          <aside>
            <form action={updateIntakeAction} className="border border-slate-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
              <input type="hidden" name="id" value={intake.id} />
              <h2 className="text-lg font-semibold">Follow-up</h2>
              <label className="mt-5 grid gap-2">
                <span className="text-sm font-medium text-slate-700">Lead status</span>
                <select name="status" defaultValue={intake.status} className="h-11 border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15">
                  {intakeStatuses.map((status) => (
                    <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </label>
              <label className="mt-5 grid gap-2">
                <span className="text-sm font-medium text-slate-700">Private notes</span>
                <textarea
                  name="notes"
                  defaultValue={intake.notes}
                  rows={9}
                  maxLength={5000}
                  placeholder="Call outcome, quote details, timing, access notes…"
                  className="resize-y border border-slate-300 bg-white px-3 py-3 text-sm leading-6 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15"
                />
              </label>
              <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700">
                <Save className="size-4" /> Save changes
              </button>
              <p className="mt-3 text-xs leading-5 text-slate-500">Last updated {formatDate(intake.updatedAt)}</p>
            </form>
          </aside>
        </div>
      </main>
    </>
  );
}
