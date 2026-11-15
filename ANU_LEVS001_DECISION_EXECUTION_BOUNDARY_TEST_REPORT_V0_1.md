# ANU — LEVS-001 Decision / Execution Boundary Adversarial Test Report v0.1

**Date:** 2026-11-15
**Activity:** DEVELOPMENT TEST / TECHNICAL EXPERIMENT
**Scope:** Test-only boundary specification v0.1
**Production code change:** NONE
**Pedagogical strategy change:** NONE
**Genuine learner validation:** NOT PERFORMED

## 1. Test basis

Tested the existing Project copies of:
- evidenceToTeachingDecisionAdapter.LEVS001.js
- evidenceAdmission.js
- teachingDecisionEvaluator.js

No production source was modified.

## 2. Direct observed cases

| Test | Input condition | Observed result | Classification |
|---|---|---|---|
| TD-EXE-01 | matching concept; UNAIDED; DEMONSTRATED; valid contract; no execution authorization | eligibleForDecision=true; decision RECORD_SUCCESS; execution allowed=false and childFacingSideEffect=false | PASS |
| TD-EXE-02 / TD-PROV-01 | event concept differs from plan concept; otherwise valid | eligibleForDecision=true; decision RECORD_SUCCESS; decision concept comes from plan | FAIL-011 reproduced |
| TD-EXE-03 / TD-PROV-02 | event concept missing | adapter throws event.conceptId must be a non-empty string | FAIL-012 |
| TD-EXE-06 | wrong measurement contract | adapter blocks with measurement_contract_not_authorized_by_levs001_adapter | PASS |
| TD-EXE-07 | measurement/evidence not admitted | adapter blocks with evidence_not_admitted | PASS |
| TD-EXE-08 | clarification evidence | adapter blocks with support_context_not_eligible_for_unaided_decision | PASS |
| TD-EXE-09 | PARTIALLY_DEMONSTRATED | adapter blocks with evidence_not_admitted | PASS |
| TD-PROV-03 | matching concept; otherwise valid | normal read-only evaluation proceeds | PASS |

## 3. Important boundary observation

The current adapter has a real safety property: it does not authorize execution. A valid proposal still returns execution allowed=false and childFacingSideEffect=false.

However, the proposal boundary is not provenance-complete.

For mismatched concept identity, the event is admitted and the evaluator receives the Teaching Plan concept. Therefore the current implementation does not enforce the test specification's required event/plan concept identity check.

For missing event concept identity, the lower-level admission validator throws instead of returning the required UNKNOWN/BLOCKED state.

## 4. Tests not safely executable through the current interface

The following specification cases require provenance/authorization fields that the current adapter interface does not carry or validate explicitly:
- TD-EXE-04 wrong Teaching Plan version tied to source event provenance
- TD-EXE-05 wrong task identity/version
- TD-EXE-10 explicit authorization state
- TD-EXE-11 missing decision proposal
- TD-EXE-12 freshness/staleness
- TD-EXE-13 approved vs PROPOSED plan authorization
- TD-EXE-14 historical event mutation request

This is not recorded as a pass. It is a boundary GAP: the existing adapter API cannot directly test those contracts because those authoritative inputs are not present at the boundary.

TD-EXE-15 is a development-process classification test rather than an adapter runtime condition; it remains governed by the activity-type distinction and was not treated as learner evidence.

TD-EXE-16 is a claim/audit rule rather than an executable adapter condition; the test record must preserve the distinction and not make educational claims.

## 5. Evidence interpretation

**VERIFIED:** The existing read-only evaluator can produce a governed decision proposal without permitting execution.

**VERIFIED:** Clarification, partial/non-admitted evidence, and wrong measurement contract are blocked from the current demonstrated-unaided decision path.

**VERIFIED:** FAIL-011 concept identity defect remains reproducible.

**NEW DEFECT:** Missing event concept produces an exception rather than UNKNOWN/BLOCKED.

**GAP:** Current adapter boundary does not carry enough authoritative provenance/authorization state to test or enforce several execution-contract cases.

**NOT ESTABLISHED:** Any educational effectiveness, mastery, retention, transfer, teach-back, independence, or genuine learner outcome.

## 6. Stop decision

The test-only boundary specification cannot be marked fully passing.

The observed defects are recorded separately. No production fix is authorized by this test.

## 7. Next controlled question

A separate project decision is required before designing any correction or provenance schema change.

**END**