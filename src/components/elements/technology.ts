/**
 * Technology Component
 */
export default {
  collectionName: 'components_elements_technologies',
  info: {
    displayName: 'Technology',
    icon: 'code',
    description: 'A technology item with name and icon identifier'
  },
  category: 'elements',
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    icon: {
      type: 'string',
      required: true
    }
  }
};
