import React from "react";
import { getUnresolvedConcepts } from "../lib/learnerMemory.js";

export default function ParentView({ chapters, learnerId, onBack }) {
  const unresolved = getUnresolvedConcepts(learnerId);

  function findConceptInfo(conceptId) {
    for (const ch of chapters) {
      const found = ch.data.concepts.find((c) => c.id === conceptId);
      if (found) return { title: found.title, chapterTitle: ch.data.chapterTitle };
    }
    return { title: conceptId, chapterTitle: null };
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#6B6355", fontSize: 14, cursor: "pointer", marginBottom: 16, padding: 0 }}>
        ← Back
      </button>
      <h2 style={{ marginTop: 0 }}>For Parents</h2>

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