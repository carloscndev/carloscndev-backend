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
  attributes: {},
} as const;
