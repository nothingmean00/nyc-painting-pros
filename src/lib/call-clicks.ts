import "server-only";

import { neon } from "@neondatabase/serverless";
import { site } from "./site";
import type { CallClickInput, CallPlacement } from "./call-events";
import { callClickPreviewDirectory, recordPreviewCallClick, getPreviewCallClickReport } from "./call-click-preview";

type SqlClient = ReturnType<typeof neon>;
type CallClickRow = { id: string; created_at: string | Date; destination: string; source_page: string; placement: CallPlacement };
let sqlClient: SqlClient | undefined;
let schemaPromise: Promise<void> | undefined;

function getSql() {
  if (!process.env.DATABASE_URL) throw new Error("Call click storage is not configured.");
  return sqlClient ??= neon(process.env.DATABASE_URL);
}

async function ensureSchema() {
  schemaPromise ??= (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS call_clicks (
        id uuid PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        destination text NOT NULL,
        source_page text NOT NULL,
        placement text NOT NULL
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS call_clicks_created_at_idx ON call_clicks (created_at DESC)`;
  })().catch((error) => { schemaPromise = undefined; throw error; });
  await schemaPromise;
}

export async function recordCallClick(input: CallClickInput) {
  const preview = callClickPreviewDirectory();
  if (preview) return recordPreviewCallClick(preview, input);
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO call_clicks (id, destination, source_page, placement)
    VALUES (${input.id}, ${site.phone}, ${input.page}, ${input.placement})
    ON CONFLICT (id) DO NOTHING RETURNING id
  `) as Array<{ id: string }>;
  return rows.length > 0;
}

export async function getCallClickReport() {
  const preview = callClickPreviewDirectory();
  if (preview) return getPreviewCallClickReport(preview);
  await ensureSchema();
  const sql = getSql();
  const [summaryResult, rowsResult] = await Promise.all([
    sql`
      SELECT count(*)::int AS total,
        count(*) FILTER (WHERE created_at >= (date_trunc('day', now() AT TIME ZONE 'America/New_York') AT TIME ZONE 'America/New_York'))::int AS today,
        count(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS week
      FROM call_clicks
    `,
    sql`SELECT id, created_at, destination, source_page, placement FROM call_clicks ORDER BY created_at DESC, id DESC LIMIT 100`,
  ]);
  const summary = summaryResult as Array<{ total: number; today: number; week: number }>;
  const rows = rowsResult as CallClickRow[];
  return {
    mode: "database" as const,
    total: Number(summary[0]?.total ?? 0),
    today: Number(summary[0]?.today ?? 0),
    week: Number(summary[0]?.week ?? 0),
    clicks: rows.map((row) => ({
      id: String(row.id),
      createdAt: new Date(row.created_at as string).toISOString(),
      destination: String(row.destination),
      page: String(row.source_page),
      placement: row.placement as CallPlacement,
    })),
  };
}
