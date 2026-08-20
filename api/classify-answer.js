export default async function handler(req, res) {
  console.log("STEP 1: function started, method =", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { questionPrompt, correctAnswer, learnerAnswer, conceptText } = req.body || {};
  console.log("STEP 2: received body", { questionPrompt, correctAnswer, learnerAnswer });

  if (!questionPrompt || !correctAnswer || !learnerAnswer) {
    console.log("STEP 2b: missing required fields, stopping here");
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (learnerAnswer === correctAnswer) {
    console.log("STEP 3: learnerAnswer equals correctAnswer, treating as correct, stopping here");
    return res.status(200).json({ errorType: null });
  }

  console.log("STEP 4: about to call Anthropic. Key exists:", Boolean(process.env.ANTHROPIC_API_KEY), "Key length:", (process.env.ANTHROPIC_API_KEY || "").length);

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

    console.log("STEP 5: got response from Anthropic, status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(200).json({ errorType: "knowledge_gap", fallback: true });
    }

    const data = await response.json();
    const raw = (data.content?.[0]?.text || "").trim().toLowerCase();
    const errorType = raw.includes("expression") ? "expression_only" : "knowledge_gap";
    console.log("STEP 6: success, errorType =", errorType);

    return res.status(200).json({ errorType });
  } catch (e) {
    console.error("classify-answer failed:", e.message);
    return res.status(200).json({ errorType: "knowledge_gap", fallback: true });
  }
}