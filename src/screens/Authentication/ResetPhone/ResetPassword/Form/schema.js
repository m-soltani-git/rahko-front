const schema = () => ({
  type: 'object',
  required: ['password'],
  properties: {
    password: {
      type: 'string',
      title: 'گذرواژه',
      format: 'password'
    }
  }
});

export default schema;
