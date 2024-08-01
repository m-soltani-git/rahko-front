const schema = () => ({
  type: 'object',
  required: [],
  properties: {
    title: {
      type: 'string',
      title: 'title',
    },
    details: {
      type: 'string',
      title: 'details',
    },
  },
});

export default schema;
