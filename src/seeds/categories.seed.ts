import type { Core } from "@strapi/strapi";
import categories from "./data/categories.json";

export async function seedCategories(strapi: Core.Strapi) {
  const existingCategories = await strapi
    .documents("api::category.category")
    .findMany({ locale: "es" });
  if (existingCategories && existingCategories.length > 0) return;

  for (const cat of categories) {
    const esEntry = await strapi.documents("api::category.category").create({
      locale: "es",
      data: { name: cat.es, icon: cat.icon },
    } as any);

    await strapi.documents("api::category.category").create({
      locale: "en",
      data: {
        documentId: esEntry.documentId,
        name: cat.en,
        icon: cat.icon,
      },
    } as any);
  }

  console.log("[Seeder] Categories seeded successfully");
}
