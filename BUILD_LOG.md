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

---

## 2026-08-15 (evening) — Git, GitHub, and first push — real friction, real fixes

**What happened:** Founder's first time ever using Git or GitHub.
Installed Git for Windows (clean install, no complications this time).
Created a GitHub account and a new repository (`anu-mvp`).

Hit two real, self-corrected mistakes:
1. Typed `git add` without the trailing dot, which added nothing — the
   error message itself explained the fix, founder caught it immediately.
2. Forgot to create `.gitignore` before the first commit, so `node_modules`
   (thousands of files) got pushed to GitHub by mistake. Fixed properly
   afterward: created `.gitignore`, ran `git rm -r --cached node_modules`
   to remove it from tracking without deleting it locally, committed, and
   pushed the cleanup. A mid-push network drop ("Could not resolve host")
   was a separate, unrelated hiccup — resolved by simply retrying once
   back online.

**Why it matters:** The repository is now clean — real project files
only, properly excluding `node_modules` on every future push.

---

## 2026-08-15 (evening) — Deployed live: anu-mvp.vercel.app

**What happened:** Created a Vercel account (linked to GitHub), correctly
chose the free Hobby plan over the paid Pro trial that was pre-selected
by default, and imported the `anu-mvp` repository. Skipped 2FA setup for
now (genuinely optional, deferred rather than adding a new phone-app
dependency mid-deployment). Deployed without the Anthropic API key yet
(intentional — the safe fallback means the app works identically either
way), planning to add the real key as its own clean step.

**Result: the project is live at `anu-mvp.vercel.app`** — a real,
public web address, not `localhost` anymore. Confirmed working: same
consent screen, same lesson flow, identical to local testing.

**Why it matters:** This is the moment ANU stopped being "only on my
computer." Any device with the link can now open it — the real
prerequisite for the child actually using this herself, not just the
founder testing it in VS Code.

**Status against Definition of Done:**
- ✅ Real deployment, live and publicly reachable
- ⬜ AI backend still not activated (see below)
- ⬜ The actual child still hasn't used it yet

---

## 2026-08-15 (evening) — AI backend activation blocked by a real platform bug, paused

**What happened:** Attempted to activate the real Claude-powered backend
(api/classify-answer.js) by creating a paid Anthropic Console account and
API key. Hit a genuine, confirmed platform issue, not a user error:

1. First attempt (original account) — blocked because the account had
   defaulted to a "Team" organization type, which requires Anthropic's
   Sales team to approve a Trust & Security questionnaire before prepaid
   credits can be purchased. Confirmed via Anthropic's own support chat.
2. Second attempt (fresh individual account, different email, Incognito
   window) — avoided the Team/T&S issue entirely, reached the actual
   payment screen, but the bank's OTP verification page consistently
   showed "$0.00" instead of the real amount ($5.90), and the payment
   failed both times it was attempted.
3. Ruled out the card/bank as the cause — the same SBI card had
   previously worked for an international USD transaction with Anthropic
   (a Claude Pro subscription), suggesting the bug is specific to the
   Console's prepaid-credit checkout flow, not the card or bank.
4. Tried a second, different card (Mastercard) on the same fresh
   individual account — got a third, distinct failure: a generic "check
   your card" rejection, despite the card details being verified correct
   twice. Three different failure modes, across two accounts and two
   cards, now points clearly to a systemic issue in Anthropic's Console
   payment flow — most likely specific to how it handles Indian cards or
   OTP verification for this particular checkout — rather than anything
   fixable on the user's side.

**Why it matters:** This is real, useful diagnostic work, not a dead
end — the next attempt (whenever that is) won't need to repeat any of
this troubleshooting. The exact failure point is known precisely.

**Decision:** Paused activating the real AI backend for now, rather than
continuing to retry against a confirmed platform bug. This does NOT
affect anything else — the live site (anu-mvp.vercel.app) continues
working exactly as before, using the same safe fallback behavior it's
had all along. Nothing built tonight is at risk.

**What's next:** Either wait and retry the Console credit purchase
another day (platform bugs like this are often fixed within days), or
report it directly to Anthropic support with the specific details above.
No urgency — the fallback keeps the app fully functional in the meantime.
Beyond that: get the actual child using the live site for the first
time, and/or continue expanding content (Physical Features, next
Himalayan sections).

**Decision maker:** Founder (Purna) throughout — chose to build this
personally from Sprint 0 through live deployment, chose to pause on the
payment bug after thorough, methodical troubleshooting rather than
either giving up early or over-retrying, and made every real product,
budget, and sequencing decision along the way with Claude researching
and verifying rather than recommending from memory.

---

## 2026-08-18/19 — AWS Bedrock path pursued, real progress, blocked on Anthropic authorization

