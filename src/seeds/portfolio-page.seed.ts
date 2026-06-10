import type { Core } from "@strapi/strapi";
import data from "./data/portfolio-page.json";

export async function seedPortfolioPage(strapi: Core.Strapi) {
  const esExisting = await strapi
    .documents("api::portfolio-page.portfolio-page")
    .findFirst({ locale: "es" });
  if (esExisting) return;

  const allProjectsEs = await strapi.documents("api::project.project").findMany({ locale: "es" });
  const allProjectsEn = await strapi.documents("api::project.project").findMany({ locale: "en" });

  const projectIdsEs = allProjectsEs.map((p: any) => p.documentId);
  const projectIdsEn = allProjectsEn.map((p: any) => p.documentId);

  const esEntry = await strapi.documents("api::portfolio-page.portfolio-page").create({
    locale: "es",
    data: {
      ...data.es,
      projects: projectIdsEs,
    },
  });

  await strapi.documents("api::portfolio-page.portfolio-page").create({
    locale: "en",
    data: {
      documentId: esEntry.documentId,
      ...data.en,
      projects: projectIdsEn,
    },
  });

  console.log("[Seeder] Portfolio page seeded successfully");
}
