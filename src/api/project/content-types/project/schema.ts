import type { Schema } from "@strapi/strapi";

export default {
  kind: "collectionType",
  collectionName: "projects",
  info: {
    singularName: "project",
    pluralName: "projects",
    displayName: "Project",
    description: "Portfolio project entries",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    i18n: {
      localized: true,
    },
  },
  attributes: {
    title: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    description: {
      type: "text",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    coverImage: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
    },
    technologies: {
      type: "json",
      required: true,
    },
    links: {
      type: "component",
      component: "elements.project-link",
      repeatable: true,
    },
  },
} as const satisfies Schema.ContentType;
