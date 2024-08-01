const schema = () => ({
  type: 'object',
  // required: ['cellphone', 'password'],
  properties: {
    cellphone: {
      type: 'string',
      title: 'شماره همراه',
      default: ''
    },
    password: {
      type: 'string',
      title: 'گذرواژه',
      format: 'password',
      default: ''
    }
  }
});

export default schema;
