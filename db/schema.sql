-- ============================================================
-- ANU MVP — Database Schema (Sprint 0)
-- Target: Supabase (Postgres)
-- Traces to: SAFE-001/002/003, MEM-001/002/003, LRN-001-005,
--            CNT-001-005, EVID-001/002, JRNY-008
--
-- HOW TO USE (for your brother):
--   1. Create a free project at supabase.com
--   2. Open the SQL editor in the Supabase dashboard
--   3. Paste this whole file in and run it
--   4. Supabase gives you a project URL + API key afterwards —
--      those go in the app's .env file (see README.md)
-- ============================================================

-- ---------- Guardians (parents) ----------
-- [SAFE-001] No child data is created without a guardian row
-- existing first, and consent_given_at being non-null.
create table guardians (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

-- ---------- Consent log ----------
-- [SAFE-001] Verifiable consent captured before ANY child data exists.
-- Kept as an append-only log, never overwritten, so there is always
-- a record of what was agreed to and when (DPDP-relevant).
create table consent_records (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references guardians(id),
  learner_name text not null,          -- child's first name only, stored here
  consent_text_version text not null,  -- which version of the consent wording was shown
  consent_given boolean not null,
  consent_given_at timestamptz not null default now(),
  ip_address text,                     -- optional, for audit only
  created_at timestamptz not null default now()
);

-- ---------- Learners (children) ----------
-- Created ONLY after a matching consent_records row exists.
-- [SAFE-002] Minimal fields — no unnecessary personal data collected.
create table learners (
  id uuid primary key default gen_random_uuid(),
  guardian_id uuid not null references guardians(id),
  consent_record_id uuid not null references consent_records(id),
  display_name text not null,          -- first name or nickname only
  grade_band text not null,            -- e.g. 'class-4'
  preferred_language text not null default 'en',
  created_at timestamptz not null default now()
);

-- ---------- Content: chapters & concept graph ----------
-- [CNT-003] Human-curated, reviewer-signed-off content only.
-- One row per chapter (e.g. "Himalayas"), concept_graph holds the
-- curated JSON structure (see src/content/himalayas-concept-graph.json
-- for the shape).
create table chapters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,               -- e.g. 'Geography'
  grade_band text not null,
  language text not null default 'en',
  concept_graph jsonb not null,
  reviewed_by text,                    -- [CNT-003] human reviewer name
  reviewed_at timestamptz,             -- null = NOT yet approved for use
  created_at timestamptz not null default now()
);

-- ---------- Learning events (event-sourced, immutable) ----------
-- [MEM-001] Source of truth. Never updated, only inserted.
-- One row per meaningful thing that happened: a question asked,
-- an answer given, a hint used, a method switch, a teach-back, etc.
create table learning_events (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references learners(id),
  chapter_id uuid not null references chapters(id),
  concept_id text not null,            -- matches an id inside concept_graph
  event_type text not null,            -- 'attempt' | 'hint_used' | 'method_switch' |
                                        -- 'teach_back' | 'delayed_recall' | 'transfer_check'
  payload jsonb not null,              -- free-form details of what happened
  -- [ASM-001-003] error classification, kept separate from raw correctness
  was_correct boolean,
  error_type text,                     -- 'knowledge_gap' | 'expression_only' | null
  created_at timestamptz not null default now()
);

-- ---------- Mastery snapshots (materialized, fast to read) ----------
-- [MEM-002] Recomputed periodically from learning_events so the app
-- never has to replay the full event log just to show progress.
create table mastery_snapshots (
  learner_id uuid not null references learners(id),
  concept_id text not null,
  chapter_id uuid not null references chapters(id),
  mastery_level text not null default 'not_started',
  -- 'not_started' | 'trying' | 'shaky' | 'solid' | 'confirmed_by_delay'
  hints_needed_trend text,             -- 'decreasing' | 'flat' | 'increasing'
  last_practiced_at timestamptz,
  last_delayed_recall_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (learner_id, concept_id)
);

-- ---------- Evidence Registry ----------
-- [EVID-001] Every founder/product decision's evidence basis, logged.
create table evidence_registry (
  id uuid primary key default gen_random_uuid(),
  claim text not null,
  evidence_level text not null,
  -- 'research_supported' | 'source_supported' | 'expert_recommendation'
  -- | 'product_hypothesis' | 'learner_observation' | 'unknown'
  related_requirement_ids text[],      -- e.g. {'PED-002','JRNY-008'}
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- Row-level security (turn on before any real data) ----------
-- [SAFE-002] A guardian/learner should only ever see their own rows.
-- These are switched ON but policies are left for your brother to
-- finish once real login (Supabase Auth) is wired up — placeholder
-- comments show where each policy goes.
alter table guardians enable row level security;
alter table consent_records enable row level security;
alter table learners enable row level security;
alter table learning_events enable row level security;
alter table mastery_snapshots enable row level security;

-- TODO (brother): once Supabase Auth is set up, add policies like:
-- create policy "guardians see own data" on guardians
--   for select using (auth.uid() = id);
