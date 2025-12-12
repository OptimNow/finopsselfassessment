export type CategoryKey =
  | "inform"
  | "optimize"
  | "operate"
  | "govern"
  | "finops_practice"; // adapte à tes catégories réelles

export const CATEGORIES: Record<CategoryKey, { label: string; description?: string }> = {
  inform: { label: "Inform" },
  optimize: { label: "Optimize" },
  operate: { label: "Operate" },
  govern: { label: "Govern" },
  finops_practice: { label: "FinOps Practice" },
};