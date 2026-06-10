import type { Core } from "@strapi/strapi";
import data from "./data/experience-page.json";

export async function seedExperiencePage(strapi: Core.Strapi) {
  const esExisting = await strapi
    .documents("api::experience-page.experience-page")
    .findFirst({ locale: "es" });
  if (esExisting) return;

  const allJobsEs = await strapi.documents("api::job.job").findMany({ locale: "es" });
  const allJobsEn = await strapi.documents("api::job.job").findMany({ locale: "en" });

  const jobIdsEs = allJobsEs.map((job: any) => job.documentId);
  const jobIdsEn = allJobsEn.map((job: any) => job.documentId);

  const esEntry = await strapi.documents("api::experience-page.experience-page").create({
    locale: "es",
    data: {
      ...data.es,
      jobs: jobIdsEs,
    },
  });

  await strapi.documents("api::experience-page.experience-page").create({
    locale: "en",
    data: {
      documentId: esEntry.documentId,
      ...data.en,
      jobs: jobIdsEn,
    },
  });

  console.log("[Seeder] Experience page seeded successfully");
}
