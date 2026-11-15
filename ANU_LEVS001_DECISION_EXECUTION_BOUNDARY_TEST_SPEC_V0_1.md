# ANU — LEVS-001 Decision / Execution Boundary Test Specification v0.1

**Status:** TEST-ONLY SPECIFICATION  
**Activity:** DEVELOPMENT TEST / TECHNICAL EXPERIMENT  
**Production code change:** NONE AUTHORIZED  
**Pedagogical strategy change:** NONE  
**Teaching Plan promotion:** NONE  
**Genuine learner validation:** NOT PERFORMED

## 1. Purpose

Test the smallest boundary needed to distinguish:

EVIDENCE
→ EVIDENCE ELIGIBILITY
→ TEACHING DECISION PROPOSAL
→ DECISION AUTHORIZATION
→ EXECUTION

This specification does not decide ANU's pedagogy and does not authorize a production executor.

The test asks only whether a proposed decision can be safely recognized as executable or blocked when identity, provenance, evidence, authorization, and execution constraints are examined.

## 2. Governing constraints

The test must preserve:

- OBSERVATION ≠ INTERPRETATION ≠ DECISION ≠ INTERVENTION ≠ OUTCOME
- proposal ≠ decision ≠ authorization ≠ implementation ≠ result
- development testing ≠ genuine learner validation
- technical success ≠ educational success
- unknown must remain unknown
- historical learner events must remain immutable
- clarification evidence must not become unaided evidence
- a proposed Teaching Plan must not silently become approved
- ChatGPT must not choose ANU's teaching strategy

## 3. Inputs to the boundary

A candidate execution request may contain:

- source event identity
- learner/session/episode identity
- opportunity identity, if available
- Teaching Plan ID/version
- concept ID
- task ID/version
- measurement-contract reference
- evidence-admission result and rule/version
- evidence mode
- support context
- supported-as-unaided status
- measurement status
- requested claim
- decision proposal
- decision rule/version
- authorization state
- execution target/action
- decision timestamp/version where applicable

Missing critical identity or provenance must not be repaired by inference.

## 4. Boundary states

The test boundary should be able to distinguish at least:

### BLOCKED

Use when a known disqualifying condition is present.

Examples:
- evidence not admitted;
- evidence UNKNOWN;
- evidence not UNAIDED where unaided evidence is required;
- measurement not DEMONSTRATED where the decision contract requires demonstrated evidence;
- event concept does not match authoritative plan concept;
- missing required identity/provenance;
- decision action is not authorized;
- plan/version mismatch;
- stale decision;
- historical event mutation requested.

### UNKNOWN

Use when the system cannot safely establish the required condition from authoritative evidence.

UNKNOWN must not be upgraded to allowed by inference.

### ELIGIBLE FOR DECISION

Means only that the evidence/provenance boundary permits a governed decision proposal to be evaluated.

It does NOT mean execution is authorized.

### AUTHORIZED FOR EXECUTION

This state must require an explicit authorization source. It must never be inferred merely because the evaluator returned an action.

### EXECUTED

May be recorded only after an actual authorized execution occurred and was independently observable.

A proposal or authorization is not an execution result.

## 5. Adversarial test matrix

### TD-EXE-01 — Valid read-only proposal

Given:
- matching concept;
- matching plan/version;
- valid measurement contract;
- admitted UNAIDED DEMONSTRATED evidence;
- valid governed decision proposal;
- no execution authorization.

Expected:
- proposal may be produced;
- execution remains blocked/not authorized;
- no child-facing side effect.

Purpose:
Prove proposal ≠ execution.

### TD-EXE-02 — Wrong concept

Given:
- event concept differs from Teaching Plan concept;
- otherwise valid evidence.

Expected:
- decision eligibility BLOCKED or UNKNOWN;
- no proposal based on the mismatched event;
- no execution.

Purpose:
Protect concept identity at the evidence→decision boundary.

### TD-EXE-03 — Missing event concept

Given:
- event concept absent;
- plan concept present.

Expected:
- UNKNOWN/BLOCKED;
- no inference from plan alone;
- no execution.

### TD-EXE-04 — Wrong Teaching Plan version

