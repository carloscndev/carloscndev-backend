import type { Core } from "@strapi/strapi";

const config = ({ env: _env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["nickname", "avatar"],
      },
    },
  },
});

export default config;
