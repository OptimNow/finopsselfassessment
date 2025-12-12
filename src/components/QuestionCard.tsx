import { Question, MaturityLevel } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (value: MaturityLevel) => void;
  onBack?: () => void;
  selectedValue?: MaturityLevel | null;
}

const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onBack,
  selectedValue
}: QuestionCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (selectedValue) {
      setSelectedOption(selectedValue.toString());
    } else {
      setSelectedOption("");
    }
  }, [selectedValue]);

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onAnswer(parseInt(value) as MaturityLevel);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-3xl w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {question.dimension}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8" style={{ boxShadow: 'var(--shadow-medium)' }}>
          <div className="flex items-start justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold leading-tight">{question.text}</h2>
            <div className="text-xs text-muted-foreground text-right">
              <div>Auto-advances on selection</div>
              <div className="font-semibold text-primary">Back enabled</div>
            </div>
          </div>

          <RadioGroup value={selectedOption} onValueChange={handleSelection}>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.value}>
                  <Label
                      htmlFor={`option-${option.value}`}
                      className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-all"
                      style={{
                      borderColor: selectedOption === option.value.toString() ? 'hsl(var(--primary))' : undefined,
                      backgroundColor: selectedOption === option.value.toString() ? 'hsl(var(--primary) / 0.05)' : undefined,
                      }}
                    >
                    <RadioGroupItem
                      value={option.value.toString()}
                      id={`option-${option.value}`}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {onBack && (
            <div className="flex justify-end mt-8">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-none"
              >
                Back
              </Button>
            </div>
          )}
        </Card>

        <div className="flex justify-center mt-8">
          <img
            src="/logo-wordmark.svg"
            alt="Cloud brand"
            className="h-10 w-auto opacity-70"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
