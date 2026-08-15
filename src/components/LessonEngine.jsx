import React, { useState, useEffect } from "react";
import MapMatchActivity from "./MapMatchActivity.jsx";
import ReadAlongPhrases from "./ReadAlongPhrases.jsx";
import { logEvent, getPreferredRepresentation, getConceptsDueForRecall } from "../lib/learnerMemory.js";

let cachedVoice = null;
function getVoices() {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length) { resolve(voices); return; }
    window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
  });
}
async function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new window.SpeechSynthesisUtterance(text);
    if (!cachedVoice) {
      const voices = await getVoices();
      cachedVoice =
        voices.find((v) => /natural|online|neural/i.test(v.name) && v.lang.startsWith("en")) ||
        voices.find((v) => v.lang === "en-IN") ||
        voices.find((v) => v.lang.startsWith("en")) ||
        null;
    }
    if (cachedVoice) u.voice = cachedVoice;
    u.lang = cachedVoice ? cachedVoice.lang : "en-IN";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

async function classifyError(selectedOption, correctOption, question, conceptText) {
  if (selectedOption === correctOption) return null;
  try {
    const res = await fetch("/api/classify-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionPrompt: question.prompt,
        correctAnswer: correctOption,
        learnerAnswer: selectedOption,
        conceptText,
      }),
    });
    if (!res.ok) throw new Error("backend not available");
    const data = await res.json();
    return data.errorType || "knowledge_gap";
  } catch (e) {
    return "knowledge_gap";
  }
}

