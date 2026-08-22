/**
 * /api/generate-speech — real natural voice narration, 2026-08-22.
 * Same safe pattern as /api/classify-answer.js: this runs on Vercel's
 * server, so the Sarvam API key stays hidden and is never exposed to
 * the child's browser.
 *
 * WHAT THIS DOES: takes a piece of lesson text and returns real,
 * natural-sounding narration audio (Sarvam AI's Bulbul model),
 * replacing the old robotic browser voice. If the real voice call
 * ever fails, the frontend falls back to the old browser voice, so a
 * lesson can never break because of this.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { text, languageCode, speaker } = req.body || {};

  if (!text) {
    return res.status(400).json({ error: "Missing required field: text" });
  }

  try {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": process.env.SARVAM_API_KEY,
      },
      body: JSON.stringify({
        text,
        target_language_code: languageCode || "en-IN",
        speaker: speaker || "shubh",
        model: "bulbul:v3",
        pace: 0.85,
        speech_sample_rate: 22050,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Sarvam API error:", errText);
      return res.status(200).json({ audio: null, fallback: true });
    }

    const data = await response.json();
    const audioBase64 = data.audios?.[0] || null;

    return res.status(200).json({ audio: audioBase64 });
  } catch (e) {
    console.error("generate-speech failed:", e.message);
    return res.status(200).json({ audio: null, fallback: true });
  }
}