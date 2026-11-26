import "server-only";

import { getIntakeSql, type IntakeStatus } from "./intakes";

const costFields = ["collected", "crew", "materials", "other"] as const;
type CostField = (typeof costFields)[number];
type JobMoney = Record<CostField, number | null>;

export type JobTracking = JobMoney & { nextAction: string; dueOn: string | null; account: string; version: number };

export const nextActions: Record<IntakeStatus, string> = {
  new: "Qualify the inquiry",
  contacted: "Confirm scope and prepare an estimate",
  quoted: "Follow up on the estimate",
  won: "Confirm job status and record payment",
  lost: "Record the outcome",
  archived: "Archived",
};

function dollarsToCents(value: string) {
  if (!value) return null;
  if (!/^\d{1,7}(?:\.\d{1,2})?$/.test(value)) return undefined;
  const [dollars, cents = ""] = value.split(".");
  return Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
}

export function parseJobTracking(form: FormData): JobTracking | null {
  const field = (name: string) => String(form.get(name) ?? "").trim();
  const nextAction = field("nextAction");
  const account = field("account").replace(/\s+/g, " ");
  const due = field("dueOn");
  const rawVersion = field("version");
  const money = costFields.map((name) => dollarsToCents(field(name)));
  if (nextAction.length > 240 || account.length > 120 || !/^\d{1,9}$/.test(rawVersion)
    || money.some((value) => value === undefined)) return null;
  if (due) {
    const date = new Date(due + "T00:00:00Z");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(due) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== due) return null;
  }
  const [collected = null, crew = null, materials = null, other = null] = money;
  return { nextAction, account, dueOn: due || null, version: Number(rawVersion), collected, crew, materials, other };
}

export function trackedContribution({ collected, crew, materials, other }: JobMoney) {
  if (collected === null || crew === null || materials === null || other === null) return null;
  return collected - crew - materials - other;
}

export async function getJobTracking(id: string): Promise<JobTracking | null> {
  const sql = await getIntakeSql();
  const [row] = await sql`SELECT next_action AS "nextAction", due_on::text AS "dueOn", account, version,
    collected_cents AS collected, crew_cents AS crew, materials_cents AS materials, other_cents AS other
    FROM estimate_job_tracking WHERE intake_id = ${id}`;
  return (row as JobTracking | undefined) ?? null;
}

export async function saveJobTracking(id: string, job: JobTracking) {
  const sql = await getIntakeSql();
  const rows = await sql`INSERT INTO estimate_job_tracking
    (intake_id, next_action, due_on, account, collected_cents, crew_cents, materials_cents, other_cents)
    SELECT i.id, ${job.nextAction}, ${job.dueOn}::date, ${job.account}, ${job.collected}, ${job.crew}, ${job.materials}, ${job.other}
    FROM estimate_intakes i
    WHERE i.id = ${id} AND (${job.version} = 0 OR EXISTS (SELECT 1 FROM estimate_job_tracking WHERE intake_id = i.id))
    ON CONFLICT (intake_id) DO UPDATE SET next_action = EXCLUDED.next_action, due_on = EXCLUDED.due_on,
      account = EXCLUDED.account, collected_cents = EXCLUDED.collected_cents, crew_cents = EXCLUDED.crew_cents,
      materials_cents = EXCLUDED.materials_cents, other_cents = EXCLUDED.other_cents, version = estimate_job_tracking.version + 1
    WHERE estimate_job_tracking.version = ${job.version}
    RETURNING intake_id`;
  return rows.length === 1;
}

export async function getJobTrackingSummary() {
  const sql = await getIntakeSql();
  const [totals, accounts] = await Promise.all([
    sql`SELECT count(collected_cents)::int AS tracked, coalesce(sum(collected_cents), 0)::text AS collected,
      count(collected_cents::bigint - crew_cents - materials_cents - other_cents)::int AS costed,
      coalesce(sum(collected_cents::bigint - crew_cents - materials_cents - other_cents), 0)::text AS contribution
      FROM estimate_job_tracking`,
    sql`SELECT min(j.account) AS account, count(*)::int AS jobs, coalesce(sum(j.collected_cents), 0)::text AS collected
      FROM estimate_job_tracking j JOIN estimate_intakes i ON i.id = j.intake_id
      WHERE j.account <> '' AND i.status = 'won'
      GROUP BY lower(j.account) HAVING count(*) > 1 ORDER BY jobs DESC, account LIMIT 8`,
  ]);
  return { totals: totals[0] as { tracked: number; collected: string; costed: number; contribution: string },
    accounts: accounts as Array<{ account: string; jobs: number; collected: string }> };
}
