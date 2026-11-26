import { updateJobTrackingAction } from "./actions";
import type { Intake } from "@/lib/intakes";
import { getJobTracking, nextActions, trackedContribution } from "@/lib/job-tracking";
import { formatQuoteTotal } from "@/lib/lead-sales";

const fieldClass = "min-h-10 w-full border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-emerald-700";
const notices = {
  saved: "Job tracking saved.",
  conflict: "Another update was saved first. Review the current values and try again.",
  invalid: "Check the date and enter amounts as dollars and cents.",
};
const amounts = [
  ["collected", "Collected, after refunds"],
  ["crew", "Crew labor paid"],
  ["materials", "Materials paid"],
  ["other", "Other direct costs paid"],
] as const;

export async function JobTrackingPanel({ intake, notice }: { intake: Intake; notice?: string }) {
  const job = await getJobTracking(intake.id);
  const total = job ? trackedContribution(job) : null;
  const message = notice && Object.hasOwn(notices, notice) ? notices[notice as keyof typeof notices] : "";

  return (
    <section id="tracking" className="scroll-mt-6 border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="tracking-heading">
      <h2 id="tracking-heading" className="text-lg font-semibold">Next action and job costs</h2>
      {message && <p role="status" className="mt-3 text-sm text-slate-700">{message}</p>}
      <form action={updateJobTrackingAction} className="mt-4 grid gap-4">
        <input type="hidden" name="id" value={intake.id} />
        <input type="hidden" name="version" value={job?.version ?? 0} />
        <div className="grid gap-3 sm:grid-cols-[1fr_11rem]">
          <label className="grid gap-1 text-sm font-medium">
            Next action
            <input name="nextAction" maxLength={240} defaultValue={job?.nextAction} placeholder={nextActions[intake.status]} className={fieldClass} />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Due date
            <input type="date" name="dueOn" defaultValue={job?.dueOn ?? ""} className={fieldClass} />
          </label>
        </div>
        <label className="grid gap-1 text-sm font-medium">
          Property or account
          <input name="account" maxLength={120} defaultValue={job?.account} placeholder="Use the same name for repeat jobs" className={fieldClass} />
        </label>
        <fieldset className="border-t border-slate-200 pt-4">
          <legend className="sr-only">Job actuals in US dollars</legend>
          <p id="job-cost-help" className="mb-3 text-sm text-slate-600">
            Record actual amounts in USD. Leave unknown amounts blank. Enter 0 when no cost was incurred. Exclude sales tax.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {amounts.map(([key, label]) => (
              <label key={key} className="grid gap-1 text-sm font-medium">
                {label}
                <input name={key} inputMode="decimal" maxLength={10} aria-describedby="job-cost-help"
                  defaultValue={job?.[key] == null ? "" : (job[key] / 100).toFixed(2)} className={fieldClass} />
              </label>
            ))}
          </div>
        </fieldset>
        <p className="text-sm text-slate-600">
          {total === null
            ? "Direct cash contribution appears when collection and all direct costs are recorded."
            : "Direct cash contribution before overhead · " + formatQuoteTotal(total)}
        </p>
        <button className="min-h-10 justify-self-start border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
          Save job tracking
        </button>
      </form>
    </section>
  );
}
