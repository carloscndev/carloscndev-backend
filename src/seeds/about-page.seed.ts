import type { Core } from "@strapi/strapi";
import { seedLocalizableDocument } from "./index";
import { uploadFile } from "./upload";
import data from "./data/about-page.json";

export async function seedAboutPage(strapi: Core.Strapi) {
  const esExisting = await strapi
    .documents("api::about-page.about-page")
    .findFirst({ locale: "es" });
  if (esExisting) return;

  const aboutImage = await uploadFile(strapi, "working.webp");

  const esEntry = await strapi.documents("api::about-page.about-page").create({
    locale: "es",
    data: {
      ...data.es,
      image: aboutImage ? aboutImage.id : null,
    },
  });

  await strapi.documents("api::about-page.about-page").create({
    locale: "en",
    data: {
      ...data.en,
      documentId: esEntry.documentId,
      image: aboutImage ? aboutImage.id : null,
    },
  });

  console.log("[Seeder] About page seeded successfully");
}
