/**
 * /api/classify-answer — the REAL "natural language model" brain,
 * 2026-08-15. This is a Vercel serverless function: a small piece of
 * code that runs on a private server, not in the child's browser, so
 * it's the one safe place to use the Anthropic API key.
 *
 * WHAT THIS ACTUALLY DOES: given a concept's correct answer and what
 * the learner actually chose, asks Claude to judge whether a wrong
 * answer suggests she didn't understand the idea, or just picked the
 * wrong button despite understanding it (ASM-001-003) — a real
 * judgment call, not the old fixed "always assume knowledge_gap" stub.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { questionPrompt, correctAnswer, learnerAnswer, conceptText } = req.body || {};

  if (!questionPrompt || !correctAnswer || !learnerAnswer) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // If the answer was actually correct, there's nothing to classify —
  // save the API call entirely. Real cost discipline (AI-008), not just
  // a nice-to-have.
  if (learnerAnswer === correctAnswer) {
    return res.status(200).json({ errorType: null });
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
        max_tokens: 150,
        messages: [
          {
            role: "user",
            content: `A child answered a question wrong. Decide, based on the answer she picked, whether this looks like:
- "knowledge_gap": she likely doesn't understand the underlying idea yet, OR
- "expression_only": she may understand the idea but picked the wrong option for another reason (misread the choices, clicked too fast, etc.)

Lesson content: "${conceptText || "(not provided)"}"
Question: "${questionPrompt}"
Correct answer: "${correctAnswer}"
Her answer: "${learnerAnswer}"

Respond with ONLY one word: either knowledge_gap or expression_only. Nothing else.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      // Fail safely — fall back to the old heuristic rather than break the lesson.
      return res.status(200).json({ errorType: "knowledge_gap", fallback: true });
    }

    const data = await response.json();
    const raw = (data.content?.[0]?.text || "").trim().toLowerCase();
    const errorType = raw.includes("expression") ? "expression_only" : "knowledge_gap";

    return res.status(200).json({ errorType });
  } catch (e) {
    console.error("classify-answer failed:", e);
    return res.status(200).json({ errorType: "knowledge_gap", fallback: true });
  }
}