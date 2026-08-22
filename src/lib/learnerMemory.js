const EVENTS_KEY = "anu_learning_events_v1";

function readEvents() {
  try {
    const raw = window.localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function writeEvents(events) {
  try {
    window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (e) {}
}

export function logEvent(event) {
  const events = readEvents();
  events.push({ ...event, timestamp: Date.now() });
  writeEvents(events);
  console.log("[learning_event, saved]", event);
}

export function getPreferredRepresentation(learnerId, conceptId) {
  const events = readEvents();
  const relevant = events.filter(
    (e) => e.learnerId === learnerId && e.conceptId === conceptId && e.eventType === "attempt" && e.wasCorrect
  );
  if (relevant.length === 0) return null;
  const last = relevant[relevant.length - 1];
  return last.payload?.representationShown || null;
}

export function getConceptsDueForRecall(learnerId, minGapMs = 5 * 60 * 1000) {
  const events = readEvents();
  const now = Date.now();
  const byConceptLastCorrect = {};
  events.forEach((e) => {
    if (e.learnerId === learnerId && e.eventType === "attempt" && e.wasCorrect) {
      byConceptLastCorrect[e.conceptId] = e.timestamp;
    }
  });
  const recallDone = new Set(
    events
      .filter((e) => e.learnerId === learnerId && e.eventType === "delayed_recall")
      .map((e) => e.conceptId)
  );
  return Object.entries(byConceptLastCorrect)
    .filter(([conceptId, ts]) => now - ts >= minGapMs && !recallDone.has(conceptId))
    .map(([conceptId]) => conceptId);
}

export function getStruggleSignal(learnerId, lookback = 4) {
  const events = readEvents().filter((e) => e.learnerId === learnerId);
  const recentAttempts = events.filter((e) => e.eventType === "attempt").slice(-lookback);
  if (recentAttempts.length < 2) return "neutral";

  const wrongCount = recentAttempts.filter((e) => !e.wasCorrect).length;
  const hintHeavyCount = recentAttempts.filter((e) => (e.payload?.hintsUsed || 0) > 0).length;
  const slowCount = recentAttempts.filter((e) => (e.payload?.hesitationMs || 0) > 15000).length;

  const struggleScore = wrongCount + hintHeavyCount + slowCount;
  const totalPossible = recentAttempts.length * 2;

  if (struggleScore >= totalPossible * 0.5) return "struggling";
  if (wrongCount === 0 && hintHeavyCount === 0 && slowCount === 0) return "flowing";
  return "neutral";
}

export function getUnresolvedConcepts(learnerId) {
  const events = readEvents().filter(
    (e) => e.learnerId === learnerId && e.eventType === "concept_unresolved"
  );
  const latestByConceptId = {};
  events.forEach((e) => {
    latestByConceptId[e.conceptId] = e.timestamp;
  });
  return Object.entries(latestByConceptId)
    .map(([conceptId, timestamp]) => ({ conceptId, timestamp }))
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function getMemorySummary(learnerId) {
  const events = readEvents().filter((e) => e.learnerId === learnerId);
  const concepts = [...new Set(events.map((e) => e.conceptId))];
  return concepts.map((conceptId) => {
    const attempts = events.filter((e) => e.conceptId === conceptId && e.eventType === "attempt");
    const hints = events.filter((e) => e.conceptId === conceptId && e.eventType === "hint_used").length;
    const correct = attempts.filter((e) => e.wasCorrect).length;
    return { conceptId, attempts: attempts.length, correct, hintsUsed: hints };
  });
}