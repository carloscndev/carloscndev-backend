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

    // Seed home-page
    const esHome = await strapi
      .documents("api::home-page.home-page")
      .findFirst({ locale: "es" });

    if (!esHome) {
      const fs = await import("fs");
      const path = await import("path");

      const assetsDir = path.join(
        process.cwd(),
        "..",
        "carloscndev-frontend",
        "src",
        "assets",
        "images"
      );

      const uploadFile = async (filename: string) => {
        const filepath = path.join(assetsDir, filename);
        if (!fs.existsSync(filepath)) {
          console.warn(`[bootstrap] Image not found: ${filepath}`);
          return null;
        }
        const stat = fs.statSync(filepath);
        const uploadService = strapi.plugin("upload").service("upload");
        const uploaded = await uploadService.upload(
          {
            data: { fileInfo: { name: filename } },
            files: {
              filepath,
              originalFilename: filename,
              mimetype: "image/png",
              size: stat.size,
            },
          },
          { user: null }
        );
        return Array.isArray(uploaded) ? uploaded[0] : uploaded;
      };

      const avatarDefault = await uploadFile("hello.webp");
      const avatarRunning = await uploadFile("running.webp");
      const avatarReading = await uploadFile("reading.webp");
      const avatarVideogames = await uploadFile("playing.webp");

      const homeDataEs = {
        intro: "Hola, soy",
        title: "Carlos Castañeda",
        subtitle: "carloscndev",
        content:
          "<p>Este es mi sitio. Aquí puedes conocer un poco más sobre mí, ver algunos de mis proyectos, en qué estoy trabajando actualmente y, si te interesa, leer algo en el blog.</p><p>Soy ingeniero de software. En mi tiempo libre me gusta <strong data-action=\"running\">correr</strong>. He completado varios maratones y casi siempre estoy preparando el siguiente reto.</p><p>También me interesa el diseño, <strong data-action=\"reading\">leer</strong> y los <strong data-action=\"videogames\">videojuegos</strong>.</p>",
        avatarDefault: avatarDefault ? avatarDefault.id : null,
        avatarRunning: avatarRunning ? avatarRunning.id : null,
        avatarReading: avatarReading ? avatarReading.id : null,
        avatarVideogames: avatarVideogames ? avatarVideogames.id : null,
      };

      const homeDataEn = {
        intro: "Hi, I'm",
        title: "Carlos Castañeda",
        subtitle: "carloscndev",
        content:
          "<p>This is my space. Here you can learn a bit more about me, see some of my projects, what I'm currently working on, and, if you're interested, read something on the blog.</p><p>I am a Software Engineer. In my leisure time, I enjoy <strong data-action=\"running\">running</strong>. I have completed several marathons and I am usually preparing for the next challenge.</p><p>I am also interested in design, <strong data-action=\"reading\">reading</strong>, and <strong data-action=\"videogames\">video games</strong>.</p>",
        avatarDefault: avatarDefault ? avatarDefault.id : null,
        avatarRunning: avatarRunning ? avatarRunning.id : null,
        avatarReading: avatarReading ? avatarReading.id : null,
        avatarVideogames: avatarVideogames ? avatarVideogames.id : null,
      };

      await strapi.documents("api::home-page.home-page").create({
        locale: "es",
        data: homeDataEs,
      });
      console.log("[bootstrap] home-page (es) seeded successfully");

      await strapi.documents("api::home-page.home-page").create({
        locale: "en",
        data: homeDataEn,
      });
      console.log("[bootstrap] home-page (en) seeded successfully");
    }
  },
};
