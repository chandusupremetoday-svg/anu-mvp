import React from "react";
import { getUnresolvedConcepts, getRecentReexplanations, getMemorySummary } from "../lib/learnerMemory.js";

export default function ParentView({ chapters, learnerId, onBack }) {
  const unresolved = getUnresolvedConcepts(learnerId);
  const recentExplanations = getRecentReexplanations(learnerId, 5);
  const summary = getMemorySummary(learnerId);

  function findConceptInfo(conceptId) {
    for (const ch of chapters) {
      const found = ch.data.concepts.find((c) => c.id === conceptId);
      if (found) return { title: found.title, chapterTitle: ch.data.chapterTitle };
    }
    return { title: conceptId, chapterTitle: null };
  }

  const totalAttempts = summary.reduce((sum, s) => sum + s.attempts, 0);
  const totalCorrect = summary.reduce((sum, s) => sum + s.correct, 0);

  return (
    <div style={{ maxWidth: 480, margin: "24px auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#6B6355", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0 }}>
        ← Back
      </button>
      <h2 style={{ marginTop: 0 }}>For Parents</h2>

      {totalAttempts > 0 && (
        <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 16, marginBottom: 20, fontSize: 14, color: "#5A5346" }}>
          So far: <strong>{totalAttempts}</strong> question{totalAttempts === 1 ? "" : "s"} attempted,{" "}
          <strong>{totalCorrect}</strong> correct on the first real look. This isn't a score to judge
          her by — it's just here so you can see roughly how much she's actually doing.
        </div>
      )}

      <h3 style={{ fontSize: 16, marginBottom: 8 }}>What ANU explained to her recently</h3>
      {recentExplanations.length === 0 ? (
        <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 16, color: "#5A5346", fontSize: 14, marginBottom: 24 }}>
          Nothing here yet — this fills in the moment she gets something wrong that the AI thinks is
          a genuine understanding gap, and shows you exactly what it told her.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {recentExplanations.map((e, i) => {
            const info = findConceptInfo(e.conceptId);
            const date = new Date(e.timestamp);
            return (
              <div key={i} style={{ background: "#EAF1F6", border: "1px solid #C2D6E0", borderRadius: 12, padding: 14 }}>
                <div style={{ fontSize: 12, color: "#5A7285", marginBottom: 4 }}>
                  {info.title}
                  {info.chapterTitle ? ` · ${info.chapterTitle}` : ""} ·{" "}
                  {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{ fontSize: 13, color: "#5A5346", marginBottom: 6 }}>
                  <strong>Question:</strong> {e.payload.questionPrompt}
                  <br />
                  <strong>She picked:</strong> {e.payload.selected}
                </div>
                <div style={{ fontSize: 14, color: "#2E4A5A" }}>🌱 {e.payload.reexplanationShown}</div>
              </div>
            );
          })}
        </div>
      )}

      <h3 style={{ fontSize: 16, marginBottom: 8 }}>Still genuinely tricky</h3>
      {unresolved.length === 0 ? (
        <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 18, color: "#5A5346" }}>
          Nothing marked as still-tricky yet — either she hasn't hit a genuinely hard spot, or
          she's worked through everything so far. This will show up here honestly the moment it
          happens.
        </div>
      ) : (
        <>
          <p style={{ color: "#5A5346", fontSize: 15 }}>
            These are the moments the app tried a few different ways and it still didn't land —
            real spots where sitting down with her yourself could genuinely help.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {unresolved.map(({ conceptId, timestamp }) => {
              const info = findConceptInfo(conceptId);
              const date = new Date(timestamp);
              return (
                <div key={conceptId} style={{ background: "#FFF6DE", border: "1px solid #E9D9A0", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontWeight: 700 }}>{info.title}</div>
                  {info.chapterTitle && (
                    <div style={{ fontSize: 13, color: "#8A8375", marginTop: 2 }}>{info.chapterTitle}</div>
                  )}
                  <div style={{ fontSize: 12, color: "#9C9585", marginTop: 6 }}>
                    {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}