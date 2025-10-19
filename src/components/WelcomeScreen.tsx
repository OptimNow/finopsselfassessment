import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cloud, TrendingUp, Users, DollarSign } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-subtle)" }}>
      <Card className="max-w-2xl w-full p-8 md:p-12" style={{ boxShadow: "var(--shadow-medium)" }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Cloud className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Cloud FinOps Maturity Assessment</h1>
          <p className="text-muted-foreground text-lg">
            Evaluate your organization's cloud financial management practices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Cost Optimization</h3>
              <p className="text-sm text-muted-foreground">Assess your optimization strategies</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Cost Visibility</h3>
              <p className="text-sm text-muted-foreground">Measure tracking capabilities</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Accountability</h3>
              <p className="text-sm text-muted-foreground">Review ownership structure</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Culture & More</h3>
              <p className="text-sm text-muted-foreground">Evaluate the FinOps maturity of your team</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-2">What to Expect</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>16 questions covering key FinOps dimensions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Takes less than 5 minutes to complete</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Your answers are confidential and not recorded</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Receive personalized insights and recommendations</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={onStart} className="flex-1 text-lg h-12" style={{ background: "var(--gradient-primary)" }}>
            Start Assessment
          </Button>
          <Button asChild variant="outline" className="flex-1 text-lg h-12 border-2">
            <a href="https://calendar.app.google/qdN6JHxwZ1CZ1Fwx6" target="_blank" rel="noopener noreferrer">
              Book a Call
            </a>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
