export default {
  collectionName: "components_shared_seos",
  info: {
    displayName: "SEO",
    icon: "search",
    description: "SEO metadata for pages and blog posts",
  },
  category: "shared",
  attributes: {
    metaTitle: {
      type: "string",
    },
    metaDescription: {
      type: "text",
      maxLength: 160,
    },
    metaImage: {
      type: "media",
      multiple: false,
      allowedTypes: ["images"],
    },
    keywords: {
      type: "string",
    },
    metaRobots: {
      type: "string",
      default: "index, follow",
    },
  },
};
