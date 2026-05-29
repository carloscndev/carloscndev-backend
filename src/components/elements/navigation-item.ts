/**
 * Navigation Item Component
 */
export default {
  collectionName: "components_elements_navigation_items",
  info: {
    displayName: "Navigation Item",
    icon: "link",
    description: "A navigation link item with key and href",
  },
  category: "elements",
  attributes: {
    key: {
      type: "string",
      required: true,
    },
    href: {
      type: "string",
      required: true,
    },
  },
};
