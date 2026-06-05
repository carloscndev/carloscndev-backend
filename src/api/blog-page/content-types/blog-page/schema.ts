import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "blog_pages",
  info: {
    singularName: "blog-page",
    pluralName: "blog-pages",
    displayName: "Blog Page",
    description: "Blog section with title, intro, and view more label",
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
  },
} as const satisfies Schema.ContentType;
