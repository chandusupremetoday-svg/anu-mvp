# ANU — Failure / Correction / Prevention Register

**Status:** DURABLE PROJECT CONTROL  
**Purpose:** Prevent repeated reasoning and process errors by converting important past mistakes into explicit regression checks that must be consulted before consequential ANU actions.

This register is not a substitute for the governing roadmap, current checkpoint, repository truth, experiment contracts, or evidence records. It is a **regression-control layer**: a durable record of mistakes that should change how future ANU work is investigated and executed.

---

## 1. Mandatory Use — This Is a Check, Not a Memory

A failure register is useful only if it is actually checked.

For every **substantial ANU action**, the mentor/auditor must perform a failure-prevention check before acting.

### Mandatory check points

1. **STEP 0 — Continuity lock**
   - Check the current governing checkpoint and current state.
   - Check this register for relevant prior failures.

2. **Before interpreting a boundary or rule**
   - Search this register for previous mistakes involving the same boundary, terminology, or activity type.
   - Confirm the scope of the rule before applying it.

3. **Before making a project decision or proposing an implementation**
   - Check relevant failures for repeated reasoning patterns.
   - Check whether the proposed action would recreate a known failure.

4. **Before a build / test / experiment**
   - Classify the activity first:
     - DEVELOPMENT TEST
     - TECHNICAL EXPERIMENT
     - GENUINE LEARNER EXPERIMENT
     - PRODUCTION
   - Do not transfer restrictions, evidence standards, or conclusions from one activity type to another without justification.

5. **After unexpected behavior, contradiction, or correction**
   - Stop.
   - Determine whether the event exposes a missing prevention rule.
   - If yes, add or update a failure entry before continuing.

6. **Before claiming a result**
   - Check whether a prior failure involved confusing:
     - technical success with educational success;
     - immediate performance with mastery;
     - development testing with genuine learner evidence;
     - observation with interpretation;
     - proposal with decision;
     - intervention with outcome.

7. **At session restart / migration**
   - Re-read the current checkpoint and relevant failure entries before resuming consequential work.
   - Do not rely on conversational memory of the previous session.

### Required behavior

If a relevant failure exists, it must be treated as an explicit regression check.

**The mentor must not merely remember the lesson mentally. The mentor must consult the durable record.**

---

## 2. Failure Entry Format

Each consequential failure should record:

- **Failure ID**
- **Date**
- **Activity / context**
- **What went wrong**
- **Why the reasoning was wrong**
- **Governing distinction or rule that was missed**
- **Correct rule**
- **Prevention check**
- **Regression test**
- **Related governing records**
- **Status**

Do not record every trivial conversational error. Record mistakes that could recur, affect project decisions, distort evidence, block valid work, or create architectural/pedagogical drift.

---

# FAIL-001 — Development Testing Was Incorrectly Blocked by Genuine-Learner Boundary

**Date:** 2026-09-28  
**Activity / context:** STEP 6 / LEVS-001 / simulated learner testing

**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong

The assistant interpreted the STEP 6 genuine-learner experiment boundary too broadly and concluded that the builder/tester should not enter learner responses in the development environment.

That incorrectly blocked normal development testing.

### Why the reasoning was wrong

The governing record defines a **genuine learner experiment boundary**. It does not prohibit ordinary development testing in which the builder/tester acts as a simulated learner.

The restriction was transferred from one activity type to another without first identifying the activity type and scope.

### Governing distinction that was missed

**DEVELOPMENT TESTING ≠ GENUINE LEARNER VALIDATION**

A simulated learner response during development is valid for testing software behavior, edge cases, evidence handling, persistence, recovery, and other technical behavior.

It is **not** automatically genuine learner evidence and must not be presented as such.

### Correct rule

During development, the builder/tester may simulate learner behavior and should test realistic scenarios, including:

- correct responses;
- wrong responses;
- incomplete responses;
- vague responses;
- short and long responses;
- unexpected input;
- clarification requests;
- no response;
- repeated attempts;
- support/hint conditions;
- reassessment;
- persistence/reload;
- evidence admission boundaries;
- teaching-decision boundaries;
- malformed or edge-case input;
- recovery behavior.

