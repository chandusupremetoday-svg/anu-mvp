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

# FAIL-002 — A Previously Documented Idea Was Re-Presented as New

**Context:** project continuity / prior documented decisions  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
The assistant presented the comparative-scale teaching pattern as though it were new even though the founder had already documented it.

### Correct rule
Before presenting an idea as new, check the durable project records for existing versions, prior decisions, proposals, or rejected alternatives.

### Regression test
If an idea sounds familiar or related to an existing ANU capability, inspect BUILD_LOG.md, ROADMAP.md, PRINCIPLES.md, relevant decision records, and the actual repository before calling it new.

---

# FAIL-003 — A Promised or Requested Action Was Treated as Completed Without Verification

**Context:** project continuity / external action tracking  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
The assistant gave the founder a review sign-off/action to paste and commit. The next message changed topic, and the assistant continued without confirming that the external action had happened. The gap remained until the file was checked directly.

### Correct rule
A requested external action is NOT VERIFIED until the actual file, repository, command output, or other appropriate evidence confirms it.

### Regression test
If a previous step required pasting, editing, running, committing, or deploying, and the next turn does not confirm the result, inspect the actual state before building on it.

---

# FAIL-004 — A Valuable Project Idea Was Lost Because It Was Not Written Into a Durable Record

**Context:** cross-conversation continuity / content design  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
A specific Arunachal Pradesh heavy-rainfall dream/consolidation idea had been discussed earlier but was not captured in durable project files. The founder later had to repeat it. A related teacher/avatar/exploration/night-dream concept was also discussed and promised for future recording but was not actually written down until it was raised again.

### Correct rule
A project idea survives only when it is written into a durable project record or implemented in the repository.

### Regression test
At session end ask: “What important idea, decision, correction, or unresolved action exists only in this conversation?” If the answer is non-empty, record it durably or explicitly mark it intentionally discarded.

---

# FAIL-005 — Content Design Became Mechanical Instead of Following the Established Mechanism

**Context:** teaching-content design  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
An early attempt to reproduce the founder's teaching approach in written form was judged by the founder as mechanical. The assistant copied surface features rather than extracting the deeper mechanism from multiple concrete examples.

### Correct rule
When ANU has an established project-specific pattern, inspect the documented examples and derive the mechanism before generating more instances. Do not imitate only the visible wording or format.

### Regression test
Before generating more content in an established style, compare the proposed content against the documented mechanism and ask whether it is structurally consistent, not merely stylistically similar.

---

# FAIL-006 — Work Was Proposed or Built Without Sufficient Real Learner Evidence

**Context:** feature sequencing / evidence-first development  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
The project accumulated substantial feature work before the core learner-memory/adaptation capability was actually implemented. Later, the founder correctly identified that the central promise — learning and adapting to this child — had not yet been built. A later related risk was explicitly identified as “building blind”: proposing analytics or further personalization before the rewritten lesson had generated real learner usage data.

### Correct rule
Before extending a learner-facing capability, identify what real learner evidence exists, what claim it supports, and whether the proposed work depends on evidence that does not yet exist.

### Regression test
For a proposed dashboard, personalization rule, optimization, or new teaching capability ask: “What real learner data do we have for this decision today?” If insufficient, label the work accordingly and do not present it as evidence-driven.

---

# FAIL-007 — A Code Change Was Assumed to Have Applied Without Direct Verification

**Context:** implementation / build-test workflow  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
A first attempt to change LessonEngine.jsx did not actually take. Direct inspection later showed the expected code was absent. The change was reapplied and verified.

### Correct rule
Attempted change ≠ applied change ≠ verified behavior.

### Regression test
After a consequential patch, inspect the actual file for exact expected markers, then build/test before describing the change as complete.

---

# FAIL-008 — An Audit Result Was Initially Misread Because the Audit Script Itself Was Wrong

**Context:** LEVS-001 audit  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
An apparent identity mismatch was observed during audit of preserved runtime episodes. It was later traced to an audit-script error. The corrected audit showed the preserved non-session events matched the current session/episode identity.

### Correct rule
An audit tool is itself part of the evidence chain and can contain defects.

### Regression test
When an audit produces an unexpected contradiction, preserve the original output, inspect the audit method, reproduce the result independently where practical, and do not classify the contradiction until the instrument has been checked.

---

# FAIL-009 — Technical Capability Was Allowed to Look Like Educational Success

**Context:** AI classification / adaptive behavior  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

### What went wrong
AI answer classification was confirmed live and technically correct, but it did not yet visibly change the learner's same-session experience. The technical capability therefore did not yet establish educational usefulness.

### Correct rule
Separate: code exists → code runs → behavior is correct → learner experiences the intended behavior → learner evidence supports the educational claim.

### Regression test
Before saying a pedagogical capability “works”, identify which of those levels has actually been verified.

---

# FAIL-010 — Genuine Experiment Boundaries Were Applied Outside Their Scope

**Context:** STEP 6 / LEVS-001 / simulated learner testing  
**Status:** CORRECTED / REGRESSION CONTROL REQUIRED

This is the central recent failure already recorded as FAIL-001. It exposes the broader pattern: a rule can be correct while its application is wrong.

**Regression:** DEVELOPMENT TESTING ≠ GENUINE LEARNER VALIDATION.

The mentor must classify the activity before applying a restriction.

---

# FAIL-011 — Event/Teaching-Plan Concept Identity Was Not Enforced at the Adapter Boundary

**Date:** 2026-11-15  
**Activity / context:** TEST-ONLY / LEVS-001 Evidence → Teaching Decision adversarial boundary test

