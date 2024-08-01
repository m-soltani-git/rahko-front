const schema = () => ({
  type: 'object',
  required: ['cellphone'],
  properties: {
    cellphone: {
      type: 'string',
      title: 'شماره همراه'
    }
  }
});

export default schema;
