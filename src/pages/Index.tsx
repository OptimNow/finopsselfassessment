import { useState } from "react";
import { questions } from "@/data/questions";
import { Answer, AssessmentResult, MaturityLevel } from "@/types/assessment";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";

type AppState = "welcome" | "assessment" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const handleStart = () => {
    setAppState("assessment");
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (value: MaturityLevel) => {
    const newAnswers = [
      ...answers,
      { questionId: questions[currentQuestionIndex].id, value },
    ];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults(newAnswers);
      setAppState("results");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    const dimensionMap = new Map<string, number[]>();

    finalAnswers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (question) {
        if (!dimensionMap.has(question.dimension)) {
          dimensionMap.set(question.dimension, []);
        }
        dimensionMap.get(question.dimension)!.push(answer.value);
      }
    });

    const dimensionScores = Array.from(dimensionMap.entries()).map(
      ([dimension, scores]) => {
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        return {
          dimension,
          score: avgScore,
          level: getMaturityLevel(avgScore),
        };
      }
    );

    const overallScore =
      dimensionScores.reduce((sum, d) => sum + d.score, 0) /
      dimensionScores.length;

    const recommendations = generateRecommendations(dimensionScores, overallScore);

    setResult({
      overallScore,
      dimensionScores,
      recommendations,
    });
  };

  const getMaturityLevel = (score: number): string => {
    if (score >= 4.5) return "Optimized";
    if (score >= 3.5) return "Advanced";
    if (score >= 2.5) return "Intermediate";
    if (score >= 1.5) return "Developing";
    return "Beginner";
  };

  const generateRecommendations = (
    dimensionScores: { dimension: string; score: number }[],
    overallScore: number
  ): string[] => {
    const recommendations: string[] = [];

    const lowestDimension = dimensionScores.reduce((min, d) =>
      d.score < min.score ? d : min
    );

    if (overallScore < 2) {
      recommendations.push(
        "Establish a dedicated FinOps team or assign clear ownership for cloud cost management."
      );
      recommendations.push(
        "Implement basic cost tracking and reporting tools to gain visibility into your cloud spending."
      );
    } else if (overallScore < 3) {
      recommendations.push(
        "Focus on improving your " + lowestDimension.dimension + " capabilities as a priority area."
      );
      recommendations.push(
        "Develop regular cost review processes and establish budget thresholds for teams."
      );
    } else if (overallScore < 4) {
      recommendations.push(
        "Automate cost optimization processes to move from reactive to proactive management."
      );
      recommendations.push(
        "Strengthen your " + lowestDimension.dimension + " practices to reach advanced maturity."
      );
    } else {
      recommendations.push(
        "Continue to optimize and refine your FinOps practices with AI/ML driven insights."
      );
      recommendations.push(
        "Share your FinOps success stories and best practices across the organization."
      );
    }

    if (dimensionScores.some((d) => d.dimension === "Cost Visibility" && d.score < 3)) {
      recommendations.push(
        "Implement tagging strategies and cost allocation frameworks for better visibility."
      );
    }

    if (dimensionScores.some((d) => d.dimension === "Accountability" && d.score < 3)) {
      recommendations.push(
        "Create clear accountability models with team-level budgets and ownership."
      );
    }

    return recommendations.slice(0, 5);
  };

  const handleRestart = () => {
    setAppState("welcome");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  if (appState === "welcome") {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (appState === "assessment") {
    return (
      <QuestionCard
        question={questions[currentQuestionIndex]}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onBack={currentQuestionIndex > 0 ? handleBack : undefined}
      />
    );
  }

  if (appState === "results" && result) {
    return <ResultsScreen result={result} onRestart={handleRestart} />;
  }

  return null;
};

export default Index;
