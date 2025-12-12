import OpenAI from "openai";

export const config = { runtime: "nodejs" };

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJsonCandidate(text: string) {
  // Handles plain JSON or ```json ... ``` blocks
  return text
    .replace(/```json/gi, "```")
    .replace(/```/g, "")
    .trim();
}

export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { overallScore, perCategory } = req.body ?? {};
    if (typeof overallScore !== "number" || !perCategory) {
      return res.status(400).json({ error: "Missing overallScore or perCategory" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not set" });
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
Return exactly 3 FinOps recommendations as JSON only.

Schema:
{
  "recommendations": [
    { "title": "...", "why_it_matters": "...", "first_step": "..." }
  ]
}

Rules:
- title max 8 words
- why_it_matters max 2 sentences
- first_step 1 concrete sentence
- No markdown, no bullets, no extra keys.

Overall score: ${overallScore}
Context: ${JSON.stringify(perCategory)}
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "user", content: prompt }
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const candidate = extractJsonCandidate(raw);
    const parsed = safeJsonParse(candidate);

    if (parsed && Array.isArray(parsed.recommendations)) {
      return res.status(200).json(parsed);
    }

    // If still not JSON, return JSON with raw attached for debugging
    return res.status(200).json({
      recommendations: [],
      error: "Model returned non-JSON content",
      raw,
    });
  } catch (e: any) {
    return res.status(500).json({
      error: e?.message ?? "Server error",
      stack: e?.stack ?? null,
    });
  }
}
