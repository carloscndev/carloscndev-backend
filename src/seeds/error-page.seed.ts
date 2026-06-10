import type { Core } from "@strapi/strapi";
import { uploadFile } from "./upload";
import data from "./data/error-page.json";

export async function seedErrorPage(strapi: Core.Strapi) {
  const esExisting = await strapi
    .documents("api::error-page.error-page")
    .findFirst({ locale: "es" });
  if (esExisting) return;

  const sleepingImage = await uploadFile(strapi, "slepping.webp");

  const esEntry = await strapi.documents("api::error-page.error-page").create({
    locale: "es",
    data: {
      ...data.es,
      image: sleepingImage ? sleepingImage.id : null,
    },
  } as any);

  await strapi.documents("api::error-page.error-page").create({
    locale: "en",
    data: {
      documentId: esEntry.documentId,
      ...data.en,
      image: sleepingImage ? sleepingImage.id : null,
    },
  } as any);

  console.log("[Seeder] Error page seeded successfully");
}