export default function LessonEngine({ chapter, learnerId }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [repIndex, setRepIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [hintsUsedThisConcept, setHintsUsedThisConcept] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [stage, setStage] = useState("blocked-check");

  const isApproved = Boolean(chapter?.reviewedBy && chapter?.reviewedAt);

  if (stage === "blocked-check" && isApproved) {
    setStage("teaching");
  }

  if (!isApproved) {
    return (
      <div style={cardStyle}>
        <h3>This chapter isn't ready yet</h3>
        <p>
          "{chapter?.chapterTitle}" hasn't been signed off by a human reviewer yet (CNT-003). The
          lesson engine refuses to show it to a learner until <code>reviewedBy</code> and{" "}
          <code>reviewedAt</code> are filled in on the concept graph.
        </p>
      </div>
    );
  }

  const concepts = chapter.concepts;
  const concept = concepts[conceptIndex];

  useEffect(() => {
    if (!concept || concept.activityType) return;
    const preferred = getPreferredRepresentation(learnerId, concept.id);
    if (preferred) {
      const idx = concept.representations.findIndex((r) => r.type === preferred);
      if (idx >= 0 && idx !== repIndex) {
        setRepIndex(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conceptIndex]);

  if (concept?.activityType === "match_zones") {
    return (
      <MapMatchActivity
        activity={concept}
        onComplete={() => {
          setConceptIndex(conceptIndex + 1 < concepts.length ? conceptIndex + 1 : conceptIndex);
          if (conceptIndex + 1 >= concepts.length) setStage("complete");
        }}
      />
    );
  }

  if (stage === "complete") {
    const dueForRecall = getConceptsDueForRecall(learnerId);
    return (
      <div style={cardStyle}>
        <h3>🎉 Lesson complete: {chapter.chapterTitle}</h3>
        {dueForRecall.length > 0 ? (
          <div style={{ background: "#FFF6DE", border: "1px solid #E9D9A0", borderRadius: 10, padding: 14, marginBottom: 14 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Quick check — do you still remember?</p>
            <p style={{ margin: "6px 0 0 0", fontSize: 14 }}>
              It's been a little while since you learned {dueForRecall.length === 1 ? "this" : "these"}:{" "}
              {dueForRecall.map((id) => concepts.find((c) => c.id === id)?.title || id).join(", ")}.
              Come back to those concepts to see if they've really stuck.
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "#8A8375" }}>
            (No concepts are due for a delayed-recall check yet — come back later and this will show real ones.)
          </p>
        )}
        <p>All concepts covered. Next session, invite a teach-back moment (JRNY-008):</p>
        <p style={{ fontStyle: "italic" }}>
          "One of your friends couldn't make it today — can you explain what you learned about the
          Himalayas to them tomorrow?"
        </p>
      </div>
    );
  }

  const rep = concept.representations[repIndex];
  const question = concept.checkQuestions[0];

  function useHint() {
    setShowHint(true);
    setHintsUsedThisConcept((h) => h + 1);
    logEvent({
      learnerId,
      conceptId: concept.id,
      eventType: "hint_used",
      payload: { hintsSoFar: hintsUsedThisConcept + 1 },
    });
  }

  async function choose(option) {
    if (selected) return;
    setSelected(option);
    const errorType = await classifyError(option, question.correct, question, rep.content);
    const wasCorrect = option === question.correct;

    logEvent({
      learnerId,
      conceptId: concept.id,
      eventType: "attempt",
      wasCorrect,
      errorType,
      payload: { selected: option, representationShown: rep.type, hintsUsed: hintsUsedThisConcept },
    });

    if (!wasCorrect) {
      const hasAnotherRep = repIndex + 1 < concept.representations.length;
      if (hasAnotherRep) {
        logEvent({
          learnerId,
          conceptId: concept.id,
          eventType: "method_switch",
          payload: { from: rep.type, to: concept.representations[repIndex + 1].type },
        });
      }
    }
  }

  function next() {
    const wasCorrect = selected === question.correct;
    if (!wasCorrect && repIndex + 1 < concept.representations.length) {
      setRepIndex(repIndex + 1);
      setSelected(null);
      setShowHint(false);
      return;
    }
    setRepIndex(0);
    setSelected(null);
    setHintsUsedThisConcept(0);
    setShowHint(false);
    if (conceptIndex + 1 < concepts.length) {
      setConceptIndex(conceptIndex + 1);
    } else {
      setStage("complete");
    }
  }

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 12, color: "#8A8375", marginBottom: 8 }}>
        {chapter.chapterTitle} · concept {conceptIndex + 1}/{concepts.length}
      </div>
      <h3>{concept.title}</h3>

      {rep.type === "phrase_walkthrough" ? (
        <ReadAlongPhrases phrases={rep.phrases} />
      ) : (
        <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", color: "#9C9585", marginBottom: 6 }}>
            {rep.type.replace("_", " ")}
          </div>
          <p style={{ margin: 0 }}>{rep.content}</p>
          <button onClick={() => speak(rep.content)} style={smallBtnStyle}>
            🔊 Hear this
          </button>
        </div>
      )}

      <p style={{ fontWeight: 600 }}>{question.prompt}</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        {question.options.map((opt) => {
          let bg = "#fff";
          let border = "#DDD6C7";
          if (selected) {
            if (opt === question.correct) { bg = "#E4F3E8"; border = "#3A6B5C"; }
            else if (opt === selected) { bg = "#FBEAE6"; border = "#C97A63"; }
          }
          return (
            <button
              key={opt}
              onClick={() => choose(opt)}
              style={{ ...optionBtnStyle, background: bg, borderColor: border }}
              disabled={Boolean(selected)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!selected && !showHint && (
        <button onClick={useHint} style={smallBtnStyle}>
          💡 Give me a hint
        </button>
      )}
      {!selected && showHint && (
        <div style={{ background: "#FFF6DE", border: "1px solid #E9D9A0", borderRadius: 10, padding: "10px 14px", marginTop: 8, fontSize: 14 }}>
          💡 {concept.hint || "Look closely at the text above — the answer is stated directly in it."}
        </div>
      )}

      {selected && (
        <div>
          <p style={{ fontWeight: 700, color: selected === question.correct ? "#3A6B5C" : "#A8637E" }}>
            {selected === question.correct
              ? "Nice — that's it."
              : "Not quite — let's look at it a different way."}
          </p>
          <button onClick={next} style={btnStyle}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  maxWidth: 480,
  margin: "24px auto",
  padding: 24,
  borderRadius: 20,
  background: "#FBF7F0",
  border: "1px solid #E7E1D4",
  fontFamily: "system-ui, sans-serif",
};
const btnStyle = { background: "#3A6B5C", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 700, cursor: "pointer" };
const smallBtnStyle = { background: "#fff", border: "1px solid #DDD6C7", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", marginTop: 8 };
const optionBtnStyle = { border: "2px solid", borderRadius: 12, padding: "10px 16px", fontSize: 15, cursor: "pointer" };