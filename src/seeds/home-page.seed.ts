import type { Core } from "@strapi/strapi";
import { seedLocalizableDocument } from "./index";
import { uploadFile } from "./upload";
import data from "./data/home-page.json";

export async function seedHomePage(strapi: Core.Strapi) {
  const esExisting = await strapi.documents("api::home-page.home-page").findFirst({ locale: "es" });
  if (esExisting) return;

  const avatarDefault = await uploadFile(strapi, "hello.webp");
  const avatarRunning = await uploadFile(strapi, "running.webp");
  const avatarReading = await uploadFile(strapi, "reading.webp");
  const avatarVideogames = await uploadFile(strapi, "playing.webp");

  const esEntry = await strapi.documents("api::home-page.home-page").create({
    locale: "es",
    data: {
      ...data.es,
      avatarDefault: avatarDefault ? avatarDefault.id : null,
      avatarRunning: avatarRunning ? avatarRunning.id : null,
      avatarReading: avatarReading ? avatarReading.id : null,
      avatarVideogames: avatarVideogames ? avatarVideogames.id : null,
    },
  });

  await strapi.documents("api::home-page.home-page").create({
    locale: "en",
    data: {
      ...data.en,
      documentId: esEntry.documentId,
      avatarDefault: avatarDefault ? avatarDefault.id : null,
      avatarRunning: avatarRunning ? avatarRunning.id : null,
      avatarReading: avatarReading ? avatarReading.id : null,
      avatarVideogames: avatarVideogames ? avatarVideogames.id : null,
    },
  });

  console.log("[Seeder] Home page seeded successfully");
}
