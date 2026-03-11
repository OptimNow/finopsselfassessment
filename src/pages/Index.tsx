import { useState } from "react";
import { questions } from "@/data/questions";
import { Answer, AssessmentResult } from "@/types/assessment";
import { calculateResults } from "@/lib/assessment/scoring";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<AssessmentResult | null>(null);

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
      setTimeout(() => setCurrentStep((prev) => Math.min(prev + 1, questions.length - 1)), 300);
    } else {
      setResults(calculateResults(questions, newAnswers));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleRestart = () => {
    setHasStarted(false);
    setCurrentStep(0);
    setAnswers([]);
    setResults(null);
    localStorage.removeItem("finops_answers");
  };

  if (!hasStarted) return <WelcomeScreen onStart={() => setHasStarted(true)} />;
  if (results) return <ResultsScreen result={results} onRestart={handleRestart} />;

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
