# ANU MVP

A working, adaptive learning app for one child — built solo, evening by
evening, starting from a Sprint 0–2 starter skeleton and genuinely
extended since. This file describes what's real *today*, not the
original handoff state. See `BUILD_LOG.md` for the full dated history of
how it got here, and `ROADMAP.md` for what's been raised but not yet
built.

Live at: **anu-mvp.vercel.app**

## What actually works right now

- `db/schema.sql` — a complete Supabase database schema: guardians, consent
  records, learners, chapters, event-sourced learning log, mastery
  snapshots, and an evidence registry table. Traces to SAFE-001–003,
  MEM-001–003, CNT-001–005, EVID-001. **Not yet connected** — see
  "What's still stubbed" below.
- `src/components/ConsentGate.jsx` — a real, working consent flow. Nothing
  about a child is written anywhere until this completes.
- `src/components/LessonEngine.jsx` — the real adaptive loop: teach a
  concept, ask a tap-only question, and if the answer is wrong, switch to
  a **different representation** of the same idea rather than repeating
  it. Tracks hints used and logs every event. This is the real heart of
  the project (PED-001–005, ASM-001–003).
- `src/lib/learnerMemory.js` — **real, working per-child memory**, not a
  placeholder. An actual event log (localStorage-backed) plus two real
  functions: `getPreferredRepresentation()` (which teaching style
  actually worked for THIS learner on THIS concept last time) and
  `getConceptsDueForRecall()` (real delayed-recall checking). Wired into
  LessonEngine so a concept genuinely starts from what worked for her
  before. This is the piece that makes ANU adaptive rather than just a
  content viewer — built 2026-08-15, see BUILD_LOG.md for why it was
  flagged as missing and then fixed.
- `api/classify-answer.js` — **real, working code, and CONFIRMED LIVE**
  as of 2026-08-20. A genuine Vercel serverless function that calls
  Claude to judge whether a wrong answer reflects a real knowledge gap
  or just an expression issue, with a safe fallback (old behavior) if
  the call fails. Verified end-to-end via direct browser storage
  inspection (real `errorType` values present in stored learner
  events) — see BUILD_LOG.md for the full verification process. Note:
  the classification is currently stored but does not yet change
  anything visible to the learner in the same session — see
  ROADMAP.md.
- `src/components/ReadAlongPhrases.jsx` and `MapWalkthrough.jsx` — real
  read-along accommodation with a walking map companion, auto-paced,
  using real Indian geospatial data (DataMeet, CC-BY-4.0) rather than a
  hand-drawn sketch.
- `src/content/himalayas-concept-graph.json` — real, textbook-sourced
  content (Class 4 Social Studies, pages 250–258), human-reviewed
  (CNT-003) by the founder before use.
- `src/App.jsx` — wires all of the above into one flow, live and
  publicly reachable.

## What's still genuinely stubbed (and why)

- **Permanent storage (Supabase)** — the schema in `db/schema.sql` is
  real and complete, but nothing writes to it yet. `learnerMemory.js`'s
  event log is genuinely real, just localStorage-backed — meaning it
  works, but only on one browser/device, and isn't backed up anywhere.
  This matters more now that real AI-classified data is being generated
  and stored only locally.
- **Verifiable guardian identity** — the consent form captures clear,
  logged consent, but doesn't yet prove the adult filling it in really is
  the parent (e.g. via OTP). Fine for the founder's own family; needs
  real verification before any other family's child uses this.
- **The AI classification doesn't yet change anything visible** — Claude
  correctly judges each wrong answer, but `LessonEngine.jsx` currently
  only logs that judgment; it doesn't yet use it to alter tone, pacing,
  or which representation shows next (that's driven purely by
  right/wrong today). See ROADMAP.md.
- **Natural AI voice / real character art** — both need their own paid
  services on top of the now-live backend. Not started.

## First steps for anyone picking this up

1. `npm install`
2. Create a free project at [supabase.com](https://supabase.com), run
   `db/schema.sql` in its SQL editor, and copy the project URL + API key
   into a new `.env` file. (Not yet done in the live deployment — see
   above.)
3. `npm run dev` to see the consent flow → adaptive lesson flow running
   locally, using the real learnerMemory.js system.
4. The AI provider key already lives in `.env` (`ANTHROPIC_API_KEY`) and
   in Vercel's Environment Variables for the live deployment — confirmed
   working as of 2026-08-20. If rotating or replacing the key, update
   both places.
5. Read `BUILD_LOG.md` in full before changing anything — it explains
   *why* things are built the way they are, including real dead ends
   already tried, so they aren't repeated.

## What this is not

A finished, hosted, production system ready for children outside the
founder's own family. Permanent storage and real guardian identity
verification still need to land before that's true. The AI backend is
live and confirmed working, but its practical value to a learner is not
yet fully realized — see ROADMAP.md. See ROADMAP.md also for the
longer-term vision (individual → paying urban families → rural/
government schools, in that order, once the business can sustain it)
and what's been deliberately deferred until each phase is actually
reached.