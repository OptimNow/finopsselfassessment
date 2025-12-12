type QuestionOption = { label: string; score: number };
type Question = {
  id: string;
  category: string;
  text: string;
  gapLabel?: string;
  options: QuestionOption[];
};

type Answers = Record<string, number>; 
// Ici, on suppose que answers[qid] contient le score choisi (0..4).
// Si chez toi answers stocke autre chose (un index, un label), dis-moi et je t’adapte.

export function computeResults(questions: Question[], answers: Answers) {
  const perCategory: Record<
    string,
    {
      earned: number;
      possible: number;
      score: number; // 0..100
      primaryGap?: { label: string; severity: number };
    }
  > = {};

  let overallEarned = 0;
  let overallPossible = 0;

  for (const q of questions) {
    const cat = q.category || "uncategorized";

    if (!perCategory[cat]) {
      perCategory[cat] = { earned: 0, possible: 0, score: 0 };
    }

    const maxScore = Math.max(...q.options.map((o) => o.score));
    const selectedScore = answers[q.id] ?? 0;

    perCategory[cat].earned += selectedScore;
    perCategory[cat].possible += maxScore;

    overallEarned += selectedScore;
    overallPossible += maxScore;

    const gap = maxScore - selectedScore;
    if (gap > 0) {
      const label = q.gapLabel ?? q.text;
      const current = perCategory[cat].primaryGap;

      if (!current || gap > current.severity) {
        perCategory[cat].primaryGap = {
          label,
          severity: gap,
        };
      }
    }
  }

  for (const cat of Object.keys(perCategory)) {
    const c = perCategory[cat];
    c.score = c.possible > 0 ? Math.round((c.earned / c.possible) * 100) : 0;
  }

  const overallScore = overallPossible > 0 ? Math.round((overallEarned / overallPossible) * 100) : 0;

  return { perCategory, overallScore };
}

