import {
  approveLeadQuoteAction, saveLeadQuoteAction, sendLeadReplyAction, updateLeadControlsAction,
} from "./sales-actions";
import { isLeadAIEnabled, leadMailConfig } from "@/lib/lead-mail-config";
import { formatQuoteTotal, getSalesDetails, leadOwners } from "@/lib/lead-sales";
import type { Intake } from "@/lib/intakes";

const fieldClass = "min-h-10 w-full border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-emerald-700";
const buttonClass = "min-h-10 px-4 py-2 text-sm font-semibold border border-slate-300 disabled:opacity-50";
const primaryButton = `${buttonClass} border-slate-950 bg-slate-950 text-white hover:bg-emerald-800`;
const notices: Record<string, string> = {
  invalid: "Check the required fields and enter the total as a dollar amount.",
  changed: "The quote changed or can’t be approved in its current state. Review the latest version.",
  settings: "Lead email settings saved.",
  draft: "Draft saved. Review the saved quote before approving it.",
  "mail-disabled": "Email delivery is not configured for the lead dashboard.",
  "quote-queued": "Quote approved and queued. Check the email history for the send result.",
  "reply-queued": "Reply queued. Check the email history for the send result.",
};
const kindLabels = {
  first_reply: "Automatic first reply", quote: "Approved quote", follow_up: "Automatic quote follow-up",
  manual: "Team reply", received: "Incoming reply",
};
const stateLabels = {
  pending: "Queued", sending: "Sending", accepted: "Accepted by email provider",
  received: "Received", failed: "Send failed", held: "Needs review", canceled: "Canceled",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium", timeStyle: "short", timeZone: "America/New_York",
  }).format(new Date(value));
}

