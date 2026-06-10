import type { Core } from "@strapi/strapi";
import { seedGlobalConfig } from "./seeds/global-config.seed";
import { seedHomePage } from "./seeds/home-page.seed";
import { seedAboutPage } from "./seeds/about-page.seed";
import { seedJobs } from "./seeds/jobs.seed";
import { seedExperiencePage } from "./seeds/experience-page.seed";
import { seedPortfolioPage } from "./seeds/portfolio-page.seed";
import { seedCategories } from "./seeds/categories.seed";
import { seedBlogPage } from "./seeds/blog-page.seed";
import { seedContactPage } from "./seeds/contact-page.seed";
import { seedErrorPage } from "./seeds/error-page.seed";

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await seedGlobalConfig(strapi);
      await seedHomePage(strapi);
      await seedAboutPage(strapi);
      await seedJobs(strapi);
      await seedExperiencePage(strapi);
      await seedPortfolioPage(strapi);
      await seedCategories(strapi);
      await seedBlogPage(strapi);
      await seedContactPage(strapi);
      await seedErrorPage(strapi);

      console.log("[Bootstrap] All seed processes completed safely.");
    } catch (error) {
      console.error("[Bootstrap] Error running structural seeds:", error);
    }
  },
};
