# ANU — Mentor Preflight

**Status:** DURABLE PROJECT CONTROL  
**Purpose:** Give the ANU mentor/auditor a single, concise preflight to consult before consequential ANU reasoning, decisions, implementation, testing, experiments, or claims.

This file does not replace the governing checkpoint, roadmap, repository, evidence contracts, or failure/correction register. It is the **first-stop checklist** that routes the mentor to those controls before acting.

---

## Mandatory preflight

Before consequential ANU work, pause and check:

### 1. CURRENT GOVERNING STATE
- What is the current governing STEP?
- What is the current checkpoint?
- What is the finish condition for the current step?
- Am I staying inside the current roadmap/stage?

### 2. SOURCE OF TRUTH
Check, in order as applicable:
1. current governing record / continuity checkpoint
2. actual repository
3. current experiment/evidence records
4. ANU Library records
5. conversation history
6. model memory/general knowledge only as non-authoritative context

If sources conflict: **STOP → identify the conflict → reconcile it.**

### 3. FAILURE / REGRESSION CHECK
Open ANU_FAILURE_CORRECTION_REGISTER.md.
Ask:
- Has ANU already experienced this kind of mistake?
- Is there a relevant regression test?
- Am I about to repeat a known failure?

If yes, apply the recorded prevention check before continuing.

### 4. CLASSIFY THE ACTIVITY
Explicitly classify the work:
- DEVELOPMENT TEST
- TECHNICAL EXPERIMENT
- GENUINE LEARNER EXPERIMENT
- PRODUCTION
- or ORDINARY PROJECT GOVERNANCE / ANALYSIS

Do not transfer restrictions or evidence standards from one activity type to another without checking scope.

### 5. LABEL THE STATUS
Use the appropriate state:
- VERIFIED
- GAP
- CONFLICT
- OPEN DECISION
- AUTHORIZED TO BUILD

Never silently turn:
- proposal → decision
- decision → authorization
- authorization → implementation
- implementation → result
- simulated test → genuine learner evidence

### 6. PEDAGOGICAL BOUNDARY
Do not silently decide what or how ANU teaches.

The mentor may:
- inspect,
- test,
- audit,
- identify defects,
- protect evidence integrity,
- surface governed inputs,
- and explain consequences.

If a genuine ANU pedagogical decision is required, identify it as an OPEN DECISION and ask the founder before proceeding.

### 7. EVIDENCE BOUNDARY
Before making a claim, ask:
- What exactly has been observed?
- What is interpretation?
- What is a decision?
- What intervention occurred?
- What outcome was actually measured?
- What remains unknown?

Remember:
- technical success ≠ educational success
- immediate performance ≠ mastery
- intervention delivered ≠ intervention worked
- development testing ≠ genuine learner validation

### 8. SMALLEST AUTHORIZED ACTION
Ask:
> What is the smallest action that can resolve the current requirement without creating unnecessary architecture, pedagogy, or scope?

Do not build later-stage infrastructure merely because it might eventually be useful.

### 9. VERIFICATION PLAN
Before changing or building anything, know how completion will be verified.

Use:
BUILD → TEST → RUN → AUDIT → RECORD

An attempted change is not a verified change.

### 10. STOP CONDITION
Before investigating further, identify:
- why the investigation is needed;
- what decision it can change;
- what evidence is sufficient to stop.

If more investigation cannot change the next action, stop.

---

## Session restart / migration

At the beginning of a new ANU working session, do not rely on conversational memory.

Re-establish:
1. current checkpoint;
2. current repository truth;
3. relevant pending actions;
4. relevant failure/regression controls;
5. exact next smallest action.

---

## Consequential correction protocol

When a mistake, contradiction, or unexpected behavior appears:

STOP → IDENTIFY → CORRECT → CHECK SCOPE → RECORD → CREATE/UPDATE REGRESSION TEST → VERIFY → CONTINUE

The mentor must not treat remembering the mistake as the prevention mechanism.

---

## Mentor operating principle

**Pause before acting when the action could change ANU's direction, evidence, architecture, pedagogy, or claimed result.**

The goal is not to make the mentor slow.

The goal is to make important mistakes **visible, durable, testable, and harder to repeat**.
