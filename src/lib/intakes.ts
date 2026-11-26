import "server-only";

import type { ProjectPhoto } from "./project-photos";
import type { QuoteDocument } from "./automatic-estimate";
import { neon } from "@neondatabase/serverless";

export const intakeStatuses = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
  "archived",
] as const;

export type IntakeStatus = (typeof intakeStatuses)[number];

export type Intake = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  details: string;
  sourcePage: string;
  referrer: string;
  status: IntakeStatus;
  notes: string;
  emailDelivered: boolean;
  photoCount: number;
};

export type NewIntake = Pick<
  Intake,
  | "id"
  | "name"
  | "phone"
  | "email"
  | "location"
  | "service"
  | "details"
  | "sourcePage"
  | "referrer"
> & {
  photos?: ProjectPhoto[];
  queueFirstReply?: boolean;
  automaticQuote?: QuoteDocument;
  initialMailSendAt?: string;
  sourceEmail?: { id: string; messageId: string | null; subject: string };
};

type IntakeRow = {
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  details: string;
  source_page: string;
  referrer: string;
  status: IntakeStatus;
  notes: string;
  email_delivered: boolean;
  photo_count?: number;
};

type IntakeListRow = IntakeRow & {
  sales_owner: string | null;
  sales_update: string | null;
  next_action: string | null;
  due_on: string | null;
  account: string | null;
};

type SqlClient = ReturnType<typeof neon<false, false>>;

let sqlClient: SqlClient | null = null;
let schemaPromise: Promise<void> | null = null;

export class IntakeStorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "IntakeStorageError";
  }
}

export function isIntakeStorageConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new IntakeStorageError("DATABASE_URL is not configured.");
  }

  if (!sqlClient) sqlClient = neon(databaseUrl);
  return sqlClient;
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS estimate_intakes (
          id uuid PRIMARY KEY,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now(),
          name text NOT NULL,
          phone text NOT NULL,
          email text NOT NULL,
          location text NOT NULL,
          service text NOT NULL,
          details text NOT NULL DEFAULT '',
          source_page text NOT NULL DEFAULT '',
          referrer text NOT NULL DEFAULT '',
          status text NOT NULL DEFAULT 'new'
            CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost', 'archived')),
          notes text NOT NULL DEFAULT '',
          email_delivered boolean NOT NULL DEFAULT false
        )
      `;
      await sql`ALTER TABLE estimate_intakes ADD COLUMN IF NOT EXISTS photos jsonb NOT NULL DEFAULT '[]'::jsonb`;
      await sql`ALTER TABLE estimate_intakes ADD COLUMN IF NOT EXISTS source_email jsonb`;
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_intakes_created_at_idx
        ON estimate_intakes (created_at DESC)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_intakes_status_idx
        ON estimate_intakes (status)
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS estimate_sales (
          intake_id uuid PRIMARY KEY REFERENCES estimate_intakes(id) ON DELETE CASCADE,
          reply_token uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
          owner text NOT NULL DEFAULT 'Malik' CHECK (owner IN ('Malik', 'Abiel')),
          paused boolean NOT NULL DEFAULT false,
          draft_scope text NOT NULL DEFAULT '',
          draft_total_cents integer,
          draft_timing text NOT NULL DEFAULT '',
          draft_version integer NOT NULL DEFAULT 0,
          approved_version integer NOT NULL DEFAULT 0
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS estimate_sales_mail (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          intake_id uuid NOT NULL REFERENCES estimate_sales(intake_id) ON DELETE CASCADE,
          kind text NOT NULL CHECK (kind IN ('first_reply', 'quote', 'follow_up', 'manual', 'received')),
          state text NOT NULL DEFAULT 'pending'
            CHECK (state IN ('pending', 'sending', 'accepted', 'received', 'failed', 'held', 'canceled')),
          owner text NOT NULL DEFAULT 'Malik',
          body text NOT NULL DEFAULT '',
          reason text NOT NULL DEFAULT '',
          quote_version integer,
          parent_id uuid REFERENCES estimate_sales_mail(id),
          provider_id text UNIQUE,
          message_id text,
          envelope jsonb,
          attachment_count integer NOT NULL DEFAULT 0,
          created_at timestamptz NOT NULL DEFAULT now(),
          attempted_at timestamptz,
          lease_until timestamptz,
          claim_token uuid,
          accepted_at timestamptz,
          follow_up_on date,
          UNIQUE (intake_id, kind, quote_version)
        )
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_sales_mail_intake_idx
        ON estimate_sales_mail (intake_id, created_at DESC)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_sales_mail_pending_idx
        ON estimate_sales_mail (created_at) WHERE state IN ('pending', 'sending')
      `;
      await sql`ALTER TABLE estimate_sales_mail ADD COLUMN IF NOT EXISTS quote_document jsonb,
        ADD COLUMN IF NOT EXISTS automatic boolean NOT NULL DEFAULT false,
        ADD COLUMN IF NOT EXISTS send_after timestamptz NOT NULL DEFAULT now()`;
      await sql`
        CREATE TABLE IF NOT EXISTS estimate_job_tracking (
          intake_id uuid PRIMARY KEY REFERENCES estimate_intakes(id) ON DELETE CASCADE,
          next_action text NOT NULL DEFAULT '',
          due_on date,
          account text NOT NULL DEFAULT '',
          collected_cents integer CHECK (collected_cents >= 0),
          crew_cents integer CHECK (crew_cents >= 0),
          materials_cents integer CHECK (materials_cents >= 0),
          other_cents integer CHECK (other_cents >= 0),
          version integer NOT NULL DEFAULT 1
        )
      `;
    })().catch((error) => {
      schemaPromise = null;
      throw new IntakeStorageError("Could not initialize intake storage.", {
        cause: error,
      });
    });
  }

  await schemaPromise;
}

