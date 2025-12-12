# FinOps Self Assessment – Master Delivery Plan

This document is the single source of truth for improving the FinOps Self Assessment application. It is structured in two releases to balance speed and product quality. Checkboxes are used for execution tracking.

---

## Context & Assumptions

- Public-facing website
- Existing stack: Vite + React + TypeScript + shadcn-ui + Tailwind + Vercel
- OptimNow branding already defined (branding document available in project assets)
- Executive audience (CTO, CFO, FinOps Lead)
- Deterministic scoring logic remains in code
- AI is used only for narrative, prioritization, and action planning

---

## Release A – UX & Visual Foundations (Fast Win)

Objective: make the assessment feel branded, fluid, and credible in under a few evenings.

### A1. Branding (Light Theme)
- [ ] Import OptimNow color palette as CSS variables (light-first)
- [ ] Map Tailwind semantic tokens to OptimNow variables
- [ ] Remove hardcoded colors from components
- [ ] Set default light background (dark optional, not default)
- [ ] Apply OptimNow typography rules (headings, body, spacing)
- [ ] Add header with OptimNow logo (subtle, non-marketing)
- [ ] Standardize buttons, cards, progress indicator

Done when: app visually matches OptimNow identity and reads as a professional assessment, not a demo.

---

### A2. Questionnaire Flow – “Pick and Go”
- [ ] Remove explicit Submit button per question
- [ ] On option selection:
  - [ ] Save answer in state
  - [ ] Auto-advance to next question (short delay)
- [ ] Preserve Back navigation
- [ ] Highlight previously selected answers on revisit
- [ ] Keyboard accessibility (arrow + enter)
- [ ] Handle last-question transition to Results cleanly

Done when: users can complete the assessment without friction or instruction.

---

### A3. Results Page – Visual Upgrade
- [ ] Normalize scores per category (0–100)
- [ ] Validate question-to-category mapping
- [ ] Add radar chart per FinOps domain
- [ ] Display overall maturity score
- [ ] Add compact table:
  - [ ] Category
  - [ ] Score
  - [ ] Primary gap
- [ ] Clean executive-friendly layout

Done when: results are readable and defensible for an executive audience.

---

## Release B – Productization & Lead Generation

Objective: turn the assessment into a growth and advisory asset.

---

### B1. Partial Reveal & Gating Strategy
- [ ] Define visible results (for example: radar + scores)
- [ ] Define gated content (full analysis, action plan, roadmap)
- [ ] Implement gated UI states
- [ ] Clear value message before email capture

Done when: users understand what they get for free vs after download.

---

### B2. Email Capture & Storage
- [ ] Email capture form (minimal fields)
- [ ] Explicit consent and usage text
- [ ] Server-side validation
- [ ] Store email + assessment ID (no raw answers if avoidable)
- [ ] Handle duplicates gracefully
- [ ] Basic bot protection

Technology assumption: Supabase or equivalent lightweight DB.

Done when: emails are safely stored and usable for follow-up.

---

### B3. GPT-Based Analysis & Recommendations (Server-Side)
- [ ] Create Vercel Serverless Function for analysis
- [ ] Store OpenAI API key securely in env vars
- [ ] Define strict JSON schema output:
  - [ ] Executive summary
  - [ ] Top risks
  - [ ] 30-day quick wins
  - [ ] 90-day roadmap
  - [ ] KPIs to track
  - [ ] Assumptions
- [ ] Deterministic scores remain computed client-side
- [ ] Add basic rate limiting / cost guardrails

Done when: AI output is structured, repeatable, and usable in a report.

---

### B4. PDF Generation & Download (Max 2 charts)
- [ ] Define PDF structure (cover, summary, radar, actions)
- [ ] Apply OptimNow branding to PDF
- [ ] Render scores and recommendations into template
- [ ] Include up to 2 charts in PDF:
  - [ ] Chart 1: Radar (category maturity)
  - [ ] Chart 2: Bar chart (top gaps / priorities) or trend-style score breakdown
- [ ] Generate PDF server-side
- [ ] Trigger download after email submission

Done when: the PDF can be sent to a CFO without apology.

---

## Delivery Strategy

- Release A first (UX credibility)
- Release B second (growth + monetization)
- Each section can be merged independently

---

## Non-Goals (Explicit)

- No complex benchmarking vs external datasets (for now)
- No real-time cost ingestion
- No heavy CRM integration in v1

---

## Success Criteria

- Completion rate increases
- Results are understandable without explanation
- Leads are captured with clear intent
- Output is consistent with OptimNow advisory positioning

---

## Notes

This plan is intentionally pragmatic. Anything not checked is consciously deferred, not forgotten.
