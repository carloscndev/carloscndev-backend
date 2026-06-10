import type { Core } from "@strapi/strapi";
import { seedLocalizableDocument } from "./index";
import data from "./data/global-config.json";

export async function seedGlobalConfig(strapi: Core.Strapi) {
  await seedLocalizableDocument(strapi, "api::global-config.global-config", data);
}
