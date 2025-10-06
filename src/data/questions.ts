import { Question } from "@/types/assessment";

export const questions: Question[] = [
  // VISIBILITY & UNDERSTANDING
  {
    id: "cv1",
    dimension: "Understanding Cloud Costs",
    text: "How well does your organization track and allocate cloud costs?",
    options: [
      { value: 1, label: "Beginner", description: "No cost tracking or visibility" },
      { value: 2, label: "Developing", description: "Basic cost reports available monthly" },
      { value: 3, label: "Intermediate", description: "Regular cost tracking with some allocation" },
      { value: 4, label: "Advanced", description: "Real-time visibility with detailed allocation" },
      { value: 5, label: "Optimized", description: "Full automation with predictive insights" },
    ],
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
      { value: 5, label: "Optimized", description: "Real-time multi-dimensional analysis" },
    ],
  },
  {
    id: "cv3",
    dimension: "Understanding Cloud Costs",
    text: "Do you track your SaaS, PaaS and AI costs?",
    options: [
      { value: 1, label: "Beginner", description: "We don't know how to do it" },
      { value: 2, label: "Developing", description: "No, but we are developing a tool" },
      { value: 3, label: "Intermediate", description: "Yes, partially tracked" },
      { value: 4, label: "Advanced", description: "Yes, with a 3rd party tool" },
      { value: 5, label: "Optimized", description: "Comprehensive tracking with automation" },
    ],
  },
  {
    id: "ca1",
    dimension: "Understanding Cloud Costs",
    text: "What is your cost allocation strategy?",
    options: [
      { value: 1, label: "Beginner", description: "No cost allocation strategy" },
      { value: 2, label: "Developing", description: "Manual spreadsheet-based allocation" },
      { value: 3, label: "Intermediate", description: "Tag-based or account-based allocation" },
      { value: 4, label: "Advanced", description: "Hybrid allocation (tags + accounts + shared costs)" },
      { value: 5, label: "Optimized", description: "Advanced allocation with virtual tagging via 3rd party tools" },
    ],
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
      { value: 5, label: "Optimized", description: "Continuous optimization with ML/AI" },
    ],
  },
  {
    id: "co2",
    dimension: "Optimization of Costs and Usage",
    text: "What is your Kubernetes cost management maturity?",
    options: [
      { value: 1, label: "Beginner", description: "Not using Kubernetes" },
      { value: 2, label: "Developing", description: "Using Kubernetes but no cost visibility" },
      {
        value: 3,
        label: "Intermediate",
        description: "Monitoring with native tools (Prometheus/Grafana) but no allocation",
      },
      {
        value: 4,
        label: "Advanced",
        description: "Using 3rd party tools (Kubecost, OpenCost) with namespace/workload allocation",
      },
      {
        value: 5,
        label: "Optimized",
        description: "Automated rightsizing, autoscaling and spot instance management with 3rd party tools",
      },
    ],
  },
  {
    id: "co3",
    dimension: "Optimization of Costs and Usage",
    text: "What is your commitment-based discount strategy?",
    options: [
      { value: 1, label: "Beginner", description: "Using on-demand pricing only" },
      { value: 2, label: "Developing", description: "Aware of RIs/Savings Plans but not implemented" },
      { value: 3, label: "Intermediate", description: "Some RIs/Savings Plans purchased reactively" },
      { value: 4, label: "Advanced", description: "Strategic RI/SP coverage with regular utilization reviews" },
      {
        value: 5,
        label: "Optimized",
        description: "Automated recommendations and purchase with optimal coverage/utilization ratio",
      },
    ],
  },
  {
    id: "co4",
    dimension: "Optimization of Costs and Usage",
    text: "How do you identify and eliminate cloud waste?",
    options: [
      { value: 1, label: "Beginner", description: "No waste identification process" },
      { value: 2, label: "Developing", description: "Manual reviews when costs spike" },
      { value: 3, label: "Intermediate", description: "Monthly reports on idle/unused resources" },
      { value: 4, label: "Advanced", description: "Automated detection with remediation workflow" },
      { value: 5, label: "Optimized", description: "Continuous scanning with auto-remediation policies" },
    ],
  },

  // ACCOUNTABILITY & GOVERNANCE
  {
    id: "ac1",
    dimension: "Accountability and Governance",
    text: "How clear are ownership and accountability for cloud costs?",
    options: [
      { value: 1, label: "Beginner", description: "No defined ownership" },
      { value: 2, label: "Developing", description: "Central team manages and is accountable for all costs" },
      { value: 3, label: "Intermediate", description: "Showback with team-level cost awareness" },
      { value: 4, label: "Advanced", description: "Showback with clear ownership and budgets per team" },
      { value: 5, label: "Optimized", description: "Chargeback with distributed accountability and incentives" },
    ],
  },
  {
    id: "ac2",
    dimension: "Accountability and Governance",
    text: "How is your FinOps function structured?",
    options: [
      { value: 1, label: "Beginner", description: "No dedicated FinOps role or team" },
      { value: 2, label: "Developing", description: "Part-time FinOps responsibility (finance or cloud team)" },
      { value: 3, label: "Intermediate", description: "Dedicated FinOps practitioner" },
      { value: 4, label: "Advanced", description: "Cross-functional FinOps team with defined roles" },
      { value: 5, label: "Optimized", description: "Centralized FinOps CoE with embedded practitioners" },
    ],
  },
  {
    id: "ac3",
    dimension: "Accountability and Governance",
    text: "Do you have an Operating Cloud Model to manage cloud spend vs budget?",
    options: [
      { value: 1, label: "Beginner", description: "No operating model defined" },
      { value: 2, label: "Developing", description: "Basic budget tracking started" },
      { value: 3, label: "Intermediate", description: "Model defined with monthly reviews" },
      { value: 4, label: "Advanced", description: "Mature model with automated alerts" },
      { value: 5, label: "Optimized", description: "Dynamic model with predictive capabilities" },
    ],
  },

  // PLANNING & FORECASTING
  {
    id: "fc1",
    dimension: "Planning and Budgeting",
    text: "How effective is your cloud cost forecasting?",
    options: [
      { value: 1, label: "Beginner", description: "No forecasting in place" },
      { value: 2, label: "Developing", description: "Annual budget estimates only" },
      { value: 3, label: "Intermediate", description: "Quarterly forecasts with adjustments" },
      { value: 4, label: "Advanced", description: "Monthly forecasts with trend analysis" },
      { value: 5, label: "Optimized", description: "Dynamic forecasting with machine learning" },
    ],
  },
  {
    id: "fc2",
    dimension: "Planning and Budgeting",
    text: "Are you tying cloud costs to business outcomes and monitoring Unit Economics?",
    options: [
      { value: 1, label: "Beginner", description: "No correlation to business metrics" },
      { value: 2, label: "Developing", description: "Aware of need but not implemented" },
      { value: 3, label: "Intermediate", description: "Basic unit economics tracked" },
      { value: 4, label: "Advanced", description: "Regular monitoring with KPIs" },
      { value: 5, label: "Optimized", description: "Fully integrated with business planning" },
    ],
  },

  // CULTURE & PRACTICE
  {
    id: "cu1",
    dimension: "FinOps Culture and Practice",
    text: "How embedded is FinOps culture in your organization?",
    options: [
      { value: 1, label: "Beginner", description: "No awareness of FinOps" },
      { value: 2, label: "Developing", description: "Initial awareness and interest" },
      { value: 3, label: "Intermediate", description: "Active FinOps team established" },
      { value: 4, label: "Advanced", description: "FinOps integrated into workflows" },
      { value: 5, label: "Optimized", description: "FinOps is part of company DNA" },
    ],
  },
  {
    id: "cu2",
    dimension: "FinOps Culture and Practice",
    text: "Have you or your team undergone any FinOps training or courses?",
    options: [
      { value: 1, label: "Beginner", description: "No training received" },
      { value: 2, label: "Developing", description: "Planning to enroll" },
      { value: 3, label: "Intermediate", description: "Currently undergoing training" },
      { value: 4, label: "Advanced", description: "Yes and certified" },
      { value: 5, label: "Optimized", description: "Multiple team members certified" },
    ],
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
      { value: 5, label: "Optimized", description: "Sustainability integrated into all decisions" },
    ],
  },
];
