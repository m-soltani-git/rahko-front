import React from 'react';
import { MuiFormBuilder } from 'components';

import uiSchema from './uiSchema';
import schema from './schema';

const Form = ({ init, setFilter }) => {
  const formData = { ...init };

  const onChange = async ({ formData }) => {
    setFilter(formData);
  };

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