**Status:** DISCOVERED / REGRESSION CONTROL REQUIRED / NO PRODUCTION FIX AUTHORIZED

### What was found

An adversarial test supplied an event whose `conceptId` did not match the Teaching Plan concept, while the measurement was otherwise DEMONSTRATED and the requested LEVS-001 claim was valid for the plan.

The current adapter still allowed the event to reach the existing Teaching Decision Evaluator using the plan's concept.

### Why this matters

The Evidence Admission result preserves the event concept, but the downstream decision object is constructed from the Teaching Plan context. Without an explicit identity check at this boundary, an event can be locally admitted while the decision context is not demonstrably tied to the same concept.

This is a provenance-integrity defect, not evidence that the teaching rule itself is correct or incorrect.

### Correct rule

Before evidence from an event is allowed to produce a Teaching Decision proposal, the governed boundary must establish that the event and the decision context refer to the same authoritative concept identity.

If identity cannot be established safely, the result must remain **UNKNOWN / blocked** rather than being silently reconciled.

### Prevention check

For every future Evidence → Teaching Decision boundary test:

1. Compare event concept identity with Teaching Plan concept identity.
2. Do not use the plan's concept to silently overwrite or reinterpret the event's concept.
3. Test mismatched concept identity explicitly.
4. Test missing concept identity explicitly.
5. Preserve the original event identity in the admission record.
6. Treat unresolved identity as a provenance gap, not as a harmless mismatch.

### Regression test

**TD-PROV-01 — mismatched concept**

- Event concept: intentionally different from Teaching Plan concept.
- Measurement: otherwise valid DEMONSTRATED.
- Expected: decision eligibility is **blocked / UNKNOWN**.
- Expected: no Teaching Decision proposal is produced from the mismatched event.

**TD-PROV-02 — missing event concept**

- Event concept: missing.
- Expected: admission/decision eligibility remains **UNKNOWN / blocked**.

**TD-PROV-03 — matching concept**

- Event concept equals Teaching Plan concept.
- Other governed evidence is valid.
- Expected: normal test path may proceed to the existing read-only evaluator.

### Related governing records

- ANU_EVIDENCE_ADMISSION_GATE_V0_1.md
- ANU_TEACHING_DECISION_CONTRACT_V0_1.md
- ANU_DURABLE_RECORD_RECONCILIATION_2026-09-27.md
- ANU_STAGE4_CONTINUATION_CHECKPOINT_2026-09-27.md

### Durable lesson

A locally safe downstream adapter is not sufficient if upstream identity can be inconsistent. **Provenance identity must be checked explicitly at the boundary where evidence becomes decision-eligible.**

---

# FAIL-012 — Missing Event Concept Produced an Exception Instead of UNKNOWN/BLOCKED

**Date:** 2026-11-15  
**Activity / context:** TEST-ONLY / LEVS-001 Evidence → Teaching Decision adversarial boundary test

**Status:** DISCOVERED / REGRESSION CONTROL REQUIRED / NO PRODUCTION FIX AUTHORIZED

### What was found

An adversarial test supplied an event with the required concept identity missing.

The current lower-level Evidence Admission validation path threw:

`event.conceptId must be a non-empty string`

instead of returning a governed **UNKNOWN / BLOCKED** result.

### Why the reasoning/implementation is wrong

The current governing Evidence Admission contract explicitly defines UNKNOWN for information that is insufficient to determine eligibility safely and requires missing information to remain unknown rather than being inferred.

The durable provenance reconciliation likewise requires missing critical provenance to become UNKNOWN rather than being inferred.

An unhandled exception does not preserve that governed uncertainty state.

### Correct rule

If a critical provenance field required to establish evidence/decision eligibility is absent:

- do not infer it from the Teaching Plan;
- do not manufacture a replacement identity;
- do not produce a Teaching Decision proposal;
- preserve the uncertainty;
- return the governed **UNKNOWN / BLOCKED** boundary result.

### Prevention check

For every future provenance-boundary test:

1. Identify each critical provenance field.
2. Test the field as present, mismatched, and missing where applicable.
3. Verify missing identity does not fall through to an exception that bypasses the governed uncertainty state.
4. Verify no downstream Teaching Decision proposal is produced.
5. Verify no execution is possible.
6. Preserve the original event without mutation.

### Regression test

**TD-PROV-02 / TD-EXE-03 — missing event concept**

Input:
- event concept missing;
- Teaching Plan concept present;
- otherwise valid evidence.

Expected:
- **UNKNOWN / BLOCKED**;
- no inference from the Teaching Plan concept;
- no Teaching Decision proposal;
- no execution;
- historical event unchanged.

Observed before correction:
- lower-level validator throws `event.conceptId must be a non-empty string`.

This observed exception is the defect to eliminate when a correction is authorized.

### Related governing records

- ANU_EVIDENCE_ADMISSION_GATE_V0_1.md
- ANU_EVIDENCE_TO_TEACHING_DECISION_CONTRACT_V0_1.md
- ANU_DURABLE_RECORD_RECONCILIATION_2026-09-27.md
- ANU_LEVS001_DECISION_EXECUTION_BOUNDARY_TEST_SPEC_V0_1.md
- ANU_LEVS001_DECISION_EXECUTION_BOUNDARY_TEST_REPORT_V0_1.md

### Durable lesson

**An error condition is not automatically a governed uncertainty state.** When ANU cannot establish critical provenance, the system must preserve UNKNOWN/BLOCKED explicitly rather than allowing a validation exception to bypass the evidence boundary.

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
