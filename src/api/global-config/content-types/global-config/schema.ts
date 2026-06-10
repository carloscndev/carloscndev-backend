import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "global_configs",
  info: {
    singularName: "global-config",
    pluralName: "global-configs",
    displayName: "Global Config",
    description: "Global site configuration including metadata, navigation, and social links",
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
    siteName: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    defaultLocale: {
      type: "string",
      required: true,
      default: "es",
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    seo: {
      type: "component",
      component: "shared.seo",
      repeatable: false,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    navigation: {
      type: "component",
      component: "elements.navigation-item",
      repeatable: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    social: {
      type: "component",
      component: "elements.social-link",
      repeatable: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const;
