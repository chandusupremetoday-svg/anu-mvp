import React, { useState, useEffect } from "react";
import ConsentGate from "./components/ConsentGate";
import LessonEngine from "./components/LessonEngine";
import ParentView from "./components/ParentView";
import himalayasChapter from "./content/himalayas-concept-graph.json";
import civicsChapter from "./content/civics-government-roles.json";
import ourResourcesChapter from "./content/our-resources-concept-graph.json";

const CHAPTERS = [
  { id: "himalayas", title: "The Himalayas (Social Studies)", data: himalayasChapter },
  { id: "civics", title: "Who Runs Our Country and State? (Civics)", data: civicsChapter },
  { id: "our-resources", title: "Our Resources (Social Studies)", data: ourResourcesChapter },
];

const LOCAL_KEY = "anu_consent_record_v1";

export default function App() {
  const [consentRecord, setConsentRecord] = useState(null);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showParentView, setShowParentView] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCAL_KEY);
      if (saved) setConsentRecord(JSON.parse(saved));
    } catch (e) {}
    setCheckedStorage(true);
  }, []);

  if (!checkedStorage) return null;

  if (!consentRecord) {
    return (
      <ConsentGate
        onConsentGiven={(record) => {
          try {
            window.localStorage.setItem(LOCAL_KEY, JSON.stringify(record));
          } catch (e) {}
          setConsentRecord(record);
        }}
      />
    );
  }

  if (showParentView) {
    return <ParentView chapters={CHAPTERS} learnerId="demo-learner" onBack={() => setShowParentView(false)} />;
  }

  if (!selectedChapter) {
    return (
      <div style={{ maxWidth: 480, margin: "40px auto", padding: 20, fontFamily: "system-ui, sans-serif" }}>
        <h2 style={{ textAlign: "center" }}>Choose a lesson</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChapter(ch)}
              style={{
                background: "#FBF7F0",
                border: "1px solid #E7E1D4",
                borderRadius: 14,
                padding: "16px 20px",
                fontSize: 16,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {ch.title}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowParentView(true)}
          style={{
            display: "block",
            margin: "20px auto 0",
            background: "none",
            border: "none",
            color: "#6B6355",
            fontSize: 14,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          For Parents
        </button>
      </div>
    );
  }

  return <LessonEngine chapter={selectedChapter.data} learnerId="demo-learner" />;
}