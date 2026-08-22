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
        max_tokens: 300,
        messages: [
          {
            role: "user",
            content: `A child answered a question wrong. First, decide, based on the answer she picked, whether this looks like:
- "knowledge_gap": she likely doesn't understand the underlying idea yet, OR
- "expression_only": she may understand the idea but picked the wrong option for another reason (misread the choices, clicked too fast, etc.)

Lesson content: "${conceptText || "(not provided)"}"
Question: "${questionPrompt}"
Correct answer: "${correctAnswer}"
Her answer: "${learnerAnswer}"

If, and only if, this is a "knowledge_gap", also write a short re-explanation of the same idea for her, in a DIFFERENT, SIMPLER way than the lesson content above — as if a caring adult is sitting beside her, gently exploring the idea together, not correcting her. Follow these rules strictly:
- Do NOT say or imply she was "wrong," "incorrect," or got it "wrong" — she already sees that from the on-screen colours; don't repeat it in words.
- Start by gently acknowledging the idea is worth another look together (e.g. "Let's look at this together" or "Here's another way to think about it") rather than restating what she picked.
- Do not just repeat the original wording — explain it a genuinely different way (a small everyday comparison a Class 4 child would relate to works well).
- 1-3 short sentences. Plain, warm, concrete language. No jargon. Speak TO her, gently, like a person who believes she can get this.

If this is "expression_only", leave the re-explanation as an empty string — she doesn't need it, she understands the idea already.

Respond with ONLY valid JSON, nothing else, no markdown fences, in exactly this shape:
{"errorType": "knowledge_gap", "reexplanation": "..."}
or
{"errorType": "expression_only", "reexplanation": ""}`,
          },
        ],
      }),
    });

    console.log("STEP 5: got response from Anthropic, status:", response.status);

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(200).json({ errorType: "knowledge_gap", reexplanation: "", fallback: true });
    }

    const data = await response.json();
    const raw = (data.content?.[0]?.text || "").trim();
    const cleaned = raw.replace(/^```json\s*|^```\s*|```\s*$/g, "").trim();

    let errorType = "knowledge_gap";
    let reexplanation = "";
    try {
      const parsed = JSON.parse(cleaned);
      errorType = parsed.errorType === "expression_only" ? "expression_only" : "knowledge_gap";
      reexplanation = typeof parsed.reexplanation === "string" ? parsed.reexplanation : "";
    } catch (parseErr) {
      console.error("STEP 6b: could not parse JSON from model, raw was:", raw);
      errorType = cleaned.toLowerCase().includes("expression") ? "expression_only" : "knowledge_gap";
      reexplanation = "";
    }

    console.log("STEP 6: success, errorType =", errorType, "has reexplanation:", Boolean(reexplanation));

    return res.status(200).json({ errorType, reexplanation });
  } catch (e) {
    console.error("classify-answer failed:", e.message);
    return res.status(200).json({ errorType: "knowledge_gap", reexplanation: "", fallback: true });
  }
}