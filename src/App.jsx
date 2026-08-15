import React, { useState, useEffect } from "react";
import ConsentGate from "./components/ConsentGate";
import LessonEngine from "./components/LessonEngine";
import himalayasChapter from "./content/himalayas-concept-graph.json";

/**
 * App — ties Sprint 0 (consent) to Sprint 2/3 (lesson) together.
 *
 * TEMPORARY: consent is now remembered locally in this browser
 * (localStorage) so you don't have to re-fill the form on every
 * refresh. This is NOT the same as real, permanent storage — it only
 * lives on this one computer, in this one browser. The real fix
 * (saving to Supabase) is still the TODO in App.jsx below and in
 * README.md. Treat this as a convenience for solo testing, not a
 * finished consent system.
 */
const LOCAL_KEY = "anu_consent_record_v1";

export default function App() {
  const [consentRecord, setConsentRecord] = useState(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LOCAL_KEY);
      if (saved) setConsentRecord(JSON.parse(saved));
    } catch (e) {
      /* localStorage unavailable, just show the consent form again */
    }
    setCheckedStorage(true);
  }, []);

  if (!checkedStorage) return null; // brief flash-avoidance, checks storage first

  if (!consentRecord) {
    return (
      <ConsentGate
        onConsentGiven={(record) => {
          // TODO (brother): write `record` into Supabase `guardians` +
          // `consent_records` tables here (see db/schema.sql), then
          // create a matching row in `learners`, and pass that
          // learner's real id into LessonEngine below instead of
          // the placeholder 'demo-learner'.
          try {
            window.localStorage.setItem(LOCAL_KEY, JSON.stringify(record));
          } catch (e) {}
          setConsentRecord(record);
        }}
      />
    );
  }

  return <LessonEngine chapter={himalayasChapter} learnerId="demo-learner" />;
}