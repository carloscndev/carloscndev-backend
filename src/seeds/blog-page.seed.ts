import type { Core } from "@strapi/strapi";
import { seedLocalizableDocument } from "./index";
import data from "./data/blog-page.json";

export async function seedBlogPage(strapi: Core.Strapi) {
  await seedLocalizableDocument(strapi, "api::blog-page.blog-page", data);
}
