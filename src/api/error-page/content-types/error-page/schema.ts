import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "error_pages",
  info: {
    singularName: "error-page",
    pluralName: "error-pages",
    displayName: "Error Page",
    description: "404 error page with title, message, and button text",
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
    message: {
      type: "text",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    button_text: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
  },
} as const satisfies Schema.ContentType;
