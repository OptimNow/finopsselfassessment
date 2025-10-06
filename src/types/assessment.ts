export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface Question {
  id: string;
  dimension: string;
  text: string;
  options: {
    value: MaturityLevel;
    label: string;
    description: string;
  }[];
}

export interface Answer {
  questionId: string;
  value: MaturityLevel;
}

export interface AssessmentResult {
  overallScore: number;
  dimensionScores: {
    dimension: string;
    score: number;
    level: string;
  }[];
  recommendations: string[];
}
