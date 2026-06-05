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
    const esHome = await strapi.documents("api::home-page.home-page").findFirst({ locale: "es" });

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
          '<p>Este es mi sitio. Aquí puedes conocer un poco más sobre mí, ver algunos de mis proyectos, en qué estoy trabajando actualmente y, si te interesa, leer algo en el blog.</p><p>Soy ingeniero de software. En mi tiempo libre me gusta <strong data-action="running">correr</strong>. He completado varios maratones y casi siempre estoy preparando el siguiente reto.</p><p>También me interesa el diseño, <strong data-action="reading">leer</strong> y los <strong data-action="videogames">videojuegos</strong>.</p>',
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
          '<p>This is my space. Here you can learn a bit more about me, see some of my projects, what I\'m currently working on, and, if you\'re interested, read something on the blog.</p><p>I am a Software Engineer. In my leisure time, I enjoy <strong data-action="running">running</strong>. I have completed several marathons and I am usually preparing for the next challenge.</p><p>I am also interested in design, <strong data-action="reading">reading</strong>, and <strong data-action="videogames">video games</strong>.</p>',
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

    // Seed about-page
    const esAbout = await strapi
      .documents("api::about-page.about-page")
      .findFirst({ locale: "es" });

    if (!esAbout) {
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
              mimetype: "image/webp",
              size: stat.size,
            },
          },
          { user: null }
        );
        return Array.isArray(uploaded) ? uploaded[0] : uploaded;
      };

      const aboutImage = await uploadFile("working.webp");

      const aboutDataEs = {
        title: "Un poco sobre mi",
        contentText:
          "<p>Soy ingeniero de software con más de 8 años de experiencia. Me enfoco principalmente en desarrollo <strong>frontend</strong>, aunque también tengo experiencia en <strong>backend</strong> y en la creación de pipelines de <strong>CI/CD</strong>.</p><p>Recientemente me he enfocado en sistemas de <strong>inteligencia artificial generativa</strong> y <strong>machine learning</strong>, incluyendo la integración de modelos de lenguaje (<strong>LLMs</strong>) en flujos de trabajo de productos reales.</p><p>Algunas tecnologías con las que he trabajado recientemente:</p>",
        technologies: [
          { name: "Ecosistema de React", icon: "diamond" },
          { name: "TypeScript", icon: "diamond" },
          { name: "Node.js", icon: "diamond" },
          { name: "LLMs", icon: "diamond" },
          { name: "Astro", icon: "diamond" },
          { name: "Python", icon: "diamond" },
        ],
        image: aboutImage ? aboutImage.id : null,
      };

      const aboutDataEn = {
        title: "A bit about me",
        contentText:
          "<p>I am a software engineer with over eight years of experience. My work has been primarily focused on <strong>frontend</strong> development, although I also possess experience in <strong>backend</strong> systems and the development of <strong>CI/CD</strong> pipelines.</p><p>In recent years, I have been focusing on <strong>generative AI</strong> and <strong>machine learning</strong> systems, specifically regarding the integration of Large Language Models (<strong>LLMs</strong>) into real-world product workflows.</p><p>Some of the technologies with which I have recently worked include:</p>",
        technologies: [
          { name: "React Ecosystem", icon: "diamond" },
          { name: "TypeScript", icon: "diamond" },
          { name: "Node.js", icon: "diamond" },
          { name: "LLMs", icon: "diamond" },
          { name: "Astro", icon: "diamond" },
          { name: "Python", icon: "diamond" },
        ],
        image: aboutImage ? aboutImage.id : null,
      };

      await strapi.documents("api::about-page.about-page").create({
        locale: "es",
        data: aboutDataEs,
      });
      console.log("[bootstrap] about-page (es) seeded successfully");

      await strapi.documents("api::about-page.about-page").create({
        locale: "en",
        data: aboutDataEn,
      });
      console.log("[bootstrap] about-page (en) seeded successfully");
    }

    // Seed job entries
    const existingJobs = await strapi.documents("api::job.job").findMany({ locale: "es" });

    if (!existingJobs || existingJobs.length === 0) {
      const jobsEs = [
        {
          company: "C3 AI",
          companyUrl: "https://c3.ai",
          role: "Mid Software Engineer",
          period: "Ene 2023 - May 2025",
          description:
            "<p>En este rol trabajé en aplicaciones full stack en producción, liderando el desarrollo end-to-end de funcionalidades, desde la arquitectura hasta el despliegue.</p><p>Me enfoqué en integrar IA Generativa en productos empresariales y en construir pipelines de Machine Learning dentro de sistemas distribuidos. En el día a día, integraba modelos de lenguaje a flujos reales, colaborando de cerca con diseño y producto para construir sistemas escalables y mejorar la experiencia de desarrollo.</p>",
          technologies: ["Generative AI", "React", "TypeScript", "Python"],
          sortOrder: 0,
        },
        {
          company: "Liverpool",
          companyUrl: "https://www.liverpool.com.mx/tienda/home",
          role: "Software Engineer",
          period: "Feb 2020 - Nov 2022",
          description:
            "<p>En este rol trabajé en el desarrollo y mantenimiento de una de las plataformas de ecommerce más grandes de México, con más de 13 millones de usuarios activos al mes.</p><p>Estuve involucrado en la entrega de nuevas funcionalidades usando un stack basado en React, Next.js y Node.js, además de diseñar e implementar Cloud Functions en GCP para automatizar procesos del frontend. También impulsé mejoras de rendimiento y desarrollé herramientas internas para elevar la calidad del código y optimizar los flujos del equipo.</p>",
          technologies: ["React", "Node.js", "Express.js", "GCP Cloud Functions"],
          sortOrder: 1,
        },
        {
          company: "Sngular",
          companyUrl: "https://www.sngular.com/es/",
          role: "Frontend Developer",
          period: "Mar 2018 - Feb 2020",
          description:
            "<p>Lideré el desarrollo frontend trabajando con arquitecturas modernas en React y migrando plataformas legacy hacia stacks actuales con Gatsby, GraphQL y Styled Components.</p><p>Me encargué de construir componentes reutilizables con React y Redux, asegurando la estabilidad del código mediante pruebas unitarias con Jest.</p><p>Además, automaticé procesos internos con AWS Lambda, implementé pipelines de CI/CD y desarrollé servicios en el backend con Node.js y Express.</p>",
          technologies: ["React", "Gatsby", "GraphQL", "AWS Lambda", "Jest", "Node.js"],
          sortOrder: 2,
        },
        {
          company: "STC Metro",
          companyUrl: "http://www.metro.cdmx.gob.mx",
          role: "Software Developer",
          period: "Ago 2015 - Mar 2018",
          description:
            "<p>Lideré la modernización de sistemas de monitoreo para gabinetes de pilotaje automático, diseñando plataformas web en Python y JavaScript para sustituir software licenciado y reducir costos operativos.</p><p>Desarrollé herramientas de monitoreo para infraestructura de señalización y actualicé sistemas embebidos en plataformas legacy utilizando C/C++. Fue un rol donde combiné tecnologías web con sistemas críticos para mejorar la eficiencia del monitoreo en tiempo real.</p>",
          technologies: ["Python", "JavaScript", "C/C++", "PHP", "Sistemas Embebidos", "Linux"],
          sortOrder: 3,
        },
      ];

      const jobsEn = [
        {
          company: "C3 AI",
          companyUrl: "https://c3.ai",
          role: "Mid Software Engineer",
          period: "Jan 2023 - May 2025",
          description:
            "<p>In this role, I worked on full stack applications in production. I led the development of features from the initial architecture to the final deployment.</p><p>I focused on the integration of Generative AI into enterprise products and the construction of Machine Learning pipelines in distributed systems. On a daily basis, I integrated language models into real workflows, working closely with the design and product teams to build scalable systems and improve the development experience.</p>",
          technologies: ["Generative AI", "React", "TypeScript", "Python"],
          sortOrder: 0,
        },
        {
          company: "Liverpool",
          companyUrl: "https://www.liverpool.com.mx/tienda/home",
          role: "Software Engineer",
          period: "Feb 2020 - Nov 2022",
          description:
            "<p>In this role, I worked on the development and maintenance of one of the largest e-commerce platforms in Mexico, which serves over 13 million monthly active users.</p><p>I was involved in the delivery of new features using a technology stack based on React, Next.js, and Node.js. Additionally, I designed and implemented Cloud Functions on GCP to automate frontend processes. I also led performance improvements and developed internal tools to increase code quality and optimize team workflows.</p>",
          technologies: ["React", "Node.js", "Express.js", "GCP Cloud Functions"],
          sortOrder: 1,
        },
        {
          company: "Sngular",
          companyUrl: "https://www.sngular.com/es/",
          role: "Frontend Developer",
          period: "Mar 2018 - Feb 2020",
          description:
            "<p>In this role, I led frontend development, working with modern React-based architectures and migrating legacy platforms to more current stacks using Gatsby, GraphQL, and Styled Components.</p><p>I contributed to building reusable components with Redux and maintaining code quality through unit testing with Jest.</p><p>Additionally, I worked on automating internal processes with AWS Lambda, implementing CI/CD pipelines, and developing backend support services with Node.js and Express.</p>",
          technologies: ["React", "Gatsby", "GraphQL", "AWS Lambda", "Jest", "Node.js"],
          sortOrder: 2,
        },
        {
          company: "STC Metro",
          companyUrl: "http://www.metro.cdmx.gob.mx",
          role: "Software Developer",
          period: "Aug 2015 - Mar 2018",
          description:
            "<p>In this role, I led the modernization of remote monitoring systems for automatic control cabinets, designing web-based platforms with Python and JavaScript to replace licensed software and reduce operational costs.</p><p>I also contributed to the development of monitoring tools for signaling infrastructure and supported updates to embedded systems on legacy electronic platforms using C/C++.</p><p>This work involved combining web technologies with critical real-time systems to improve monitoring efficiency.</p>",
          technologies: ["Python", "JavaScript", "C/C++", "PHP", "Embedded Systems", "Linux"],
          sortOrder: 3,
        },
      ];

      for (let i = 0; i < jobsEs.length; i++) {
        const esEntry = await strapi.documents("api::job.job").create({
          locale: "es",
          data: jobsEs[i],
        });

        await strapi.documents("api::job.job").create({
          locale: "en",
          data: { ...jobsEn[i], documentId: esEntry.documentId },
        });
      }

      console.log("[bootstrap] job entries seeded successfully");
    }

    // Seed experience-page
    const esExperience = await strapi
      .documents("api::experience-page.experience-page")
      .findFirst({ locale: "es" });

    if (!esExperience) {
      // Get all job documentIds for linking
      const allJobsEs = await strapi
        .documents("api::job.job")
        .findMany({ locale: "es", sort: { sortOrder: "asc" } });

      const allJobsEn = await strapi
        .documents("api::job.job")
        .findMany({ locale: "en", sort: { sortOrder: "asc" } });

      const jobIdsEs = allJobsEs.map((job: any) => job.documentId);
      const jobIdsEn = allJobsEn.map((job: any) => job.documentId);

      const experienceDataEs = {
        title: "Experiencia Profesional",
        intro:
          "Estas son algunas de las empresas en las que he trabajado y un poco de lo que he hecho en cada una lo largo de mi carrera profesional.",
        jobs: jobIdsEs,
      };

      const experienceDataEn = {
        title: "Professional Experience",
        intro:
          "Over the years, I have worked across different teams and projects. The following is a brief overview of my experience.",
        jobs: jobIdsEn,
      };

      await strapi.documents("api::experience-page.experience-page").create({
        locale: "es",
        data: experienceDataEs,
      });
      console.log("[bootstrap] experience-page (es) seeded successfully");

      await strapi.documents("api::experience-page.experience-page").create({
        locale: "en",
        data: experienceDataEn,
      });
      console.log("[bootstrap] experience-page (en) seeded successfully");
    }

    // Seed project entries
    const existingProjects = await strapi
      .documents("api::project.project")
      .findMany({ locale: "es" });

    if (!existingProjects || existingProjects.length === 0) {
      const projectsEs = [
        {
          title: "Generative AI Project",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          technologies: ["React", "Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "gen-ai",
          sortOrder: 0,
        },
        {
          title: "Instagram Clone",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          technologies: ["React", "TypeScript", "StoryBook", "ReactTesting"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
          ],
          slug: "insta-clone",
          sortOrder: 1,
        },
        {
          title: "RAG Application",
          description:
            "AI framework that improves Large Language Model (LLM) accuracy by retrieving data from external, trusted knowledge bases before generating a response",
          technologies: ["Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "rag-app",
          sortOrder: 2,
        },
        {
          title: "Spotify Clone",
          description:
            "A Spotify clone project is a full-stack or front-end web application replicating music streaming features, typically built using React, Node.js, and SQL/MongoDB.",
          technologies: ["React", "TypeScript", "ChatGPT", "Mongoose"],
          links: [
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "spotify-clone",
          sortOrder: 3,
        },
        {
          title: "Water App",
          description:
            "Water tracker apps, such as Waterllama, My Water, and WaterMinder, help users maintain proper hydration by calculating personalized daily water goals based on weight, activity, and climate.",
          technologies: ["React", "Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "water-app",
          sortOrder: 4,
        },
        {
          title: "Own React",
          description:
            "Creating a custom React component library involves setting up a project with modern tooling for reusability, consistency, and efficient development.",
          technologies: ["React", "TypeScript", "Unit Testing", "Webpack"],
          links: [{ type: "demo", url: "#" }],
          slug: "own-react",
          sortOrder: 5,
        },
      ];

      const projectsEn = [
        {
          title: "Generative AI Project",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          technologies: ["React", "Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "gen-ai",
          sortOrder: 0,
        },
        {
          title: "Instagram Clone",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          technologies: ["React", "TypeScript", "StoryBook", "ReactTesting"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
          ],
          slug: "insta-clone",
          sortOrder: 1,
        },
        {
          title: "RAG Application",
          description:
            "AI framework that improves Large Language Model (LLM) accuracy by retrieving data from external, trusted knowledge bases before generating a response",
          technologies: ["Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "rag-app",
          sortOrder: 2,
        },
        {
          title: "Spotify Clone",
          description:
            "A Spotify clone project is a full-stack or front-end web application replicating music streaming features, typically built using React, Node.js, and SQL/MongoDB.",
          technologies: ["React", "TypeScript", "ChatGPT", "Mongoose"],
          links: [
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "spotify-clone",
          sortOrder: 3,
        },
        {
          title: "Water App",
          description:
            "Water tracker apps, such as Waterllama, My Water, and WaterMinder, help users maintain proper hydration by calculating personalized daily water goals based on weight, activity, and climate.",
          technologies: ["React", "Generative AI", "TypeScript", "Python", "ChatGPT"],
          links: [
            { type: "repo", url: "#" },
            { type: "demo", url: "#" },
            { type: "article", url: "#" },
          ],
          slug: "water-app",
          sortOrder: 4,
        },
        {
          title: "Own React",
          description:
            "Creating a custom React component library involves setting up a project with modern tooling for reusability, consistency, and efficient development.",
          technologies: ["React", "TypeScript", "Unit Testing", "Webpack"],
          links: [{ type: "demo", url: "#" }],
          slug: "own-react",
          sortOrder: 5,
        },
      ];

      for (let i = 0; i < projectsEs.length; i++) {
        const esEntry = await strapi.documents("api::project.project").create({
          locale: "es",
          data: projectsEs[i] as any,
        });

        await strapi.documents("api::project.project").create({
          locale: "en",
          data: { ...projectsEn[i], documentId: esEntry.documentId } as any,
        });
      }

      console.log("[bootstrap] project entries seeded successfully");
    }

    // Seed portfolio-page
    const esPortfolio = await strapi
      .documents("api::portfolio-page.portfolio-page")
      .findFirst({ locale: "es" });

    if (!esPortfolio) {
      const allProjectsEs = await strapi
        .documents("api::project.project")
        .findMany({ locale: "es", sort: { sortOrder: "asc" } });

      const allProjectsEn = await strapi
        .documents("api::project.project")
        .findMany({ locale: "en", sort: { sortOrder: "asc" } });

      const projectIdsEs = allProjectsEs.map((p: any) => p.documentId);
      const projectIdsEn = allProjectsEn.map((p: any) => p.documentId);

      await strapi.documents("api::portfolio-page.portfolio-page").create({
        locale: "es",
        data: {
          title: "Mi Portafolio",
          intro:
            "Aquí puedes ver algunos de los proyectos en los que he estado trabajando últimamente, junto con uno que otro experimento.",
          viewMore: "Ver más",
          projects: projectIdsEs,
        },
      });
      console.log("[bootstrap] portfolio-page (es) seeded successfully");

      await strapi.documents("api::portfolio-page.portfolio-page").create({
        locale: "en",
        data: {
          title: "My Portfolio",
          intro:
            "A selection of recent work, including production projects, technical challenges, and a few experiments.",
          viewMore: "View more",
          projects: projectIdsEn,
        },
      });
      console.log("[bootstrap] portfolio-page (en) seeded successfully");
    }

    // Seed category entries
    const existingCategories = await strapi
      .documents("api::category.category")
      .findMany({ locale: "es" });

    if (!existingCategories || existingCategories.length === 0) {
      const techEs = await strapi.documents("api::category.category").create({
        locale: "es",
        data: {
          name: "Tecnología",
          slug: "technology",
          icon: "tech-icon",
        } as any,
      });

      await strapi.documents("api::category.category").create({
        locale: "en",
        data: {
          documentId: techEs.documentId,
          name: "Technology",
          slug: "technology",
          icon: "tech-icon",
        } as any,
      });

      const runningEs = await strapi.documents("api::category.category").create({
        locale: "es",
        data: {
          name: "Running & Travel",
          slug: "running-travel",
          icon: "running-icon",
        } as any,
      });

      await strapi.documents("api::category.category").create({
        locale: "en",
        data: {
          documentId: runningEs.documentId,
          name: "Running & Travel",
          slug: "running-travel",
          icon: "running-icon",
        } as any,
      });

      console.log("[bootstrap] category entries seeded successfully");
    }

    // Seed blog-post entries (1 dummy post for field validation)
    const existingPosts = await strapi
      .documents("api::blog-post.blog-post")
      .findMany({ locale: "es" });

    if (!existingPosts || existingPosts.length === 0) {
      const categories = await strapi
        .documents("api::category.category")
        .findMany({ locale: "es" });

      const techCategory = categories.find((c: any) => c.slug === "technology");

      const esEntry = await strapi.documents("api::blog-post.blog-post").create({
        locale: "es",
        data: {
          title: "Post de Prueba",
          slug: "test-post",
          resume: "Este es un resumen del post de prueba para validar los campos del content type.",
          readTime: "5 min",
          date: "2026-06-01",
          category: techCategory?.documentId || null,
          icon: "tech-icon",
          content: "<p>Este es el contenido del post de prueba.</p>",
          author: "carloscndev",
        } as any,
      });

      await strapi.documents("api::blog-post.blog-post").create({
        locale: "en",
        data: {
          documentId: esEntry.documentId,
          title: "Test Post",
          slug: "test-post",
          resume: "This is a test post summary to validate the content type fields.",
          readTime: "5 min",
          date: "2026-06-01",
          category: techCategory?.documentId || null,
          icon: "tech-icon",
          content: "<p>This is the test post content.</p>",
          author: "carloscndev",
        } as any,
      });

      console.log("[bootstrap] blog-post entries seeded successfully");
    }

    // Seed blog-page
    const esBlogPage = await strapi
      .documents("api::blog-page.blog-page")
      .findFirst({ locale: "es" });

    if (!esBlogPage) {
      await strapi.documents("api::blog-page.blog-page").create({
        locale: "es",
        data: {
          title: "Mi Blog",
          intro:
            "Aquí comparto un poco más a fondo mis proyectos e ideas. También hay un poco de todo: entrenamientos, viajes, pensamientos y lo que voy aprendiendo en el camino.",
          viewMore: "Ver más",
        } as any,
      });
      console.log("[bootstrap] blog-page (es) seeded successfully");

      await strapi.documents("api::blog-page.blog-page").create({
        locale: "en",
        data: {
          title: "My Blog",
          intro:
            "In this space, I share a more detailed look at my projects and ideas. You will also find a variety of topics, including my training, travels, personal thoughts, and the things I am learning along the way.",
          viewMore: "View more",
        } as any,
      });
      console.log("[bootstrap] blog-page (en) seeded successfully");
    }

    // Seed contact-page
    const esContactPage = await strapi
      .documents("api::contact-page.contact-page")
      .findFirst({ locale: "es" });

    if (!esContactPage) {
      await strapi.documents("api::contact-page.contact-page").create({
        locale: "es",
        data: {
          title: "Contacto",
          statusMessage:
            "Actualmente estoy abierto a nuevas oportunidades. Si tienes un proyecto en mente o simplemente quieres saludar, no dudes en escribirme.",
          buttonText: "Enviar mensaje",
          mailTo: "carloscndev@gmail.com",
          footer: "O si lo prefieres, puedes contactarme a través de mis redes sociales:",
        } as any,
      });
      console.log("[bootstrap] contact-page (es) seeded successfully");

      await strapi.documents("api::contact-page.contact-page").create({
        locale: "en",
        data: {
          title: "Contact",
          statusMessage:
            "I am currently open to new opportunities. If you have a project in mind or just want to say hi, feel free to reach out.",
          buttonText: "Send message",
          mailTo: "carloscndev@gmail.com",
          footer: "Or if you prefer, you can contact me through my social media:",
        } as any,
      });
      console.log("[bootstrap] contact-page (en) seeded successfully");
    }

    // Seed error-page
    const esErrorPage = await strapi
      .documents("api::error-page.error-page")
      .findFirst({ locale: "es" });

    if (!esErrorPage) {
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
              mimetype: "image/webp",
              size: stat.size,
            },
          },
          { user: null }
        );
        return Array.isArray(uploaded) ? uploaded[0] : uploaded;
      };

      const sleepingImage = await uploadFile("slepping.webp");

      await strapi.documents("api::error-page.error-page").create({
        locale: "es",
        data: {
          title: "Página no encontrada",
          message:
            "La página que buscas no existe o ha sido movida. Puede que el enlace esté mal escrito o que la página haya sido eliminada.",
          button_text: "Volver al inicio",
          image: sleepingImage ? sleepingImage.id : null,
        } as any,
      });
      console.log("[bootstrap] error-page (es) seeded successfully");

      await strapi.documents("api::error-page.error-page").create({
        locale: "en",
        data: {
          title: "Page not found",
          message:
            "The page you are looking for does not exist or has been moved. The link may be misspelled or the page may have been removed.",
          button_text: "Back to home",
          image: sleepingImage ? sleepingImage.id : null,
        } as any,
      });
      console.log("[bootstrap] error-page (en) seeded successfully");
    }
  },
};