**What happened:** Picked up the "AWS Bedrock identified as the real
alternative path" note from 2026-08-15. Created a fresh AWS account
(anu-mvp, account ID 131540502561), completed KYC (Product development /
Individual), and verified payment via UPI AutoPay. Confirmed the ₹15,000
UPI mandate shown during setup is an RBI-mandated ceiling on recurring
autopay, not an actual charge — real billing stays usage-based.

Found Bedrock's Model catalog (region ap-south-2, Hyderabad) genuinely
lists Claude models — Opus 5, Sonnet 5, Opus 4.7, Sonnet 4.5, Haiku
4.5 — all serverless. Sonnet 4.5 identified as the right starting model:
proven, cheaper than Opus-tier, easy to upgrade later since the AI
provider already lives in one isolated file (api/classify-answer.js, per
AI-002 model abstraction from Sprint 3).

**Blocked:** Anthropic's required one-time "submit use case details"
form (needed before any Claude model can be invoked on Bedrock) failed
with "Your account is not authorized to perform this action" — a
new-account authorization hold, not a form-filling error. Researched the
issue and found it's a known, documented AWS India-specific problem
affecting multiple accounts (per AWS re:Post community threads), with
no public self-service fix — real precedent showed resolution times
ranging from a few days to two-plus weeks. Filed a real AWS Support case
(Account and Billing → Account → Other Account Issues, General
question, Web). Case confirmed registered and pending.

**Why it matters:** This is the same underlying blocker as the
2026-08-15 Anthropic Console payment bug — the AI backend still isn't
live via this path — but diagnosed through a different provider with a
clearer, trackable resolution path (an actual support ticket).

**What happened next:** While the AWS case remained pending, discovered
the Anthropic Console account already had a genuine $5.00 credit balance
(a real successful $5 purchase, not a free trial) — separate from the
earlier-blocked $20 purchase attempts. This unblocked the original,
simpler path immediately, making the AWS Bedrock route no longer
urgent (left running in the background, not abandoned).

**Decision maker:** Founder (Purna) throughout — chose to pursue the
AWS path already flagged in the roadmap rather than keep retrying the
blocked Anthropic Console checkout, personally filed the support case,
and caught the existing $5 balance that reopened the simpler path.

---

## 2026-08-19/20 — AI backend genuinely activated: API key generated, wired in, and deployed

**What happened:** Using the existing $5.00 Anthropic Console credit
balance, set a $5 monthly spend limit as a safety ceiling, then
generated a real API key (`anu-mvp-production`, no expiration — chosen
deliberately over a time-limited key, since an expiring key risked
silently breaking the live site for the child with no obvious cause).

Added the key to two separate places, both required:
1. Local `.env` file (`ANTHROPIC_API_KEY=...`) — confirmed already
   correctly excluded from Git via the existing `.gitignore` (set up
   back on 2026-08-15, still working correctly).
2. Vercel's Environment Variables (Production and Preview) — triggered
   Vercel's own "Redeploy" flow, which rebuilt and deployed the live
   site with the key included.

**Why it matters:** This is the actual moment `api/classify-answer.js`
went from "built but not live" (its status since 2026-08-15) to
genuinely deployed with real credentials.

---

## 2026-08-20 — AI backend confirmed genuinely live, with an honest finding

**What happened:** Resolved real confusion about whether
`api/classify-answer.js` was actually calling Claude after deployment.
Added temporary `console.log` "STEP" markers to the function and
redeployed via `git add` / `git commit` / `git push` (confirmed Vercel
auto-deploys from GitHub on push, no manual redeploy click needed).
Vercel Runtime Logs showed execution reaching `STEP 6: success`, meaning
a real response was received and parsed from Claude.

Anthropic Console's own billing dashboard stayed at $0.00 spent
throughout, which caused real, justified doubt — not blind trust. A
direct Playground test (same account, same key) confirmed the account
and key both work correctly and immediately compute cost (≈$0.000086
for a one-word test), while the dashboard's spend figure still didn't
visibly update. Concluded the Console's billing display has a real
display lag/bug, unrelated to whether the app's calls are succeeding —
ruled out with a controlled comparison test, not assumed.

**Final, undeniable confirmation:** inspected the browser's own Local
Storage directly (`anu_learning_events_v1`, via DevTools → Application)
after triggering a real wrong-answer attempt on the live site. Found
the actual stored event:

```
conceptId: "himalayas-intro"
errorType: "knowledge_gap"
eventType: "attempt"
wasCorrect: false
```

This is first-hand data written by the app itself — not a log, not a
dashboard, not inferred. Confirms the full path genuinely works:
learner answers wrong → app calls `/api/classify-answer` → function
calls Claude → Claude classifies the error → classification is
correctly stored in learner memory.

**Honest finding, equally important:** re-reading `LessonEngine.jsx`
confirmed that `errorType` is currently used ONLY inside `logEvent()` —
it has no effect on anything the child sees in that same session. The
"switch to a different explanation" behavior a learner experiences is
triggered purely by `wasCorrect` (right/wrong), completely independent
of what Claude classified the error as. So: the AI backend is real and
working, but its current real-world effect is invisible — it only
feeds data that could influence a *future* session via
`getPreferredRepresentation()`, not anything visible right now. This
was found by directly interrogating the running app's own data, not
assumed from logs or dashboards.

