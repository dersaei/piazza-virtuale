// lib/constants/formCategories.ts
// Kategorie TYLKO dla formularza zgłoszeniowego
// NIE wpływa na nawigację ani strony kategorii

export interface FormCategoryInfo {
  id: string;
  label: string;
  group?: string;
}

export const FORM_CATEGORIES: FormCategoryInfo[] = [
  // BEVANDE
  {
    id: "bevande-birre",
    label: "Bevande - Birre",
    group: "Bevande",
  },
  {
    id: "bevande-vini",
    label: "Bevande - Vini",
    group: "Bevande",
  },
  {
    id: "bevande-distillati-liquori",
    label: "Bevande - Distillati e Liquori",
    group: "Bevande",
  },
  {
    id: "bevande-caffe-te",
    label: "Bevande - Caffè e Tè",
    group: "Bevande",
  },
  {
    id: "bevande-succhi-infusi",
    label: "Bevande - Succhi e Infusi",
    group: "Bevande",
  },

  // CONDIMENTI
  {
    id: "condimenti-pesto",
    label: "Condimenti - Pesto",
    group: "Condimenti",
  },
  {
    id: "condimenti-aceto",
    label: "Condimenti - Aceto",
    group: "Condimenti",
  },
  {
    id: "condimenti-pomodori",
    label: "Condimenti - Pomodori",
    group: "Condimenti",
  },
  {
    id: "condimenti-altre",
    label: "Condimenti - Altre",
    group: "Condimenti",
  },

  // ALTRE (bez grupy)
  {
    id: "conserve-dolci",
    label: "Conserve Dolci",
  },
  {
    id: "conserve-salate",
    label: "Conserve Salate",
  },
  {
    id: "miele",
    label: "Miele",
  },
  {
    id: "legumi",
    label: "Legumi",
  },
  {
    id: "dolci",
    label: "Dolci",
  },
  {
    id: "caseificio",
    label: "Caseificio",
  },
  {
    id: "olii",
    label: "Olii",
  },
  {
    id: "pane",
    label: "Pane",
  },
  {
    id: "pasta",
    label: "Pasta",
  },
  {
    id: "farina",
    label: "Farina",
  },
  {
    id: "cereali",
    label: "Cereali",
  },
  {
    id: "pescare",
    label: "Pescare",
  },
  {
    id: "salumi",
    label: "Salumi",
  },
];

// Helper to group categories for the form display
export const GROUPED_FORM_CATEGORIES = FORM_CATEGORIES.reduce(
  (acc, category) => {
    const group = category.group || "Altre";
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(category);
    return acc;
  },
  {} as Record<string, FormCategoryInfo[]>
);

// Helper to get all category IDs
export const FORM_CATEGORY_IDS = FORM_CATEGORIES.map((cat) => cat.id);
