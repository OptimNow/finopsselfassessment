import { Question } from "@/types/assessment";

export const questions: Question[] = [
  // VISIBILITY
  {
    id: "cv1",
    dimension: "Understanding Cloud Costs",
    text: "How well does your organization track and allocate cloud costs?",
    options: [
      { value: 1, label: "Beginner", description: "No cost tracking or visibility" },
      { value: 2, label: "Developing", description: "Basic cost reports available monthly" },
      { value: 3, label: "Intermediate", description: "Regular cost tracking with some allocation" },
      { value: 4, label: "Advanced", description: "Real-time visibility with detailed allocation" },
      { value: 5, label: "Optimized", description: "Full automation with predictive insights" }
    ]
  },
  {
    id: "cv2",
    dimension: "Understanding Cloud Costs",
    text: "How granular is your cloud cost reporting?",
    options: [
      { value: 1, label: "Beginner", description: "No detailed reporting" },
      { value: 2, label: "Developing", description: "High-level service costs only" },
      { value: 3, label: "Intermediate", description: "Cost by project/application" },
      { value: 4, label: "Advanced", description: "Resource-level cost tracking" },
      { value: 5, label: "Optimized", description: "Real-time multi-dimensional analysis" }
    ]
  },
  {
    id: "cv3",
    dimension: "Understanding Cloud Costs",
    text: "Do you track your SaaS, PaaS and AI costs?",
    options: [
      { value: 1, label: "No", description: "We don't know how to do it" },
      { value: 2, label: "Planning", description: "No, but we are developing a tool" },
      { value: 3, label: "Partial", description: "Yes, partially" },
      { value: 4, label: "Complete", description: "Yes, with a 3rd party tool" },
      { value: 5, label: "Advanced", description: "Comprehensive tracking with automation" }
    ]
  },

  // OPTIMIZATION
  {
    id: "co1",
    dimension: "Optimization of Costs and Usage",
    text: "How actively does your organization optimize cloud spending?",
    options: [
      { value: 1, label: "Beginner", description: "No optimization efforts" },
      { value: 2, label: "Developing", description: "Ad-hoc optimization when issues arise" },
      { value: 3, label: "Intermediate", description: "Regular reviews and basic optimization" },
      { value: 4, label: "Advanced", description: "Automated optimization with governance" },
      { value: 5, label: "Optimized", description: "Continuous optimization with ML/AI" }
    ]
  },
  {
    id: "co2",
    dimension: "Optimization of Costs and Usage",
    text: "What optimization strategies are actively used?",
    options: [
      { value: 1, label: "Beginner", description: "None implemented" },
      { value: 2, label: "Developing", description: "Basic rightsizing when noticed" },
      { value: 3, label: "Intermediate", description: "Reserved instances and some automation" },
      { value: 4, label: "Advanced", description: "Comprehensive optimization program" },
      { value: 5, label: "Optimized", description: "AI-driven optimization across all resources" }
    ]
  },
  {
    id: "co3",
    dimension: "Optimization of Costs and Usage",
    text: "Are you monitoring your Kubernetes costs and performance?",
    options: [
      { value: 1, label: "Beginner", description: "No Kubernetes monitoring" },
      { value: 2, label: "Developing", description: "Basic cluster-level visibility only" },
      { value: 3, label: "Intermediate", description: "Namespace-level cost tracking" },
      { value: 4, label: "Advanced", description: "Pod-level monitoring with optimization" },
      { value: 5, label: "Optimized", description: "Full automation with rightsizing recommendations" }
    ]
  },

  // ACCOUNTABILITY
  {
    id: "ac1",
    dimension: "Accountability and Governance",
    text: "How clear are ownership and accountability for cloud costs?",
    options: [
      { value: 1, label: "Beginner", description: "No defined ownership" },
      { value: 2, label: "Developing", description: "Single team manages all costs" },
      { value: 3, label: "Intermediate", description: "Team-level cost awareness" },
      { value: 4, label: "Advanced", description: "Clear ownership with budgets per team" },
      { value: 5, label: "Optimized", description: "Distributed accountability with incentives" }
    ]
  },
  {
    id: "ac2",
    dimension: "Accountability and Governance",
    text: "Are there consequences for cost overruns?",
    options: [
      { value: 1, label: "Beginner", description: "No tracking or consequences" },
      { value: 2, label: "Developing", description: "Informal discussions only" },
      { value: 3, label: "Intermediate", description: "Budget reviews with explanations" },
      { value: 4, label: "Advanced", description: "Formal processes and corrective actions" },
      { value: 5, label: "Optimized", description: "Proactive management with incentives" }
    ]
  },
  {
    id: "ac3",
    dimension: "Accountability and Governance",
    text: "Do you have an Operating Cloud Model in place to manage your cloud spend vs budget?",
    options: [
      { value: 1, label: "Beginner", description: "No operating model defined" },
      { value: 2, label: "Developing", description: "Basic budget tracking started" },
      { value: 3, label: "Intermediate", description: "Model defined with monthly reviews" },
      { value: 4, label: "Advanced", description: "Mature model with automated alerts" },
      { value: 5, label: "Optimized", description: "Dynamic model with predictive capabilities" }
    ]
  },

  // PLANNING
  {
    id: "fc1",
    dimension: "Planning and Budgeting",
    text: "How effective is your cloud cost forecasting?",
    options: [
      { value: 1, label: "Beginner", description: "No forecasting in place" },
      { value: 2, label: "Developing", description: "Annual budget estimates only" },
      { value: 3, label: "Intermediate", description: "Quarterly forecasts with adjustments" },
      { value: 4, label: "Advanced", description: "Monthly forecasts with trend analysis" },
      { value: 5, label: "Optimized", description: "Dynamic forecasting with machine learning" }
    ]
  },
  {
    id: "fc2",
    dimension: "Planning and Budgeting",
    text: "Are you tying your cloud costs to business outcomes and monitoring Unit Economics?",
    options: [
      { value: 1, label: "Beginner", description: "No correlation to business metrics" },
      { value: 2, label: "Developing", description: "Aware of need but not implemented" },
      { value: 3, label: "Intermediate", description: "Basic unit economics tracked" },
      { value: 4, label: "Advanced", description: "Regular monitoring with KPIs" },
      { value: 5, label: "Optimized", description: "Fully integrated with business planning" }
    ]
  },

  // CULTURE
  {
    id: "cu1",
    dimension: "FinOps Culture and Practice",
    text: "How embedded is FinOps culture in your organization?",
    options: [
      { value: 1, label: "Beginner", description: "No awareness of FinOps" },
      { value: 2, label: "Developing", description: "Initial awareness and interest" },
      { value: 3, label: "Intermediate", description: "Active FinOps team established" },
      { value: 4, label: "Advanced", description: "FinOps integrated into workflows" },
      { value: 5, label: "Optimized", description: "FinOps is part of company DNA" }
    ]
  },
  {
    id: "cu2",
    dimension: "FinOps Culture and Practice",
    text: "Have you or your team undergone any FinOps training or courses?",
    options: [
      { value: 1, label: "No", description: "No training received" },
      { value: 2, label: "Planning", description: "Planning to enroll" },
      { value: 3, label: "In Progress", description: "Currently undergoing training" },
      { value: 4, label: "Certified", description: "Yes and certified" },
      { value: 5, label: "Advanced", description: "Multiple team members certified" }
    ]
  },
  {
    id: "cu3",
    dimension: "FinOps Culture and Practice",
    text: "Is GreenIT and Cloud sustainability a topic in your organization?",
    options: [
      { value: 1, label: "Beginner", description: "Not on our radar" },
      { value: 2, label: "Developing", description: "Aware but no action taken" },
      { value: 3, label: "Intermediate", description: "Initial sustainability initiatives" },
      { value: 4, label: "Advanced", description: "Active carbon tracking and optimization" },
      { value: 5, label: "Optimized", description: "Sustainability integrated into all decisions" }
    ]
  }
];
