import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "about_pages",
  info: {
    singularName: "about-page",
    pluralName: "about-pages",
    displayName: "About Page",
    description: "About section content with biography, technologies, and image",
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
    contentText: {
      type: "richtext",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    technologies: {
      type: "component",
      component: "elements.technology",
      repeatable: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    image: {
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
