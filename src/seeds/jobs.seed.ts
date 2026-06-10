import type { Core } from "@strapi/strapi";
import jobs from "./data/jobs.json";

export async function seedJobs(strapi: Core.Strapi) {
  const existingJobs = await strapi.documents("api::job.job").findMany({ locale: "es" });
  if (existingJobs && existingJobs.length > 0) return;

  for (const job of jobs) {
    const esEntry = await strapi.documents("api::job.job").create({
      locale: "es",
      data: job.es,
    });

    await strapi.documents("api::job.job").create({
      locale: "en",
      data: { ...job.en, documentId: esEntry.documentId },
    });
  }

  console.log("[Seeder] Jobs seeded successfully");
}
