import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "year"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "about",
      type: "textarea",
      required: true,
      label: "À propos (Description longue)",
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      required: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
    {
      name: "githubLink",
      type: "text",
    },
    {
      name: "accentColor",
      type: "text",
      admin: {
        description: "Code couleur hexadécimal (ex: #00adb5)",
        position: "sidebar",
      },
    },
    {
      name: "lightMode",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "year",
      type: "number",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "services",
      type: "relationship",
      relationTo: "services",
      hasMany: true,
      label: "Services",
      admin: {
        description: "Services associés à ce projet",
      },
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "duration",
      type: "text",
    },
    {
      name: "client",
      type: "text",
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "challenges",
      type: "array",
      fields: [
        {
          name: "challenge",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