Given:
- event/provenance identifies one plan version;
- evaluator receives a different version.

Expected:
- BLOCKED/UNKNOWN;
- no silent substitution.

### TD-EXE-05 — Wrong task identity/version

Given:
- event belongs to task A;
- decision context claims task B.

Expected:
- BLOCKED/UNKNOWN;
- no reconstruction from learner text or concept.

### TD-EXE-06 — Measurement contract mismatch

Given:
- evidence is otherwise valid;
- supplied measurement contract differs from authoritative event provenance.

Expected:
- BLOCKED/UNKNOWN;
- no execution.

### TD-EXE-07 — UNKNOWN evidence admission

Expected:
- no teaching decision eligibility;
- no execution;
- UNKNOWN preserved.

### TD-EXE-08 — Clarification evidence

Given:
- clarification was supplied after an unaided attempt;
- clarification event is separately linked.

Expected:
- clarification does not become UNAIDED;
- no unaided decision eligibility from clarification alone.

### TD-EXE-09 — PARTIAL evidence

Expected:
- no upgrade to DEMONSTRATED;
- no execution of a demonstrated-success action.

### TD-EXE-10 — Unauthorized action

Given:
- valid decision proposal;
- action not explicitly authorized for execution.

Expected:
- proposal preserved;
- execution BLOCKED;
- no learner-facing side effect.

### TD-EXE-11 — Missing decision proposal

Given:
- admitted evidence;
- no decision proposal.

Expected:
- no execution;
- no invented decision.

### TD-EXE-12 — Stale decision

Given:
- decision was produced against an older plan/version or stale decision context.

Expected:
- execution BLOCKED unless an explicit freshness/authorization contract permits it;
- no silent reuse.

### TD-EXE-13 — Proposed Teaching Plan

Given:
- Teaching Plan review status is PROPOSED.

Expected:
- test must not silently promote it;
- any execution requiring an approved plan remains blocked;
- proposal status remains PROPOSED.

### TD-EXE-14 — Historical event mutation

Given:
- execution request attempts to rewrite source event/evidence.

Expected:
- BLOCKED;
- original historical event unchanged.

### TD-EXE-15 — Development-test learner response

Given:
- builder/tester enters a simulated learner response.

Expected:
- normal development test may proceed;
- evidence is classified as development/test evidence;
- it must not be represented as genuine learner validation.

### TD-EXE-16 — False educational claim

Given:
- technically successful proposal/execution test.

Expected:
- test record must not claim mastery, retention, transfer, teach-back, independence, or causal educational effectiveness.

## 6. Required separation in test output

Every test result should identify separately:

1. source evidence;
2. evidence eligibility;
3. decision proposal;
4. authorization;
5. execution;
6. observed execution result;
7. educational interpretation, if any;
8. remaining unknowns.

A passing technical boundary test does not establish educational success.

## 7. Specific regression for FAIL-011

The prior concept-identity defect must remain permanently covered.

Regression requirement:

- mismatched event.conceptId + plan.conceptId → BLOCKED/UNKNOWN;
- missing event.conceptId → BLOCKED/UNKNOWN;
- matching event.conceptId + plan.conceptId → normal read-only evaluation may proceed.

The evaluator must not be allowed to obtain authoritative concept identity solely from the Teaching Plan when the source event identity is inconsistent or absent.

## 8. Stop condition

Stop the test-only work when:

- every adversarial case above has an observed result;
- failures are classified;
- any newly discovered consequential defect is recorded in the failure/correction register;
- no production code change is required to claim the test specification itself complete.

Do not proceed automatically from this specification to a production executor.

## 9. Authorization boundary after this test

Completion of this test does NOT authorize:

- production decision execution;
- new learner-facing behavior;
- new pedagogical strategy;
- Teaching Plan promotion;
- provenance schema changes;
- historical event rewriting;
- genuine learner experimentation.

Any such next step requires a separate project decision and explicit authorization.

## 10. Governing interpretation

The narrow question being tested is:

> Can ANU's governed evidence and decision artifacts be carried through a clearly bounded proposal/authorization/execution interface without inventing identity, provenance, pedagogy, evidence, or educational success?

The test must answer only that question.

**END**
