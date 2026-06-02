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
    author: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
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
    resume: {
      type: "text",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    readTime: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: true,
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
    icon: {
      type: "string",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    headerImage: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
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
    featuredImage: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const satisfies Schema.ContentType;
