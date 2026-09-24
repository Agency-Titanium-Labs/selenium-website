import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "icon", "order"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Titre du service",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
        description: "Identifiant unique (ex: creation-landing-pages)",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Web & Applications", value: "Web & Applications" },
        {
          label: "Consulting & Gestion de projet",
          value: "Consulting & Gestion de projet",
        },
        { label: "Design & Branding", value: "Design & Branding" },
        { label: "Automatisation & Data", value: "Automatisation & Data" },
        {
          label: "Production visuelle & publicitaire",
          value: "Production visuelle & publicitaire",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Description du service",
    },
    {
      name: "icon",
      type: "select",
      required: true,
      defaultValue: "landing-page",
      label: "Icône",
      admin: {
        description:
          "Choisissez une icône prédéfinie ou sélectionnez 'Code SVG personnalisé'. Les icônes utilisent 'currentColor' afin que la couleur soit gérée dans le code frontend.",
      },
      options: [
        { label: "Landing Pages (Web)", value: "landing-page" },
        { label: "Outils B2B et B2C", value: "b2b-tools" },
        { label: "Solutions CRM & ERP", value: "crm-erp" },
        { label: "Audit & Optimisation", value: "audit" },
        { label: "Pilotage & Méthodes agiles", value: "agile" },
        { label: "Coordination", value: "coordination" },
        { label: "Design UX/UI", value: "design-ux-ui" },
        { label: "Identité visuelle", value: "visual-identity" },
        { label: "Scénario automatisé", value: "automation" },
        { label: "Gestion de données", value: "data-management" },
        { label: "Dashboards & rapports", value: "dashboard" },
        { label: "Photographie", value: "photography" },
        { label: "Vidéos", value: "video" },
        { label: "Montage & Post-production", value: "motion-design" },
        { label: "Code SVG personnalisé", value: "custom" },
      ],
    },
    {
      name: "customSvg",
      type: "textarea",
      label: "Code SVG personnalisé",
      admin: {
        description:
          "Collez le balisage SVG ici. Utilisez fill='currentColor' pour que la couleur soit contrôlée dans le code CSS.",
        condition: (data) => data?.icon === "custom",
      },
    },
    {
      name: "iconMedia",
      type: "upload",
      relationTo: "media",
      label: "Fichier SVG personnalisé (alternative)",
      admin: {
        description:
          "Téléversez un fichier SVG monochrome (la couleur est gérée en CSS via mask-image: currentColor).",
        condition: (data) => data?.icon === "custom",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Ordre d'affichage dans la section et les listes",
      },
    },
  ],
};
