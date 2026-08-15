# ANU MVP — Starter Code

Built as a head start for Sprints 0–2 of the Technical MVP Specification v1.1.
This is **not a finished app** — it's real, working code your developer can
run today and build forward from, instead of starting from a blank page.

## What actually works right now

- `db/schema.sql` — a complete Supabase database schema: guardians, consent
  records, learners, chapters, event-sourced learning log, mastery
  snapshots, and an evidence registry table. Traces to SAFE-001–003,
  MEM-001–003, CNT-001–005, EVID-001.
- `src/components/ConsentGate.jsx` — a real, working consent flow. Nothing
  about a child is written to the database until this completes.
- `src/components/LessonEngine.jsx` — the actual adaptive loop: teach a
  concept, ask a tap-only question, and if the answer is wrong, switch to a
  **different representation** of the same idea rather than repeating it.
  Tracks hints used and logs every event. This is the real heart of the
  project (PED-001–005, ASM-001–003).
- `src/content/himalayas-concept-graph.json` — one worked example of what
  human-curated content (CNT-003) looks like in practice, with two concepts
  from the Himalayas chapter.
- `src/App.jsx` — wires the above together into one flow you can actually
  click through.

I checked all of this compiles cleanly together before handing it over.

## What's intentionally stubbed (and why)

- **The AI error-classification call** (`classifyError` in
  `LessonEngine.jsx`) is a placeholder. The real version must call an AI
  model (e.g. Claude) from **your own backend server, never directly from
  the browser** — putting an API key in front-end code exposes it to
  anyone who opens developer tools. There's a `TODO` comment showing
  exactly where this goes.
- **Database writes** (`logEvent` in `LessonEngine.jsx`, and the consent
  record in `App.jsx`) currently just `console.log` instead of writing to
  Supabase. There's a `TODO` at each spot showing the real Supabase call
  to add once the project is connected.
- **Verifiable guardian identity** — the consent form captures clear,
  logged consent, but doesn't yet prove the adult filling it in really is
  the parent (e.g. via OTP). Fine for early testing with your own family;
  add real verification before any other family's child uses this.

## First steps for your developer

1. `npm install`
2. Create a free project at [supabase.com](https://supabase.com), run
   `db/schema.sql` in its SQL editor, and copy the project URL + API key
   into a new `.env` file.
3. `npm run dev` to see the consent flow → lesson flow running locally.
4. Fill in `reviewedBy` / `reviewedAt` in
   `src/content/himalayas-concept-graph.json` to unlock the demo lesson
   (this gate is intentional — see CNT-003).
5. Work through the `TODO` comments in `LessonEngine.jsx` and `App.jsx` in
   order — each one is a real next step, not busywork.

## What this is not

This is a starting skeleton, not a secure, hosted, production system. Real
deployment (Vercel/similar), a real backend endpoint for the AI calls, real
identity verification, and ongoing security review all still need to
happen before any child outside your own family uses this.
