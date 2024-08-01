const schema = () => ({
  type: 'object',
  required: ['cellphone', 'password'],
  properties: {
    cellphone: {
      type: 'string',
      title: 'شماره همراه'
    },
    password: {
      type: 'string',
      title: 'گذرواژه',
      format: 'password'
    }
  }
});

export default schema;
