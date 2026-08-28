# ANU — Roadmap & Idea Backlog

This is the companion file to BUILD_LOG.md. That file records what's
already happened. This one records what we've agreed is genuinely good
but haven't built yet — so nothing gets lost in a long, ongoing
conversation. Add to this the moment an idea is raised and set aside,
not after. Move an item to BUILD_LOG.md (and delete it from here) once
it's actually built.

---

## Pedagogical patterns to apply more broadly
**Real engagement needs visuals, not just voice** (founder's observation,
2026-08-22, while testing the new AI-explained voice narration) — even
a genuinely well-written spoken explanation isn't enough on its own to
make a young child want to sit with the app. Voice alone can feel flat
without something to look at — the founder specifically flagged
pictures/animation/video as the missing piece for real engagement, not
polish for its own sake. This is a real, separate, larger direction —
likely closer to the six-beat narrative arc and visual-grammar ideas
below than to a quick UI tweak. Needs its own design pass once voice
and text are both solid, not attempted as a fast follow-on to a voice
fix.

**Comparative-scale building** (founder's idea, 2026-08-16) — instead of
just reading "the Himalayas are the tallest," physically build a
sequence of increasing size (small hill → bigger → bigger → tallest of
all) to make "biggest/most/tallest" something her hands understand, not
just a fact she reads. This is a reusable PATTERN, not a one-off
feature — applies well beyond mountains:
- Civics: build a small→medium→large block pyramid for
  MLA → Chief Minister → Prime Minister, to feel the scale of authority
  the same way as mountain height.
- Hindi opposites (her confirmed hard spot): a seesaw that physically
  tips between two words instead of just reading them side by side.
- Math place value (when we get there): stacking blocks for ones/tens/
  hundreds instead of just reading digits.

**Technical note:** the mountain-drawing version specifically needs a
real drawing/touch canvas — a genuinely bigger build than anything so
far (not a small addition to an existing component). The
pyramid/seesaw versions could likely reuse patterns closer to the
existing MapMatchActivity drag-and-drop, and may be a faster first step
toward the same underlying idea.

**Simulate-the-real-interface** (raised while helping with the
founder's daughter's separate school homework on Windows 10/MS Word,
2026-08-18) — for anything procedural/software-related, a small,
real-feeling, clickable simulation beats a description or a multiple-
choice question about it. Built two working non-ANU prototypes to test
the idea: a live Word-style "Change Case" tool (typing a word and
tapping UPPERCASE/Toggle Case actually transforms it on screen) and a
mini interactive Windows 10 desktop (real right-click context menu,
working Start menu, tabbed Mouse Properties panel). Both let the child
discover the answer by doing it, not by being told it.

**The six-beat narrative arc** (from a Daily Punch history video,
reviewed 2026-08-21) — a strong structural pattern for history/civics
content specifically: a hook (a question, not a fact) → the cause →
historical status → present-day reality (grounded in real photos) →
an honest conflict → resolution/pride. Also worth reusing: a deliberate
visual grammar — real photography signals "this is true, present-day";
AI-generated cinematic scenes signal "historical reconstruction";
illustration signals "emotional/character moment" — three different
visual languages, chosen on purpose, not randomly.

**The interactive quiz-then-recap loop** (from a Seekho phonics video,
same review, 2026-08-21) — teach → an embedded multiple-choice check
with visible feedback → an explicit, warm recap ("let's revise this
once more"). Distinct from the code-switching language finding below —
this is about interaction rhythm, not language choice.

**Self-explanatory illustrations — picture-led vs. word-led, depending
on the concept** (tested 2026-08-20/21). Prototyped several illustrated
"story" explanations (a water-droplet character for the water cycle, a
leaf character for photosynthesis, animals literally eating each other
for a food chain) and tested them with real family reactions, not just
guessed at. Real finding, confirmed by a genuine test: **concepts built
on a physical action the child has already seen (eating, catching,
biting) work brilliantly picture-only** — the food chain illustration
was understood at a glance by an adult and correctly explained back by
the child unprompted. **Abstract concepts with no lived physical
equivalent (photosynthesis) do NOT work picture-only** — the first two
attempts needed real family testing to reveal this, and only a version
that directly compared the abstract process to something the child
already trusted (her own eating leading to energy) showed promise. Also
learned: the picture needs a visible RESULT (something food-like
actually appearing), not just abstract inputs and a glow — an early
version failed for exactly this reason.
**Design rule going forward:** match format to concept type. Concrete/
action-based concepts can lean picture-first with light text. Abstract/
process concepts need picture-PLUS-words, not picture-alone — a book
built on "every lesson works the same way" would quietly fail on
exactly the abstract concepts. Not yet decided whether/when to build a
fuller illustrated-lesson library — real, tested, but Phase 1-sized.

**Peer-learning dialogue and an adaptive companion character** (raised
2026-08-21). Two ideas that reinforce each other:
1. **Peer-dialogue moments** — two characters having a short
   conversation about what they learned, dramatizing the app's existing
   teach-back prompt (JRNY-008) rather than just asking the child to
   imagine explaining to a friend. Grounded in the real "protégé
   effect" (explaining to a peer deepens understanding for both sides).
   Two technical paths, very different in cost: full AI-generated video
   of characters talking is expensive and technically immature — real
   Phase-later territory. An illustrated version (same lightweight
   SVG-character style already built and tested for the water cycle,
   photosynthesis, and food chain) paired with cached TTS narration
   (see Infrastructure section below) is buildable now.
2. **A visible companion character** — not a new system, but a face for
   something that already exists: `getPreferredRepresentation()`,
   representation-switching on wrong answers, hints, and warmth
   messages already act like a patient teacher offering multiple
   examples; a consistent illustrated companion would make that
   adaptive behavior visible and felt, not just invisible backend logic.

**How real understanding actually forms across a child's life**
(2026-08-21, corrected). Note on framing: an earlier version of this
idea was mistakenly built up into "ANU should adopt a teacher/friend/
parent/sibling/society mode." That was Claude's overreach, corrected by
the founder immediately — ANU should never simulate or present itself
as any of these real relationships, especially not a parent; a real
child-safety boundary, not a style choice. The actual, narrower
observation: a child doesn't learn a concept once, cleanly, in one
lesson. She absorbs it in fragments across ordinary moments — a
teacher's structured explanation, a friend's offhand comment, a
parent's aside while doing something else, a sibling repeating it
half-teasingly. None of these people are performing a role for her
benefit; she just happens to absorb something real from each, in
passing. Real understanding is built from many small, varied, informal
exposures, not one complete lesson. **Design implications, not yet
built:**
- A concept should genuinely resurface later, worded differently than
  the first time, not just repeated identically.
- A "wrong" answer in a formal quiz moment doesn't necessarily mean no
  understanding at all — real understanding often surfaces more easily
  in looser, lower-stakes moments than in a formal check. Worth
  considering a genuinely informal way to notice this, distinct from
  the formal quiz.
- The underlying concept must stay recognizable no matter how many
  different-feeling moments it resurfaces in.

**Logic-puzzle activities — reference notes from two videos**
(2026-08-21). Reviewed two short teaching videos (@ravirajmaster)
showing physical logic/math puzzles used with real students, explicitly
to extract the underlying teaching pattern, not to copy either video's
content or framing.
- Video 1 — chalk-circle placement puzzle, framed as "only geniuses can
  do this." Video 2 — matchstick equation puzzle, framed neutrally as
  "2 Moves Challenge," no ability-language anywhere.
- **Genuinely worth building on:** hands-on trial beats being told the
  answer (matches existing PED-001); modeling a child's own reasoning
  out loud suggests a second hint style — a guiding QUESTION instead of
  pointing at where the answer is (smaller, more surgical change than
  building new activities, worth trying first); a small library of
  subject-independent logic puzzles could work as a standalone
  "thinking break," reusing patterns close to the existing
  MapMatchActivity.
- **Hard boundary, not a feature to adapt:** "only geniuses can do
  this"-style framing must never appear anywhere in ANU, in any form,
  for any activity — frames success as fixed intelligence rather than a
  learnable skill, a real reputational risk given the scrutiny ANU will
  face, and directly against PRINCIPLES.md's understanding-over-marks
  standard.
- **The bigger idea this surfaced (founder's own insight):** puzzle/
  activity difficulty must be personalized per child, not fixed for
  everyone — connects directly to the multi-grade classroom branching
  idea already in this file (see Open product-vision questions) — same
  underlying mechanism (silently branching by learner level) serves
  both a single child's puzzle difficulty and a whole classroom.
  Concretely, `getStruggleSignal()` and `getPreferredRepresentation()`
  (already real, in learnerMemory.js) are the right existing
  infrastructure to point at this — not yet built, not yet decided when.

**Real design principles from two films researched** (Anaganaga, 35
Chinna Katha Kaadu, 2026-08-21):
- Never leave a genuine question unanswered — something a scripted app
  structurally cannot do, but Claude genuinely can, if a real "ask me
  anything" moment exists separate from the quiz flow.
- A steady, believing presence BEFORE success, not just praise after
  it — matches the existing STRUGGLE_MESSAGES pattern in
  LessonEngine.jsx, worth strengthening deliberately with this framing
  in mind.
- Protect against a child ever feeling reduced to "a zero" in the
  moment of failure — related to, but more specific than, the "only
  geniuses" puzzle-framing boundary above; this one is about the
  FEELING in the moment of a wrong answer specifically, not just the
  framing of an activity.
- Build metaphors from what she already loves — independently
  reinforced by real film research, not a one-off idea; ties to the
  personalized-metaphor idea tied to learnerMemory.js elsewhere in this
  file.

**The "lesson-design engine" idea** (from the very first substantive
ANU conversation of the night, before any AWS/API work started) —
arguably the most important idea in this whole file. A standing,
Claude-powered step that takes any topic, the child's real level, and
her actual memory data, and PROACTIVELY proposes which pattern fits —
comparative-scale for rankable concepts, simulate-the-interface for
procedural ones, the six-beat arc for history, code-switched narration
for language — instead of only reacting when the founder happens to
bring a reference video or an idea. This would be the real architecture
tying every pattern above into one system, rather than a permanently
growing loose list that depends on someone remembering to check it.
Not yet built, not yet decided when — but the single idea most worth
returning to once Phase 1 is further along, since it's the difference
between ANU having a content-design PROCESS versus just a content-
design HISTORY.

---

## Content-creation process (raised 2026-08-16 morning, undecided)

Right now every lesson is built by hand, conversationally — intentional
for the pilot phase (matches the original documents' "human curation
only for now"), but not how this scales to lakhs of children. Real next
step, once the AI backend is live: extend the same secure backend
pattern into a content-DRAFTING function — founder reviews and lightly
edits an AI-made first draft, instead of building from scratch each
time. A human still approves every lesson before a child sees it,
always (CNT-003 doesn't change) — automation speeds up drafting, never
approval. **Founder hasn't decided if/when to build this yet.**

---

## Make errorType actually visible, not just logged (raised 2026-08-20)

The AI backend is confirmed genuinely live (see BUILD_LOG 2026-08-20/22
— live via Anthropic Console directly, not AWS Bedrock). Claude's
real-time classification of a wrong answer (`knowledge_gap` vs
`expression_only`) is computed correctly and stored correctly in
learner memory, but has zero effect on what the child sees in that same
session — confirmed by direct inspection of stored learner events.

**The real gap to close:** decide what SHOULD visibly differ based on
this classification. Candidate ideas, none chosen yet:
- `knowledge_gap` → switch representation (as it already does today,
  but currently for EVERY wrong answer regardless of type) + maybe a
  slightly more patient/slower tone in the narration.
- `expression_only` → she may already understand it — instead of
  immediately switching to a whole new explanation, maybe just a gentle
  "double-check your choice" nudge, keeping the same representation,
  since re-explaining something she already understands could feel
  patronizing or waste her time.

**Not yet decided:** whether this distinction is even worth the added
complexity for the pilot (one child) phase, or whether it matters more
once Phase 2 (paying families) makes tone/pacing differences more
visible across a wider range of children. Flagged here so it isn't
lost, not as a commitment to build now — matches PRINCIPLES.md's
Phase 1 priority (validate with founder's own daughter first).

---

## Natural voice generation, real provider research (raised 2026-08-21)

Blocking dependency (paid backend) resolved — AI backend confirmed
live 2026-08-20/22 via Anthropic Console. Provider chosen and code
written — see BUILD_LOG.md 2026-08-21/22 for full status (code saved
locally, not yet deployed — pending a `.gitignore` check).

**Requirements set by founder:** neutral, BBC-style English accent, not
US-accented; natural-sounding Telugu specifically, not a foreign accent
reading Telugu script; genuinely cost-effective, no per-use charge for
content that's already been generated once.

**Provider chosen: Sarvam AI**, over ElevenLabs, for three concrete
reasons: INR-native billing (avoids repeating the exact kind of
USD-checkout payment bug that cost real days with Anthropic's Console
earlier this project), no commercial-use restriction on its free tier
(ElevenLabs' free tier explicitly prohibits this — would have forced a
provider switch right as Phase 2 paying families arrived), and DPDP/
India data compliance, relevant given this handles a child's data.
Real enterprise trust signals (Tata Capital, SBI Life, LIC, Infosys)
and an independent blind-listening study ranking it top choice added
confidence. Amazon Polly was also researched as a genuinely practical
fallback (already-verified AWS account, no new payment setup needed)
if ever needed.

**The cost architecture — built in from the start:** a "generate-once,
cache-forever" pattern. ANU's actual content is curated and limited
(one chapter, a handful of concepts, 2-3 representations each) — not
infinite user-generated text. `LessonEngine.jsx`'s `speak()` function
now checks browser `localStorage` for a previously-generated version of
the exact same sentence before calling Sarvam again — a genuine first
step toward this architecture, though honestly still limited to one
browser/one child, not yet the full cross-family shared cache (needs
Supabase, see Infrastructure below).

**The multi-variant, "which explanation do most kids respond to" idea**
(founder's own extension) — real and technically sound, but needs
Supabase to work across different children, not just one browser.
**Right-sized Phase 1 version:** generate 2 variants per concept (not
4-5), track which worked for HER specifically. The full "20 of 40
students preferred this one" aggregate version is real Phase 2
territory, once actual multiple-children usage exists to learn from.

---

## Video-review and research session — conclusion (2026-08-21)

Reviewed several short reference videos (two logic-puzzle videos, see
above; a handwriting-drill video; a generic motivation reel) alongside
real research (motivation psychology, tutoring effect sizes, an AI-
tutor RCT in Ghana, Indian private-tuition/"shadow education" studies).
Conclusion, pulled together:

**Handwriting (2026-08-21, not yet a build decision):** confirmed real
and well-documented — English-medium Indian schools often introduce
cursive before age 6, one study found roughly a third of students show
measurable handwriting difficulty, and a documented share of left-
handed children face real pressure to switch hands. **The core
principle worth holding if ANU ever touches this space:** legibility is
the real, teachable skill; cursive beauty is a separate, lower-stakes,
optional thing that shouldn't be forced early, and left-handedness
should never be treated as something to correct.

**Motivation and tuition research (2026-08-21):** the popular "2 sigma"
tutoring claim (tutoring makes the average student beat 98% of peers)
is real but was never replicated at that scale — the honest, broadly
confirmed effect size across real studies is closer to 0.35-0.37
standard deviations. A real randomized controlled trial of an AI math
tutor delivered over low-bandwidth WhatsApp in Ghana landed on almost
exactly that same honest number (0.36), in a genuinely resource-
constrained context — real, independent evidence that ANU's core bet
(individualized, low-infrastructure-friendly instruction) is aimed at
the right target, not just a hopeful guess. Separately, research on
Indian private tuition found it often focuses on exam scores over real
understanding, tends to help already-strong students more than
struggling ones, and costs households a genuinely large share of
income (40-50% of education spend) — a real, evidenced reason not to
assume "send her to tuition like other parents" is automatically the
right answer for a child conventional methods aren't reaching.

**Language approach, grounded in real research (2026-08-21):**
Cummins' Common Underlying Proficiency theory (1979, still widely
cited) confirms that a concept genuinely understood in one language
does not need to be relearned from scratch in another — only the
vocabulary transfers. This directly resolved a real founder concern:
teaching a new, hard concept first in Telugu does NOT undermine English
ability; the opposite sequence (teaching a brand-new concept directly
in a not-yet-fully-fluent language) risks cognitive overload instead.
Real refinement: Cummins' BICS vs. CALP distinction shows conversational
English fluency and academic/reasoning English proficiency develop on
very different timelines (the latter can take 5-7 years) — a child's
decent spoken English doesn't mean she's ready to receive new, hard
ideas in it yet. Cummins' "additive vs. subtractive bilingualism"
research further shows children do BETTER when the home language keeps
developing alongside a new one, not when it's displaced by it —
directly validating a Telugu-first, English-added sequence.
**Recommended sequence, not yet built:** understand the concept in the
strongest language first → introduce English vocabulary while the idea
is still forming (code-switched, not separate) → only then ask for the
idea to be expressed in English, once understanding is already secure
→ use the existing teach-back moment (JRNY-008) as real, low-pressure
English practice once understanding is solid.

**Language personalization can't assume Telugu+English for every
family** (2026-08-21) — a real, distinct problem from anything built
so far. Three separate onboarding questions needed, not one assumption:
(1) actual home language, regardless of school medium; (2) school
medium AND the child's real comfort in it, since "English medium" often
doesn't mean genuine fluency; (3) whether the home language is even
taught as a literacy subject at that specific school. Architecturally
low-cost to prepare for now even while only Telugu+English get built —
add a language tag to the same generate-once voice cache (style ×
language, not just style), so a second family in a different language
entirely doesn't require painful rework later.

**Pronunciation and spelling — two different skills** (2026-08-21):
hearing correct pronunciation is solved by the natural-voice work
above; being checked on her OWN pronunciation needs speech recognition
(already listed below as AI-009, deliberately still deferred — false
"that's wrong" feedback risks real harm to a young child's confidence).
A real, low-tech middle step needing no new technology: hear the word,
repeat it, no scoring attached. Spelling is a different skill entirely
(English spelling isn't phonetic) — "look, cover, write, check" is a
simple, well-established, low-tech technique, no new technology needed.
Same caution as the handwriting research: spelling accuracy shouldn't
become a strict pass/fail gate before her reading foundation is
genuinely solid.

**The one thread running through all of it:** every reference examined
came down to the same underlying question — does this genuinely adapt
to the individual child, or does it apply one method to everyone and
call it help? ANU's core design philosophy (individualized,
understanding-first, adaptive to real struggle) was already set before
this session — see PRINCIPLES.md. Tonight didn't change that direction.
It provided real evidence for it, and several concrete corrections.

**Concrete, specific corrections to fold in going forward (small
standing rules, not new features):**
1. Never let framing imply fixed ability, anywhere, for any activity.
2. Thinking-question hint style, alongside the existing fact-pointing
   style (see Logic-puzzle activities above).
3. Puzzle/activity difficulty should eventually adjust silently using
   existing `getStruggleSignal()`/`getPreferredRepresentation()` — no
   visible "easy version" labeling.
4. If handwriting content is ever built: legibility over cursive, never
   correct a left-handed child's writing hand.
5. Any future public claim about ANU's effectiveness must stay within
   the honest, evidenced range (~0.35-0.4 effect size territory) — never
   oversold language, given the scrutiny ANU will face as it grows.

**Priority, unchanged and now sharper:** none of this research or these
ideas compete with the standing, repeated, still-unfinished priority
across this whole log — getting the actual child using the live,
AI-powered site for the first time. Everything above is context and
correction to apply as that happens, not a queue of new work ahead of
it.

**Not yet decided or built** — flagged per this file's own purpose.
More reference videos to be reviewed in future sessions; this
conclusion will be revisited, not treated as final.

---

## Infrastructure, blocked or deferred

- **Natural AI voice** — provider chosen (Sarvam AI), code written, not
  yet deployed. See "Natural voice generation" above for full status.
- **Real character art / animation** — the Pixar-quality companion
  vision from the reference videos. Full AI-generated video remains a
  genuinely bigger production undertaking (see peer-learning dialogue
  entry above) — the lightweight illustrated-character approach
  (proven 2026-08-20/21) is the real near-term path instead.
- **Permanent storage (Supabase)** — everything today is localStorage,
  explicitly temporary. Real database wiring still a TODO. Matters more
  now that real AI-classified learner data is being generated and now
  that the multi-variant voice idea and cross-family language caching
  both explicitly depend on it — currently only living in one browser's
  Local Storage, not backed up or shared anywhere.
- **Mobile responsiveness** — not yet specifically verified on a real
  small phone screen. Should be checked properly, not assumed.
- **Speech recognition (AI-009)** — deferred from the very first
  documents, pending real target-user error-rate benchmarking. See
  "Pronunciation and spelling" above for the real, low-tech interim step.

---

## Content expansion, not yet started

- Second Himalayas journey region after the current chapter — Assam,
  Arunachal Pradesh, and Odisha/Chilika were all raised as candidates,
  never chosen.
- Remaining Himalayas textbook sections (Physical Features, etc.) —
  only the first four concepts are built.
- The fuller Civics chapter content (election mechanics, majority,
  coalition, legislative debate) — deliberately deferred as too advanced
  for the first pass; the current chapter only covers basic role
  identification.

---

## Open product-vision questions

- **Phase 3 "general, any-subject instant engine"** — recommended early
  on as a later phase, never formally confirmed as a real goal.

**Three-tier vision, sequenced — see PRINCIPLES.md for the full phasing
agreement** (added 2026-08-18/19). Not a same-time requirement: Phase 1
is the founder's own daughter only; Phase 2 is paying urban families, to
build real revenue; Phase 3, only once sustainable, is rural/government-
school use. The three tiers are (1) full per-child personalization,
(2) classroom-scale use — one teacher, many children, possibly many
grades in one room, and (3) an independent single-child purchase
available within a community already using the classroom version. Not
yet decided: what Phase 2/3 would concretely mean for learnerMemory.js's
data model, or for content authoring/review (CNT-003) if a teacher is
eventually creating or selecting content for a whole classroom in real
time.

**Real infrastructure constraints surfaced by research (2026-08-19),
relevant to Phase 3, not Phase 1:**
- Offline-first — usable without a live connection, syncing silently
  when one is briefly available. Relevant because roughly one-third of
  Indian government schools still lack computers/internet entirely.
- Shared-device support — fast, picture-based (not text-login) profile
  switching, since a smartphone is often shared across siblings rather
  than owned individually by one child.
- A genuinely multi-grade classroom mode — one shared screen or device
  where the same lesson topic silently branches into different
  difficulty levels for different children in the same room, so a
  single overstretched teacher (over one lakh Indian schools have only
  one teacher covering 50+ students across multiple grades) can use it
  without extra prep work. Directly connects to the puzzle-difficulty
  personalization idea above — same underlying mechanism.
- A print-companion fallback for device-less days, mirroring the same
  teaching shape (hook → explanation → check → recap) on paper, so a
  child without device access that day isn't on a fundamentally
  different track from one who has it.

**Not decided, and not urgent:** none of this should be prioritized
over the current Phase 1 path (the AI backend is now live — next is
getting the actual child using it, and expanding Himalayas/Civics
content for the founder's own daughter). Flagged here so it isn't
lost, not as a commitment to build now.

## A learning companion, not just lesson content (founder's vision, 2026-08-23)

The founder's own framing: ANU shouldn't just hold lessons — it should
function as an actual planning companion for her whole school year,
the way a genuinely attentive tutor would: knowing what's coming, how
she's actually progressing subject by subject, and keeping both her
and her parent oriented without either being surprised by an exam.
Four real, distinct pieces, each with a different build cost and a
different amount of real-world grounding available right now.

**1. A syllabus/curriculum pacing calendar.**
The honest architecture: this can't be automated from outside — there's
no clean, accessible database of what a specific Andhra Pradesh school
teaches in which month. The real, buildable version is a simple,
structured file (same pattern as the lesson content itself) that the
founder updates occasionally from her school diary or the textbook's
own table of contents — "Chapter 8 expected around September" — which
ANU then uses to decide what to build or reinforce next, and to warn
ahead of time rather than reactively. **Important tension to hold
honestly**: syncing to the school's calendar and pacing for genuine
mastery are sometimes in real conflict — school moves forward on a
fixed date whether or not a topic was truly understood. This calendar
should inform *preparation timing*, not pressure ANU into rushing past
real understanding the way school sometimes has to.

**2. Subject-level analytics — genuinely cheap, because the data
already exists.** Every attempt already logs `wasCorrect`, `hintsUsed`,
and `hesitationMs` per concept (see `learnerMemory.js`). Nothing new
needs logging — this is a matter of aggregating what's already being
captured into a subject-level view: which subjects take her longer,
which she gets right on the first try more often, roughly how long she
tends to sit with the app per session. One honest caveat, so this
isn't oversold: time-on-task is an ambiguous signal by itself — more
time can mean real effort *or* quiet disengagement. Any summary shown
to the founder should reflect that ambiguity rather than presenting
raw minutes as a clean measure of struggle.

**3. Realistic, personalized goal-setting.** Grounded in Vygotsky's
"zone of proximal development" — the idea that a goal should sit just
past what a learner can already do alone, not at a generic universal
benchmark. Concretely: instead of a fixed "study 20 minutes a day,"
suggest a next session length and question count based on *her own*
recent real pace, recalculated as that pace changes. This depends
directly on #2 existing first — no real analytics, no real basis for
a realistic goal.

**4. Continuity and re-engagement — a genuine "welcome back," not a
blank lesson-picker.** When she returns after a gap, the app should
briefly, warmly orient her: roughly what she did last, what's honestly
due for a recall check (already tracked via `getConceptsDueForRecall`),
and what's next — the way Duolingo's return-nudges or Khan Academy's
"pick up where you left off" work, but tied to genuine understanding
data, not just a streak counter. Real caution worth naming: streak-style
mechanics are well known to create their own anxiety and can start
optimizing for showing-up over actual understanding — exactly the kind
of engagement-metric trap PRINCIPLES.md already warns ANU away from.
This should feel like a mentor's memory of her, not gamification.

**5. Parent-facing "no surprises" view.** An extension of ParentView,
tied to #1: once a real syllabus calendar exists, ParentView could
show something like "her school reaches Chapter 9 in ~3 weeks — here's
her current footing on it" rather than the founder discovering an exam
is close only once it's already close.

**Honest sequencing, not a build order for tonight:** #2 (analytics)
is the only piece with real data to build against *right now*, and
even that should wait until she's actually used the rewritten "Our
Resources" lesson at least once — building dashboards from zero real
usage is the same "building blind" mistake already named elsewhere in
this file. #1, #3, #4, and #5 all depend on either #2 existing first,
or the founder's own manual input (the syllabus calendar) — none of
this blocks Phase 1's actual next step, which is still: let her use
what already exists, and see what real data says before building
further.

---

## The real teaching-content principle, given repeatedly by the founder himself (2026-08-25)

This is now the single most important content-design rule in this
project, and it was nearly lost twice before being written down here.

On 2026-08-25, the founder set aside two full pages of written notes
after they failed — his daughter couldn't understand what he'd
written — and instead just talked to her, live, about a photo he
imagined: her own balcony, her own sunrise, her own walk to school.
Every fact arrived because he asked her first ("did anyone put the sun
there?"), never because he told her. He then gave a second, different
example unprompted: a train to Kashi, two children arguing over what
powers their toy train, one child guessing wrong (how many batteries
would the REAL train need?) before another corrects her — covering
electricity, coal, and petrol through argument, never exposition. He
followed this immediately with the same train reaching Ranchi, iron
mines visible from the window, a boy blurting "iron!" unprompted. Later
the same night, a torn roti unfairly split explained fairness/fractions
to his daughter's own real objection, not a taught rule. His own
verdict on an early attempt to imitate this in writing: "you are being
mechanical."

**The actual, distilled mechanism, confirmed against every example he
gave, not just one:**
1. One continuous real scene from the child's own plausible life —
   never "a village somewhere" or a generic setting.
2. Every fact is already sitting inside that scene, waiting to be
   noticed — never announced before it's discovered.
3. Each fact arrives through a different one of: a direct question, a
   wrong guess corrected by someone else's voice, silence and pure
   observation, a physical sensation, or noticing something that was
   present the whole time. Never the same door twice in a row within
   one scene.

**A real, costly failure from this same night, worth recording so it
never repeats:** the founder had already given a related, specific
example weeks earlier (2026-08-15, see the MapWalkthrough entry
elsewhere in this file) — a child dreaming of impossibly heavy rain,
then learning that Arunachal Pradesh genuinely receives rainfall that
heavy, for real, on the far side of the same Himalayas the Ladakh
content already covers. That specific idea was never written into
`himalayas-concept-graph.json`, and was never captured anywhere in this
file either — it simply vanished until the founder, rightly angry,
had to repeat it. **The lesson: when the founder gives a concrete
content idea in conversation, it must be captured here or built into
the actual content file in the same session — never left to only exist
in a chat transcript**, which is exactly the class of risk
PENDING_ACTIONS.md and this file already exist to prevent, and which
still failed here because the idea was never logged as a concrete
pending item at the time it was given.

**Not yet done:** rewriting `himalayas-concept-graph.json`'s eastern-
Himalayas/rainfall concept to actually use the dream scene above,
instead of the current generic "giant wall" narration. Not yet done:
applying this same mechanism to the rest of "Our Resources" and any
future content — right now only a proof-of-concept version exists,
demonstrated in-conversation, not yet built into the actual app.

**A good idea only survives past the chat it was born in if it lands
in these project files before that chat ends — a real, costly failure
from 2026-08-25.** Claude has no ability to read or recall a different
conversation's transcript, word for word, ever — that's not a memory
lapse to try harder at, it's a structural fact about how separate
conversations work. What DOES carry forward is a smaller set of
specific facts the founder has stated, filed automatically after each
conversation — and critically, that filing only stores what the
FOUNDER said, never ideas Claude itself generated or proposed. This
means: if Claude proposes a genuinely good creative idea in one
conversation and it isn't written into ROADMAP.md, BUILD_LOG.md, or
this file in that same session, it is gone — not hard to find, not
"in Claude's memory somewhere," just gone, with no path back to it,
even for Claude itself. This happened for real: a dream-sequence idea
about Arunachal Pradesh's heavy rainfall, discussed and apparently
proposed by Claude in an entirely separate chat, was completely
unrecoverable when the founder referenced it here, because it had
never been written into any permanent project file. The standing rule
this creates: any concrete content idea or design proposal worth
keeping — whichever conversation it comes from, whoever originated
it — gets written into ROADMAP.md (or built directly) in the same
session it's raised, every time, with no exception for "it feels too
early" or "I'll remember it." Nothing survives that isn't written
down here.

## The founder's core educational philosophy, and the teacher-avatar/exploration/night-dream concept (2026-08-25, given twice — this must never be lost a third time)

**This is the single most important vision statement in this entire
project, and it has already been lost once before being written down
here properly.**

**The philosophy itself, in the founder's own terms:** education today
is built around marks and exam rank, and that is precisely the thing
this project exists to reject. His standard is not "did she pass a
quiz" — it is **"whenever she comes across this again, at any point in
her life, does she instantly understand it."** He gave a real, concrete
example of why this matters: a student who scored the *highest marks*
in her Intermediate (12th-grade) exams still failed to secure a good
rank in EAMCET, the real engineering/medical entrance exam — because
rote memorisation of "what is in the book" produces confusion the
moment a new, unfamiliar framing of the same idea appears, which is
exactly what competitive entrance exams (EAMCET, NEET, engineering
entrances) do on purpose, under negative marking and real time
pressure. His conclusion: a child needs to be **fundamentally, not
superficially, sound** — genuine understanding is what lets someone
handle an unfamiliar situation later in life; memorised-for-the-test
knowledge does not survive contact with anything new. This is the real
reason behind every "does she really understand this, or did she just
answer correctly" question already running through this whole project.

**The concrete content mechanism he designed, in full, given twice
now, once already lost:**

1. A favourite-teacher figure explains a concept aloud — e.g. "the
   Himalayas are the tallest mountains."
2. On screen, a child avatar (representing the actual learner)
   immediately re-enacts what was just said, in first person — e.g.
   visibly climbing while saying "I am climbing the tallest mountain
   in the world." The child doesn't just hear the fact — she watches
   herself, as a character, physically embody it back.
3. When the teacher gives a specific detail — e.g. "it stretches about
   2,400 km" — the avatar and her friends begin an actual exploration
   journey along that real distance, from Assam to Ladakh.
4. Every further fact in the lesson is revealed through what the
   travelling friends naturally notice while exploring, never through
   the teacher stating it directly a second time — tea estates when
   they reach Assam; when they reach Arunachal Pradesh, the mountains
   there aren't snow-covered, but the region receives very heavy
   rainfall (a fact the lesson itself gives later — the exploration
   discovers it in the same natural way a real trip would).
5. At the end of the exploration "day," the characters go to sleep —
   and the child's avatar has a **night dream** of being caught in
   heavy rain in Arunachal Pradesh with her friends, tying the day's
   most vivid discovery directly into the sleep/dream sequence as a
   deliberate act of consolidation.

**Why step 5 is not just a nice narrative flourish — it has real
science behind it, which should be said plainly:** sleep is not
memory-neutral. It is well-established in neuroscience that sleep,
and REM sleep specifically, plays a genuine, active role in
consolidating a day's learning into longer-term memory. A dream
sequence deliberately built around the day's most important discovery
isn't just charming — it mirrors something real about how memory
actually consolidates overnight. This is exactly the kind of
"consolidation/recap" mechanism worth building as its own real
feature, not folded quietly into a single lesson.

**The failure, stated honestly and completely:** the founder first
gave this entire concept, in full, in a *different* chat conversation.
Claude (a different session, with no ability to share memory with any
other) responded enthusiastically, called it "gorgeous," and explicitly
promised it was "worth writing down properly" as a future
consolidation/recap feature — and then never actually wrote it down
anywhere. That promise was worthless, because it was never backed by
an actual file edit in that session. The founder then had to describe
the entire thing again, in full, a second time, tonight, after an
exhausting day — and was, understandably, furious about it. This
document is the actual fix, not another promise: the idea now lives
here, in the project's own permanent file, not in any single
conversation's memory.

**Not yet built, deliberately not rushed tonight, but now permanently
recorded so it cannot vanish again:** the full teacher/avatar/
exploration/night-dream sequence described above, as a real feature —
almost certainly its own significant production effort (real character
animation or illustration, a full exploration-journey structure,
scripted discovery-moments per real place along the route), not a
same-night addition to existing lesson JSON. Worth scoping as a real
project phase once Phase 1 validation with the founder's daughter is
further along — but the *idea itself* must never again depend on any
single conversation's memory to survive until then.

## AI video generation for lesson content — real cost/stability research (2026-08-27)

The founder generated a genuinely impressive 30-second sample video
himself (Gemini/Veo, Telugu narration, his own prompt) showing a
teacher walking with schoolgirls at a real dam, and asked whether ANU
itself should auto-generate this kind of video from textbook text, for
any subject, live. Real research findings, checked directly against
current pricing pages and news, not assumed:

**Google Veo 3.1** (what the founder used): official API pricing is
$0.15–0.75 per *second* depending on tier — $6 for one 8-second clip
at full quality. His own real, lived experience on a $399/month
subscription: roughly one 30-second clip every 5 hours, a genuine rate
limit even on a paid plan.

**OpenAI Sora 2**, checked as the founder's requested comparison:
similar cost ($0.10–0.70/sec) — but critically, multiple independent
sources confirm **OpenAI's Sora API is scheduled for shutdown on
September 24, 2026, weeks from this research, with no replacement
announced.** Its consumer app already shut down in April 2026. Building
anything real on it today would mean building on a platform already
disappearing.

**The honest conclusion, stated plainly:** at 2026 prices, auto-
generating a fresh video for every concept, live, with no human
review, is not viable for a bootstrapped, one-person project — one
30-second clip alone costs more than the *entire* voice system's
monthly budget under the existing generate-once-cache-forever
architecture. Both major video platforms are also genuinely unstable
right now (rate limits, a live shutdown countdown) — a real, separate
reason beyond cost not to build core infrastructure on either yet.

**The real, load-bearing insight from this conversation, worth keeping
central:** personalization was never mainly a video problem. The
actual adaptive engine — investigate-don't-diagnose error handling
(INV-001, already built), representation-switching on failure
(PED-003, already built), per-learner delayed recall (PED-005, already
built) — is what makes ANU personalized to one specific child, and
none of it depends on video existing at all. Math, Hindi, and Science
can all be extended using the exact same proven pattern as "Our
Resources" (real textbook text, human-reviewed concept graph, the
adaptive loop, real voice) without waiting on video technology to
mature or get cheaper.

**Not yet decided, deliberately:** whether/when to incorporate founder-
created, founder-reviewed video clips (like the dam sample) into actual
lesson content, following the same generate-once/human-review pattern
already proven for voice and photos. A real, promising direction — but
a human-guided production step layered on top of the adaptive engine,
never a live auto-generation feature, and not urgent compared to
extending real subject coverage using what's already built.

## A better direction than AI video: programmatic video (Remotion), AI used only narrowly (2026-08-27)

The founder's own counter-proposal, in response to the Veo/Sora
research above: instead of AI *generating* video (expensive, currently
unstable), build video the way many real Indian educational content
creators actually do — using proven, established, non-generative
technology — and only reach for AI narrowly, where it genuinely
reduces cost, not as the default engine.

**Real, verified match for this: Remotion** (remotion.dev) — an
actively-maintained, open-source framework (39k+ GitHub stars, ~900k
installs/month, in production since 2021) that renders real MP4 video
files from **React components**, the same language ANU's own
components are already written in. It works by rendering a real
browser page and exporting it as video, combined with real audio — the
video is *assembled* from things already decided in code, not
*invented* by a model guessing what a scene should look like.

**The genuinely exciting part: ANU already has a small, working proof
this direction works.** `MapWalkthrough.jsx` — the "I am here" walking
figure moving across the Himalayas map, timed to narration — is
already exactly this kind of thing: a real, code-built, controllable
animation with synced voice. It currently plays live inside the app;
Remotion is the tool that would let something built the same way be
rendered into an actual, exportable video file.

**Honest cost structure, verified:** Remotion's license is free for a
small team/individual (open source core). The real cost is developer
time designing each scene, plus modest render compute — nowhere near
AI video's per-second pricing, since nothing is being generated from
scratch. AI's honest, narrow role in this pipeline, matching the
founder's own framing exactly: something like generating one specific
illustration for a concept with no real photo available (image
generation costs cents) — not generating the video itself.

**Not yet decided or scoped:** whether/when to build a real Remotion-
based rendering pipeline, how it would relate to the existing
MapWalkthrough component, and what the first real scene/concept worth
producing this way would be. A genuinely promising direction, distinct
from — and a much better foundation than — the AI-video dead end
documented above, but real design and engineering effort, not a
same-night build.