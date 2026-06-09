import type { Schema } from "@strapi/strapi";

export default {
  attributes: {
    nickname: {
      type: "string",
      configurable: false,
    },
    avatar: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
      configurable: false,
    },
  },
} as const satisfies Partial<Schema.ContentType>;
