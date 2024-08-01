import React from 'react';
import schema from './schema';
import uiSchema from './uiSchema';
import { MuiFormBuilder } from 'components';

const Form = ({ formData = {}, loading, onSubmit }) => {
  return (
    <MuiFormBuilder
      submit="ورود"
      loading={loading}
      formData={formData}
      onSubmit={onSubmit}
      schema={schema()}
      uiSchema={uiSchema()}
    />
  );
};

export default Form;
