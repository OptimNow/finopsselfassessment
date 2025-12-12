import OpenAI from "openai";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { overallScore, perCategory } = req.body;

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a FinOps expert.
Given the overall score and per-category scores, return exactly 3 recommendations.
Each recommendation must have: title, why_it_matters, first_step.
Return JSON only: { "recommendations": [ ... ] }.

Overall score: ${overallScore}
Per-category: ${JSON.stringify(perCategory)}
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const text = completion.choices[0]?.message?.content ?? "{}";
    return res.status(200).send(text);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Server error" });
  }
}