**Why it matters:** This is a meaningfully different, more honest
status than "AI backend is live" alone would suggest. Live and correct
≠ visibly useful to the child yet. Both facts are true and both belong
in this log.

**Status against Definition of Done, current:**
- ✅ Representation-switch confirmed
- ✅ Richer interaction type (drag/tap match) confirmed
- ✅ Teach-before-test enforced everywhere
- ✅ Real per-learner memory and personalization (MEM-001, LRN-001–005)
- ✅ Real delayed-recall checking (PED-005)
- ✅ Real AI-backed answer classification — CONFIRMED LIVE (upgraded
  from "code complete, not yet live")
- ⬜ AI classification doesn't yet visibly change anything the child
  experiences in-session (see ROADMAP.md)
- ⬜ Natural voice / real character art — still needs its own paid
  services, backend infrastructure now exists
- ⬜ The actual child still hasn't used any of this — only the founder,
  as reviewer and tester, throughout

**What's next (see ROADMAP.md):** decide how/whether `errorType`
should actually change something visible in the SAME session. Not yet
decided or built. Beyond that: get the actual child using the live,
AI-powered site for the first time — the real, final test this whole
project has been building toward.

**Decision maker:** Founder (Purna) — refused to accept dashboard
numbers or log summaries as sufficient proof, pushed for direct
verification via Playground comparison and browser storage inspection,
which is what actually surfaced both the confirmation and the honest
gap.

---

## 2026-08-21/22 — Natural voice: Sarvam AI chosen, tested, code written — not yet deployed

**What happened:** Researched real text-to-speech providers against
specific requirements: neutral BBC-style English accent, natural
Telugu (not a foreign accent reading Telugu script), and genuine cost-
effectiveness with no repeated charge for already-generated content.
Compared Sarvam AI against ElevenLabs directly. Chose Sarvam for three
concrete reasons: INR-native billing (avoids repeating the exact kind
of USD-checkout payment bug that cost real days with Anthropic's
Console earlier this project), no commercial-use restriction on its
free tier (ElevenLabs' free tier explicitly prohibits this, which would
have forced a provider switch right when Phase 2 paying families
arrived), and DPDP/India data compliance, relevant given this handles a
child's data.

Created a Sarvam account (Founder role selected during onboarding, 100
free credits), generated a real API key, saved it safely to `.env` and
Vercel. Tested via Sarvam's own developer docs "Try it" button first
(confirmed the API key and connection work — real 200 response with
audio data), then found the actual listening Playground (a separate
page from the docs) and heard the real voice for the first time —
described honestly as "its ok," not glowing, a real starting point to
refine later rather than a finished answer.

**Cost architecture built in from the start, not added later:** wrote
`api/generate-speech.js` (same safe backend pattern as
`api/classify-answer.js` — the Sarvam key never reaches the browser),
and updated `LessonEngine.jsx`'s `speak()` function to check
`localStorage` for a previously-generated version of the exact same
sentence before ever calling Sarvam again — a genuine first step toward
the "generate-once, cache-forever" architecture designed earlier,
though honestly still limited to one browser/one child, not yet the
full cross-family shared cache (that still needs Supabase, already
listed as a gap). The old robotic browser voice was kept, renamed
`speakFallback()`, and now only runs if the real Sarvam call fails for
any reason — the lesson can never break because of this, same safety
pattern as the AI classification work.

**A real mid-session correction, worth recording honestly:** the first
attempt to paste the new `LessonEngine.jsx` code didn't actually take —
a check afterward showed the file still contained the old `speak()`
function with no `speakFallback` or Sarvam call anywhere in it. Caught
by asking the founder to search the file for two specific expected
lines before proceeding, rather than assuming the paste worked. Second
attempt confirmed correct both pieces present.

**Status: code is written and saved locally, but NOT yet committed or
pushed.** While staging the change (`git add .`), the terminal output
showed line-ending warnings for hundreds of files inside
`node_modules` — files that should be permanently excluded from git
per the `.gitignore` fix already documented in this log on 2026-08-15.
This suggests that protection may have been lost or changed somehow
since then. Session paused here, deliberately, rather than proceeding
to commit and push without checking — nothing has been committed, the
live site is completely unaffected and safe. **What's next:** check the
actual contents of `.gitignore` before any further git commands.

**Decision maker:** Founder (Purna) — chose Sarvam after being walked
through a fair comparison rather than a single recommendation, caught
the payment-bug parallel with ElevenLabs' USD billing himself, asked
directly whether Sarvam calls cost credits every time (a good instinct
that led to the caching design being added the same session rather
than left for later), and paused the git push himself rather than
proceeding past an unexplained warning.