import "server-only";

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
>;

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
};

type SqlClient = ReturnType<typeof neon>;

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
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_intakes_created_at_idx
        ON estimate_intakes (created_at DESC)
      `;
      await sql`
        CREATE INDEX IF NOT EXISTS estimate_intakes_status_idx
        ON estimate_intakes (status)
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
  };
}

export async function recordIntake(input: NewIntake) {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO estimate_intakes (
      id, name, phone, email, location, service, details, source_page, referrer
    ) VALUES (
      ${input.id}, ${input.name}, ${input.phone}, ${input.email},
      ${input.location}, ${input.service}, ${input.details},
      ${input.sourcePage}, ${input.referrer}
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      phone = EXCLUDED.phone,
      email = EXCLUDED.email,
      location = EXCLUDED.location,
      service = EXCLUDED.service,
      details = EXCLUDED.details,
      source_page = EXCLUDED.source_page,
      referrer = EXCLUDED.referrer,
      updated_at = now()
    RETURNING *
  `) as IntakeRow[];

  return mapIntake(rows[0]);
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
    SELECT * FROM estimate_intakes
    WHERE (${status} = 'all' OR status = ${status})
      AND (
        ${normalizedSearch} = '' OR
        name ILIKE ${like} OR
        email ILIKE ${like} OR
        phone ILIKE ${like} OR
        location ILIKE ${like} OR
        service ILIKE ${like}
      )
    ORDER BY created_at DESC
    LIMIT 250
  `) as IntakeRow[];

  return rows.map(mapIntake);
}

export async function getIntake(id: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT * FROM estimate_intakes WHERE id = ${id} LIMIT 1
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
    RETURNING *
  `) as IntakeRow[];

  return rows[0] ? mapIntake(rows[0]) : null;
}
