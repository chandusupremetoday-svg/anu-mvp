# ANU — Build Log

This file is a plain-language diary of what was done, when, and *why* — kept
so that if anyone else (a hired developer, your brother, anyone) ever needs
to pick this project up, they can read this and understand the reasoning,
not just the code. Add a new dated entry every time something meaningful
happens — a decision, a fix, a milestone. Keep entries short and honest,
including the confusing parts.

Format for each entry: **Date — What happened — Why — What's next**

---

## 2026-08-13 — Sprint 0 environment setup, completed

**What happened:** Installed Node.js and VS Code on the founder's own
Windows machine (D drive). Hit two real snags along the way:
1. The Node.js installer's optional "install native build tools" checkbox
   triggered a large, unrelated Chocolatey/Python/Visual Studio Build
   Tools installation. Not harmful, just unnecessary for this project —
   left to finish in the background rather than interrupted.
2. The starter code (provided by Claude) was missing three files Vite
   needs to actually run a React app: `index.html`, `src/main.jsx`, and
   `vite.config.js`. This was Claude's mistake, not the founder's — it
   was caught because Vite printed a warning instead of quietly failing.
   Fixed by adding the three files.

**Why it matters:** Confirmed the whole toolchain — Node.js, npm, Vite,
React — works end-to-end on the founder's own machine, without needing
anyone else's help. The consent screen (ConsentGate.jsx, SAFE-001)
rendered correctly in the browser at `localhost:5173`.

**Decision maker:** Founder (Purna), guided by Claude, working solo —
founder chose to build this personally rather than hand off to another
developer at this stage, with the understanding that any use beyond his
own family requires an independent safety/security review first.

---

## 2026-08-14 — Sprint 1 & real end-to-end test, completed

**What happened:** Received the real Himalayas chapter from the actual
Class 4 Social Studies textbook (photos of pages 250–258). Replaced the
earlier demo content with three real, page-sourced concepts (intro,
location, climate), each traced to an exact page reference. Founder
reviewed and approved the content personally as the human reviewer
(CNT-003) — filled in `reviewedBy`/`reviewedAt` himself.

Ran two real tests: answered every question correctly (reached the
lesson-complete screen, including a JRNY-008 teach-back prompt), then
deliberately answered wrong on everything (confirmed the app switches
from written to narrated explanation instead of repeating itself —
PED-003 — on every concept).

**Why it matters:** First real evidence the adaptive mechanism — the
whole reason ANU exists — works on real textbook content, tested
honestly including the failure path.

**Note on real-world content:** The textbook pages had extensive
teacher-guided pencil underlining and partially completed exercises.
Founder confirmed existing answers might be right or wrong, so they were
NOT used as a baseline — fresh evidence only.

---

## 2026-08-14 (evening) — Hint fix, voice investigation, decision to defer

**What happened:** Fixed a real bug — the hint button tracked clicks but
never showed hint text. Added real, textbook-sourced hints to all three
concepts. Investigated the "robotic voice" concern; updated narration to
auto-pick the best voice already on the founder's computer. Confirmed
this alone isn't enough — natural AI voices need a paid cloud service
and a secure backend, which didn't exist yet.

**Decision:** Defer the natural-voice upgrade rather than build new
infrastructure the same night — matches the project's own
build-narrow-first discipline.

---

## 2026-08-14 (evening) — Richer interaction type: drag/tap region-matching

**What happened:** Founder flagged that the original documents (Matrix
INT-001–003, MEDIA-002) described drag, match, and point interaction,
but only tap/select multiple-choice existed so far. Built a real
drag-and-tap "match the state to its Himalayan zone" activity, sourced
from textbook p.253, connected to the map exercise on p.258. Supports
both real drag-and-drop and tap-to-select.

Hit real friction getting new files onto the founder's machine —
drag-and-drop between File Explorer and VS Code created duplicate,
misplaced files. Resolved by switching to careful full-file copy-paste,
each file verified by Claude before handoff.

---

## 2026-08-14 (late evening) — Teach-before-test fix, full activity confirmed working

