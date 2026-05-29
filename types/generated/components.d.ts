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

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "elements.navigation-item": ElementsNavigationItem;
      "elements.social-link": ElementsSocialLink;
      "elements.technology": ElementsTechnology;
    }
  }
}
