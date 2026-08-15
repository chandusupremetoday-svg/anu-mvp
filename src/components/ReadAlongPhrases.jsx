import React, { useState, useRef, useEffect } from "react";
import MapWalkthrough from "./MapWalkthrough.jsx";

let cachedVoice = null;
function getVoices() {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length) { resolve(voices); return; }
    window.speechSynthesis.onvoiceschanged = () => resolve(window.speechSynthesis.getVoices());
  });
}
async function pickVoice() {
  if (cachedVoice) return cachedVoice;
  const voices = await getVoices();
  cachedVoice =
    voices.find((v) => /natural|online|neural/i.test(v.name) && v.lang.startsWith("en")) ||
    voices.find((v) => v.lang === "en-IN") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    null;
  return cachedVoice;
}

const PAUSE_BETWEEN_PHRASES_MS = 1400;

export default function ReadAlongPhrases({ phrases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  async function speakPhrase(index) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const text = phrases[index].text.trim();
      const u = new window.SpeechSynthesisUtterance(text);
      const voice = await pickVoice();
      if (voice) u.voice = voice;
      u.rate = 0.8;
      u.onend = () => {
        if (isPausedRef.current) return;
        pauseTimerRef.current = setTimeout(() => {
          if (isPausedRef.current) return;
          if (index + 1 < phrases.length) {
            setCurrentIndex(index + 1);
          }
        }, PAUSE_BETWEEN_PHRASES_MS);
      };
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  useEffect(() => {
    if (!started || isPaused) return;
    speakPhrase(currentIndex);
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, started]);

  function begin() {
    setStarted(true);
  }

  function togglePause() {
    if (isPaused) {
      setIsPaused(false);
      speakPhrase(currentIndex);
    } else {
      setIsPaused(true);
      window.speechSynthesis?.cancel();
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    }
  }

  function jumpTo(i) {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setIsPaused(false);
    setCurrentIndex(i);
  }

  const current = phrases[currentIndex];

  return (
    <div style={{ background: "#F3EFE4", borderRadius: 14, padding: 16, marginBottom: 16 }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", color: "#9C9585", marginBottom: 10 }}>
        READ ALONG
      </div>

      <div style={{ lineHeight: 2.1, fontSize: 16, marginBottom: 14 }}>
        {phrases.map((p, i) => (
          <span
            key={i}
            onClick={() => started && jumpTo(i)}
            style={{
              background: i === currentIndex && started ? "#FFE9A8" : "transparent",
              borderRadius: 6,
              padding: "2px 2px",
              cursor: started ? "pointer" : "default",
              transition: "background 0.2s",
            }}
          >
            {p.text}
          </span>
        ))}
      </div>

      {!started ? (
        <button
          onClick={begin}
          style={{
            background: "#3A6B5C", color: "#fff", border: "none", borderRadius: 10,
            padding: "12px 24px", fontSize: 16, fontWeight: 700, cursor: "pointer", width: "100%",
          }}
        >
          ▶ Let's begin
        </button>
      ) : (
        <>
          <div style={{ background: "#fff", borderRadius: 14, padding: "18px 10px", marginBottom: 12 }}>
            {current.map ? (
              <MapWalkthrough activeLabel={current.label} x={current.map.x} y={current.map.y} speech={current.map.speech} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 68 }}>{current.icon}</div>
                <div style={{ fontSize: 15, color: "#6B6355", marginTop: 6 }}>{current.label}</div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button
              onClick={togglePause}
              style={{
                background: "#fff", border: "1px solid #DDD6C7", borderRadius: 8,
                padding: "8px 18px", fontSize: 14, cursor: "pointer",
              }}
            >
              {isPaused ? "▶ Play" : "⏸ Pause"}
            </button>
            <button
              onClick={() => jumpTo(currentIndex)}
              style={{
                background: "#fff", border: "1px solid #DDD6C7", borderRadius: 8,
                padding: "8px 18px", fontSize: 14, cursor: "pointer",
              }}
            >
              🔁 Hear again
            </button>
          </div>
        </>
      )}
    </div>
  );
}