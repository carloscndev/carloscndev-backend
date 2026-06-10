import type { Core } from "@strapi/strapi";

interface SeedData {
  es: Record<string, any>;
  en: Record<string, any>;
}

export async function seedLocalizableDocument(strapi: Core.Strapi, uid: any, { es, en }: SeedData) {
  const esExisting = await strapi.documents(uid).findFirst({ locale: "es" });

  if (esExisting) return;

  const esEntry = await strapi.documents(uid).create({
    locale: "es",
    data: es,
  });

  await strapi.documents(uid).create({
    locale: "en",
    data: {
      ...en,
      documentId: esEntry.documentId,
    },
  });

  console.log(`[Seeder] Seeded localized document for UID: ${uid}`);
}
