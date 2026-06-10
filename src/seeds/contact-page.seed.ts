import type { Core } from "@strapi/strapi";
import { seedLocalizableDocument } from "./index";
import data from "./data/contact-page.json";

export async function seedContactPage(strapi: Core.Strapi) {
  await seedLocalizableDocument(strapi, "api::contact-page.contact-page", data);
}
