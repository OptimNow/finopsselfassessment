# FinOps Self-Assessment

## Project Overview
A lightweight React webapp that lets organizations self-assess their Cloud FinOps maturity across 6 dimensions (16 questions, 5-point scale). Shows scores via radar chart and provides context-aware recommendations. Built as a lead-gen tool for OptimNow.

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite (SWC)
- **Styling**: Tailwind CSS 3 + shadcn/ui (Radix primitives)
- **Charts**: Recharts (radar chart)
- **Routing**: React Router DOM 6
- **Backend**: Vercel serverless function (`api/recommendations.ts`) calling OpenAI gpt-4o-mini
- **Branding**: OptimNow — Charcoal #2C2C2C, Light Grey #F4F4F4, Chartreuse Green #ACE849

## Project Structure
```
src/
  pages/Index.tsx          # Main page: state management, flow control
  components/
    WelcomeScreen.tsx      # Landing screen with OptimNow branding
    QuestionCard.tsx        # Question display with keyboard nav (1-5 keys)
    ResultsScreen.tsx       # Results: scores, radar chart, recommendations, CTA
    results/
      ResultsRadar.tsx     # Radar chart component (branded colors)
      ResultsTable.tsx     # Dimension scores table
    ui/                    # shadcn/ui primitives (8 components kept, 40 pruned)
  data/questions.ts        # 16 questions with dimensions, options, gap labels
  types/assessment.ts      # TypeScript interfaces
  lib/
    utils.ts               # cn() helper
    categories.ts          # Category enums
    assessment/scoring.ts  # Scoring logic, maturity levels, recommendation engine
  hooks/
    useRecommendations.ts  # Fetches AI recommendations from /api/recommendations
  assets/brandAssets.ts    # Base64 logo
api/
  recommendations.ts       # Vercel serverless: OpenAI API call for recommendations
```

## Key Conventions
- **Path alias**: `@/*` maps to `src/*`
- **State**: React useState in Index.tsx, localStorage for answer persistence (`finops_answers` key)
- **Scoring**: `src/lib/assessment/scoring.ts` — client-side average per dimension, overall = average of dimensions
- **Maturity levels**: Beginner (<2), Developing (2-3), Intermediate (3-4), Advanced (4-4.5), Optimized (4.5+)
- **Recommendations**: Hardcoded fallback logic in `scoring.ts` (max 5 shown), AI-generated via API as enhancement
- **Fonts**: Manrope (headings), Almarai (body) — loaded from Google Fonts
- **Colors**: CSS variables in `src/index.css` (HSL). Accent = `hsl(83 78% 60%)` (#ACE849)
- **Design**: Flat — no gradients, no shadows, no textures (per OptimNow brand guidelines)
- **Keyboard nav**: Keys 1-5 select answers on question cards

## Commands
```bash
npm run dev       # Dev server on port 5173
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Environment Variables
- `OPENAI_API_KEY` - Required for AI recommendations (Vercel serverless)

## UI Components (src/components/ui/)
Only 8 shadcn/ui components are used: button, card, label, radio-group, sonner, toast, toaster, tooltip. Plus the `use-toast.ts` hook. Do not add unused components.

## Important Notes
- The `openai` package is in dependencies for the Vercel serverless function — it is tree-shaken from the client bundle
- `sonner.tsx` uses hardcoded `theme="light"` (no `next-themes` dependency)
- No test suite exists
- No CI/CD pipeline configured
- CTA links point to `https://github.com/OptimNow/ai-roi-calculator-mcp/invitations`
