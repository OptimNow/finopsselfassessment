import { useEffect, useState } from "react";

export type Recommendation = {
  title: string;
  why_it_matters: string;
  first_step: string;
};

export function useRecommendations(overallScore: number, perCategory: any) {
  const [recs, setRecs] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const r = await fetch("/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ overallScore, perCategory }),
        });

        const json = await r.json();

        if (!r.ok) {
          throw new Error(json?.error ?? "API error");
        }

        if (!cancelled) {
          setRecs(json.recommendations ?? []);
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
  }, [overallScore, perCategory]);

  return { recs, loading, error };
}
