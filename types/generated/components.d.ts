import type { Schema, Struct } from "@strapi/strapi";

export interface ElementsNavigationItem extends Struct.ComponentSchema {
  collectionName: "components_elements_navigation_items";
  info: {
    description: "A navigation link item with key and href";
    displayName: "Navigation Item";
    icon: "link";
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    key: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsProjectLink extends Struct.ComponentSchema {
  collectionName: "components_elements_project_links";
  info: {
    description: "A project link (repo, demo, or article) with type and URL";
    displayName: "Project Link";
    icon: "link";
  };
  attributes: {
    type: Schema.Attribute.Enumeration<["repo", "demo", "article"]> & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: "components_elements_social_links";
  info: {
    description: "A social media or contact link";
    displayName: "Social Link";
    icon: "globe";
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechnology extends Struct.ComponentSchema {
  collectionName: "components_elements_technologies";
  info: {
    description: "A technology item with name and icon identifier";
    displayName: "Technology";
    icon: "code";
  };
  attributes: {
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos";
  info: {
    description: "SEO metadata for pages and blog posts";
    displayName: "SEO";
    icon: "search";
  };
  attributes: {
    metaTitle: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaImage: Schema.Attribute.Media<"images">;
    keywords: Schema.Attribute.String;
    metaRobots: Schema.Attribute.String & Schema.Attribute.DefaultTo<"index, follow">;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "elements.navigation-item": ElementsNavigationItem;
      "elements.project-link": ElementsProjectLink;
      "elements.social-link": ElementsSocialLink;
      "elements.technology": ElementsTechnology;
      "shared.seo": SharedSeo;
    }
  }
}
