const generateRecommendations = (
  dimensionScores: { dimension: string; score: number }[],
  overallScore: number,
  finalAnswers: Answer[],
): string[] => {
  const recommendations: string[] = [];

  // Helper function to get answer value for a specific question
  const getAnswerValue = (questionId: string): number => {
    const answer = finalAnswers.find((a) => a.questionId === questionId);
    return answer?.value || 0;
  };

  // Helper function to get dimension score
  const getDimensionScore = (dimensionName: string): number => {
    const dimension = dimensionScores.find((d) => d.dimension === dimensionName);
    return dimension?.score || 0;
  };

  // PRIORITY 1: Foundation - Visibility & Understanding (Score < 2.5)
  const visibilityScore = getDimensionScore("Understanding Cloud Costs");
  if (visibilityScore < 2.5) {
    // Check specific visibility issues
    if (getAnswerValue("cv1") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Visibility",
        action:
          "Implement real-time cost tracking dashboards with at least monthly reporting cadence. Consider tools like native cloud cost management (AWS Cost Explorer, Azure Cost Management) or third-party platforms.",
      });
    }

    if (getAnswerValue("cv2") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Visibility",
        action:
          "Establish granular cost reporting at minimum by project/application level. This is essential before implementing any optimization strategy.",
      });
    }

    if (getAnswerValue("ca1") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Allocation",
        action:
          "Develop a tagging strategy and cost allocation framework. Start with mandatory tags for project, environment, and owner across all cloud resources.",
      });
    }

    if (getAnswerValue("cv3") <= 2) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Visibility",
        action:
          "Extend your cost tracking beyond IaaS to include SaaS, PaaS, and AI service costs for complete spend visibility.",
      });
    }
  }

  // PRIORITY 2: Governance & Accountability (Score < 3)
  const governanceScore = getDimensionScore("Accountability and Governance");
  if (governanceScore < 3) {
    if (getAnswerValue("ac2") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Team Structure",
        action:
          "Establish a dedicated FinOps role (even part-time initially). This person should bridge finance, engineering, and operations teams.",
      });
    }

    if (getAnswerValue("ac1") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Accountability",
        action:
          "Define clear cost ownership per team or project. Start with showback reporting before moving to chargeback models.",
      });
    }

    if (getAnswerValue("ac3") <= 2) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Operating Model",
        action:
          "Create an Operating Cloud Model that defines budget approval processes, cost review cadence, and escalation procedures for overruns.",
      });
    }
  }

  // PRIORITY 3: Basic Optimization (Score 2.5-3.5)
  const optimizationScore = getDimensionScore("Optimization of Costs and Usage");
  if (optimizationScore >= 2 && optimizationScore < 3.5) {
    if (getAnswerValue("co4") <= 3) {
      recommendations.push({
        priority: "HIGH",
        category: "Quick Wins",
        action:
          "Implement automated detection of idle resources, unattached volumes, and oversized instances. These 'quick wins' typically reduce costs by 10-30%.",
      });
    }

    if (getAnswerValue("co3") <= 2) {
      recommendations.push({
        priority: "HIGH",
        category: "Commitments",
        action:
          "Analyze your stable workloads and purchase Reserved Instances or Savings Plans. Start with 1-year terms for predictable workloads to achieve 30-70% savings.",
      });
    }

    if (getAnswerValue("co2") >= 2 && getAnswerValue("co2") <= 3) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Kubernetes",
        action:
          "Implement Kubernetes cost visibility using tools like Kubecost or OpenCost. Enable namespace and workload-level cost allocation.",
      });
    }
  }

  // PRIORITY 4: Advanced Optimization (Score 3.5-4.5)
  if (optimizationScore >= 3.5 && optimizationScore < 4.5) {
    if (getAnswerValue("co1") <= 4) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Automation",
        action:
          "Move from manual to automated optimization. Implement policies for auto-remediation of waste and scheduled scaling based on usage patterns.",
      });
    }

    if (getAnswerValue("co3") >= 3 && getAnswerValue("co3") <= 4) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Commitments",
        action:
          "Optimize your RI/Savings Plan strategy with regular utilization reviews. Consider automated recommendation and purchase tools for dynamic coverage.",
      });
    }

    if (getAnswerValue("co2") === 4) {
      recommendations.push({
        priority: "LOW",
        category: "Kubernetes",
        action:
          "Advance Kubernetes optimization with automated rightsizing, HPA/VPA, and spot instance integration for non-critical workloads.",
      });
    }
  }

  // PRIORITY 5: Planning & Forecasting
  const planningScore = getDimensionScore("Planning and Budgeting");
  if (planningScore < 3) {
    if (getAnswerValue("fc1") <= 2) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Forecasting",
        action:
          "Implement quarterly cloud cost forecasting based on historical trends and planned initiatives. Update forecasts monthly as actuals come in.",
      });
    }

    if (getAnswerValue("fc2") <= 2) {
      recommendations.push({
        priority: "LOW",
        category: "Unit Economics",
        action:
          "Define and track unit economics metrics (e.g., cost per transaction, cost per user, cost per API call) to tie cloud spend to business value.",
      });
    }
  }

  // PRIORITY 6: Culture & Advanced Practices
  const cultureScore = getDimensionScore("FinOps Culture and Practice");
  if (cultureScore < 3) {
    if (getAnswerValue("cu2") <= 2) {
      recommendations.push({
        priority: "MEDIUM",
        category: "Training",
        action:
          "Invest in FinOps training and certification for your team. Start with FinOps Foundation courses for key stakeholders.",
      });
    }

    if (getAnswerValue("cu1") <= 2) {
      recommendations.push({
        priority: "LOW",
        category: "Culture",
        action:
          "Build FinOps awareness through regular cost reviews, shared dashboards, and celebrating cost optimization wins across teams.",
      });
    }
  }

  // Advanced maturity guidance (Overall score > 4)
  if (overallScore >= 4) {
    recommendations.push({
      priority: "LOW",
      category: "Excellence",
      action:
        "Focus on continuous improvement: ML-driven anomaly detection, predictive forecasting, and proactive optimization. Consider contributing to the FinOps community.",
    });

    if (getAnswerValue("cu3") <= 3) {
      recommendations.push({
        priority: "LOW",
        category: "Sustainability",
        action:
          "Integrate sustainability metrics into your FinOps practice. Track carbon emissions and optimize for both cost and environmental impact.",
      });
    }
  }

  // Sort by priority and return top recommendations
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  return recommendations
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 6)
    .map((r) => `**${r.category}** (${r.priority}): ${r.action}`);
};
