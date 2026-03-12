import { Answer, AssessmentResult, Question } from "@/types/assessment";

export function getMaturityLevel(score: number): string {
  if (score < 2) return "Beginner";
  if (score < 3) return "Developing";
  if (score < 4) return "Intermediate";
  if (score < 4.5) return "Advanced";
  return "Optimized";
}

export function generateRecommendations(
  dimensionScores: { dimension: string; score: number }[],
  overallScore: number,
  finalAnswers: Answer[]
): string[] {
  const recommendations: string[] = [];
  const getAnswerValue = (questionId: string): number =>
    finalAnswers.find((a) => a.questionId === questionId)?.value || 0;
  const getDimensionScore = (dimension: string): number =>
    dimensionScores.find((d) => d.dimension === dimension)?.score || 0;

  // Critical foundation issues
  if (getAnswerValue("cv1") <= 2) {
    recommendations.push(
      "Critical: Implement cost tracking and visibility tools. You cannot optimize what you cannot measure."
    );
  }
  if (getAnswerValue("ac2") <= 1) {
    recommendations.push(
      "Critical: Assign someone to own FinOps, even part-time. Cloud costs need active management."
    );
  }
  if (getAnswerValue("ca1") <= 2) {
    recommendations.push(
      "Critical: Establish a tagging strategy for cost allocation. This enables accountability and optimization."
    );
  }

  // Quick wins
  if (getAnswerValue("co4") <= 2) {
    recommendations.push(
      "Quick Win: Identify and eliminate cloud waste (idle resources, unattached storage). Typically saves 10-30%."
    );
  }
  if (
    getAnswerValue("co3") <= 2 &&
    getDimensionScore("Understanding Cloud Costs") >= 2.5
  ) {
    recommendations.push(
      "Quick Win: Purchase Reserved Instances or Savings Plans for stable workloads. Immediate 30-70% savings."
    );
  }

  // Governance
  if (getAnswerValue("ac1") <= 2) {
    recommendations.push(
      "Governance: Implement showback reporting to make teams aware of their cloud costs."
    );
  }
  if (getAnswerValue("ac3") <= 2 && getAnswerValue("ac1") >= 3) {
    recommendations.push(
      "Governance: Create an Operating Cloud Model with budgets, review cadence, and escalation procedures."
    );
  }

  // Optimization
  if (getAnswerValue("co2") >= 2 && getAnswerValue("co2") <= 3) {
    recommendations.push(
      "Optimization: Implement Kubernetes cost monitoring with Kubecost or OpenCost for workload-level visibility."
    );
  }
  if (getAnswerValue("co1") >= 3 && getAnswerValue("co1") <= 4) {
    recommendations.push(
      "Optimization: Automate cost optimization with policies for waste remediation and rightsizing."
    );
  }

  // Planning
  if (getAnswerValue("fc1") <= 2 && overallScore >= 2.5) {
    recommendations.push(
      "Planning: Implement quarterly cost forecasting to align cloud spend with business planning."
    );
  }
  if (
    getAnswerValue("fc2") <= 2 &&
    getDimensionScore("Understanding Cloud Costs") >= 3
  ) {
    recommendations.push(
      "Planning: Track unit economics to tie cloud costs to business outcomes (cost per user, per transaction, etc.)."
    );
  }

  // Culture
  if (getAnswerValue("cu2") <= 2) {
    recommendations.push(
      "Culture: Invest in FinOps training for your team. Start with FinOps Foundation certification."
    );
  }
  if (getAnswerValue("cu1") <= 2 && overallScore >= 2.5) {
    recommendations.push(
      "Culture: Build FinOps culture through regular cost reviews and celebrating optimization wins."
    );
  }

  // Advanced
  if (overallScore >= 4 && getAnswerValue("cu3") <= 3) {
    recommendations.push(
      "Advanced: Integrate sustainability into FinOps by tracking and optimizing carbon emissions alongside costs."
    );
  }

  return recommendations.slice(0, 5);
}

export function calculateResults(
  questions: Question[],
  answers: Answer[]
): AssessmentResult {
  const dimensionScores = new Map<
    string,
    { total: number; count: number }
  >();

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      const current = dimensionScores.get(question.dimension) || {
        total: 0,
        count: 0,
      };
      dimensionScores.set(question.dimension, {
        total: current.total + answer.value,
        count: current.count + 1,
      });
    }
  });

  const dimensionScoresArray = Array.from(dimensionScores.entries()).map(
    ([dimension, { total, count }]) => ({
      dimension,
      score: total / count,
      level: getMaturityLevel(total / count),
    })
  );

  const overallScore =
    dimensionScoresArray.reduce((sum, d) => sum + d.score, 0) /
    dimensionScoresArray.length;

  const recommendations = generateRecommendations(
    dimensionScoresArray,
    overallScore,
    answers
  );

  return { overallScore, dimensionScores: dimensionScoresArray, recommendations };
}
