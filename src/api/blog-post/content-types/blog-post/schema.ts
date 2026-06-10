import type { Schema } from "@strapi/strapi";

export default {
  kind: "collectionType",
  collectionName: "blog_posts",
  info: {
    singularName: "blog-post",
    pluralName: "blog-posts",
    displayName: "Blog Post",
    description: "Blog post entries",
  },
  options: {
    draftAndPublish: true,
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
    slug: {
      type: "uid",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    author: {
      type: "relation",
      relation: "manyToOne",
      target: "api::author.author",
    },
    category: {
      type: "relation",
      relation: "manyToOne",
      target: "api::category.category",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    coverImage: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    date: {
      type: "date",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    excerpt: {
      type: "text",
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
    seo: {
      type: "component",
      component: "shared.seo",
    },
  },
} as const;
