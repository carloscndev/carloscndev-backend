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
    technologies: {
      type: "json",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    links: {
      type: "component",
      component: "elements.project-link",
      repeatable: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    slug: {
      type: "uid",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    sortOrder: {
      type: "integer",
      default: 0,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const satisfies Schema.ContentType;
