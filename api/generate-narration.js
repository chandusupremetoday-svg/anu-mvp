/**
 * /api/generate-narration — 2026-08-22.
 *
 * WHAT THIS DOES: ANU is a teaching platform, not a reading platform.
 * Before this file existed, "Hear this" just read the on-screen text
 * aloud, word for word — no different from a book being narrated.
 * This turns that into an actual explanation: it asks Claude to
 * re-teach the same idea out loud, in a different, simpler, spoken
 * way — a real comparison, natural spoken rhythm — while the written
 * text on screen stays exactly as it was, for reading/reference.
 *
 * The frontend caches the result per concept, so this only runs once
 * per concept per browser — same "generate once, cache forever"
 * pattern as the voice audio itself.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { writtenText, conceptTitle, chapterTitle } = req.body || {};

  if (!writtenText) {
    return res.status(400).json({ error: "Missing required field: writtenText" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `You are the spoken voice of a teaching app for a Class 4 child (around age 9-10)${
              chapterTitle ? `, currently in the chapter "${chapterTitle}"` : ""
            }${conceptTitle ? `, on the topic "${conceptTitle}"` : ""}.

Here is text already written on her screen for her to read:
"${writtenText}"

Do NOT read this text aloud or repeat its wording. Instead, write a short SPOKEN explanation of the same idea, as if a warm, engaging teacher were explaining it out loud to her for the very first time — not reciting a book.

Rules:
- Use one relatable, everyday comparison a child would recognize — something from daily life, play, family, food, or things kids notice around them.
- Natural spoken language: short sentences, the rhythm of real speech, not written prose.
- Teach the same core idea as the written text, but in your own words — explain it, don't reword it.
- Keep it roughly the same length as the original — not longer.
- Output ONLY the spoken explanation itself. No preamble, no labels, no quotation marks.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error (generate-narration):", errText);
      return res.status(200).json({ narration: null, fallback: true });
    }

    const data = await response.json();
    const narration = (data.content?.[0]?.text || "").trim();

    return res.status(200).json({ narration: narration || null });
  } catch (e) {
    console.error("generate-narration failed:", e.message);
    return res.status(200).json({ narration: null, fallback: true });
  }
}