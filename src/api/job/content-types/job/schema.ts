import type { Schema } from '@strapi/strapi';

export default {
  kind: 'collectionType',
  collectionName: 'jobs',
  info: {
    singularName: 'job',
    pluralName: 'jobs',
    displayName: 'Job',
    description: 'Professional experience entries'
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    i18n: {
      localized: true
    }
  },
  attributes: {
    company: {
      type: 'string',
      required: true,
      pluginOptions: {
        i18n: {
          localized: false
        }
      }
    },
    companyUrl: {
      type: 'string',
      pluginOptions: {
        i18n: {
          localized: false
        }
      }
    },
    role: {
      type: 'string',
      required: true,
      pluginOptions: {
        i18n: {
          localized: true
        }
      }
    },
    period: {
      type: 'string',
      required: true,
      pluginOptions: {
        i18n: {
          localized: true
        }
      }
    },
    description: {
      type: 'richtext',
      required: true,
      pluginOptions: {
        i18n: {
          localized: true
        }
      }
    },
    technologies: {
      type: 'json',
      required: true,
      pluginOptions: {
        i18n: {
          localized: true
        }
      }
    },
    sortOrder: {
      type: 'integer',
      default: 0,
      pluginOptions: {
        i18n: {
          localized: false
        }
      }
    }
  }
} as const satisfies Schema.ContentType;