**What happened:** Founder caught a real pedagogical gap — the matching
activity tested "Western/Central/Eastern Himalayas" without ever
teaching what those zones meant first, violating the project's own
PED-001 rule. Added a proper teaching step (textbook p.253 content) with
narration, shown before the activity.

First fix attempt failed silently — traced to the dev server/browser not
being fully restarted after file changes. Fixed by explicitly stopping
(Ctrl+C, npm run dev) and hard-refreshing (Ctrl+Shift+R) — this became
the standard restart procedure from here on.

Added local consent persistence (localStorage) so the founder didn't
have to refill the form every session — explicitly a temporary
convenience, not real permanent storage.

Full run confirmed end to end: consent, three concepts with hints, and
teach-then-activity for region matching — all six states placed
correctly, only after the teaching card ran first.

**Status against Definition of Done at this point:**
- ✅ Representation-switch confirmed
- ✅ Richer interaction type confirmed
- ✅ Teach-before-test enforced everywhere, including activities
- ⬜ Hint policy under real (non-founder) use
- ⬜ Delayed recall / transfer
- ⬜ The actual child hasn't used it yet

---

## 2026-08-15 (morning) — Read-along with pictures, founder's own idea

**What happened:** Founder proposed extending yesterday's read-along
suggestion: break a paragraph into small phrases, show a relevant
picture for each as the child reads/listens. Built ReadAlongPhrases.jsx
— phrases highlight in sync with narration (using the browser's
word-boundary timing), each with a small icon. Added a MapWalkthrough
component: a walking companion figure that moves to Ladakh, then
Arunachal Pradesh, as those phrases play, per the founder's own
suggestion of a companion who "stands there and says I am here" like a
teacher pointing at a map.

**Why it matters:** A real, working first version of a genuinely
founder-originated idea, tying together the read-along accommodation,
the MEDIA-001/002 narration work, and the JRNY companion concept from
weeks earlier — the pieces are starting to connect.

---

## 2026-08-15 — Founder caught the real, central gap: no actual memory existed

**What happened:** Founder pushed back hard and correctly: despite two
days of visible feature work (maps, matching activities, read-along),
the actual promise of the project — a system that learns and adapts to
THIS child specifically — had never been built. `logEvent()` was still
just `console.log`; nothing was ever saved or read back; there was no
real per-child memory at all.

Built `src/lib/learnerMemory.js` for real: an actual event log
(localStorage-backed, same honest "temporary, not permanent" pattern as
consent), plus two real functions — `getPreferredRepresentation()`
(which representation type actually worked for THIS learner on THIS
concept last time) and `getConceptsDueForRecall()` (real delayed-recall
checking, not a placeholder message). Wired both into LessonEngine so
a concept now genuinely starts with whatever worked for her before, and
the completion screen shows genuinely due recall checks, not fixed text.
Tested the logic directly (not just compiled) with a simulated session
to confirm two different learners get different starting points.

**Why it matters:** This is the moment the project stopped being "a
well-built content delivery app" and started being what the documents
actually described — MEM-001, LRN-001–005, PED-004/005 made real, not
just designed on paper.

---

## 2026-08-15 — Pacing and image-size correction, real map data

