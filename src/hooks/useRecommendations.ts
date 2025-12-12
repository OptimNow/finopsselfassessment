import { useEffect, useMemo, useState } from "react";

export type Recommendation = {
  title: string;
  why_it_matters: string;
  first_step: string;
};

export function useRecommendations(overallScore: number, perCategory: any) {
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Stable key so the effect does not re-run just because the object reference changed
  const perCategoryKey = useMemo(() => JSON.stringify(perCategory), [perCategory]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        setRecs(null);

        const r = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ overallScore, perCategory }),
        });

        const text = await r.text();

        let json: any = null;
        try {
          json = JSON.parse(text);
        } catch {
          // If server returns HTML/text error, keep it as-is for debugging
          throw new Error(text.slice(0, 200));
        }

        if (!r.ok) {
          throw new Error(json?.error ?? "API error");
        }

        if (cancelled) return;

        const nextRecs: Recommendation[] = Array.isArray(json?.recommendations)
          ? json.recommendations
          : [];

        setRecs(nextRecs);

        // Helpful debugging: server returned JSON but no recos
        if (nextRecs.length === 0 && json?.error) {
          setError(String(json.error));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [overallScore, perCategoryKey]); // <- correct dependency array

  return { recs, loading, error };
}
