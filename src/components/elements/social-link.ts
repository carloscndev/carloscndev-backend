/**
 * Social Link Component
 */
export default {
  collectionName: "components_elements_social_links",
  info: {
    displayName: "Social Link",
    icon: "globe",
    description: "A social media or contact link",
  },
  category: "elements",
  attributes: {
    platform: {
      type: "string",
      required: true,
    },
    url: {
      type: "string",
      required: true,
    },
  },
};
