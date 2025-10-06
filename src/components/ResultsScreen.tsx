import { AssessmentResult } from "@/types/assessment";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, TrendingUp, AlertCircle } from "lucide-react";

interface ResultsScreenProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const getMaturityColor = (score: number) => {
  if (score >= 4.5) return "text-accent";
  if (score >= 3.5) return "text-primary";
  if (score >= 2.5) return "text-yellow-600";
  return "text-destructive";
};

const getMaturityLabel = (score: number) => {
  if (score >= 4.5) return "Optimized";
  if (score >= 3.5) return "Advanced";
  if (score >= 2.5) return "Intermediate";
  if (score >= 1.5) return "Developing";
  return "Beginner";
};

const ResultsScreen = ({ result, onRestart }: ResultsScreenProps) => {
  return (
    <div className="min-h-screen p-4 py-12" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Assessment Complete!</h1>
          <p className="text-muted-foreground text-lg">
            Here's your Cloud FinOps maturity evaluation
          </p>
        </div>

        <Card className="p-8 mb-6" style={{ boxShadow: 'var(--shadow-medium)' }}>
          <div className="text-center mb-8">
            <div className="text-6xl font-bold mb-2" style={{ color: `hsl(var(${result.overallScore >= 3.5 ? '--accent' : '--primary'}))` }}>
              {result.overallScore.toFixed(1)}
            </div>
            <div className="text-xl font-semibold mb-1">
              Overall Maturity: {getMaturityLabel(result.overallScore)}
            </div>
            <div className="text-muted-foreground">Out of 5.0</div>
          </div>

          <div className="h-4 bg-secondary rounded-full overflow-hidden mb-8">
            <div 
              className="h-full bg-gradient-to-r from-destructive via-yellow-500 via-primary to-accent transition-all duration-1000"
              style={{ width: `${(result.overallScore / 5) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="p-8 mb-6" style={{ boxShadow: 'var(--shadow-medium)' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Dimension Scores
          </h2>
          <div className="space-y-6">
            {result.dimensionScores.map((dimension) => (
              <div key={dimension.dimension}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{dimension.dimension}</span>
                  <span className={`font-bold ${getMaturityColor(dimension.score)}`}>
                    {dimension.score.toFixed(1)} - {dimension.level}
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      dimension.score >= 4 ? 'bg-accent' : 
                      dimension.score >= 3 ? 'bg-primary' : 
                      dimension.score >= 2 ? 'bg-yellow-500' : 'bg-destructive'
                    }`}
                    style={{ width: `${(dimension.score / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 mb-6" style={{ boxShadow: 'var(--shadow-medium)' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Key Recommendations
          </h2>
          <ul className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="text-foreground">{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex gap-4">
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex-1"
          >
            Retake Assessment
          </Button>
          <Button 
            onClick={() => window.print()}
            className="flex-1"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Download Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
