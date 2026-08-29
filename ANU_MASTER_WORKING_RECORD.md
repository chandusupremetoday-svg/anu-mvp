# ANU — Master Working Record

**Status:** Living project record  
**Purpose:** Preserve the important ANU vision, principles, architectural decisions, verified experiments, and future direction so they are not lost in conversation history.

---

## 1. ANU's Core Purpose

ANU is not fundamentally a video application.

The larger purpose is to become a learning mentor and companion for a child or student of any age, learning any subject, in any place, especially when the learner is struggling.

When a learner comes to ANU, the desired feeling is:

> "I have a mentor here. Someone understands where I am, teaches me properly, walks with me, and helps me become confident."

ANU should progressively combine the qualities of:

- a patient mentor,
- a well-trained teacher,
- a knowledgeable professor,
- and a companion who walks alongside the learner.

The ultimate success criterion is not merely information delivery.

It is whether the learner becomes more comfortable, capable, and confident in learning.

---

## 2. ANU Must Learn From the Learner

ANU should learn from valid evidence about:

- how the learner is learning,
- where the learner is struggling,
- what type of explanation helps,
- what representation helps,
- what intervention actually improves understanding,
- and what approaches work for learners with similar difficulties.

The intended loop is:

```text
What is the learner trying to understand?
        ↓
Where exactly are they struggling?
        ↓
How are they currently learning?
        ↓
Which explanation / representation helps?
        ↓
Did the learner actually understand?
        ↓
What evidence supports that conclusion?
        ↓
Improve future teaching
```

ANU should not simply guess that a learner prefers a particular teaching method.

The long-term objective is evidence-based adaptation.

---

## 3. ANU Should Improve From Proven Evidence

The intended learning loop is:

```text
Teach
 ↓
Observe
 ↓
Assess genuine comprehension
 ↓
Identify difficulty
 ↓
Try an appropriate intervention
 ↓
Measure outcome
 ↓
Retain validated evidence
 ↓
Improve teaching
```

ANU should become better because evidence shows that a teaching approach worked, not because an AI model merely claims that it worked.

This connects directly to the earlier work around genuine comprehension and avoiding unsupported conclusions from learner answers.

---

## 4. Quality Standard and Future Generations

ANU is being built for future generations.

There will be critics, teachers, parents, schools, researchers, and other users who may examine ANU closely.

Therefore every important decision should be evaluated against questions such as:

- Is this pedagogically defensible?
- Is the claim supported?
- Is the interaction actually useful?
- Could a good teacher explain why we designed it this way?
- Could we demonstrate evidence that it works?
- Are we optimizing appearance instead of learning?
- Are we making an assumption that has not been verified?

A particularly important principle is:

> **Don't validate what isn't verified.**

If an international-school student uses ANU, the desired outcome is that the student feels ANU has something genuinely valuable to teach them and that learning with ANU feels comfortable rather than intimidating.

---

## 5. Source-of-Truth and Change Discipline

ANU has existing project documentation, reviewed content, architectural decisions, build records, and repository history.

Important decisions should be recorded rather than left only in chat.

Every file and change should have a reason.

Do not casually:

- delete files,
- rename files,
- restore files,
- reset files,
- overwrite files,
- clean untracked files,
- or use broad Git staging commands without inspection.

Investigate first.

An unexplained untracked file is currently present in the working tree. It must not be modified or deleted until it is properly investigated.

---

## 6. The AI-Video Decision

AI-generated video was investigated as a possible direction.

The conclusion is NOT that AI video is inherently bad.

The narrower conclusion is:

> **AI-generated video should not be ANU's default video-generation architecture.**

Reasons considered include:

- cost,
- stability,
- controllability,
- reproducibility,
- educational correctness,
- and the difficulty of guaranteeing what a generative model will create.

Instead, ANU should prefer established, deterministic technology for assembling educational video.

AI can still have a narrow role when it genuinely reduces cost or effort — for example, generating one specific illustration when an appropriate real asset is unavailable.

The principle is:

> **AI should not be the engine that invents the educational video.**

---

## 7. Programmatic Video Direction

The preferred direction is programmatic video.

Conceptually:

```text
AI video generation

Prompt
 ↓
model invents scene
 ↓
video
```

versus:

```text
ANU programmatic video

Verified educational content
 ↓
scene specification
 ↓
known visual components
 ↓
known animation
 ↓
known narration/timing
 ↓
Remotion
 ↓
MP4
```

The second approach provides substantially more control and makes it easier to keep educational content aligned with verified source material.

---

## 8. Why Remotion

