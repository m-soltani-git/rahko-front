import React from 'react';
import schema from './schema';
import uiSchema from './uiSchema';
import { MuiFormBuilder } from 'components';

const Form = ({ formData = {}, onChange }) => {
  return (
    <MuiFormBuilder
      showSubmit={false}
      schema={schema()}
      uiSchema={uiSchema()}
      formData={formData}
      onChange={onChange}
    />
  );
};

export default Form;
