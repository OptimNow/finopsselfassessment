import { Question, MaturityLevel } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (value: MaturityLevel) => void;
  onBack?: () => void;
}

const QuestionCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer,
  onBack 
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSubmit = () => {
    if (selectedValue) {
      onAnswer(parseInt(selectedValue) as MaturityLevel);
      setSelectedValue("");
    }
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
          <h2 className="text-2xl font-bold mb-8">{question.text}</h2>

          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.value}>
                  <Label
                    htmlFor={`option-${option.value}`}
                    className="flex items-start gap-4 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer transition-all"
                    style={{
                      borderColor: selectedValue === option.value.toString() ? 'hsl(var(--primary))' : undefined,
                      backgroundColor: selectedValue === option.value.toString() ? 'hsl(var(--primary) / 0.05)' : undefined,
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

          <div className="flex gap-3 mt-8">
            {onBack && (
              <Button 
                onClick={onBack} 
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedValue}
              className="flex-1"
              style={{ background: selectedValue ? 'var(--gradient-primary)' : undefined }}
            >
              {currentQuestion === totalQuestions ? "Complete Assessment" : "Next Question"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuestionCard;
