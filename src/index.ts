import type { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const esExisting = await strapi
      .documents("api::global-config.global-config")
      .findFirst({ locale: "es" });
    const enExisting = await strapi
      .documents("api::global-config.global-config")
      .findFirst({ locale: "en" });

    if (!esExisting) {
      await strapi.documents("api::global-config.global-config").create({
        locale: "es",
        data: {
          siteName: "Carlos Castañeda",
          siteTitle: "carloscndev",
          siteDescription: "Carlos Castañeda — Software Engineer. Portfolio, blog, and projects.",
          siteAuthor: "carloscndev",
          defaultLocale: "es",
          navigation: [
            { key: "home", href: "/" },
            { key: "about", href: "/#about" },
            { key: "experience", href: "/#experience" },
            { key: "portfolio", href: "/#portfolio" },
            { key: "blog", href: "/#blog" },
            { key: "contact", href: "/#contact" },
          ],
          social: [
            { platform: "github", url: "https://github.com/carloscndev" },
            { platform: "instagram", url: "https://www.instagram.com/carloscndev.isrunning/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/carloscndev/" },
            { platform: "cv", url: "https://carloscndev.github.io" },
            { platform: "email", url: "mailto:carloscndev@gmail.com" },
          ],
        },
      });
      console.log("[bootstrap] global-config (es) seeded successfully");
    }

    if (!enExisting) {
      await strapi.documents("api::global-config.global-config").create({
        locale: "en",
        data: {
          siteName: "Carlos Castañeda",
          siteTitle: "carloscndev",
          siteDescription: "Carlos Castañeda — Software Engineer. Portfolio, blog, and projects.",
          siteAuthor: "carloscndev",
          defaultLocale: "es",
          navigation: [
            { key: "home", href: "/" },
            { key: "about", href: "/#about" },
            { key: "experience", href: "/#experience" },
            { key: "portfolio", href: "/#portfolio" },
            { key: "blog", href: "/#blog" },
            { key: "contact", href: "/#contact" },
          ],
          social: [
            { platform: "github", url: "https://github.com/carloscndev" },
            { platform: "instagram", url: "https://www.instagram.com/carloscndev.isrunning/" },
            { platform: "linkedin", url: "https://www.linkedin.com/in/carloscndev/" },
            { platform: "cv", url: "https://carloscndev.github.io" },
            { platform: "email", url: "mailto:carloscndev@gmail.com" },
          ],
        },
      });
      console.log("[bootstrap] global-config (en) seeded successfully");
    }
  },
};
