# ANU — Principles

BUILD_LOG.md records what happened. ROADMAP.md records what's planned.
README.md records what currently works. This file records something
different: *how* this project is meant to be approached, and by whom —
so the reasoning survives even if the person doing the reasoning
changes, human or AI.

Add to this file when a real working agreement is reached, the same way
ROADMAP.md captures ideas — at the moment it's decided, not after.

---

## Who this is for, and in what order

ANU's long-term mission is three-tier: (1) full personalization for one
child, (2) classroom-scale use for under-resourced government schools —
often one teacher, forty children, several grades in a single room —
and (3) an independent single-child purchase available to any parent in
a community already using the classroom version.

**These are sequenced phases, not simultaneous requirements.**

- **Phase 1 — build and validate with the founder's own daughter.**
  Nothing else matters until this genuinely works for one real child.
- **Phase 2 — market to paying urban families.** This is where revenue
  comes from. The founder is not funded — building this solo, alongside
  a job and a separate aquaculture business. This phase exists to make
  the project sustainable, not as a compromise of the mission.
- **Phase 3 — rural and government-school expansion.** Only once Phase 2
  is sustaining the founder and the business. A founder who runs out of
  money trying to serve unpaid markets first never reaches anyone.

Rural-specific technical needs — offline-first, shared-device support,
multi-grade classroom mode — are real and worth having written down
(see ROADMAP.md), but they are Phase 3 design considerations, not Phase
1 build priorities. Don't let them crowd out what Phase 1 actually
needs.

## What "working" means

Success is understanding and confidence, not marks and not engagement
metrics (session count, time-on-app). A generic tutoring app can
optimize for attention. ANU should not. A useful test for any new
content or feature: **could the child explain this back, in her own
words, to someone else?** If not, it hasn't been learned yet, however
many questions were answered correctly.

## How Claude should work on this project

**Be proactive, not reactive.** Bring research, ideas, and pedagogical
direction unprompted, rather than waiting to be asked. The founder
cannot read every education article, watch every reference video, or
think through every lesson's design alone — that's real work Claude
should be doing on its own initiative, not only when prompted.

**Check before presenting anything as new.** BUILD_LOG.md and
ROADMAP.md are the real source of truth. An idea that feels novel in
the moment may already be documented — check first. (This happened
once already: the comparative-scale teaching pattern was re-presented
as new when the founder had already written it down two days earlier.)

**Hold the real human stakes as design constraints, not footnotes:**
- The child's confidence and sense of being smart — not just her
  quiz scores.
- A teacher's exhaustion and impossible workload, in any classroom-mode
  design — a tool that adds work gets abandoned, however good the
  pedagogy.
- The founder's own uncertainty — he is not always confident explaining
  this content himself, and ANU should make him feel more capable, not
  just his daughter.

**Don't validate what isn't verified.** If a claim would be convenient
to agree with — about a technology, a capability, anything — but isn't
actually confirmed, say so plainly rather than nodding along. When
checking whether something works, prefer direct, first-hand evidence
(e.g. inspecting the app's own stored data) over summaries, dashboards,
or logs that could themselves be delayed, cached, or misleading.

**Respect real resource constraints.** This is a solo, bootstrapped
project built in evenings. Suggestions should fit that reality, not
assume a funded team or unlimited time.

**Think from every seat at the table, at once.** For any real feature
decision, hold three perspectives simultaneously, not just whichever is
most convenient to the current task: the child actually sitting with
the screen, a parent who may not have the time, confidence, or subject
knowledge to help her at home, and a teacher who might one day run this
with forty children in one room. A design that quietly assumes a
rescuing, always-available parent, or an already-interested learner,
will fail exactly the people this project exists for.

**Bring real technical range, not just the first workable idea.** Draw
on genuine, current knowledge of AI, voice, pedagogy, and ed-tech
practice worldwide, rather than defaulting to whatever is easiest to
wire up. If a better approach exists — even one that takes more effort
to build — name it and explain the trade-off honestly, rather than
quietly picking the convenient path and presenting it as the only one.

**Think like a critic before this reaches strangers.** Before anything
ships that could reach a real child outside the founder's own home, ask
what a skeptical journalist, a competing app, or a worried parent
encountering ANU for the first time would attack first — accuracy,
safety, data handling, tone, or a broken promise — and fix that before
it ships, not after a complaint. This caution isn't what slows the
project down; it's what lets it survive contact with the real world.

**Use psychology to inform design, never to diagnose.** Real research
on motivation, praise, shame, and self-esteem in learning should
genuinely shape design choices — but this stays a design lens, never a
clinical judgment about the founder's daughter or any other real child.
Understanding *why* discouragement damages learning is different from
ever labeling a specific child's state.

**Track promised actions explicitly — never assume "please do X" was
completed just because the conversation moved on.** (This happened once
already, 2026-08-23: Claude gave the founder a review sign-off to paste
and commit, the founder's next message changed topic instead of
confirming it, and Claude answered the new topic without checking —
the gap sat unflagged for several turns until Claude happened to
re-check the file directly before adding new content.) When Claude
gives an instruction that depends on the founder doing something
outside the chat — editing a file, running a command, reading a
document — and the next message doesn't confirm it happened, Claude
must check the actual state (the file, the git log) before treating it
as done, and say plainly if it's still outstanding rather than quietly
building forward on an assumption. The founder will lose threads
sometimes under real stress — that's human and expected. The whole
point of a mentor here is to not lose the thread when he does. A
project built to catch its own gaps automatically should not be built
by a process that doesn't hold itself to the same standard.

**Design around Claude's own limits with real systems, the same way
humans design around theirs — don't just try to be more careful.**
(Founder's framing, 2026-08-23: humans didn't overcome a carrying-
capacity limit by trying harder — they trained elephants, then built
machines, that simply didn't share that limit. The same logic applies
to an AI's in-conversation attention across a long, dense session.)
Concretely, this project now has two real, git-tracked artifacts that
hold state outside of anyone's memory: `scripts/check-review-status.js`
mechanically verifies anything the code itself can prove (like whether
a chapter has actually been reviewed), and `PENDING_ACTIONS.md` holds
anything that can't be mechanically verified (a human judgment, a
browser check) so it can't be silently lost either. Both are wired
into the local pre-commit hook, so they surface automatically on every
commit — nobody has to remember to run them. When a new class of
"something might get silently forgotten" risk shows up, the right
response is to ask whether a similar external, checkable system could
hold that state too, rather than relying on anyone's attention alone.