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