export async function getIntakeSql() {
  await ensureSchema();
  return getSql();
}

function mapIntake(row: IntakeRow): Intake {
  return {
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    name: row.name,
    phone: row.phone,
    email: row.email,
    location: row.location,
    service: row.service,
    details: row.details,
    sourcePage: row.source_page,
    referrer: row.referrer,
    status: row.status,
    notes: row.notes,
    emailDelivered: row.email_delivered,
    photoCount: row.photo_count ?? 0,
  };
}

export async function recordIntake(input: NewIntake) {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    WITH inserted AS (
      INSERT INTO estimate_intakes (
        id, name, phone, email, location, service, details, source_page, referrer, photos, source_email
      ) VALUES (
        ${input.id}, ${input.name}, ${input.phone}, ${input.email},
        ${input.location}, ${input.service}, ${input.details},
        ${input.sourcePage}, ${input.referrer}, ${JSON.stringify(input.photos ?? [])}::jsonb,
        ${input.sourceEmail ? JSON.stringify(input.sourceEmail) : null}::jsonb
      )
      ON CONFLICT (id) DO NOTHING
      RETURNING id, created_at, updated_at, name, phone, email, location, service, details, source_page, referrer, status, notes, email_delivered, jsonb_array_length(photos) AS photo_count
    ), enrolled AS (
      INSERT INTO estimate_sales (intake_id, draft_version, approved_version)
      SELECT id, ${input.automaticQuote ? 1 : 0}, ${input.automaticQuote ? 1 : 0}
      FROM inserted WHERE ${Boolean(input.queueFirstReply || input.automaticQuote)}
      RETURNING intake_id
    ), queued AS (
      INSERT INTO estimate_sales_mail (intake_id, kind, quote_version, quote_document, automatic, send_after)
      SELECT intake_id, ${input.automaticQuote ? "quote" : "first_reply"}, ${input.automaticQuote ? 1 : 0},
        ${JSON.stringify(input.automaticQuote ?? null)}::jsonb, ${Boolean(input.automaticQuote)},
        coalesce(${input.initialMailSendAt ?? null}::timestamptz, now())
      FROM enrolled
    )
    SELECT * FROM inserted
  `) as IntakeRow[];

  return rows[0] ? mapIntake(rows[0]) : null;
}

export async function markIntakeEmailDelivered(id: string) {
  await ensureSchema();
  const sql = getSql();
  await sql`
    UPDATE estimate_intakes
    SET email_delivered = true, updated_at = now()
    WHERE id = ${id}
  `;
}

export async function listIntakes({
  status = "all",
  search = "",
}: {
  status?: IntakeStatus | "all";
  search?: string;
} = {}) {
  await ensureSchema();
  const sql = getSql();
  const normalizedSearch = search.trim().slice(0, 100);
  const like = `%${normalizedSearch}%`;
  const rows = (await sql`
    SELECT i.id, i.created_at, i.updated_at, i.name, i.phone, i.email, i.location, i.service, i.details,
      i.source_page, i.referrer, i.status, i.notes, i.email_delivered, jsonb_array_length(i.photos) AS photo_count,
      coalesce(sales.owner, 'Malik') AS sales_owner,
      job.next_action, job.due_on::text, job.account,
      CASE
        WHEN i.status IN ('won', 'lost', 'archived') THEN NULL
        WHEN latest.state IN ('failed', 'held') OR latest.kind = 'first_reply' AND latest.reason <> '' THEN 'Needs email review'
        WHEN latest.state = 'received' THEN 'Incoming reply'
        WHEN latest.state IN ('pending', 'sending') THEN 'Email queued'
      END AS sales_update
    FROM estimate_intakes AS i
    LEFT JOIN estimate_sales AS sales ON sales.intake_id = i.id
    LEFT JOIN estimate_job_tracking AS job ON job.intake_id = i.id
    LEFT JOIN LATERAL (
      SELECT kind, state, reason FROM estimate_sales_mail
      WHERE intake_id = i.id ORDER BY created_at DESC LIMIT 1
    ) AS latest ON true
    WHERE (${status} = 'all' OR i.status = ${status})
      AND (
        ${normalizedSearch} = '' OR
        i.name ILIKE ${like} OR
        i.email ILIKE ${like} OR
        i.phone ILIKE ${like} OR
        i.location ILIKE ${like} OR
        i.service ILIKE ${like} OR
        job.account ILIKE ${like}
      )
    ORDER BY i.created_at DESC
    LIMIT 250
  `) as IntakeListRow[];

  return rows.map((row) => ({
    ...mapIntake(row), salesOwner: row.sales_owner, salesUpdate: row.sales_update,
    nextAction: row.next_action, dueOn: row.due_on, account: row.account,
  }));
}

export async function getIntake(id: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, created_at, updated_at, name, phone, email, location, service, details, source_page, referrer, status, notes, email_delivered, jsonb_array_length(photos) AS photo_count FROM estimate_intakes WHERE id = ${id} LIMIT 1
  `) as IntakeRow[];

  return rows[0] ? mapIntake(rows[0]) : null;
}

