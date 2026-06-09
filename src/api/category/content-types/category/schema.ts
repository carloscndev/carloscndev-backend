import type { Schema } from "@strapi/strapi";

export default {
  kind: "collectionType",
  collectionName: "categories",
  info: {
    singularName: "category",
    pluralName: "categories",
    displayName: "Category",
    description: "Blog post categories",
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
    name: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    icon: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const satisfies Schema.ContentType;
