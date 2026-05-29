/**
 * Project Link Component
 */
export default {
  collectionName: 'components_elements_project_links',
  info: {
    displayName: 'Project Link',
    icon: 'link',
    description: 'A project link (repo, demo, or article) with type and URL'
  },
  category: 'elements',
  attributes: {
    type: {
      type: 'enumeration',
      enum: ['repo', 'demo', 'article'],
      required: true
    },
    url: {
      type: 'string',
      required: true
    }
  }
};