Remotion is the current verified technology proof for this direction.

It fits the existing React-based ANU environment.

The important conceptual advantage is that a video can be assembled from things already decided in code rather than having a model invent the scene.

Remotion is therefore being treated as a promising rendering technology, not yet as a claim that the complete future ANU Video Engine architecture has been finalized.

---

## 9. Existing ANU Proof: MapWalkthrough

ANU already had a small proof pointing in this direction:

`MapWalkthrough.jsx`

The walking figure moving across the Himalayas map according to timing is a code-built, controllable animation with synchronized behavior.

It currently works inside the application.

The important insight is:

> Remotion can potentially take this kind of controlled React animation and render it into an actual exportable video file.

Therefore the Remotion experiment connects naturally to an existing ANU capability rather than being an unrelated technology experiment.

---

## 10. First Remotion Proof

The first experiment was deliberately isolated.

Files:

```text
src/remotion/index.jsx
src/remotion/NaturalResourceIntro.jsx
```

The composition:

```text
NaturalResourceIntro
```

was configured for:

- 30 fps
- 5 seconds
- 150 frames
- 1280 × 720

The composition uses deterministic frame-based animation.

It does NOT currently connect to:

- LessonEngine.jsx
- learnerMemory.js
- Supabase
- narration/voice APIs
- external image assets
- AI-generated video

This isolation was intentional.

---

## 11. First Educational Concept

The proof used the already-reviewed **Our Resources** concept.

The on-screen sentence was preserved verbatim:

> "Nobody made any of these — nature gave them to us for free, and we call them natural resources."

For readability, the sentence was divided into three sequential chunks:

```text
Nobody made any of these —
nature gave them to us for free,
and we call them natural resources.
```

The three visual examples are:

```text
Sun
Water
Minerals
```

These were selected because the verified concept explicitly names sunlight, water, and minerals.

---

## 12. Mineral Visual Review

The first mineral graphic looked too much like a diamond.

This was correctly identified as a possible child-comprehension problem.

The visual was changed to a rough, irregular mineral/ore specimen.

A visible label:

```text
Minerals
```

was also added.

The revised version was rendered and watched.

The human review conclusion was:

> "it changed shows minerals fine"

This is an important development pattern for ANU:

```text
Build
 ↓
Render
 ↓
Watch actual result
 ↓
Notice possible learner confusion
 ↓
Correct
 ↓
Render again
 ↓
Human review
 ↓
Accept
```

This is not merely visual polishing. It is part of keeping representations understandable to learners.

---

## 13. Technical Evidence

Remotion packages were installed and recorded in the project:

```text
remotion 4.0.518
@remotion/cli 4.0.518
```

Dependency checkpoint:

```text
d76c8c0
Add Remotion video rendering dependencies
```

First Remotion source checkpoint:

```text
e4bbc5a
Add first Remotion natural resources video proof
```

The source checkpoint was pushed to GitHub successfully.

The final v3 video was successfully rendered:

```text
out/NaturalResourceIntro-v3.mp4
```

Approximate file size:

```text
401.8 kB
```

The video was opened and watched by the founder/user and the revised Minerals visual was accepted.

Therefore the following is genuinely proven:

> **ANU can render a deterministic educational composition to an MP4 using Remotion.**

---

## 14. What Has NOT Been Proven

The experiment does NOT yet prove that:

- Remotion is the final ANU video architecture.
- Every lesson should become a video.
- Every learner benefits from video.
- AI-generated illustrations are always appropriate.
- Programmatic video automatically improves learning.
- One visual style works for all ages.
- ANU already knows the best teaching method.
- arbitrary educational concepts can automatically be converted into excellent videos.
- a large video library should be built now.

The current evidence is deliberately narrow:

> **The technology can reliably render a controlled educational scene.**

---

## 15. Do Not Turn the Proof Into Hundreds of Hard-Coded Videos

A major architectural warning:

Do NOT immediately create:

```text
NaturalResourceIntro
HimalayasIntro
WaterIntro
CoalIntro
CivicsIntro
...
```

as hundreds of unrelated hard-coded compositions.

That would create a maintenance problem and would prematurely lock ANU into an implementation instead of a teaching architecture.

The Remotion proof should be treated as evidence that the rendering technology works.

---

## 16. Future Video Lesson Engine — Direction, Not Yet Final Architecture

The next architectural question is:

> What is the smallest reusable ANU Video Lesson Engine?

A conceptual flow is:

```text
VERIFIED CONCEPT
       ↓
TEACHING INTENT
       ↓
SCENE PLAN
       ↓
VISUAL TYPES
       ↓
TEXT / NARRATION
       ↓
TIMING
       ↓
REMOTION COMPONENTS
       ↓
VIDEO
```