export async function getIntakeStats() {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT
      count(*)::int AS total,
      count(*) FILTER (WHERE status = 'new')::int AS new,
      count(*) FILTER (WHERE status = 'contacted')::int AS contacted,
      count(*) FILTER (WHERE status = 'quoted')::int AS quoted,
      count(*) FILTER (WHERE status = 'won')::int AS won
    FROM estimate_intakes
  `) as Array<{
    total: number;
    new: number;
    contacted: number;
    quoted: number;
    won: number;
  }>;

  return rows[0] ?? { total: 0, new: 0, contacted: 0, quoted: 0, won: 0 };
}

export async function updateIntake({
  id,
  status,
  notes,
}: {
  id: string;
  status: IntakeStatus;
  notes: string;
}) {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    UPDATE estimate_intakes
    SET status = ${status}, notes = ${notes.slice(0, 5000)}, updated_at = now()
    WHERE id = ${id}
    RETURNING id, created_at, updated_at, name, phone, email, location, service, details, source_page, referrer, status, notes, email_delivered, jsonb_array_length(photos) AS photo_count
  `) as IntakeRow[];

  return rows[0] ? mapIntake(rows[0]) : null;
}

// Call only after admin authentication. Photo content is excluded from list queries.
export async function getIntakePhoto(id: string, index: number): Promise<ProjectPhoto | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`SELECT photos -> ${index}::int AS photo FROM estimate_intakes WHERE id = ${id} LIMIT 1`) as Array<{ photo: ProjectPhoto | null }>;
  return rows[0]?.photo ?? null;
}