**What happened:** Founder gave two more real corrections: requiring a
tap for every single phrase was itself tiring ("no need to click those
many times"), and the pictures were too small to matter. Also asked
whether real maps could be pulled from authorised/official sources
rather than a hand-drawn sketch.

Researched open Indian geospatial data and found DataMeet's
india-land-simplified.geojson (CC-BY-4.0, properly open-licensed).
Projected India's real northern border and the real coordinates of
Ladakh and Arunachal Pradesh into the map component, replacing the
earlier hand-drawn approximation — genuinely sourced, not guessed.

Rebuilt ReadAlongPhrases as comfortably auto-paced: one tap to begin,
then it plays through on its own — narrating, showing a much bigger
picture or the real map, pausing naturally, advancing — with pause,
replay, and jump-to-any-phrase always available but never required.

---

## 2026-08-15 — Reference videos, and the real production-scale conversation

**What happened:** Founder shared two AI-generated reference videos — a
photorealistic AI avatar presenter, and a Pixar-quality animated
children's short — as the real quality bar being aimed for. Had an
honest conversation about the real gap: that level of character
animation is a different production pipeline (paid AI video generation
or real animation/art collaborators), not something buildable solo in a
code editor in one sitting.

**Key insight reached together:** all three of the founder's "bigger
vision" asks — a real thinking AI brain, natural voice, real character
art — are blocked by the exact same missing piece: nothing in the app
can safely hold a paid API key, because browser code is visible to
anyone. The real next step is one shared piece of infrastructure: a
small private backend server.

---

## 2026-08-15 (afternoon) — Real backend built: Claude-powered answer classification

**What happened:** Researched and confirmed current, real Claude API
pricing (Haiku 4.5: $1 input / $5 output per million tokens) rather than
guessing. Estimated real cost for ANU's actual usage pattern at a
fraction of a rupee per question — genuinely cheap for a single family.

Built `api/classify-answer.js` — a real Vercel serverless function that
calls Claude to make an actual judgment (knowledge_gap vs
expression_only) on a wrong answer, replacing the fixed placeholder
that's been sitting there since Sprint 3. Wired it into LessonEngine.jsx
with a safe fallback (same old behavior) if the backend isn't deployed
or the call fails — the lesson can never break because of this.

Gave founder clear steps to create his own Anthropic Console account and
API key — the one part Claude cannot do on the founder's behalf, since
it requires his own email and payment details.

**Status: code is real and verified, but NOT yet live.** It won't
actually think using Claude until two more things happen: the founder's
API key exists, and the project is deployed somewhere on the internet
(Vercel) instead of only running on his own laptop. Deliberately
deferred to its own careful session rather than rushed into the same
night.

---

## 2026-08-15 (afternoon) — DeepSeek considered and declined, for now

**What happened:** Founder, budget-conscious as a beginner, asked
whether DeepSeek's cheaper API could replace Claude, both now and at
future scale. Researched real 2026 pricing (DeepSeek genuinely
7–18× cheaper) — but at ANU's real usage pattern, both costs are
negligible for one family; the saving is invisible in practice at this
scale.

Checked India-specific status: DeepSeek is not banned for private or
developer use in India, but India's own Finance Ministry has advised
against its use for confidential data over real data-confidentiality
concerns — a meaningful signal given this project's whole standard of
care around a child's data (DPDP consent, SAFE-001–003).

**Decision:** Stay with Claude for now — cost difference is real but
meaningless at this scale, and Anthropic's data practices are something
Claude could speak to directly; DeepSeek's would need separate legal
verification not responsible to skip. Revisit at real scale (lakhs of
children), with a proper privacy review at that time — not as a
cost-saving shortcut now. This was possible to defer cleanly because the
AI provider lives in exactly one file (api/classify-answer.js, per
AI-002 model abstraction) — swapping later is a contained change, not a
rewrite.

**Safety step:** Founder is setting a hard $10/month spending cap in the
Anthropic Console (Settings → Billing → Usage limits) before going live
— real usage is expected to land far under this; the cap is a safety
ceiling against bugs, not a usage forecast.

**Status against Definition of Done, current:**
- ✅ Representation-switch confirmed
- ✅ Richer interaction type (drag/tap match) confirmed
- ✅ Teach-before-test enforced everywhere
- ✅ Real per-learner memory and personalization (MEM-001, LRN-001–005)
- ✅ Real delayed-recall checking (PED-005)
- ✅ Real AI-backed answer classification, code complete and verified
- ⬜ Backend not yet deployed — no live AI judgment yet
- ⬜ Natural voice / real character art — identified as needing the same
  backend infrastructure, not yet built
- ⬜ The actual child still hasn't used any of this — only the founder,
  as reviewer and tester, throughout

**What's next:** Founder's call — deploy the backend to Vercel (the next
real infrastructure milestone), or continue content/feature work first.

**Decision maker:** Founder (Purna) throughout, with Claude researching
and verifying rather than recommending from memory on anything involving
real cost or regulatory status.