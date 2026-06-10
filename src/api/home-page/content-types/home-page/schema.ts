import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "home_pages",
  info: {
    singularName: "home-page",
    pluralName: "home-pages",
    displayName: "Home Page",
    description: "Home section content with intro, title, avatar variants, and HTML bio",
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
    intro: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    title: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    subtitle: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    content: {
      type: "richtext",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    avatarDefault: {
      type: "media",
      multiple: false,
      required: true,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    avatarRunning: {
      type: "media",
      multiple: false,
      required: true,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    avatarReading: {
      type: "media",
      multiple: false,
      required: true,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    avatarVideogames: {
      type: "media",
      multiple: false,
      required: true,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const;