export async function LeadSalesPanel({ intake, notice }: { intake: Intake; notice?: string }) {
  const { sales, history } = await getSalesDetails(intake.id);
  const configured = Boolean(leadMailConfig());
  const aiEnabled = isLeadAIEnabled();
  const owner = sales?.owner ?? "Malik";
  const closed = ["won", "lost", "archived"].includes(intake.status);
  const quotePending = history.some((entry) => entry.kind === "quote" && ["pending", "sending"].includes(entry.state));
  const draftReady = !!sales?.draft_total_cents && sales.draft_version > sales.approved_version;
  const latestQuote = history.find((entry) => entry.kind === "quote" && entry.quote_version === sales?.approved_version);
  const followUpHandled = latestQuote && history.some((entry) =>
    (entry.kind === "follow_up" && entry.quote_version === latestQuote.quote_version)
    || (["received", "manual"].includes(entry.kind) && new Date(entry.created_at) >= new Date(latestQuote.created_at)));
  const followUpDue = aiEnabled && !sales?.paused && !closed && intake.status === "quoted"
    && latestQuote?.state === "accepted" && !followUpHandled ? latestQuote.follow_up_on : null;
  const message = notice && Object.hasOwn(notices, notice) ? notices[notice] : "";

  return (
    <section id="sales" className="scroll-mt-6 border border-slate-200 bg-white p-5 sm:p-6" aria-labelledby="sales-heading">
      <h2 id="sales-heading" className="text-lg font-semibold">Customer email and quote</h2>
      <p className="mt-1 text-sm text-slate-600">
        {aiEnabled ? (sales?.paused ? "Automatic emails are paused for this lead." : "Automatic replies and quote follow-ups are enabled.")
          : "Automatic replies and follow-ups are off. You can still prepare quotes."}
      </p>
      {message && <p role="status" className="mt-4 border border-slate-200 bg-slate-50 p-3 text-sm">{message}</p>}
      <form action={updateLeadControlsAction} className="mt-5 flex flex-wrap items-end gap-3">
        <input type="hidden" name="id" value={intake.id} />
        <label className="grid gap-1 text-sm font-medium">
          Lead owner
          <select name="owner" defaultValue={owner} className={fieldClass}>
            {leadOwners.map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
        <label className="inline-flex min-h-10 items-center gap-2 text-sm">
          <input type="checkbox" name="paused" value="yes" defaultChecked={sales?.paused} />
          Pause automatic emails
        </label>
        <button className={buttonClass}>Save settings</button>
      </form>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <h3 className="text-sm font-semibold">Quote draft</h3>
        {closed ? <p className="mt-2 text-sm text-slate-600">This lead is closed.</p> : (
          <>
            <form action={saveLeadQuoteAction} className="mt-3 grid gap-3">
              <input type="hidden" name="id" value={intake.id} />
              <input type="hidden" name="version" value={sales?.draft_version ?? 0} />
              <input type="hidden" name="owner" value={owner} />
              <label className="grid gap-1 text-sm font-medium">
                Customer-facing scope
                <textarea name="scope" required maxLength={4000} rows={4} defaultValue={sales?.draft_scope}
                  placeholder="Surfaces, prep, paint, protection, cleanup and exclusions" className={fieldClass} />
              </label>
              <div className="grid gap-3 sm:grid-cols-[9rem_1fr]">
                <label className="grid gap-1 text-sm font-medium">
                  Total in USD
                  <input name="total" inputMode="decimal" required maxLength={10}
                    defaultValue={sales?.draft_total_cents ? (sales.draft_total_cents / 100).toFixed(2) : ""}
                    placeholder="1800.00" className={fieldClass} />
                </label>
                <label className="grid gap-1 text-sm font-medium">
                  Timing or conditions (optional)
                  <input name="timing" maxLength={500} defaultValue={sales?.draft_timing} className={fieldClass} />
                </label>
              </div>
              <button className={`${buttonClass} justify-self-start`}>Save quote draft</button>
            </form>
            {draftReady && sales && (
              <form action={approveLeadQuoteAction} className="mt-4 border border-slate-200 bg-slate-50 p-4">
                <input type="hidden" name="id" value={intake.id} />
                <input type="hidden" name="owner" value={owner} />
                <input type="hidden" name="version" value={sales.draft_version} />
                <p className="text-sm font-semibold">Saved quote · {formatQuoteTotal(sales.draft_total_cents!)}</p>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm">{sales.draft_scope}</p>
                {sales.draft_timing && <p className="mt-2 break-words text-sm">{sales.draft_timing}</p>}
                <button disabled={!configured || quotePending} className={`${primaryButton} mt-3`}>Approve and email as {owner}</button>
                {quotePending && <p className="mt-2 text-sm text-slate-600">A previous quote is still queued or sending.</p>}
                {!configured && <p className="mt-2 text-sm text-slate-600">Connect email delivery before sending.</p>}
              </form>
            )}
          </>
        )}
        {followUpDue && <p className="mt-4 text-sm text-slate-600">Automatic follow-up due {followUpDue} if the customer hasn’t replied.</p>}
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <h3 className="text-sm font-semibold">Email history</h3>
        {history.length ? (
          <ol className="mt-3 divide-y divide-slate-100">
            {history.map((entry) => (
              <li key={entry.id} className="py-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-semibold">{entry.kind === "quote" && entry.automatic ? "Automatic estimate" : kindLabels[entry.kind]}{entry.kind !== "received" && ` · ${entry.owner}`}</p>
                  <time className="text-xs text-slate-500" dateTime={new Date(entry.accepted_at ?? entry.created_at).toISOString()}>
                    {formatDate(entry.accepted_at ?? entry.created_at)}
                  </time>
                </div>
                <p className="mt-1 text-slate-600">{stateLabels[entry.state]}{entry.reason && ` · ${entry.reason}`}</p>
                {entry.kind === "quote" && entry.state === "accepted" && entry.has_pdf && (
                  <a href={`/admin/intakes/${intake.id}/quotes/${entry.id}`} className="mt-2 inline-block font-medium text-emerald-800 underline">Download estimate PDF</a>
                )}
                {entry.body && <details className="mt-2">
                  <summary className="cursor-pointer font-medium text-emerald-800">Read message</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words">{entry.body}</p>
                </details>}
                {entry.kind === "received" && (
                  <p className="mt-2">
                    <a href="https://resend.com/emails" target="_blank" rel="noreferrer" className="text-emerald-800 underline">Open receiving inbox in Resend</a>
                    {entry.attachment_count > 0 && ` · ${entry.attachment_count} ${entry.attachment_count === 1 ? "attachment" : "attachments"}`}
                  </p>
                )}
              </li>
            ))}
          </ol>
        ) : <p className="mt-2 text-sm text-slate-600">No dashboard emails yet.</p>}
        {configured && <form action={sendLeadReplyAction} className="mt-4 grid gap-3">
          <input type="hidden" name="id" value={intake.id} />
          <input type="hidden" name="messageId" value={crypto.randomUUID()} />
          <input type="hidden" name="owner" value={owner} />
          <label className="grid gap-1 text-sm font-medium">
            Write a reply to {intake.email}
            <textarea name="body" rows={3} required maxLength={6000} className={fieldClass} />
          </label>
          <button className={`${buttonClass} justify-self-start`}>Send reply as {owner}</button>
        </form>}
      </div>
    </section>
  );
}
