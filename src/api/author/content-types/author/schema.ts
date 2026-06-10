import type { Schema } from "@strapi/strapi";

export default {
  kind: "collectionType",
  collectionName: "authors",
  info: {
    singularName: "author",
    pluralName: "authors",
    displayName: "Author",
    description: "Blog post authors",
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
          localized: false,
        },
      },
    },
    nickname: {
      type: "string",
      unique: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    slug: {
      type: "uid",
      targetField: "nickname",
      required: true,
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    avatar: {
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
    bio: {
      type: "text",
      maxLength: 250,
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    role: {
      type: "string",
      pluginOptions: {
        i18n: {
          localized: true,
        },
      },
    },
    twitter: {
      type: "string",
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
    github: {
      type: "string",
      pluginOptions: {
        i18n: {
          localized: false,
        },
      },
    },
  },
} as const;
