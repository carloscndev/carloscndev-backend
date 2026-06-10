import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "contact_pages",
  info: {
    singularName: "contact-page",
    pluralName: "contact-pages",
    displayName: "Contact Page",
    description: "Contact section with title, status message, button text, mailto, and footer",
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
    statusMessage: {
      type: "text",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    buttonText: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    mailTo: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    footer: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
  },
} as const;
