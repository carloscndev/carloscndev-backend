import type { Schema } from "@strapi/strapi";

export default {
  kind: "singleType",
  collectionName: "experience_pages",
  info: {
    singularName: "experience-page",
    pluralName: "experience-pages",
    displayName: "Experience Page",
    description: "Experience section with title, intro, and related job entries",
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
    jobs: {
      type: "relation",
      relation: "oneToMany",
      target: "api::job.job",
    },
  },
} as const satisfies Schema.ContentType;
