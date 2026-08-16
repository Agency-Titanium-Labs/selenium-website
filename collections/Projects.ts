import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "category", "year"],
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
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "imageUrl",
          type: "text",
          admin: {
            description:
              "URL de l'image (ex: /projects/selenium-studio-hero.png)",
          },
        },
      ],
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
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Web", value: "web" },
        { label: "Mobile", value: "mobile" },
        { label: "Autre", value: "other" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
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
