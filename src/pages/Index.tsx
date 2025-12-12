import { useState } from "react";
import { questions } from "@/data/questions";
import { Answer, AssessmentResult } from "@/types/assessment";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";

const generateRecommendations = (
  dimensionScores: { dimension: string; score: number }[],
  overallScore: number,
  finalAnswers: Answer[]
): string[] => {
  const recommendations: string[] = [];
  
  const getAnswerValue = (questionId: string): number => {
    return finalAnswers.find(a => a.questionId === questionId)?.value || 0;
  };

  const getDimensionScore = (dimension: string): number => {
    return dimensionScores.find(d => d.dimension === dimension)?.score || 0;
  };

  // Critical foundation issues (always show if present)
  if (getAnswerValue("cv1") <= 2) {
    recommendations.push("🔴 **Critical**: Implement cost tracking and visibility tools. You cannot optimize what you cannot measure.");
  }

  if (getAnswerValue("ac2") <= 1) {
    recommendations.push("🔴 **Critical**: Assign someone to own FinOps, even part-time. Cloud costs need active management.");
  }

  if (getAnswerValue("ca1") <= 2) {
    recommendations.push("🔴 **Critical**: Establish a tagging strategy for cost allocation. This enables accountability and optimization.");
  }

  // High-value quick wins
  if (getAnswerValue("co4") <= 2) {
    recommendations.push("💡 **Quick Win**: Identify and eliminate cloud waste (idle resources, unattached storage). Typically saves 10-30%.");
  }

  if (getAnswerValue("co3") <= 2 && getDimensionScore("Understanding Cloud Costs") >= 2.5) {
    recommendations.push("💡 **Quick Win**: Purchase Reserved Instances or Savings Plans for stable workloads. Immediate 30-70% savings.");
  }

  // Governance improvements
  if (getAnswerValue("ac1") <= 2) {
    recommendations.push("📊 **Governance**: Implement showback reporting to make teams aware of their cloud costs.");
  }

  if (getAnswerValue("ac3") <= 2 && getAnswerValue("ac1") >= 3) {
    recommendations.push("📊 **Governance**: Create an Operating Cloud Model with budgets, review cadence, and escalation procedures.");
  }

  // Optimization opportunities
  if (getAnswerValue("co2") >= 2 && getAnswerValue("co2") <= 3) {
    recommendations.push("⚙️ **Optimization**: Implement Kubernetes cost monitoring with Kubecost or OpenCost for workload-level visibility.");
  }

  if (getAnswerValue("co1") >= 3 && getAnswerValue("co1") <= 3) {
    recommendations.push("⚙️ **Optimization**: Automate cost optimization with policies for waste remediation and rightsizing.");
  }

  // Planning maturity
  if (getAnswerValue("fc1") <= 2 && overallScore >= 2.5) {
    recommendations.push("📈 **Planning**: Implement quarterly cost forecasting to align cloud spend with business planning.");
  }

  if (getAnswerValue("fc2") <= 2 && getDimensionScore("Understanding Cloud Costs") >= 3) {
    recommendations.push("📈 **Planning**: Track unit economics to tie cloud costs to business outcomes (cost per user, per transaction, etc.).");
  }

  // Culture & training
  if (getAnswerValue("cu2") <= 2) {
    recommendations.push("🎓 **Culture**: Invest in FinOps training for your team. Start with FinOps Foundation certification.");
  }

  if (getAnswerValue("cu1") <= 2 && overallScore >= 2.5) {
    recommendations.push("🎓 **Culture**: Build FinOps culture through regular cost reviews and celebrating optimization wins.");
  }

  // Advanced practices
  if (overallScore >= 4 && getAnswerValue("cu3") <= 3) {
    recommendations.push("🌱 **Advanced**: Integrate sustainability into FinOps by tracking and optimizing carbon emissions alongside costs.");
  }

  // Return top 5 recommendations
  return recommendations.slice(0, 5);
};

const calculateResults = (answers: Answer[]): AssessmentResult => {
  const dimensionScores = new Map<string, { total: number; count: number }>();

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

  return {
    overallScore,
    dimensionScores: dimensionScoresArray,
    recommendations,
  };
};

const getMaturityLevel = (score: number): string => {
  if (score < 2) return "Beginner";
  if (score < 3) return "Developing";
  if (score < 4) return "Intermediate";
  if (score < 4.5) return "Advanced";
  return "Optimized";
};

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentStep];
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex((a) => a.questionId === currentQuestion.id);

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentQuestion.id, value: value as 1 | 2 | 3 | 4 | 5 };
    } else {
      newAnswers.push({ questionId: currentQuestion.id, value: value as 1 | 2 | 3 | 4 | 5 });
    }

    setAnswers(newAnswers);
    localStorage.setItem("finops_answers", JSON.stringify(newAnswers));

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1));
      }, 300);
    } else {
      const finalResults = calculateResults(newAnswers);
      setResults(finalResults);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setHasStarted(false);
    setCurrentStep(0);
    setAnswers([]);
    setResults(null);
    localStorage.removeItem("finops_answers");
  };

  if (!hasStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (results) {
    return <ResultsScreen result={results} onRestart={handleRestart} />;
  }

  const existingAnswer = answers.find((a) => a.questionId === questions[currentStep].id);

  return (
    <QuestionCard
      question={questions[currentStep]}
      currentQuestion={currentStep + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      selectedValue={existingAnswer?.value ?? null}
    />
  );
};

export default Index;
