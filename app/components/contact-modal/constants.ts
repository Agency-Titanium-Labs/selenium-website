import { FormData } from "./types";

export const categoriesOptions = [
  { label: "Web & Applications", value: "web_applications" },
  { label: "Automatisation & Data", value: "automatisation_data" },
  { label: "Design & branding", value: "design_branding" },
  {
    label: "Production visuelle & Publicitaire",
    value: "production_visuelle_publicitaire",
  },
  {
    label: "Consulting & Gestion de projet",
    value: "consulting_gestion_de_projet",
  },
];

export const sizeOptions = [
  { label: "Indépendant", value: "independant" },
  { label: "Petite entreprise (<50)", value: "petite_entreprise" },
  { label: "Moyenne entreprise (< 250)", value: "moyenne_entreprise" },
  { label: "Grande entreprise (250+)", value: "grande_entreprise" },
];

export const delayOptions = [
  { label: "Immédiatement", value: "immediatement" },
  { label: "D'ici 1 à 3 mois", value: "1_3_mois" },
  { label: "D'ici 3 à 6 mois", value: "3_6_mois" },
  { label: "Plus tard", value: "plus_tard" },
];

export const categoryPlaceholders = [
  "Cuisine moléculaire & confiserie 🍬",
  "Élevage de licornes 🦄",
  "Domotique pour châteaux médiévaux 🏰",
  "Voyages intergalactiques low-cost 🚀",
  "Coaching pour super-héros 🦸",
  "Design de sandales futuristes 👡",
  "Dressage de dragons 🐉",
  "Agriculture de cactus connectés 🌵",
  "Audit en magie noire (avec facture) 🔮",
  "Gestion de colonies de pingouins 🐧",
];

export const initialFormData: FormData = {
  categories: [],
  otherCategory: undefined,
  companySize: undefined,
  budget: undefined,
  delay: undefined,
  contactDetails: {
    name: undefined,
    phone: undefined,
    email: "",
    message: undefined,
  },
};
