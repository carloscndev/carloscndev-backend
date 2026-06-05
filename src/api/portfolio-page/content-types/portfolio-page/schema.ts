import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "portfolio_pages",
  info: {
    singularName: "portfolio-page",
    pluralName: "portfolio-pages",
    displayName: "Portfolio Page",
    description:
      "Portfolio section with title, intro, view more label, and related project entries",
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
    intro: {
      type: "text",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    viewMore: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    projects: {
      type: "relation",
      relation: "oneToMany",
      target: "api::project.project",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
  },
} as const satisfies Schema.ContentType;
