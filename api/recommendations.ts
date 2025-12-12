import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req: any, res: any) {
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
You are a senior FinOps consultant.

Input:
- Overall score: 0-100
- Per-category: each has score_0_to_100 and primaryGap

Task:
Return exactly 3 recommendations. Each recommendation must include:
- title (max 8 words)
- why_it_matters (max 2 sentences)
- first_step (1 sentence, concrete)

Return JSON only, exactly in this schema:
{
  "recommendations": [
    { "title": "...", "why_it_matters": "...", "first_step": "..." }
  ]
}

Overall score: ${overallScore}
Per-category: ${JSON.stringify(perCategory)}
`.trim();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const text = completion.choices?.[0]?.message?.content ?? "";

    const parsed = safeJsonParse(text);
    if (parsed && Array.isArray(parsed.recommendations)) {
      return res.status(200).json(parsed);
    }

    // Fallback: if the model returns text, wrap it safely
    return res.status(200).json({
      recommendations: [
        {
          title: "Review AI output format",
          why_it_matters: "The model response was not valid JSON. This is a formatting issue, not your scoring.",
          first_step: "Retry once, then inspect the raw response in Vercel logs.",
        },
      ],
      raw: text,
    });
} catch (e: any) {
  return res.status(500).json({
    error: e?.message ?? "Server error",
    stack: e?.stack ?? null,
  });
}