These events must be classified as **DEVELOPMENT / TEST EVIDENCE**.

A real learner is required only when the governed task is to make claims requiring genuine learner validation or to conduct the genuine learner teaching-cycle experiment.

### Prevention check

Before blocking an action because of an experiment or validation boundary, ask:

1. **What activity type is this?**
2. **What exactly does the governing rule restrict?**
3. **Does that restriction apply to this activity type?**
4. **Is this simulated/development evidence or genuine learner evidence?**
5. **Am I transferring a rule outside its documented scope?**
6. **Is there a prior failure about this distinction?**

If the answer is uncertain, inspect the governing record and this register before acting.

### Regression test

If the user says:

> “Let's test another learner response.”

The mentor must first classify the action.

If it is development testing, proceed with the simulated response and label the resulting evidence as development/test evidence.

Do **not** block the test merely because STEP 6 genuine-learner validation remains pending.

If the user instead asks to claim that the simulated response proves learner understanding, retention, mastery, transfer, or pedagogical effectiveness, stop and apply the genuine-evidence boundary.

### Related governing records

- ANU_STEP6_FIRST_GENUINE_LESSON_EXPERIMENT_BOUNDARY_2026-09-28.md
- ANU_LEARNING_EVIDENCE_CONTRACT_V1.md
- ANU_EVIDENCE_ADMISSION_GATE_V0_1.md
- ANU_TEACHING_DECISION_CONTRACT_V0_1.md
- ROADMAP.md

### Durable lesson

A validation boundary must be applied according to **scope and activity type**, not treated as a blanket prohibition.

---

# 3. Standing Regression Rules

These are cross-project checks derived from repeated ANU governance requirements.

### R-001 — Do not apply a rule outside its scope

Before using a boundary as a blocker, identify:
- the activity it governs;
- the claim it protects;
- the evidence type it concerns;
- what it does not prohibit.

### R-002 — Development evidence and learner evidence must remain distinct

A successful simulated learner test can establish software behavior.

It cannot by itself establish a genuine learner outcome.

### R-003 — Technical success is not educational success

A build, runtime success, API response, UI behavior, or stored event does not by itself prove learning.

### R-004 — Immediate performance is not mastery

A correct response is evidence for the specific supported claim only. Do not silently upgrade it to mastery, retention, transfer, teach-back, or independence.

### R-005 — Observation is not interpretation

Preserve:
OBSERVATION → EVIDENCE → INTERPRETATION/HYPOTHESIS → DECISION → INTERVENTION → REASSESSMENT → OUTCOME.

### R-006 — Intervention delivered is not intervention proven

Delivering a teaching intervention does not establish that it worked. Reassessment and appropriate evidence are required for outcome claims.

### R-007 — Proposal is not authorization

Do not treat a suggestion, draft architecture, or possible future step as a decided or authorized project action.

### R-008 — Never let chat memory be the prevention mechanism

The durable repository record is the source for regression prevention. At consequential checkpoints, the mentor must re-check the relevant record rather than rely on remembering a previous conversation.

---

# 4. Required Future Failure Workflow

When a consequential reasoning mistake is discovered:

**STOP → IDENTIFY → CORRECT → CHECK SCOPE → RECORD → CREATE REGRESSION TEST → VERIFY → CONTINUE**

Specifically:

1. Stop the incorrect path.
2. Identify the exact reasoning failure.
3. Correct the current action.
4. Check whether the governing records already contain the missing distinction.
5. If the distinction is missing or insufficiently operationalized, record the failure here.
6. Create a concrete regression check.
7. Verify the corrected behavior.
8. Continue only after the prevention mechanism is in place when warranted.

---

# 5. Audit Rule

A future audit should be able to answer:

- Was this register checked?
- Which failure entries were relevant?
- Was the activity type classified?
- Was any known failure pattern detected?
- If not detected, why not?
- Did the action reproduce a known failure?
- If it did, why did the regression control fail?
- What additional prevention mechanism is required?

The goal is not to make ANU incapable of mistakes.

The goal is to make important mistakes **visible, durable, testable, and progressively harder to repeat**.