Potential reusable scene types may eventually include things such as:

- TitleScene
- ExplainScene
- CompareScene
- MapScene
- TimelineScene
- ProcessScene
- QuestionScene
- DiagramScene
- CharacterScene
- ResourceScene

However, this list is NOT finalized.

The reusable scene types should be derived from actual teaching needs in ANU's reviewed content rather than invented prematurely.

---

## 17. Video Must Serve the Teaching System

A critical architectural principle:

### Wrong direction

```text
We have a video engine.
 ↓
Let's find things to put in videos.
```

### Preferred direction

```text
Learner needs to understand X.
        ↓
What is the best teaching representation?
        ↓
Maybe text
Maybe diagram
Maybe interaction
Maybe map
Maybe animation
Maybe video
        ↓
Choose video only when it genuinely helps.
```

Therefore:

> **ANU is a learning/mentoring system. Video is one teaching instrument.**

This prevents ANU from becoming merely an "AI video app."

---

## 18. Long-Term Learner-Evidence Architecture

Eventually ANU should be able to recognize different learner needs, for example:

```text
Learner A
 ├─ struggles with spatial relationships
 ├─ improves with animated maps
 └─ comprehension confirmed after explanation

Learner B
 ├─ struggles with vocabulary
 ├─ improves with examples + dialogue
 └─ comprehension confirmed after assessment

Learner C
 ├─ already understands basic concept
 └─ needs deeper challenge
```

Across many learners:

```text
individual evidence
       ↓
aggregated valid evidence
       ↓
teaching strategy evaluation
       ↓
better ANU teaching
```

This is the architectural meaning of:

> **ANU should learn from the user.**

It should become a real evidence-based learning loop rather than a slogan.

---

## 19. Current Checkpoint

### Proven / complete

- Remotion dependencies installed: YES
- Remotion source created: YES
- Remotion composition renders: YES
- 5-second 1280×720 MP4 produced: YES
- Deterministic animation demonstrated: YES
- Verified educational wording preserved: YES
- Mineral visual reviewed and corrected: YES
- Final v3 watched and accepted: YES
- Source committed: YES
- Source pushed to GitHub: YES

### Still to design

- Reusable Video Lesson Engine
- Scene abstraction
- Concept-to-scene planning
- Narration integration
- Relationship to MapWalkthrough
- When video is pedagogically appropriate
- Learner evidence collection
- Genuine comprehension measurement
- Evidence-based teaching improvement
- How AI should be used narrowly and safely

---

## 20. Current Git Safety State

At the successful checkpoint, the working tree contained:

```text
 M .gitignore
?? out/
?? unexplained untracked file
```

These were intentionally NOT included in the Remotion checkpoint.

The Remotion source was committed and pushed separately.

Do not use `git add .` casually.

Investigate unexplained files before changing them.

Generated render output should not be committed merely because it exists locally. Source code and reproducible build instructions are the important checkpoint unless a deliberate decision is made otherwise.

---

## 21. Development Philosophy Going Forward

ANU should be developed as:

```text
Pedagogy first
      ↓
Verified content
      ↓
Learner need
      ↓
Evidence
      ↓
Appropriate teaching representation
      ↓
Technology
```

Not:

```text
Technology first
      ↓
Find a reason to use it
```

For every significant feature, ask:

1. What learner problem does this solve?
2. What teaching principle supports it?
3. What evidence do we have?
4. How will we know whether it helped?
5. Can we explain the design to a serious educator?
6. Can we improve it from learner evidence?
7. Does it preserve ANU's long-term mentor identity?

---

## 22. Master Principle

The long-term ANU vision can be summarized as:

> **Build an AI-assisted learning mentor that makes students feel comfortable learning, teaches them according to their actual needs, measures genuine comprehension, learns from valid evidence about what helps them, and continuously improves its teaching — using technology as a means, never as the purpose.**

The Remotion work is one small but successful technical proof inside that much larger mission.

---

## 23. Record-Keeping Rule

This file is a living working record, not a replacement for specialized project documentation.

Use the project's existing documents for their specific purposes.

When a major architectural decision, validated experiment, important learner-facing principle, or significant lesson from development occurs, update the appropriate project record and, when useful, update this master record.

Do not silently rewrite history.

Distinguish clearly between:

- **Verified**
- **Observed**
- **Hypothesis**
- **Decision**
- **Future proposal**
- **Not yet tested**

This distinction is essential to ANU's credibility.